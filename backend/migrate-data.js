import mysql from "mysql2/promise";
import prisma from "./src/config/database.js";

const tables = [
  "user",
  "skill",
  "studentprofile",
  "assessmentquestion",
  "industryrole",
  "project",
  "internship",
  "learningresource",
  "studentskill",
  "assessmentresult",
  "industryroleskill",
  "internshipskill",
  "internshipapplication",
  "studentcertification",
  "studentexperience",
  "notification",
];

const postgresTableNames = {
  user: "User",
  skill: "Skill",
  studentprofile: "StudentProfile",
  assessmentquestion: "AssessmentQuestion",
  industryrole: "IndustryRole",
  project: "Project",
  internship: "Internship",
  learningresource: "LearningResource",
  studentskill: "StudentSkill",
  assessmentresult: "AssessmentResult",
  industryroleskill: "IndustryRoleSkill",
  internshipskill: "InternshipSkill",
  internshipapplication: "InternshipApplication",
  studentcertification: "StudentCertification",
  studentexperience: "StudentExperience",
  notification: "Notification",
};

// PostgreSQL identifier
function quotePostgresIdentifier(value) {
  return `"${String(value).replace(/"/g, '""')}"`;
}

// MySQL identifier
function quoteMySQLIdentifier(value) {
  return `\`${String(value).replace(/`/g, "``")}\``;
}

async function main() {
  console.log("======================================");
  console.log(" AcademiaLink Data Migration");
  console.log(" MySQL -> Supabase PostgreSQL");
  console.log("======================================\n");

  if (!process.env.OLD_MYSQL_DATABASE_URL) {
    throw new Error(
      "OLD_MYSQL_DATABASE_URL is missing from .env"
    );
  }

  if (!process.env.DATABASE_URL) {
    throw new Error(
      "DATABASE_URL is missing from .env"
    );
  }

  console.log("Connecting to old MySQL...");

  const mysqlConnection = await mysql.createConnection(
    process.env.OLD_MYSQL_DATABASE_URL
  );

  console.log("✓ MySQL connected");

  console.log("Checking Supabase PostgreSQL...");

  await prisma.$queryRaw`SELECT 1`;

  console.log("✓ PostgreSQL connected\n");

  try {
    await prisma.$transaction(
      async (tx) => {
        for (const mysqlTable of tables) {
          const postgresTable =
            postgresTableNames[mysqlTable];

          console.log(`Migrating ${mysqlTable}...`);

          // --------------------------------------------------
          // 1. Read data from MySQL
          // --------------------------------------------------

          const [rows] = await mysqlConnection.query(
            `SELECT * FROM ${quoteMySQLIdentifier(mysqlTable)}`
          );

          if (rows.length === 0) {
            console.log("  - No data\n");
            continue;
          }

          // --------------------------------------------------
          // 2. Read PostgreSQL column information
          // --------------------------------------------------

          const pgColumns =
            await tx.$queryRawUnsafe(
              `
              SELECT
                column_name,
                data_type,
                udt_name
              FROM information_schema.columns
              WHERE table_schema = 'public'
                AND table_name = $1
              ORDER BY ordinal_position
              `,
              postgresTable
            );

          const pgColumnInfo = new Map(
            pgColumns.map((column) => [
              column.column_name,
              {
                dataType: column.data_type,
                udtName: column.udt_name,
              },
            ])
          );

          // --------------------------------------------------
          // 3. Find matching columns
          // --------------------------------------------------

          const columns = Object.keys(rows[0]).filter(
            (column) =>
              pgColumnInfo.has(column)
          );

          if (columns.length === 0) {
            throw new Error(
              `No matching columns found for ${mysqlTable}`
            );
          }

          const quotedColumns = columns
            .map(quotePostgresIdentifier)
            .join(", ");

          // --------------------------------------------------
          // 4. Insert every row
          // --------------------------------------------------

          for (const row of rows) {
            const values = [];
            const placeholders = [];

            columns.forEach((column, index) => {
              let value = row[column];

              const info =
                pgColumnInfo.get(column);

              const parameterNumber = index + 1;

              // ----------------------------------------------
              // MySQL 0/1 -> PostgreSQL boolean
              // ----------------------------------------------

              if (
                info.dataType === "boolean" &&
                value !== null
              ) {
                value =
                  value === true ||
                  value === 1 ||
                  value === "1";
              }

              values.push(value);

              // ----------------------------------------------
              // PostgreSQL enum handling
              // ----------------------------------------------

              if (
                info.dataType === "USER-DEFINED"
              ) {
                placeholders.push(
                  `$${parameterNumber}::${quotePostgresIdentifier(
                    info.udtName
                  )}`
                );
              } else {
                placeholders.push(
                  `$${parameterNumber}`
                );
              }
            });

            const sql = `
              INSERT INTO ${quotePostgresIdentifier(
                postgresTable
              )}
              (${quotedColumns})
              VALUES (${placeholders.join(", ")})
            `;

            await tx.$executeRawUnsafe(
              sql,
              ...values
            );
          }

          console.log(
            `  ✓ ${rows.length} rows migrated\n`
          );
        }

                // ----------------------------------------------------
        // 5. Reset PostgreSQL sequences
        // ----------------------------------------------------

        console.log(
          "Resetting PostgreSQL ID sequences..."
        );

        for (const postgresTable of Object.values(
          postgresTableNames
        )) {
          const sequenceResult =
            await tx.$queryRawUnsafe(
              `
              SELECT pg_get_serial_sequence(
                $1,
                'id'
              ) AS sequence
              `,
              quotePostgresIdentifier(postgresTable)
            );

          const sequence =
            sequenceResult[0]?.sequence;

          if (!sequence) {
            continue;
          }

          const maxResult =
            await tx.$queryRawUnsafe(
              `
              SELECT MAX("id") AS max_id
              FROM ${quotePostgresIdentifier(
                postgresTable
              )}
              `
            );

          const maxId =
            maxResult[0]?.max_id;

          if (
            maxId !== null &&
            maxId !== undefined
          ) {
            await tx.$executeRawUnsafe(
              `
              SELECT setval(
                $1::regclass,
                $2,
                true
              )
              `,
              sequence,
              Number(maxId)
            );
          }
        }

        console.log(
          "✓ PostgreSQL sequences reset\n"
        );
      },
      {
        timeout: 120000,
      }
    );

    console.log("======================================");
    console.log("✓ MIGRATION COMPLETED SUCCESSFULLY");
    console.log("======================================");
  } finally {
    await mysqlConnection.end();
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error("\n======================================");
  console.error("✗ MIGRATION FAILED");
  console.error("======================================");
  console.error(error);
  process.exit(1);
});
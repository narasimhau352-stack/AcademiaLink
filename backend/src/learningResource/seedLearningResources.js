import prisma from "../config/database.js";

const resources = [
  {
    skill: "Python",
    title: "Python Programming Fundamentals",
    description:
      "Learn Python syntax, variables, conditions, loops, functions, and basic problem solving.",
    type: "COURSE",
    provider: "AcademiaLink Learning",
    url: "https://www.python.org/about/gettingstarted/",
  },
  {
    skill: "Python",
    title: "Python Practice Problems",
    description:
      "Practice Python programming through beginner-friendly coding problems.",
    type: "PRACTICE",
    provider: "AcademiaLink Learning",
    url: "https://www.python.org/about/gettingstarted/",
  },

  {
    skill: "Java",
    title: "Java Programming Fundamentals",
    description:
      "Learn Java basics, object-oriented programming, classes, objects, inheritance, and interfaces.",
    type: "COURSE",
    provider: "AcademiaLink Learning",
    url: "https://dev.java/learn/",
  },
  {
    skill: "Java",
    title: "Java Programming Practice",
    description:
      "Improve Java programming skills through coding exercises and practice.",
    type: "PRACTICE",
    provider: "AcademiaLink Learning",
    url: "https://dev.java/learn/",
  },

  {
    skill: "SQL",
    title: "SQL Fundamentals",
    description:
      "Learn SELECT, INSERT, UPDATE, DELETE, filtering, sorting, grouping, and joins.",
    type: "COURSE",
    provider: "AcademiaLink Learning",
    url: "https://www.w3schools.com/sql/",
  },
  {
    skill: "SQL",
    title: "Advanced SQL Practice",
    description:
      "Practice joins, subqueries, aggregate functions, and advanced SQL queries.",
    type: "PRACTICE",
    provider: "AcademiaLink Learning",
    url: "https://www.w3schools.com/sql/",
  },

  {
    skill: "React",
    title: "React Fundamentals",
    description:
      "Learn components, JSX, props, state, events, hooks, and basic React application development.",
    type: "COURSE",
    provider: "AcademiaLink Learning",
    url: "https://react.dev/learn",
  },
  {
    skill: "React",
    title: "React Project Practice",
    description:
      "Build small React applications to strengthen frontend development skills.",
    type: "PRACTICE",
    provider: "AcademiaLink Learning",
    url: "https://react.dev/learn",
  },

  {
    skill: "Machine Learning",
    title: "Machine Learning Fundamentals",
    description:
      "Learn supervised learning, classification, regression, model training, and evaluation.",
    type: "COURSE",
    provider: "AcademiaLink Learning",
    url: "https://scikit-learn.org/stable/getting_started.html",
  },
  {
    skill: "Machine Learning",
    title: "Machine Learning Practice",
    description:
      "Practice machine learning concepts using Python and scikit-learn.",
    type: "PRACTICE",
    provider: "AcademiaLink Learning",
    url: "https://scikit-learn.org/stable/getting_started.html",
  },
];

async function seedLearningResources() {
  try {
    for (const resource of resources) {
      const skill = await prisma.skill.findUnique({
        where: {
          name: resource.skill,
        },
      });

      if (!skill) {
        console.log(
          `Skill not found: ${resource.skill}`
        );
        continue;
      }

      await prisma.learningResource.create({
        data: {
          title: resource.title,
          description: resource.description,
          type: resource.type,
          provider: resource.provider,
          url: resource.url,
          skillId: skill.id,
        },
      });

      console.log(
        `Created resource: ${resource.title}`
      );
    }

    console.log(
      "Learning resources seeded successfully."
    );
  } catch (error) {
    console.error(
      "Failed to seed learning resources:",
      error
    );
  } finally {
    await prisma.$disconnect();
  }
}

seedLearningResources();
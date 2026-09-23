import prisma from "../config/database.js";

// Get internship recommendations for the logged-in student
export const getRecommendedInternships = async (req, res) => {
  try {
    const studentId = req.user.id;

    // Get student's profile and skills
    const student = await prisma.user.findUnique({
      where: {
        id: studentId,
      },
      include: {
        studentProfile: {
          include: {
            skills: {
              include: {
                skill: true,
              },
            },
          },
        },
      },
    });

    if (!student || !student.studentProfile) {
      return res.status(404).json({
        success: false,
        message: "Student profile not found",
      });
    }

    const profile = student.studentProfile;

    // Get all open internships
    const internships = await prisma.internship.findMany({
      where: {
        status: "OPEN",
      },
      include: {
        requiredSkills: {
          include: {
            skill: true,
          },
        },
        creator: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Convert student's skills into an easy-to-search map
    const studentSkills = new Map(
      profile.skills.map((item) => [
        item.skill.name.toLowerCase(),
        item.level,
      ])
    );

    const results = internships.map((internship) => {
      const requiredSkills = internship.requiredSkills || [];

      // -----------------------------------------
      // 1. SKILL MATCHING - 60%
      // -----------------------------------------

      const matchedSkills = [];
      const skillGaps = [];

      requiredSkills.forEach((required) => {
        const skillName = required.skill.name;
        const normalizedSkillName =
          skillName.toLowerCase();

        const studentLevel =
          studentSkills.get(normalizedSkillName);

        if (studentLevel) {
          matchedSkills.push({
            name: skillName,
            studentLevel,
            requiredLevel: required.level,
          });
        } else {
          skillGaps.push({
            name: skillName,
            requiredLevel: required.level,
          });
        }
      });

      let skillScore = 0;

      if (requiredSkills.length > 0) {
        skillScore =
          (matchedSkills.length /
            requiredSkills.length) *
          60;
      }

      // -----------------------------------------
      // 2. CAREER GOAL MATCHING - 20%
      // -----------------------------------------

      let careerScore = 0;
      let careerGoalMatched = false;

      if (
        profile.careerGoal &&
        internship.title
      ) {
        const careerGoal =
          profile.careerGoal.toLowerCase();

        const internshipTitle =
          internship.title.toLowerCase();

        if (
          internshipTitle.includes(careerGoal) ||
          careerGoal.includes(internshipTitle)
        ) {
          careerScore = 20;
          careerGoalMatched = true;
        }
      }

      // -----------------------------------------
      // 3. LOCATION MATCHING - 10%
      // -----------------------------------------

      let locationScore = 0;
      let locationMatched = false;

      if (
        profile.location &&
        internship.location
      ) {
        const studentLocation =
          profile.location.toLowerCase();

        const internshipLocation =
          internship.location.toLowerCase();

        if (
          internshipLocation.includes(
            studentLocation
          ) ||
          studentLocation.includes(
            internshipLocation
          )
        ) {
          locationScore = 10;
          locationMatched = true;
        }
      }

      // -----------------------------------------
      // 4. EXPERIENCE - 10%
      // -----------------------------------------

      // StudentProfile currently does not have
      // an experience field.
      const experienceScore = 10;

      // -----------------------------------------
      // FINAL MATCH SCORE
      // -----------------------------------------

      const matchPercentage = Math.min(
        100,
        Math.round(
          skillScore +
            careerScore +
            locationScore +
            experienceScore
        )
      );

      // -----------------------------------------
      // MATCHING REASONS
      // -----------------------------------------

      const reasons = [];

      if (matchedSkills.length > 0) {
        reasons.push(
          `${matchedSkills.length} required skill(s) matched`
        );
      }

      if (careerGoalMatched) {
        reasons.push(
          "Career goal matches internship"
        );
      }

      if (locationMatched) {
        reasons.push(
          "Location preference matches"
        );
      }

      if (reasons.length === 0) {
        reasons.push(
          "Explore this opportunity to develop relevant skills"
        );
      }

      return {
        ...internship,

        // Final score
        matchPercentage,

        // Detailed score breakdown
        scoreBreakdown: {
          skillScore: Math.round(skillScore),
          careerScore,
          locationScore,
          experienceScore,
        },

        // Skills
        matchedSkills,
        skillGaps,

        // Career information
        careerGoalMatched,

        // Location information
        locationMatched,

        // Explanation
        reasons,
      };
    });

    // Highest matching internships first
    results.sort(
      (a, b) =>
        b.matchPercentage -
        a.matchPercentage
    );

    res.json({
      success: true,

      student: {
        id: student.id,
        name: student.name,
        careerGoal: profile.careerGoal,
        location: profile.location,
        skills: profile.skills.map((item) => ({
          name: item.skill.name,
          level: item.level,
        })),
      },

      recommendations: results,
    });
  } catch (error) {
    console.error(
      "Smart matching error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to generate internship recommendations",
    });
  }
};
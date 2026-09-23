import prisma from "../config/database.js";

// Get industry skill demand
export const getIndustrySkillDemand = async (req, res) => {
  try {
    // Get all open internships with their required skills
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
      },
    });

    const skillDemand = {};

    // Calculate demand for every skill
    internships.forEach((internship) => {
      internship.requiredSkills.forEach((item) => {
        const skillName = item.skill.name;

        if (!skillDemand[skillName]) {
          skillDemand[skillName] = 0;
        }

        skillDemand[skillName]++;
      });
    });

    // Convert object to sorted array
    const results = Object.entries(skillDemand)
      .map(([skill, demand]) => ({
        skill,
        demand,
      }))
      .sort((a, b) => b.demand - a.demand);

    // Calculate total demand
    const totalSkillDemand = results.reduce(
      (total, item) => total + item.demand,
      0
    );

    // Most demanded skill
    const mostDemandedSkill =
      results.length > 0 ? results[0] : null;

    // Number of open internships
    const totalOpenInternships = internships.length;

    res.json({
      success: true,

      analytics: {
        totalOpenInternships,
        totalSkillDemand,
        uniqueSkills: results.length,
        mostDemandedSkill,
      },

      skillDemand: results,
    });
  } catch (error) {
    console.error(
      "Industry skill demand error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch industry skill demand",
    });
  }
};
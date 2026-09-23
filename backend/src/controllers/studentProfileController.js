import prisma from "../config/database.js";

export const getStudentProfile = async (req, res) => {
  try {
    const profile = await prisma.studentProfile.findUnique({
      where: {
        userId: req.user.id,
      },
      include: {
        skills: {
          include: {
            skill: true,
          },
        },
      },
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Student profile not found",
      });
    }

    // Get all assessment results of the logged-in student
    const assessmentResults =
      await prisma.assessmentResult.findMany({
        where: {
          userId: req.user.id,
        },
        include: {
          skill: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

    res.json({
      success: true,
      profile,
      assessmentResults,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch student profile",
    });
  }
};

export const createOrUpdateStudentProfile = async (req, res) => {
  try {
    const {
      education,
      branch,
      graduationYear,
      careerGoal,
      location,
    } = req.body;

    const profile = await prisma.studentProfile.upsert({
      where: {
        userId: req.user.id,
      },
      update: {
        education,
        branch,
        graduationYear: graduationYear
          ? Number(graduationYear)
          : null,
        careerGoal,
        location,
      },
      create: {
        userId: req.user.id,
        education,
        branch,
        graduationYear: graduationYear
          ? Number(graduationYear)
          : null,
        careerGoal,
        location,
      },
    });

    res.json({
      success: true,
      message: "Student profile saved successfully",
      profile,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to save student profile",
    });
  }
};

export const addStudentSkill = async (req, res) => {
  try {
    const { skillId, level } = req.body;

    if (!skillId || !level) {
      return res.status(400).json({
        success: false,
        message: "Skill ID and level are required",
      });
    }

    const profile = await prisma.studentProfile.findUnique({
      where: {
        userId: req.user.id,
      },
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Student profile not found",
      });
    }

    const skill = await prisma.skill.findUnique({
      where: {
        id: Number(skillId),
      },
    });

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    const studentSkill = await prisma.studentSkill.upsert({
      where: {
        profileId_skillId: {
          profileId: profile.id,
          skillId: Number(skillId),
        },
      },
      update: {
        level,
      },
      create: {
        profileId: profile.id,
        skillId: Number(skillId),
        level,
      },
      include: {
        skill: true,
      },
    });

    res.status(201).json({
      success: true,
      message: "Student skill saved successfully",
      studentSkill,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to save student skill",
    });
  }
};
import prisma from "../config/database.js";

export const createIndustryRole = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      experience,
      education,
      requiredSkills,
    } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Role title is required",
      });
    }

    if (
      !Array.isArray(requiredSkills) ||
      requiredSkills.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "At least one required skill is needed",
      });
    }

    const role = await prisma.industryRole.create({
      data: {
        title,
        description,
        location,
        experience: experience
          ? Number(experience)
          : 0,
        education,
        creatorId: req.user.id,

        requiredSkills: {
          create: requiredSkills.map((skill) => ({
            skillId: Number(skill.skillId),
            level: skill.level,
          })),
        },
      },

      include: {
        requiredSkills: {
          include: {
            skill: true,
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      message: "Industry role created successfully",
      role,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create industry role",
    });
  }
};

export const getIndustryRoles = async (req, res) => {
  try {
    const roles = await prisma.industryRole.findMany({
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            role: true,
          },
        },

        requiredSkills: {
          include: {
            skill: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      success: true,
      roles,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch industry roles",
    });
  }
};

export const getIndustryRoleById = async (req, res) => {
  try {
    const role = await prisma.industryRole.findUnique({
      where: {
        id: Number(req.params.id),
      },

      include: {
        creator: {
          select: {
            id: true,
            name: true,
            role: true,
          },
        },

        requiredSkills: {
          include: {
            skill: true,
          },
        },
      },
    });

    if (!role) {
      return res.status(404).json({
        success: false,
        message: "Industry role not found",
      });
    }

    res.json({
      success: true,
      role,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch industry role",
    });
  }
};
import prisma from "../config/database.js";

// Create learning resource
export const createLearningResource = async (req, res) => {
  try {
    const {
      title,
      description,
      type,
      provider,
      url,
      skillId,
    } = req.body;

    if (!title || !skillId) {
      return res.status(400).json({
        success: false,
        message: "Title and skill are required",
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

    const resource = await prisma.learningResource.create({
      data: {
        title,
        description,
        type: type || "COURSE",
        provider,
        url,
        skillId: Number(skillId),
      },
      include: {
        skill: true,
      },
    });

    res.status(201).json({
      success: true,
      message: "Learning resource created successfully",
      resource,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create learning resource",
    });
  }
};

// Get all learning resources
export const getLearningResources = async (req, res) => {
  try {
    const { skillId } = req.query;

    const resources = await prisma.learningResource.findMany({
      where: skillId
        ? {
            skillId: Number(skillId),
          }
        : undefined,

      include: {
        skill: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      success: true,
      resources,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch learning resources",
    });
  }
};

// Get resources for a particular skill
export const getLearningResourcesBySkill = async (
  req,
  res
) => {
  try {
    const skillId = Number(req.params.skillId);

    const resources = await prisma.learningResource.findMany({
      where: {
        skillId,
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
      resources,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch learning resources",
    });
  }
};
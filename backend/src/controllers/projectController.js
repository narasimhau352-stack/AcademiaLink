import prisma from "../config/database.js";

// Create a new project
export const createProject = async (req, res) => {
  try {
    const { title, description, skills } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }

    const project = await prisma.project.create({
      data: {
        title,
        description,
        skills,
        creatorId: req.user.id,
      },
    });

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create project",
    });
  }
};

// Get all projects
export const getProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            role: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      success: true,
      projects,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch projects",
    });
  }
};
export const getProjectById = async (req, res) => {
  try {
    const project = await prisma.project.findUnique({
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
      },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.json({
      success: true,
      project,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch project",
    });
  }
};
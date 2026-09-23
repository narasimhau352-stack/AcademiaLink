import prisma from "../config/database.js";

// Create an internship
export const createInternship = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      duration,
      stipend,
      requiredSkills,
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
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

    const internship = await prisma.internship.create({
      data: {
        title,
        description,
        location,
        duration,
        stipend,
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
      message: "Internship created successfully",
      internship,
    });
  } catch (error) {
    console.error("Create internship error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create internship",
    });
  }
};

// Get all internships
export const getInternships = async (req, res) => {
  try {
    const internships = await prisma.internship.findMany({
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
      internships,
    });
  } catch (error) {
    console.error("Get internships error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch internships",
    });
  }
};

// Get internship by ID
export const getInternshipById = async (req, res) => {
  try {
    const internship = await prisma.internship.findUnique({
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

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found",
      });
    }

    res.json({
      success: true,
      internship,
    });
  } catch (error) {
    console.error("Get internship by ID error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch internship",
    });
  }
};

// Apply for an internship
export const applyForInternship = async (req, res) => {
  try {
    const internshipId = Number(req.params.id);
    const studentId = req.user.id;

    // Check internship exists
    const internship = await prisma.internship.findUnique({
      where: {
        id: internshipId,
      },
    });

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found",
      });
    }

    // Check internship is open
    if (internship.status !== "OPEN") {
      return res.status(400).json({
        success: false,
        message: "This internship is no longer open",
      });
    }

    // Check whether student already applied
    const existingApplication =
      await prisma.internshipApplication.findUnique({
        where: {
          internshipId_studentId: {
            internshipId,
            studentId,
          },
        },
      });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this internship",
      });
    }

    // Create application
    const application =
      await prisma.internshipApplication.create({
        data: {
          internshipId,
          studentId,
          status: "SUBMITTED",
        },
        include: {
          internship: true,
          student: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

    // Notify the industry user who created the internship
    await prisma.notification.create({
      data: {
        userId: internship.creatorId,
        title: "New Internship Application",
        message: `${application.student.name} applied for your internship "${internship.title}".`,
        type: "APPLICATION",
      },
    });

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    console.error("Apply for internship error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to submit application",
    });
  }
};

// Get applications for an internship
export const getInternshipApplications = async (req, res) => {
  try {
    const internshipId = Number(req.params.id);

    const internship = await prisma.internship.findUnique({
      where: {
        id: internshipId,
      },
    });

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found",
      });
    }

    // Only the internship creator can view applicants
    if (internship.creatorId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to view these applications",
      });
    }

    const applications =
      await prisma.internshipApplication.findMany({
        where: {
          internshipId,
        },
        include: {
          student: {
            select: {
              id: true,
              name: true,
              email: true,
              studentProfile: {
                select: {
                  education: true,
                  branch: true,
                  graduationYear: true,
                  careerGoal: true,
                  location: true,
                  skills: {
                    include: {
                      skill: true,
                    },
                  },
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

    res.json({
      success: true,
      applications,
    });
  } catch (error) {
    console.error("Get internship applications error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch internship applications",
    });
  }
};

// Update application status - Industry only
export const updateApplicationStatus = async (req, res) => {
  try {
    const applicationId = Number(req.params.applicationId);
    const { status } = req.body;

    const allowedStatuses = [
      "SUBMITTED",
      "UNDER_REVIEW",
      "SHORTLISTED",
      "INTERVIEW",
      "SELECTED",
      "REJECTED",
    ];

    // Validate status
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application status",
      });
    }

    // Find application
    const application =
      await prisma.internshipApplication.findUnique({
        where: {
          id: applicationId,
        },
        include: {
          internship: true,
          student: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    // Only internship creator can update the application
    if (
      application.internship.creatorId !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message:
          "You are not authorized to update this application",
      });
    }

    // Update status
    const updatedApplication =
      await prisma.internshipApplication.update({
        where: {
          id: applicationId,
        },
        data: {
          status,
        },
        include: {
          internship: true,
          student: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

    // Notify the student about the status change
    await prisma.notification.create({
      data: {
        userId: application.student.id,
        title: "Application Status Updated",
        message: `Your application for "${application.internship.title}" is now ${status.replace(
          "_",
          " "
        )}.`,
        type: "APPLICATION_STATUS",
      },
    });

    res.json({
      success: true,
      message: "Application status updated successfully",
      application: updatedApplication,
    });
  } catch (error) {
    console.error("Update application status error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update application status",
    });
  }
};

// Get student's applications
export const getMyApplications = async (req, res) => {
  try {
    const studentId = req.user.id;

    const applications =
      await prisma.internshipApplication.findMany({
        where: {
          studentId,
        },
        include: {
          internship: {
            include: {
              creator: {
                select: {
                  id: true,
                  name: true,
                  role: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

    res.json({
      success: true,
      applications,
    });
  } catch (error) {
    console.error("Get my applications error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch your applications",
    });
  }
};
import prisma from "../config/database.js";

// Get the logged-in student's complete portfolio
export const getMyPortfolio = async (req, res) => {
  try {
    const studentId = req.user.id;

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

        studentCertifications: {
          orderBy: {
            issueDate: "desc",
          },
        },

        studentExperiences: {
          orderBy: {
            startDate: "desc",
          },
        },

        projects: {
          orderBy: {
            createdAt: "desc",
          },
        },

        assessmentResults: {
          include: {
            skill: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.json({
      success: true,
      portfolio: {
        id: student.id,
        name: student.name,
        email: student.email,

        profile: student.studentProfile,

        certifications:
          student.studentCertifications,

        experiences:
          student.studentExperiences,

        projects: student.projects,

        assessmentResults:
          student.assessmentResults,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch portfolio",
    });
  }
};


// Add a certification
export const addCertification = async (req, res) => {
  try {
    const studentId = req.user.id;

    const {
      title,
      issuer,
      issueDate,
      credentialUrl,
    } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Certification title is required",
      });
    }

    const certification =
      await prisma.studentCertification.create({
        data: {
          studentId,
          title,
          issuer: issuer || null,
          issueDate: issueDate
            ? new Date(issueDate)
            : null,
          credentialUrl: credentialUrl || null,
        },
      });

    res.status(201).json({
      success: true,
      message: "Certification added successfully",
      certification,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to add certification",
    });
  }
};


// Add experience
export const addExperience = async (req, res) => {
  try {
    const studentId = req.user.id;

    const {
      company,
      role,
      description,
      startDate,
      endDate,
      isCurrent,
    } = req.body;

    if (!company || !role) {
      return res.status(400).json({
        success: false,
        message: "Company and role are required",
      });
    }

    const experience =
      await prisma.studentExperience.create({
        data: {
          studentId,
          company,
          role,
          description: description || null,
          startDate: startDate
            ? new Date(startDate)
            : null,
          endDate: endDate
            ? new Date(endDate)
            : null,
          isCurrent: Boolean(isCurrent),
        },
      });

    res.status(201).json({
      success: true,
      message: "Experience added successfully",
      experience,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to add experience",
    });
  }
};


// Delete certification
export const deleteCertification = async (req, res) => {
  try {
    const studentId = req.user.id;
    const certificationId = Number(req.params.id);

    const certification =
      await prisma.studentCertification.findFirst({
        where: {
          id: certificationId,
          studentId,
        },
      });

    if (!certification) {
      return res.status(404).json({
        success: false,
        message: "Certification not found",
      });
    }

    await prisma.studentCertification.delete({
      where: {
        id: certificationId,
      },
    });

    res.json({
      success: true,
      message: "Certification deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete certification",
    });
  }
};


// Delete experience
export const deleteExperience = async (req, res) => {
  try {
    const studentId = req.user.id;
    const experienceId = Number(req.params.id);

    const experience =
      await prisma.studentExperience.findFirst({
        where: {
          id: experienceId,
          studentId,
        },
      });

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found",
      });
    }

    await prisma.studentExperience.delete({
      where: {
        id: experienceId,
      },
    });

    res.json({
      success: true,
      message: "Experience deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete experience",
    });
  }
};
// Get a student's public portfolio
export const getPublicPortfolio = async (req, res) => {
  try {
    const studentId = Number(req.params.studentId);

    if (!studentId) {
      return res.status(400).json({
        success: false,
        message: "Invalid student ID",
      });
    }

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

        studentCertifications: {
          orderBy: {
            issueDate: "desc",
          },
        },

        studentExperiences: {
          orderBy: {
            startDate: "desc",
          },
        },

        projects: {
          orderBy: {
            createdAt: "desc",
          },
        },

        assessmentResults: {
          include: {
            skill: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!student || student.role !== "STUDENT") {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // Check whether the student has enabled public sharing
    if (
      !student.studentProfile ||
      !student.studentProfile.isPortfolioPublic
    ) {
      return res.status(403).json({
        success: false,
        message: "This portfolio is not publicly shared",
      });
    }

    res.json({
      success: true,
      portfolio: {
        id: student.id,
        name: student.name,

        profile: student.studentProfile,

        certifications:
          student.studentCertifications,

        experiences:
          student.studentExperiences,

        projects:
          student.projects,

        assessmentResults:
          student.assessmentResults,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch public portfolio",
    });
  }
};
// Enable or disable public portfolio sharing
export const togglePortfolioSharing = async (req, res) => {
  try {
    const studentId = req.user.id;

    const { isPortfolioPublic } = req.body;

    if (typeof isPortfolioPublic !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "isPortfolioPublic must be true or false",
      });
    }

    const profile = await prisma.studentProfile.findUnique({
      where: {
        userId: studentId,
      },
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Student profile not found",
      });
    }

    const updatedProfile = await prisma.studentProfile.update({
      where: {
        userId: studentId,
      },
      data: {
        isPortfolioPublic,
      },
    });

    res.json({
      success: true,
      message: isPortfolioPublic
        ? "Portfolio sharing enabled"
        : "Portfolio sharing disabled",
      isPortfolioPublic:
        updatedProfile.isPortfolioPublic,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update portfolio sharing",
    });
  }
};
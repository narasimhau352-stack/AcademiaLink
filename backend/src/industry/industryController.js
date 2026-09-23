import prisma from "../config/database.js";

// Get Industry Dashboard statistics
export const getIndustryStats = async (req, res) => {
  try {
    const industryId = req.user.id;

    // Total internships posted by this industry
    const totalInternships =
      await prisma.internship.count({
        where: {
          creatorId: industryId,
        },
      });

    // Currently open internships
    const openInternships =
      await prisma.internship.count({
        where: {
          creatorId: industryId,
          status: "OPEN",
        },
      });

    // Total applications received
    const totalApplications =
      await prisma.internshipApplication.count({
        where: {
          internship: {
            creatorId: industryId,
          },
        },
      });

    // Selected candidates
    const selectedCandidates =
      await prisma.internshipApplication.count({
        where: {
          status: "SELECTED",
          internship: {
            creatorId: industryId,
          },
        },
      });

    // Shortlisted candidates
    const shortlistedCandidates =
      await prisma.internshipApplication.count({
        where: {
          status: "SHORTLISTED",
          internship: {
            creatorId: industryId,
          },
        },
      });

    // Recent applications
    const recentApplications =
      await prisma.internshipApplication.findMany({
        where: {
          internship: {
            creatorId: industryId,
          },
        },
        include: {
          student: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          internship: {
            select: {
              id: true,
              title: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 5,
      });

    res.json({
      success: true,

      stats: {
        totalInternships,
        openInternships,
        totalApplications,
        shortlistedCandidates,
        selectedCandidates,
      },

      recentApplications,
    });
  } catch (error) {
    console.error(
      "Industry dashboard error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch industry dashboard data",
    });
  }
};
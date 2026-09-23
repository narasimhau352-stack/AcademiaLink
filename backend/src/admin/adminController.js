import prisma from "../config/database.js";

export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await prisma.user.count();

    const students = await prisma.user.count({
      where: {
        role: "STUDENT",
      },
    });

    const faculty = await prisma.user.count({
      where: {
        role: "FACULTY",
      },
    });

    const industry = await prisma.user.count({
      where: {
        role: "INDUSTRY",
      },
    });

    const internships = await prisma.internship.count();

    const applications =
      await prisma.internshipApplication.count();

    const projects = await prisma.project.count();

    res.json({
      success: true,
      stats: {
        totalUsers,
        students,
        faculty,
        industry,
        internships,
        applications,
        projects,
      },
    });
  } catch (error) {
    console.error("Admin stats error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch admin statistics",
    });
  }
};

// Get all users for Admin User Management
export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Get users error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};
export const toggleUserStatus = async (req, res) => {
  try {
    const userId = Number(req.params.id);

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Prevent admin from deactivating their own account
    if (user.id === req.user.id) {
      return res.status(400).json({
        success: false,
        message: "You cannot deactivate your own account",
      });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        isActive: !user.isActive,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });

    res.json({
      success: true,
      message: updatedUser.isActive
        ? "User activated successfully"
        : "User deactivated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Toggle user status error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update user status",
    });
  }
};
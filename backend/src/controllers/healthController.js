import prisma from "../config/database.js";

export const getHealth = async (req, res) => {
  try {
    const userCount = await prisma.user.count();

    res.json({
      success: true,
      message: "AcademiaLink backend is healthy",
      users: userCount,
    });
  } catch (error) {
    console.error("Health check error:", error);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
};
import jwt from "jsonwebtoken";
import prisma from "../config/database.js";

const JWT_SECRET =
  process.env.JWT_SECRET || "academialink_dev_secret_change_later";

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check Authorization header
    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        success: false,
        message: "Authentication token is required",
      });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication token is required",
      });
    }

    // Verify JWT
    const decoded = jwt.verify(token, JWT_SECRET);

    // Validate user ID from token
    if (!decoded.id) {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication token",
      });
    }

    // Check current user in database
    const user = await prisma.user.findUnique({
      where: {
        id: Number(decoded.id),
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
      },
    });

    // User no longer exists
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User account not found",
      });
    }

    // User has been deactivated by Admin
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Your account has been deactivated",
      });
    }

    // Use current database role instead of trusting
    // the role stored inside the JWT
    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (error) {
    console.error(
      "Authentication error:",
      error.message
    );

    return res.status(401).json({
      success: false,
      message: "Invalid or expired authentication token",
    });
  }
};
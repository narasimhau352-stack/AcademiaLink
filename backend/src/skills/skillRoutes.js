import { Router } from "express";
import prisma from "../config/database.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = Router();

// Get all skills
router.get("/", authenticate, async (req, res) => {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: {
        name: "asc",
      },
    });

    res.json({
      success: true,
      skills,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch skills",
    });
  }
});

// Create a skill
router.post("/", authenticate, async (req, res) => {
  try {
    const { name, category } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Skill name is required",
      });
    }

    const skill = await prisma.skill.create({
      data: {
        name,
        category,
      },
    });

    res.status(201).json({
      success: true,
      message: "Skill created successfully",
      skill,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create skill",
    });
  }
});

export default router;
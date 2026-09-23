import { Router } from "express";
import {
  createProject,
  getProjects,
  getProjectById,
} from "../controllers/projectController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
const router = Router();

// View all projects
router.get("/", getProjects);
router.get("/:id", getProjectById);
// Create a project - login required
router.post(
  "/",
  authenticate,
  authorizeRoles("FACULTY", "INDUSTRY"),
  createProject
);
export default router;
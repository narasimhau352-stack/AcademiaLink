import { Router } from "express";

import {
  createLearningResource,
  getLearningResources,
  getLearningResourcesBySkill,
} from "./learningResourceController.js";

import { authenticate } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = Router();

// Get all learning resources
router.get(
  "/",
  authenticate,
  getLearningResources
);

// Get resources for one skill
router.get(
  "/skill/:skillId",
  authenticate,
  getLearningResourcesBySkill
);

// Create learning resource
router.post(
  "/",
  authenticate,
  authorizeRoles("ADMIN", "FACULTY"),
  createLearningResource
);

export default router;
import { Router } from "express";

import {
  getRecommendedInternships,
} from "./matchingController.js";

import { authenticate } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = Router();

// Get smart internship recommendations - Student only
router.get(
  "/recommendations",
  authenticate,
  authorizeRoles("STUDENT"),
  getRecommendedInternships
);

export default router;
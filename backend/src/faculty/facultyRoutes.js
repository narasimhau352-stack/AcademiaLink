import { Router } from "express";

import {
  getIndustrySkillDemand,
} from "./facultyController.js";

import { authenticate } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = Router();

// Get industry skill demand - Faculty only
router.get(
  "/skill-demand",
  authenticate,
  authorizeRoles("FACULTY"),
  getIndustrySkillDemand
);

export default router;
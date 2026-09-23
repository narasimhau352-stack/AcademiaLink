import { Router } from "express";

import {
  getIndustryStats,
} from "./industryController.js";

import { authenticate } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = Router();

router.get(
  "/stats",
  authenticate,
  authorizeRoles("INDUSTRY"),
  getIndustryStats
);

export default router;
import { Router } from "express";

import {
  createIndustryRole,
  getIndustryRoles,
  getIndustryRoleById,
} from "./industryRoleController.js";

import { authenticate } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = Router();

router.get(
  "/",
  authenticate,
  getIndustryRoles
);

router.get(
  "/:id",
  authenticate,
  getIndustryRoleById
);

router.post(
  "/",
  authenticate,
  authorizeRoles("INDUSTRY"),
  createIndustryRole
);

export default router;
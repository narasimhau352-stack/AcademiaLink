import { Router } from "express";

import {
  getAdminStats,
  getAllUsers,
  toggleUserStatus,
} from "./adminController.js";

import { authenticate } from "../middleware/authMiddleware.js";

import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = Router();

// Admin Dashboard Statistics
router.get(
  "/stats",
  authenticate,
  authorizeRoles("ADMIN"),
  getAdminStats
);

// Admin User Management
router.get(
  "/users",
  authenticate,
  authorizeRoles("ADMIN"),
  getAllUsers
);
router.patch(
  "/users/:id/status",
  authenticate,
  authorizeRoles("ADMIN"),
  toggleUserStatus
);
export default router;
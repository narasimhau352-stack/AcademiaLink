import { Router } from "express";

import {
  createInternship,
  getInternships,
  getInternshipById,
  applyForInternship,
  getInternshipApplications,
  updateApplicationStatus,
  getMyApplications,
} from "./internshipController.js";

import { authenticate } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = Router();

// Get all internships
router.get(
  "/",
  authenticate,
  getInternships
);

// Apply for internship - Student only
router.post(
  "/:id/apply",
  authenticate,
  authorizeRoles("STUDENT"),
  applyForInternship
);
// Get student's applications - Student only
router.get(
  "/my-applications",
  authenticate,
  authorizeRoles("STUDENT"),
  getMyApplications
);
// Get applications - Industry only
router.get(
  "/:id/applications",
  authenticate,
  authorizeRoles("INDUSTRY"),
  getInternshipApplications
);
// Update application status - Industry only
router.patch(
  "/applications/:applicationId/status",
  authenticate,
  authorizeRoles("INDUSTRY"),
  updateApplicationStatus
);
// Get internship by ID
router.get(
  "/:id",
  authenticate,
  getInternshipById
);

// Create internship - Industry only
router.post(
  "/",
  authenticate,
  authorizeRoles("INDUSTRY"),
  createInternship
);

export default router;
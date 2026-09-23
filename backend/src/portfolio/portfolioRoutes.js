import { Router } from "express";

import {
  getMyPortfolio,
  getPublicPortfolio,
  togglePortfolioSharing,
  addCertification,
  addExperience,
  deleteCertification,
  deleteExperience,
} from "./portfolioController.js";

import { authenticate } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = Router();
// Get public student portfolio
router.get(
  "/public/:studentId",
  getPublicPortfolio
);
// Get logged-in student's portfolio
router.get(
  "/me",
  authenticate,
  authorizeRoles("STUDENT"),
  getMyPortfolio
);
// Enable or disable public portfolio sharing
router.patch(
  "/sharing",
  authenticate,
  authorizeRoles("STUDENT"),
  togglePortfolioSharing
);
// Add certification
router.post(
  "/certifications",
  authenticate,
  authorizeRoles("STUDENT"),
  addCertification
);

// Add experience
router.post(
  "/experiences",
  authenticate,
  authorizeRoles("STUDENT"),
  addExperience
);

// Delete certification
router.delete(
  "/certifications/:id",
  authenticate,
  authorizeRoles("STUDENT"),
  deleteCertification
);

// Delete experience
router.delete(
  "/experiences/:id",
  authenticate,
  authorizeRoles("STUDENT"),
  deleteExperience
);

export default router;
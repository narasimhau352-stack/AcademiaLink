import { Router } from "express";
import {
  getStudentProfile,
  createOrUpdateStudentProfile,
  addStudentSkill,
} from "../controllers/studentProfileController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = Router();

router.get(
  "/",
  authenticate,
  authorizeRoles("STUDENT"),
  getStudentProfile
);

router.post(
  "/",
  authenticate,
  authorizeRoles("STUDENT"),
  createOrUpdateStudentProfile
);

router.post(
  "/skills",
  authenticate,
  authorizeRoles("STUDENT"),
  addStudentSkill
);

export default router;
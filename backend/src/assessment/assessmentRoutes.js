import { Router } from "express";
import {
  getQuestions,
  submitAssessment,
} from "./assessmentController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = Router();

router.get(
  "/questions",
  authenticate,
  getQuestions
);

router.post(
  "/submit",
  authenticate,
  submitAssessment
);

export default router;

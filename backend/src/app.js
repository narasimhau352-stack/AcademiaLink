import express from "express";
import cors from "cors";
import healthRoutes from "./routes/healthRoutes.js";
import authRoutes from "./auth/authRoutes.js";
import projectRoutes from "./projects/projectRoutes.js";
import studentProfileRoutes from "./studentProfile/studentProfileRoutes.js";
import skillRoutes from "./skills/skillRoutes.js";
import assessmentRoutes from "./assessment/assessmentRoutes.js";
import industryRoleRoutes from "./industryRole/industryRoleRoutes.js";
import learningResourceRoutes from "./learningResource/learningResourceRoutes.js";
import internshipRoutes from "./internship/internshipRoutes.js";
import matchingRoutes from "./matching/matchingRoutes.js";
import facultyRoutes from "./faculty/facultyRoutes.js";
import portfolioRoutes from "./portfolio/portfolioRoutes.js";
import adminRoutes from "./admin/adminRoutes.js";
import notificationRoutes from "./notification/notificationRoutes.js";
import industryRoutes from "./industry/industryRoutes.js";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/student-profile", studentProfileRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/assessment", assessmentRoutes);
app.use("/api/industry-roles", industryRoleRoutes);
app.use("/api/learning-resources", learningResourceRoutes);
app.use("/api/internships", internshipRoutes);
app.use("/api/matching", matchingRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/industry", industryRoutes);

export default app;
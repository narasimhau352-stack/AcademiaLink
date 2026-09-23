import { BrowserRouter, Routes, Route } from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

// Public pages
import Home from "./pages/Home";
import About from "./pages/About";
import Features from "./pages/Features";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import PublicPortfolio from "./pages/PublicPortfolio";

// General authenticated pages
import Dashboard from "./pages/Dashboard";
import StudentProfile from "./pages/StudentProfile";
import SkillAssessment from "./pages/SkillAssessment";
import LearningRecommendations from "./pages/LearningRecommendations";
import SmartRecommendations from "./pages/SmartRecommendations";
import Settings from "./pages/Settings";

// Project pages
import CreateProject from "./pages/CreateProject";

// Industry role pages
import IndustryRoleCreate from "./pages/IndustryRoleCreate";
import IndustryRoleList from "./pages/IndustryRoleList";
import IndustryRoleDetails from "./pages/IndustryRoleDetails";

// Internship pages
import InternshipCreate from "./pages/InternshipCreate";
import InternshipList from "./pages/InternshipList";
import InternshipDetails from "./pages/InternshipDetails";
import InternshipApplications from "./pages/InternshipApplications";
import MyApplications from "./pages/MyApplications";

// Dashboards
import FacultyDashboard from "./pages/FacultyDashboard";
import IndustryDashboard from "./pages/IndustryDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";

// Portfolio
import StudentPortfolio from "./pages/StudentPortfolio";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ======================================================
            PUBLIC LAYOUT
        ======================================================= */}

        <Route element={<PublicLayout />}>

          {/* PUBLIC */}

          <Route path="/" element={<Home />} />

          <Route path="/about" element={<About />} />

          <Route path="/features" element={<Features />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/projects" element={<Projects />} />

          <Route
            path="/projects/:id"
            element={<ProjectDetails />}
          />

          <Route
            path="/public-portfolio/:studentId"
            element={<PublicPortfolio />}
          />

          {/* ====================================================
              GENERAL AUTHENTICATED
          ===================================================== */}

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/student-profile"
            element={
              <ProtectedRoute>
                <StudentProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />

          <Route
            path="/skill-assessment"
            element={
              <ProtectedRoute roles={["STUDENT"]}>
                <SkillAssessment />
              </ProtectedRoute>
            }
          />

          <Route
            path="/learning-recommendations"
            element={
              <ProtectedRoute>
                <LearningRecommendations />
              </ProtectedRoute>
            }
          />

          <Route
            path="/smart-recommendations"
            element={
              <ProtectedRoute>
                <SmartRecommendations />
              </ProtectedRoute>
            }
          />

          {/* ====================================================
              PROJECTS
          ===================================================== */}

          <Route
            path="/projects/create"
            element={
              <ProtectedRoute>
                <CreateProject />
              </ProtectedRoute>
            }
          />

          {/* ====================================================
              INDUSTRY ROLES
          ===================================================== */}

          <Route
            path="/industry-roles/create"
            element={
              <ProtectedRoute>
                <IndustryRoleCreate />
              </ProtectedRoute>
            }
          />

          <Route
            path="/industry-roles"
            element={
              <ProtectedRoute>
                <IndustryRoleList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/industry-roles/:id"
            element={
              <ProtectedRoute>
                <IndustryRoleDetails />
              </ProtectedRoute>
            }
          />

          {/* ====================================================
              INTERNSHIPS
          ===================================================== */}

          <Route
            path="/internships/create"
            element={
              <ProtectedRoute>
                <InternshipCreate />
              </ProtectedRoute>
            }
          />

          <Route
            path="/internships"
            element={
              <ProtectedRoute>
                <InternshipList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/internships/:id"
            element={
              <ProtectedRoute>
                <InternshipDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/internships/:id/applications"
            element={
              <ProtectedRoute>
                <InternshipApplications />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-applications"
            element={
              <ProtectedRoute>
                <MyApplications />
              </ProtectedRoute>
            }
          />

          {/* ====================================================
              FACULTY
          ===================================================== */}

          <Route
            path="/faculty-dashboard"
            element={
              <ProtectedRoute>
                <FacultyDashboard />
              </ProtectedRoute>
            }
          />

          {/* ====================================================
              INDUSTRY
          ===================================================== */}

          <Route
            path="/industry-dashboard"
            element={
              <ProtectedRoute roles={["INDUSTRY"]}>
                <IndustryDashboard />
              </ProtectedRoute>
            }
          />

          {/* ====================================================
              PORTFOLIO
          ===================================================== */}

          <Route
            path="/portfolio"
            element={
              <ProtectedRoute>
                <StudentPortfolio />
              </ProtectedRoute>
            }
          />

          {/* ====================================================
              ADMIN
          ===================================================== */}

          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute roles={["ADMIN"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin-users"
            element={
              <ProtectedRoute roles={["ADMIN"]}>
                <AdminUsers />
              </ProtectedRoute>
            }
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
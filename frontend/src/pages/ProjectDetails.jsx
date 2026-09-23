import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  User,
  ShieldCheck,
  Code2,
  AlertCircle,
  Loader2,
  CheckCircle2,
} from "lucide-react";

import api from "../services/api";
import { Card, Button, SkillChip } from "../components/ui";

function ProjectDetails() {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await api.get(`/projects/${id}`);
        setProject(response.data.project);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load project."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  /* ============================================================
     LOADING
  ============================================================ */

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-page">
        <div className="flex items-center gap-3 text-sm text-body">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          Loading project...
        </div>
      </div>
    );
  }

  /* ============================================================
     ERROR
  ============================================================ */

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-page px-4">
        <Card className="w-full max-w-lg p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-danger/10 text-danger">
            <AlertCircle className="h-8 w-8" />
          </div>

          <h2 className="mt-5 font-display text-2xl font-bold text-heading">
            Unable to Load Project
          </h2>

          <p className="mt-3 text-sm leading-6 text-body">
            {error}
          </p>

          <Link
            to="/projects"
            className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
        </Card>
      </div>
    );
  }

  if (!project) {
    return null;
  }

  const status = project.status || "UNKNOWN";
  const normalizedStatus = status.toUpperCase();

  const statusType =
    normalizedStatus === "OPEN"
      ? "verified"
      : normalizedStatus === "COMPLETED"
      ? "neutral"
      : "gap";

  return (
    <div className="min-h-screen bg-page">

      {/* ========================================================
          PAGE HEADER
      ========================================================= */}

      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">

          <Link
            to="/projects"
            className="inline-flex items-center text-sm font-medium text-body transition-colors hover:text-primary"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>

        </div>
      </section>

      {/* ========================================================
          MAIN CONTENT
      ========================================================= */}

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:py-10">

        {/* ======================================================
            PROJECT HERO
        ======================================================= */}

        <Card className="overflow-hidden p-0">

          <div className="bg-primary px-6 py-8 text-white sm:px-8 sm:py-10">

            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">

              <div className="flex items-start gap-4">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/10">
                  <BriefcaseBusiness className="h-7 w-7" />
                </div>

                <div>

                  <div className="mb-2 flex items-center gap-2 text-xs font-medium text-white/70">
                    <span>AcademiaLink Project</span>
                  </div>

                  <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                    {project.title}
                  </h1>

                  <div className="mt-3 flex items-center gap-2 text-sm text-white/80">

                    <User className="h-4 w-4" />

                    Created by{" "}
                    <span className="font-semibold text-white">
                      {project.creator?.name || "Unknown creator"}
                    </span>

                  </div>

                </div>

              </div>

              <SkillChip
                skill={status}
                type={statusType}
              />

            </div>

          </div>

          {/* ====================================================
              PROJECT DESCRIPTION
          ===================================================== */}

          <div className="p-6 sm:p-8">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <BriefcaseBusiness className="h-5 w-5" />
              </div>

              <div>

                <h2 className="font-display text-xl font-bold text-heading">
                  Project Description
                </h2>

                <p className="mt-1 text-xs text-body">
                  Overview of the project and its objectives
                </p>

              </div>

            </div>

            <div className="mt-5 rounded-lg border border-border bg-page p-5">

              <p className="whitespace-pre-line text-sm leading-7 text-heading">
                {project.description || "No description available."}
              </p>

            </div>

          </div>

        </Card>

        {/* ======================================================
            REQUIRED SKILLS
        ======================================================= */}

        {project.skills && (
          <Card className="mt-6 p-6 sm:p-8">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet/10 text-violet">
                <Code2 className="h-5 w-5" />
              </div>

              <div>

                <h2 className="font-display text-xl font-bold text-heading">
                  Required Skills
                </h2>

                <p className="mt-1 text-xs text-body">
                  Skills associated with this project
                </p>

              </div>

            </div>

            <div className="mt-5 rounded-lg border border-primary/10 bg-primary/5 p-5">

              <p className="text-sm leading-6 text-heading">
                {project.skills}
              </p>

            </div>

          </Card>
        )}

        {/* ======================================================
            PROJECT INFORMATION
        ======================================================= */}

        <Card className="mt-6 p-6 sm:p-8">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10 text-success">
              <ShieldCheck className="h-5 w-5" />
            </div>

            <div>

              <h2 className="font-display text-xl font-bold text-heading">
                Project Information
              </h2>

              <p className="mt-1 text-xs text-body">
                Details about the project creator
              </p>

            </div>

          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">

            <InfoCard
              icon={<User className="h-5 w-5" />}
              label="Created By"
              value={project.creator?.name || "Not specified"}
            />

            <InfoCard
              icon={<ShieldCheck className="h-5 w-5" />}
              label="Creator Role"
              value={project.creator?.role || "Not specified"}
            />

          </div>

        </Card>

        {/* ======================================================
            ACTION
        ======================================================= */}

        <div className="mt-6 flex justify-center pb-8">

          <Link to="/projects">

            <Button variant="secondary">

              <ArrowLeft className="mr-2 h-4 w-4" />

              Back to Projects

              <ArrowRight className="ml-2 h-4 w-4" />

            </Button>

          </Link>

        </div>

      </main>

    </div>
  );
}

/* ============================================================
   INFO CARD
============================================================ */

function InfoCard({
  icon,
  label,
  value,
}) {
  return (
    <div className="rounded-lg border border-border bg-page p-5">

      <div className="flex items-start gap-3">

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white text-primary shadow-card">
          {icon}
        </div>

        <div className="min-w-0">

          <p className="text-xs font-semibold uppercase tracking-wider text-body">
            {label}
          </p>

          <p className="mt-2 break-words text-sm font-semibold text-heading">
            {value}
          </p>

        </div>

      </div>

    </div>
  );
}

export default ProjectDetails;
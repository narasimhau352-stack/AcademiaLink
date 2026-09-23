import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BriefcaseBusiness,
  ArrowRight,
  Plus,
  FolderKanban,
  User,
  ShieldCheck,
  AlertCircle,
  Loader2,
} from "lucide-react";

import api from "../services/api";
import { Card, Button, SkillChip } from "../components/ui";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get("/projects");
        setProjects(response.data.projects);
      } catch (err) {
        setError("Failed to load projects.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-page">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <section className="border-b border-border bg-white">

        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">

          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

            <div>

              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary">
                <FolderKanban className="h-4 w-4" />
                Project Hub
              </div>

              <h1 className="font-display text-3xl font-bold tracking-tight text-heading sm:text-4xl">
                Projects
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-body sm:text-base">
                Discover academic and industry projects on
                AcademiaLink and explore opportunities to collaborate
                on real-world problems.
              </p>

            </div>

            <Link to="/projects/create">
              <Button className="w-full md:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                Create Project
              </Button>
            </Link>

          </div>

        </div>

      </section>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">

        {/* Loading */}

        {loading && (
          <div className="flex min-h-48 items-center justify-center">

            <div className="flex items-center gap-3 text-sm text-body">

              <Loader2 className="h-5 w-5 animate-spin text-primary" />

              Loading projects...

            </div>

          </div>
        )}

        {/* Error */}

        {error && !loading && (
          <div className="rounded-lg border border-danger/20 bg-danger/5 px-5 py-4">

            <div className="flex items-start gap-3">

              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-danger" />

              <div>

                <p className="text-sm font-semibold text-danger">
                  Unable to load projects
                </p>

                <p className="mt-1 text-sm text-danger/80">
                  {error}
                </p>

              </div>

            </div>

          </div>
        )}

        {/* Empty state */}

        {!loading && !error && projects.length === 0 && (
          <Card className="py-14 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 text-primary">

              <BriefcaseBusiness className="h-8 w-8" />

            </div>

            <h2 className="mt-5 font-display text-xl font-bold text-heading">
              No Projects Available
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-body">
              There are no projects available yet. Create a project
              to start collaborating with the AcademiaLink ecosystem.
            </p>

            <Link
              to="/projects/create"
              className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Project
            </Link>

          </Card>
        )}

        {/* Project grid */}

        {!loading && !error && projects.length > 0 && (
          <>
            <div className="mb-6 flex items-center justify-between">

              <div>
                <p className="text-sm font-semibold text-heading">
                  Available Projects
                </p>

                <p className="mt-1 text-xs text-body">
                  {projects.length}{" "}
                  {projects.length === 1 ? "project" : "projects"}{" "}
                  available
                </p>
              </div>

            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                />
              ))}

            </div>
          </>
        )}

      </main>

    </div>
  );
}

/* ============================================================
   PROJECT CARD
============================================================ */

function ProjectCard({ project }) {
  const status = project.status || "UNKNOWN";

  const normalizedStatus = status.toUpperCase();

  const statusType =
    normalizedStatus === "OPEN"
      ? "verified"
      : normalizedStatus === "COMPLETED"
      ? "neutral"
      : "gap";

  return (
    <Link
      to={`/projects/${project.id}`}
      className="group block"
    >

      <Card
        hover
        className="flex h-full flex-col p-6"
      >

        {/* Header */}

        <div className="flex items-start justify-between gap-4">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">

            <BriefcaseBusiness className="h-5 w-5" />

          </div>

          <SkillChip
            skill={status}
            type={statusType}
          />

        </div>

        {/* Title */}

        <h2 className="mt-5 line-clamp-2 text-xl font-bold text-heading transition-colors group-hover:text-primary">
          {project.title}
        </h2>

        {/* Description */}

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-body">
          {project.description}
        </p>

        {/* Skills */}

        {project.skills && (
          <div className="mt-5">

            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-body">
              Skills
            </p>

            <div className="rounded-md bg-page px-3 py-2.5">

              <p className="line-clamp-2 text-xs leading-5 text-heading">
                {project.skills}
              </p>

            </div>

          </div>
        )}

        {/* Creator */}

        <div className="mt-auto pt-5">

          <div className="border-t border-border pt-4">

            <div className="flex items-center gap-2">

              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-page text-body">

                <User className="h-4 w-4" />

              </div>

              <div className="min-w-0">

                <p className="truncate text-xs font-semibold text-heading">
                  {project.creator?.name || "Unknown creator"}
                </p>

                <p className="text-xs text-body">
                  {project.creator?.role || "Participant"}
                </p>

              </div>

            </div>

            <div className="mt-4 flex items-center justify-between">

              <span className="inline-flex items-center gap-1.5 text-xs text-success">

                <ShieldCheck className="h-3.5 w-3.5" />

                AcademiaLink Project

              </span>

              <span className="inline-flex items-center text-xs font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">

                View
                <ArrowRight className="ml-1 h-3.5 w-3.5" />

              </span>

            </div>

          </div>

        </div>

      </Card>

    </Link>
  );
}

export default Projects;
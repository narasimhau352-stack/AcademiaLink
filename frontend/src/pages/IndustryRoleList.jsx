import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BriefcaseBusiness,
  MapPin,
  GraduationCap,
  Clock3,
  Users,
  Plus,
  ArrowRight,
  AlertTriangle,
  Sparkles,
} from "lucide-react";

import api from "../services/api";
import { Card, SkillChip } from "../components/ui";

function IndustryRoleList() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await api.get("/industry-roles");

        setRoles(response.data.roles || []);
      } catch (error) {
        console.error(error);

        setMessage(
          error.response?.data?.message ||
            "Failed to load industry roles"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-10">
        <Card className="p-10 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50">
            <BriefcaseBusiness className="h-7 w-7 text-primary" />
          </div>

          <h2 className="mt-5 font-display text-xl font-semibold text-heading">
            Loading industry roles
          </h2>

          <p className="mt-2 text-sm text-body">
            Fetching current industry requirements...
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-primary">
            <BriefcaseBusiness className="h-3.5 w-3.5" />
            INDUSTRY SKILLS
          </div>

          <h1 className="mt-3 font-display text-3xl font-bold text-heading">
            Industry Roles
          </h1>

          <p className="mt-2 max-w-2xl text-body">
            Explore industry roles and understand the skills,
            education, and experience employers require.
          </p>
        </div>

        <Link
          to="/industry-roles/create"
          className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
        >
          <Plus className="h-4 w-4" />
          Create Role
        </Link>
      </div>

      {/* Error */}
      {message && (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-rose-200 bg-rose-50 p-4 text-danger">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />

          <div>
            <p className="font-semibold">
              Something went wrong
            </p>

            <p className="mt-1 text-sm">
              {message}
            </p>
          </div>
        </div>
      )}

      {/* Summary */}
      {roles.length > 0 && (
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="p-5">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-50">
                <BriefcaseBusiness className="h-5 w-5 text-primary" />
              </div>

              <div>
                <p className="text-sm text-body">
                  Available Roles
                </p>

                <p className="mt-1 font-display text-2xl font-bold text-heading">
                  {roles.length}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-violet-50">
                <Sparkles className="h-5 w-5 text-violet" />
              </div>

              <div>
                <p className="text-sm text-body">
                  Skill Mapping
                </p>

                <p className="mt-1 font-display text-lg font-bold text-heading">
                  Industry Ready
                </p>
              </div>
            </div>
          </Card>

          <Card className="hidden p-5 lg:block">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-50">
                <Users className="h-5 w-5 text-success" />
              </div>

              <div>
                <p className="text-sm text-body">
                  Career Discovery
                </p>

                <p className="mt-1 font-display text-lg font-bold text-heading">
                  Explore Opportunities
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Empty State */}
      {roles.length === 0 && !message && (
        <Card className="p-10 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-page">
            <BriefcaseBusiness className="h-8 w-8 text-body" />
          </div>

          <h2 className="mt-5 font-display text-xl font-semibold text-heading">
            No industry roles yet
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm text-body">
            Industry users can create the first role and
            define the skills required by employers.
          </p>

          <Link
            to="/industry-roles/create"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
          >
            <Plus className="h-4 w-4" />
            Create First Role
          </Link>
        </Card>
      )}

      {/* Role Cards */}
      {roles.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {roles.map((role) => (
            <Card
              key={role.id}
              hover
              className="flex h-full flex-col p-6"
            >
              {/* Role Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-indigo-50">
                  <BriefcaseBusiness className="h-6 w-6 text-primary" />
                </div>

                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-primary">
                  Industry Role
                </span>
              </div>

              <h2 className="mt-5 font-display text-xl font-semibold text-heading">
                {role.title}
              </h2>

              {role.description && (
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-body">
                  {role.description}
                </p>
              )}

              {/* Role Information */}
              <div className="mt-5 space-y-3 rounded-lg bg-page p-4">
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 shrink-0 text-primary" />

                  <span className="text-body">
                    Location
                  </span>

                  <span className="ml-auto text-right font-medium text-heading">
                    {role.location || "Not specified"}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <Clock3 className="h-4 w-4 shrink-0 text-primary" />

                  <span className="text-body">
                    Experience
                  </span>

                  <span className="ml-auto font-medium text-heading">
                    {role.experience} years
                  </span>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <GraduationCap className="h-4 w-4 shrink-0 text-primary" />

                  <span className="text-body">
                    Education
                  </span>

                  <span className="ml-auto max-w-[55%] text-right font-medium text-heading">
                    {role.education || "Not specified"}
                  </span>
                </div>
              </div>

              {/* Skills */}
              <div className="mt-6">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-semibold text-heading">
                    Required Skills
                  </h3>

                  <span className="text-xs text-body">
                    {role.requiredSkills?.length || 0} skills
                  </span>
                </div>

                {role.requiredSkills?.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {role.requiredSkills.map(
                      (item) => (
                        <SkillChip
                          key={item.id}
                          skill={`${item.skill?.name} — ${item.level}`}
                          type="neutral"
                        />
                      )
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-body">
                    No specific skills listed.
                  </p>
                )}
              </div>

              {/* Creator */}
              {role.creator && (
                <div className="mt-6 flex items-center gap-2 border-t border-border pt-4">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-border">
                    <Users className="h-3.5 w-3.5 text-heading" />
                  </div>

                  <p className="text-xs text-body">
                    Posted by{" "}
                    <span className="font-medium text-heading">
                      {role.creator.name}
                    </span>
                  </p>
                </div>
              )}

              {/* Details */}
              <Link
                to={`/industry-roles/${role.id}`}
                className="mt-auto flex items-center justify-center gap-2 pt-6"
              >
                <span className="w-full rounded-md border border-primary px-4 py-2.5 text-center text-sm font-semibold text-primary transition hover:bg-indigo-50">
                  View Details
                  <ArrowRight className="ml-2 inline h-4 w-4" />
                </span>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default IndustryRoleList;
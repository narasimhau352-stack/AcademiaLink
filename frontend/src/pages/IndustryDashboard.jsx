import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  BriefcaseBusiness,
  ClipboardList,
  Users,
  UserCheck,
  Trophy,
  Plus,
  ArrowRight,
  Clock3,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  Building2,
} from "lucide-react";

import api from "../services/api";
import { Card, Button } from "../components/ui";

function IndustryDashboard() {
  const [stats, setStats] = useState(null);
  const [recentApplications, setRecentApplications] =
    useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchIndustryDashboard = async () => {
      try {
        const response = await api.get("/industry/stats");

        setStats(response.data.stats || null);

        setRecentApplications(
          response.data.recentApplications || []
        );
      } catch (error) {
        console.error(error);

        setMessage(
          error.response?.data?.message ||
            "Failed to load industry dashboard"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchIndustryDashboard();
  }, []);

  const applicationActivity = useMemo(() => {
    if (!stats) return [];

    return [
      {
        label: "Applications",
        value: stats.totalApplications || 0,
        color: "bg-primary",
      },
      {
        label: "Shortlisted",
        value: stats.shortlistedCandidates || 0,
        color: "bg-violet",
      },
      {
        label: "Selected",
        value: stats.selectedCandidates || 0,
        color: "bg-success",
      },
    ];
  }, [stats]);

  if (loading) {
    return (
      <div className="min-h-screen bg-page">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="animate-pulse">
            <div className="h-4 w-40 rounded bg-border" />
            <div className="mt-4 h-10 w-80 rounded bg-border" />
            <div className="mt-3 h-5 w-[500px] max-w-full rounded bg-border" />

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className="h-32 rounded-lg bg-white"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-page">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-10">

        {/* =====================================================
            HEADER
        ====================================================== */}
        <section className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary to-violet p-6 text-white shadow-card sm:p-8">
          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold">
                <Building2 className="h-3.5 w-3.5" />
                INDUSTRY DASHBOARD
              </div>

              <h1 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Recruitment Overview
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/80 sm:text-base">
                Manage internship opportunities, review applications,
                and track your recruitment activity from one place.
              </p>
            </div>

            <Link to="/internships/create">
              <Button
                variant="secondary"
                className="w-full border-white/20 bg-white text-primary hover:bg-white/90 lg:w-auto"
              >
                <Plus className="mr-2 h-4 w-4" />
                Post Internship
              </Button>
            </Link>
          </div>
        </section>

        {/* =====================================================
            ERROR
        ====================================================== */}
        {message && (
          <div className="mt-6 flex items-start gap-3 rounded-lg border border-danger/20 bg-red-50 p-4 text-danger">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />

            <div>
              <p className="font-semibold">
                Unable to load dashboard
              </p>

              <p className="mt-1 text-sm">
                {message}
              </p>
            </div>
          </div>
        )}

        {!message && (
          <>
            {/* =================================================
                ANALYTICS CARDS
            ================================================== */}
            <section className="mt-8">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-violet">
                    Analytics
                  </p>

                  <h2 className="mt-1 font-display text-xl font-bold text-heading">
                    Recruitment Performance
                  </h2>
                </div>

                <BarChart3 className="hidden h-6 w-6 text-violet sm:block" />
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
                <StatCard
                  title="Total Internships"
                  value={stats?.totalInternships || 0}
                  description="Internships posted"
                  icon={BriefcaseBusiness}
                  iconStyle="bg-indigo-50 text-primary"
                />

                <StatCard
                  title="Open Internships"
                  value={stats?.openInternships || 0}
                  description="Currently active"
                  icon={ClipboardList}
                  iconStyle="bg-violet-50 text-violet"
                />

                <StatCard
                  title="Applications"
                  value={stats?.totalApplications || 0}
                  description="Applications received"
                  icon={Users}
                  iconStyle="bg-blue-50 text-blue-600"
                />

                <StatCard
                  title="Shortlisted"
                  value={stats?.shortlistedCandidates || 0}
                  description="Candidates shortlisted"
                  icon={UserCheck}
                  iconStyle="bg-purple-50 text-purple-600"
                />

                <StatCard
                  title="Selected"
                  value={stats?.selectedCandidates || 0}
                  description="Candidates selected"
                  icon={Trophy}
                  iconStyle="bg-emerald-50 text-success"
                />
              </div>
            </section>

            {/* =================================================
                MAIN CONTENT
            ================================================== */}
            <div className="mt-8 grid gap-6 lg:grid-cols-3">

              {/* Application Activity */}
              <Card className="lg:col-span-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-violet">
                      Overview
                    </p>

                    <h2 className="mt-1 font-display text-lg font-bold text-heading">
                      Application Activity
                    </h2>
                  </div>

                  <div className="rounded-md bg-violet/10 p-2">
                    <BarChart3 className="h-5 w-5 text-violet" />
                  </div>
                </div>

                <div className="mt-7 space-y-6">
                  {applicationActivity.map((item) => {
                    const total =
                      stats?.totalApplications || 0;

                    const percentage =
                      total > 0
                        ? Math.min(
                            (item.value / total) * 100,
                            100
                          )
                        : 0;

                    return (
                      <div key={item.label}>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-heading">
                            {item.label}
                          </span>

                          <span className="text-sm font-bold text-heading">
                            {item.value}
                          </span>
                        </div>

                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-border">
                          <div
                            className={`h-full rounded-full ${item.color} transition-all duration-500`}
                            style={{
                              width: `${percentage}%`,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-7 rounded-md bg-page p-4">
                  <p className="text-xs font-medium text-body">
                    Recruitment pipeline
                  </p>

                  <p className="mt-1 text-sm font-semibold text-heading">
                    Applications → Shortlist → Selection
                  </p>
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="lg:col-span-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                    Manage
                  </p>

                  <h2 className="mt-1 font-display text-lg font-bold text-heading">
                    Quick Actions
                  </h2>

                  <p className="mt-1 text-sm text-body">
                    Access your most important recruitment actions.
                  </p>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <QuickAction
                    icon={Plus}
                    title="Post Internship"
                    description="Create a new internship opportunity."
                    to="/internships/create"
                    primary
                  />

                  <QuickAction
                    icon={ClipboardList}
                    title="View Applications"
                    description="Review candidates who applied to your internships."
                    to="/internships"
                  />

                  <QuickAction
                    icon={BriefcaseBusiness}
                    title="Manage Internships"
                    description="View and manage your internship posts."
                    to="/internships"
                  />

                  <QuickAction
                    icon={Users}
                    title="Recruitment Activity"
                    description="Review your latest candidate applications."
                    to="/internships"
                  />
                </div>
              </Card>
            </div>

            {/* =================================================
                RECENT APPLICATIONS
            ================================================== */}
            <Card className="mt-6">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-violet">
                    Candidate Activity
                  </p>

                  <h2 className="mt-1 font-display text-xl font-bold text-heading">
                    Recent Applications
                  </h2>

                  <p className="mt-1 text-sm text-body">
                    Latest applications received for your internships.
                  </p>
                </div>

                <Link
                  to="/internships"
                  className="inline-flex items-center text-sm font-semibold text-primary transition hover:text-primary-dark"
                >
                  View Applications
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </div>

              {recentApplications.length === 0 ? (
                <div className="mt-6 rounded-lg border border-dashed border-border bg-page p-10 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-card">
                    <Users className="h-6 w-6 text-body" />
                  </div>

                  <h3 className="mt-4 font-semibold text-heading">
                    No applications yet
                  </h3>

                  <p className="mx-auto mt-1 max-w-md text-sm text-body">
                    Applications will appear here when students
                    apply for your internships.
                  </p>

                  <Link
                    to="/internships/create"
                    className="mt-5 inline-flex items-center text-sm font-semibold text-primary hover:text-primary-dark"
                  >
                    Post an Internship
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              ) : (
                <div className="mt-6 overflow-hidden rounded-lg border border-border">
                  <div className="hidden grid-cols-[1.5fr_1.5fr_1fr_0.7fr] gap-4 bg-page px-5 py-3 text-xs font-semibold uppercase tracking-wide text-body md:grid">
                    <span>Candidate</span>
                    <span>Internship</span>
                    <span>Status</span>
                    <span>Action</span>
                  </div>

                  <div className="divide-y divide-border">
                    {recentApplications.map((application) => (
                      <div
                        key={application.id}
                        className="grid gap-4 px-5 py-5 transition hover:bg-page md:grid-cols-[1.5fr_1.5fr_1fr_0.7fr] md:items-center"
                      >
                        {/* Candidate */}
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-violet text-sm font-bold text-white">
                            {(
                              application.student?.name ||
                              "S"
                            )
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div className="min-w-0">
                            <p className="truncate font-semibold text-heading">
                              {application.student?.name ||
                                "Student"}
                            </p>

                            <p className="truncate text-xs text-body">
                              {application.student?.email ||
                                "No email"}
                            </p>
                          </div>
                        </div>

                        {/* Internship */}
                        <div>
                          <p className="text-sm font-medium text-heading">
                            {application.internship?.title ||
                              "Internship"}
                          </p>

                          <div className="mt-1 flex items-center gap-1 text-xs text-body">
                            <Clock3 className="h-3.5 w-3.5" />
                            Recent application
                          </div>
                        </div>

                        {/* Status */}
                        <div>
                          <StatusBadge
                            status={application.status}
                          />
                        </div>

                        {/* Action */}
                        <div>
                          <Link
                            to="/internships"
                            className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary-dark"
                          >
                            View
                            <ArrowRight className="ml-1 h-3.5 w-3.5" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>

            {/* =================================================
                HIRING WORKFLOW
            ================================================== */}
            <section className="mt-6 rounded-xl border border-violet/10 bg-gradient-to-br from-purple-50 via-white to-indigo-50 p-6 sm:p-8">
              <div className="text-center">
                <p className="text-xs font-semibold uppercase tracking-wider text-violet">
                  Recruitment Workflow
                </p>

                <h2 className="mt-2 font-display text-xl font-bold text-heading sm:text-2xl">
                  From Internship Post to Selection
                </h2>

                <p className="mx-auto mt-2 max-w-2xl text-sm text-body">
                  Manage your hiring process through a simple
                  recruitment workflow.
                </p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <WorkflowStep
                  number="1"
                  title="Post"
                  text="Create an internship opportunity."
                />

                <WorkflowStep
                  number="2"
                  title="Receive"
                  text="Get applications from students."
                />

                <WorkflowStep
                  number="3"
                  title="Shortlist"
                  text="Review and shortlist candidates."
                />

                <WorkflowStep
                  number="4"
                  title="Select"
                  text="Choose candidates for the role."
                />
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   STAT CARD
============================================================ */

function StatCard({
  title,
  value,
  description,
  icon: Icon,
  iconStyle,
}) {
  return (
    <Card
      hover
      className="relative overflow-hidden"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-body">
            {title}
          </p>

          <p className="mt-3 font-display text-3xl font-bold text-heading">
            {value}
          </p>

          <p className="mt-1 text-xs text-body">
            {description}
          </p>
        </div>

        <div
          className={`rounded-md p-2.5 ${iconStyle}`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </Card>
  );
}

/* ============================================================
   QUICK ACTION
============================================================ */

function QuickAction({
  icon: Icon,
  title,
  description,
  to,
  primary = false,
}) {
  return (
    <Link
      to={to}
      className={`group rounded-lg border p-5 transition-all duration-200 ${
        primary
          ? "border-primary bg-primary text-white shadow-sm hover:-translate-y-0.5 hover:bg-primary-dark"
          : "border-border bg-white hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-card"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-md ${
            primary
              ? "bg-white/15"
              : "bg-primary/10"
          }`}
        >
          <Icon
            className={`h-5 w-5 ${
              primary
                ? "text-white"
                : "text-primary"
            }`}
          />
        </div>

        <ArrowRight
          className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${
            primary
              ? "text-white/70"
              : "text-body"
          }`}
        />
      </div>

      <h3
        className={`mt-5 font-semibold ${
          primary
            ? "text-white"
            : "text-heading"
        }`}
      >
        {title}
      </h3>

      <p
        className={`mt-2 text-sm leading-5 ${
          primary
            ? "text-white/75"
            : "text-body"
        }`}
      >
        {description}
      </p>

      <p
        className={`mt-4 text-xs font-semibold ${
          primary
            ? "text-white"
            : "text-primary"
        }`}
      >
        Open →
      </p>
    </Link>
  );
}

/* ============================================================
   STATUS BADGE
============================================================ */

function StatusBadge({ status }) {
  const statusStyles = {
    SUBMITTED:
      "bg-blue-50 text-blue-700 border-blue-100",

    UNDER_REVIEW:
      "bg-amber-50 text-amber-700 border-amber-100",

    SHORTLISTED:
      "bg-purple-50 text-purple-700 border-purple-100",

    INTERVIEW:
      "bg-orange-50 text-orange-700 border-orange-100",

    SELECTED:
      "bg-emerald-50 text-emerald-700 border-emerald-100",

    REJECTED:
      "bg-red-50 text-red-700 border-red-100",
  };

  const icons = {
    SUBMITTED: ClipboardList,
    UNDER_REVIEW: Clock3,
    SHORTLISTED: UserCheck,
    INTERVIEW: Users,
    SELECTED: CheckCircle2,
    REJECTED: AlertCircle,
  };

  const Icon = icons[status] || ClipboardList;

  return (
    <span
      className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${
        statusStyles[status] ||
        "border-border bg-page text-heading"
      }`}
    >
      <Icon className="h-3.5 w-3.5" />

      {status?.replaceAll("_", " ") ||
        "UNKNOWN"}
    </span>
  );
}

/* ============================================================
   WORKFLOW STEP
============================================================ */

function WorkflowStep({
  number,
  title,
  text,
}) {
  return (
    <div className="rounded-lg border border-white bg-white p-5 text-center shadow-card">
      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-violet text-sm font-bold text-white">
        {number}
      </div>

      <h3 className="mt-4 font-semibold text-heading">
        {title}
      </h3>

      <p className="mt-1 text-xs leading-5 text-body">
        {text}
      </p>
    </div>
  );
}

export default IndustryDashboard;
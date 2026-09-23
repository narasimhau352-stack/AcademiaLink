import { useEffect, useMemo, useState } from "react";
import {
  Users,
  GraduationCap,
  Building2,
  BriefcaseBusiness,
  FileText,
  FolderKanban,
  ShieldCheck,
  AlertTriangle,
  Activity,
  BarChart3,
  TrendingUp,
  UserRoundCheck,
  Layers3,
} from "lucide-react";

import { Card } from "../components/ui";

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/admin/stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (data.success) {
          setStats(data.stats);
        }
      } catch (error) {
        console.error(
          "Failed to fetch admin statistics:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [token]);

  const userDistribution = useMemo(() => {
    if (!stats) return [];

    return [
      {
        label: "Students",
        value: stats.students || 0,
        icon: GraduationCap,
        style: "bg-primary",
        iconStyle: "bg-indigo-50 text-primary",
      },
      {
        label: "Faculty",
        value: stats.faculty || 0,
        icon: ShieldCheck,
        style: "bg-violet",
        iconStyle: "bg-violet-50 text-violet",
      },
      {
        label: "Industry",
        value: stats.industry || 0,
        icon: Building2,
        style: "bg-warning",
        iconStyle: "bg-amber-50 text-warning",
      },
    ];
  }, [stats]);

  const totalUsers = stats?.totalUsers || 0;

  const getPercentage = (value) => {
    if (!totalUsers) return 0;

    return Math.round((value / totalUsers) * 100);
  };

  /* ==========================================================
     LOADING
  ========================================================== */

  if (loading) {
    return (
      <div className="min-h-screen bg-page">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-10">
          <div className="animate-pulse">
            <div className="h-4 w-36 rounded bg-border" />

            <div className="mt-4 h-10 w-72 rounded bg-border" />

            <div className="mt-3 h-5 w-[500px] max-w-full rounded bg-border" />

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-32 rounded-lg bg-white"
                />
              ))}
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              <div className="h-80 rounded-lg bg-white lg:col-span-2" />
              <div className="h-80 rounded-lg bg-white" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ==========================================================
     ERROR
  ========================================================== */

  if (!stats) {
    return (
      <div className="min-h-screen bg-page">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <Card className="border-rose-200 bg-rose-50 p-8 text-center">
            <AlertTriangle className="mx-auto h-10 w-10 text-danger" />

            <h2 className="mt-4 font-display text-xl font-semibold text-heading">
              Failed to load admin dashboard
            </h2>

            <p className="mt-2 text-sm text-body">
              Please refresh the page and try again.
            </p>
          </Card>
        </div>
      </div>
    );
  }

  /* ==========================================================
     ANALYTICS CARDS
  ========================================================== */

  const cards = [
    {
      title: "Total Users",
      value: stats.totalUsers || 0,
      description: "All registered users",
      icon: Users,
      iconStyle: "bg-indigo-50 text-primary",
    },
    {
      title: "Students",
      value: stats.students || 0,
      description: "Student accounts",
      icon: GraduationCap,
      iconStyle: "bg-emerald-50 text-success",
    },
    {
      title: "Faculty",
      value: stats.faculty || 0,
      description: "Faculty accounts",
      icon: ShieldCheck,
      iconStyle: "bg-violet-50 text-violet",
    },
    {
      title: "Industry",
      value: stats.industry || 0,
      description: "Industry accounts",
      icon: Building2,
      iconStyle: "bg-amber-50 text-warning",
    },
    {
      title: "Internships",
      value: stats.internships || 0,
      description: "Internship opportunities",
      icon: BriefcaseBusiness,
      iconStyle: "bg-indigo-50 text-primary",
    },
    {
      title: "Applications",
      value: stats.applications || 0,
      description: "Internship applications",
      icon: FileText,
      iconStyle: "bg-orange-50 text-orange-600",
    },
    {
      title: "Projects",
      value: stats.projects || 0,
      description: "Platform projects",
      icon: FolderKanban,
      iconStyle: "bg-emerald-50 text-success",
    },
  ];

  return (
    <div className="min-h-screen bg-page">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-10">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <section className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary to-violet p-6 text-white shadow-card sm:p-8">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

          <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold">
                <ShieldCheck className="h-3.5 w-3.5" />
                ADMINISTRATION
              </div>

              <h1 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Platform Administration
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/80 sm:text-base">
                Monitor AcademiaLink users, internships,
                applications and project activity from one
                central dashboard.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-lg border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-400/20">
                <Activity className="h-5 w-5 text-emerald-300" />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-white/60">
                  Platform Status
                </p>

                <p className="mt-0.5 text-sm font-bold text-emerald-300">
                  Active
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            ANALYTICS CARDS
        ====================================================== */}

        <section className="mt-8">
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-violet">
              Platform Analytics
            </p>

            <h2 className="mt-1 font-display text-xl font-bold text-heading">
              Platform Overview
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((card) => {
              const Icon = card.icon;

              return (
                <Card
                  key={card.title}
                  hover
                  className="relative overflow-hidden"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-body">
                        {card.title}
                      </p>

                      <p className="mt-3 font-display text-3xl font-bold text-heading">
                        {card.value}
                      </p>

                      <p className="mt-1 text-xs text-body">
                        {card.description}
                      </p>
                    </div>

                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${card.iconStyle}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* =====================================================
            USER ANALYTICS + ACTIVITY
        ====================================================== */}

        <div className="mt-8 grid gap-6 lg:grid-cols-3">

          {/* User Distribution */}
          <Card className="lg:col-span-2">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50">
                  <Users className="h-5 w-5 text-primary" />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                    User Analytics
                  </p>

                  <h2 className="font-display text-lg font-bold text-heading">
                    User Distribution
                  </h2>

                  <p className="text-sm text-body">
                    Registered users by platform role
                  </p>
                </div>
              </div>

              <BarChart3 className="hidden h-6 w-6 text-muted sm:block" />
            </div>

            <div className="mt-7 space-y-6">
              {userDistribution.map((item) => {
                const Icon = item.icon;
                const percentage = getPercentage(
                  item.value
                );

                return (
                  <div key={item.label}>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-md ${item.iconStyle}`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-heading">
                            {item.label}
                          </p>

                          <p className="text-xs text-body">
                            {item.value} user
                            {item.value !== 1
                              ? "s"
                              : ""}
                          </p>
                        </div>
                      </div>

                      <span className="text-sm font-bold text-heading">
                        {percentage}%
                      </span>
                    </div>

                    <div className="mt-3 h-3 overflow-hidden rounded-full bg-border">
                      <div
                        className={`h-full rounded-full ${item.style} transition-all duration-700`}
                        style={{
                          width: `${percentage}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-7 rounded-lg bg-page p-4">
              <div className="flex items-center gap-2">
                <UserRoundCheck className="h-4 w-4 text-primary" />

                <p className="text-xs font-semibold text-heading">
                  Total registered users
                </p>
              </div>

              <p className="mt-1 font-display text-2xl font-bold text-primary">
                {stats.totalUsers || 0}
              </p>
            </div>
          </Card>

          {/* Platform Activity */}
          <Card>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
                <Activity className="h-5 w-5 text-success" />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-success">
                  Activity
                </p>

                <h2 className="font-display text-lg font-bold text-heading">
                  Platform Activity
                </h2>

                <p className="text-sm text-body">
                  Current platform totals
                </p>
              </div>
            </div>

            <div className="mt-7 space-y-5">
              <ActivityItem
                icon={BriefcaseBusiness}
                label="Internships"
                value={stats.internships}
              />

              <ActivityItem
                icon={FileText}
                label="Applications"
                value={stats.applications}
              />

              <ActivityItem
                icon={FolderKanban}
                label="Projects"
                value={stats.projects}
              />
            </div>
          </Card>
        </div>

        {/* =====================================================
            PLATFORM ACTIVITY VISUALIZATION
        ====================================================== */}

        <Card className="mt-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-50">
                <TrendingUp className="h-5 w-5 text-violet" />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-violet">
                  Platform Activity
                </p>

                <h2 className="font-display text-lg font-bold text-heading">
                  Content & Opportunity Overview
                </h2>

                <p className="text-sm text-body">
                  Current totals across major platform areas
                </p>
              </div>
            </div>

            <Layers3 className="hidden h-6 w-6 text-muted sm:block" />
          </div>

          <div className="mt-7 grid gap-5 md:grid-cols-3">
            <ActivityMetric
              icon={BriefcaseBusiness}
              label="Internships"
              value={stats.internships}
              max={Math.max(
                stats.internships || 0,
                stats.applications || 0,
                stats.projects || 0,
                1
              )}
              style="bg-primary"
            />

            <ActivityMetric
              icon={FileText}
              label="Applications"
              value={stats.applications}
              max={Math.max(
                stats.internships || 0,
                stats.applications || 0,
                stats.projects || 0,
                1
              )}
              style="bg-violet"
            />

            <ActivityMetric
              icon={FolderKanban}
              label="Projects"
              value={stats.projects}
              max={Math.max(
                stats.internships || 0,
                stats.applications || 0,
                stats.projects || 0,
                1
              )}
              style="bg-success"
            />
          </div>
        </Card>

        {/* =====================================================
            PLATFORM SUMMARY
        ====================================================== */}

        <Card className="mt-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50">
              <ShieldCheck className="h-5 w-5 text-primary" />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                Administration
              </p>

              <h2 className="mt-1 font-display text-lg font-bold text-heading">
                AcademiaLink Platform Summary
              </h2>

              <p className="mt-1 max-w-3xl text-sm leading-6 text-body">
                Monitor the current state of the AcademiaLink
                ecosystem across students, faculty, industry,
                internships, applications and projects.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <SummaryItem
              icon={GraduationCap}
              label="Students"
              value={stats.students}
              description="Registered student accounts"
            />

            <SummaryItem
              icon={ShieldCheck}
              label="Faculty"
              value={stats.faculty}
              description="Faculty accounts"
            />

            <SummaryItem
              icon={Building2}
              label="Industry"
              value={stats.industry}
              description="Industry accounts"
            />

            <SummaryItem
              icon={BriefcaseBusiness}
              label="Internships"
              value={stats.internships}
              description="Internship opportunities"
            />

            <SummaryItem
              icon={FileText}
              label="Applications"
              value={stats.applications}
              description="Internship applications"
            />

            <SummaryItem
              icon={FolderKanban}
              label="Projects"
              value={stats.projects}
              description="Platform projects"
            />
          </div>
        </Card>

        {/* =====================================================
            ADMIN INSIGHT
        ====================================================== */}

        <section className="mt-6 rounded-xl border border-violet/10 bg-gradient-to-br from-purple-50 via-white to-indigo-50 p-6 sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-violet/10 px-3 py-1.5 text-xs font-semibold text-violet">
                <BarChart3 className="h-3.5 w-3.5" />
                ADMIN INSIGHTS
              </div>

              <h2 className="mt-4 font-display text-xl font-bold text-heading sm:text-2xl">
                AcademiaLink ecosystem overview
              </h2>

              <p className="mt-2 text-sm leading-6 text-body">
                Use the current platform totals to monitor
                participation across academic and industry
                communities and track the volume of
                internships, applications and projects.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:min-w-[280px]">
              <InsightBox
                value={stats.totalUsers || 0}
                label="Users"
              />

              <InsightBox
                value={stats.internships || 0}
                label="Internships"
              />

              <InsightBox
                value={stats.applications || 0}
                label="Applications"
              />

              <InsightBox
                value={stats.projects || 0}
                label="Projects"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

/* ============================================================
   ACTIVITY ITEM
============================================================ */

function ActivityItem({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="flex items-center justify-between border-b border-border pb-4 last:border-b-0 last:pb-0">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-page">
          <Icon className="h-4 w-4 text-primary" />
        </div>

        <span className="text-sm font-medium text-body">
          {label}
        </span>
      </div>

      <span className="font-display text-lg font-bold text-heading">
        {value || 0}
      </span>
    </div>
  );
}

/* ============================================================
   ACTIVITY METRIC
============================================================ */

function ActivityMetric({
  icon: Icon,
  label,
  value,
  max,
  style,
}) {
  const percentage = max
    ? Math.min(
        Math.round(((value || 0) / max) * 100),
        100
      )
    : 0;

  return (
    <div className="rounded-lg border border-border bg-page p-5">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white shadow-card">
            <Icon className="h-5 w-5 text-primary" />
          </div>

          <div>
            <p className="text-sm font-semibold text-heading">
              {label}
            </p>

            <p className="text-xs text-body">
              Current total
            </p>
          </div>
        </div>

        <span className="font-display text-xl font-bold text-heading">
          {value || 0}
        </span>
      </div>

      <div className="mt-5 h-2 overflow-hidden rounded-full bg-border">
        <div
          className={`h-full rounded-full ${style} transition-all duration-700`}
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}

/* ============================================================
   SUMMARY ITEM
============================================================ */

function SummaryItem({
  icon: Icon,
  label,
  value,
  description,
}) {
  return (
    <div className="rounded-lg border border-border bg-page p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-primary shadow-card">
          <Icon className="h-5 w-5" />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-body">
            {label}
          </p>

          <p className="font-display text-xl font-bold text-heading">
            {value || 0}
          </p>
        </div>
      </div>

      <p className="mt-3 text-xs text-body">
        {description}
      </p>
    </div>
  );
}

/* ============================================================
   INSIGHT BOX
============================================================ */

function InsightBox({ value, label }) {
  return (
    <div className="rounded-lg border border-white bg-white p-4 text-center shadow-card">
      <p className="font-display text-2xl font-bold text-primary">
        {value}
      </p>

      <p className="mt-1 text-xs font-medium text-body">
        {label}
      </p>
    </div>
  );
}

export default AdminDashboard;
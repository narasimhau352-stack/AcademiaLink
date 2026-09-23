import { useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  BriefcaseBusiness,
  Code2,
  Layers3,
  TrendingUp,
  Award,
  AlertCircle,
  Target,
} from "lucide-react";

import api from "../services/api";
import { Card } from "../components/ui";

function FacultyDashboard() {
  const [skillDemand, setSkillDemand] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchSkillDemand = async () => {
      try {
        const response = await api.get(
          "/faculty/skill-demand"
        );

        setSkillDemand(
          response.data.skillDemand || []
        );

        setAnalytics(
          response.data.analytics || null
        );
      } catch (error) {
        console.error(error);

        setMessage(
          error.response?.data?.message ||
            "Failed to load industry skill demand"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSkillDemand();
  }, []);

  const maxDemand = useMemo(() => {
    if (!skillDemand.length) return 0;

    return Math.max(
      ...skillDemand.map((item) => item.demand)
    );
  }, [skillDemand]);

  const getBarWidth = (demand) => {
    if (!maxDemand) return "0%";

    return `${(demand / maxDemand) * 100}%`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-page">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-10">
          <div className="animate-pulse">
            <div className="h-4 w-44 rounded bg-border" />

            <div className="mt-4 h-10 w-80 rounded bg-border" />

            <div className="mt-3 h-5 w-[520px] max-w-full rounded bg-border" />

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-32 rounded-lg bg-white"
                />
              ))}
            </div>

            <div className="mt-8 h-96 rounded-lg bg-white" />
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
          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

          <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold">
              <BarChart3 className="h-3.5 w-3.5" />
              ACADEMIC • INDUSTRY ANALYTICS
            </div>

            <h1 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Faculty Industry Insights
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-white/80 sm:text-base">
              Understand the skills currently demanded by
              industry through open internship opportunities
              and use these insights to support academic
              skill development.
            </p>
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
                Unable to load industry insights
              </p>

              <p className="mt-1 text-sm">
                {message}
              </p>
            </div>
          </div>
        )}

        {/* =====================================================
            NO DATA
        ====================================================== */}
        {!message && skillDemand.length === 0 && (
          <Card className="mt-8">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-violet/10">
                <BarChart3 className="h-7 w-7 text-violet" />
              </div>

              <h2 className="mt-5 font-display text-xl font-bold text-heading">
                No industry skill demand found
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-body">
                Skill demand will appear when industries
                post internships with required skills.
              </p>
            </div>
          </Card>
        )}

        {!message && skillDemand.length > 0 && (
          <>
            {/* =================================================
                ANALYTICS CARDS
            ================================================== */}
            <section className="mt-8">
              <div className="mb-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-violet">
                  Industry Analytics
                </p>

                <h2 className="mt-1 font-display text-xl font-bold text-heading">
                  Current Skill Market
                </h2>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <AnalyticsCard
                  title="Open Internships"
                  value={
                    analytics?.totalOpenInternships || 0
                  }
                  description="Currently available"
                  icon={BriefcaseBusiness}
                  iconStyle="bg-indigo-50 text-primary"
                />

                <AnalyticsCard
                  title="Total Skill Demand"
                  value={
                    analytics?.totalSkillDemand || 0
                  }
                  description="Skill requirements"
                  icon={Target}
                  iconStyle="bg-violet-50 text-violet"
                />

                <AnalyticsCard
                  title="Unique Skills"
                  value={
                    analytics?.uniqueSkills || 0
                  }
                  description="Skills currently demanded"
                  icon={Layers3}
                  iconStyle="bg-blue-50 text-blue-600"
                />

                <AnalyticsCard
                  title="Most Demanded Skill"
                  value={
                    analytics?.mostDemandedSkill?.skill ||
                    "N/A"
                  }
                  description={
                    analytics?.mostDemandedSkill
                      ? `${analytics.mostDemandedSkill.demand} internship${
                          analytics.mostDemandedSkill.demand !==
                          1
                            ? "s"
                            : ""
                        }`
                      : "No data available"
                  }
                  icon={Award}
                  iconStyle="bg-emerald-50 text-success"
                  valueSmall
                />
              </div>
            </section>

            {/* =================================================
                ANALYTICS OVERVIEW
            ================================================== */}
            <div className="mt-8 grid gap-6 lg:grid-cols-3">

              {/* Skill Demand Chart */}
              <Card className="lg:col-span-2">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="rounded-md bg-primary/10 p-2">
                        <BarChart3 className="h-5 w-5 text-primary" />
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                          Demand Analysis
                        </p>

                        <h2 className="font-display text-lg font-bold text-heading">
                          Skill Demand Chart
                        </h2>
                      </div>
                    </div>

                    <p className="mt-3 text-sm text-body">
                      Skills required across currently open
                      industry internships.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 rounded-full bg-page px-3 py-1.5 text-xs font-semibold text-body">
                    <TrendingUp className="h-3.5 w-3.5" />
                    Live demand data
                  </div>
                </div>

                <div className="mt-8 space-y-5">
                  {skillDemand.map((item, index) => (
                    <div key={item.skill}>
                      <div className="mb-2 flex items-center justify-between gap-4">
                        <div className="flex min-w-0 items-center gap-3">
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                            {index + 1}
                          </span>

                          <span className="truncate text-sm font-semibold text-heading">
                            {item.skill}
                          </span>
                        </div>

                        <span className="shrink-0 text-xs font-semibold text-body">
                          {item.demand} internship
                          {item.demand !== 1
                            ? "s"
                            : ""}
                        </span>
                      </div>

                      <div className="h-3 overflow-hidden rounded-full bg-border">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-primary to-violet transition-all duration-700"
                          style={{
                            width: getBarWidth(
                              item.demand
                            ),
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Industry Trends */}
              <Card>
                <div className="flex items-center gap-3">
                  <div className="rounded-md bg-violet/10 p-2">
                    <TrendingUp className="h-5 w-5 text-violet" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-violet">
                      Industry Trends
                    </p>

                    <h2 className="font-display text-lg font-bold text-heading">
                      Demand Signals
                    </h2>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <TrendItem
                    icon={Award}
                    title="Top Skill"
                    value={
                      analytics?.mostDemandedSkill
                        ?.skill || "N/A"
                    }
                    description={
                      analytics?.mostDemandedSkill
                        ? `${analytics.mostDemandedSkill.demand} current demand`
                        : "No demand data"
                    }
                  />

                  <TrendItem
                    icon={BriefcaseBusiness}
                    title="Open Opportunities"
                    value={
                      analytics?.totalOpenInternships ||
                      0
                    }
                    description="Internships currently open"
                  />

                  <TrendItem
                    icon={Code2}
                    title="Skill Diversity"
                    value={
                      analytics?.uniqueSkills || 0
                    }
                    description="Different skills demanded"
                  />

                  <TrendItem
                    icon={Target}
                    title="Total Requirements"
                    value={
                      analytics?.totalSkillDemand || 0
                    }
                    description="Skill requirements across internships"
                  />
                </div>

                <div className="mt-6 rounded-lg bg-gradient-to-br from-purple-50 to-indigo-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-violet">
                    Academic Insight
                  </p>

                  <p className="mt-2 text-sm leading-6 text-heading">
                    Use the current industry demand data
                    to identify skills that may need more
                    attention in student learning programs.
                  </p>
                </div>
              </Card>
            </div>

            {/* =================================================
                DETAILED SKILL DEMAND
            ================================================== */}
            <Card className="mt-6">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                    Detailed Analysis
                  </p>

                  <h2 className="mt-1 font-display text-xl font-bold text-heading">
                    Industry Skill Demand
                  </h2>

                  <p className="mt-1 text-sm text-body">
                    Number of open internships requiring
                    each skill.
                  </p>
                </div>

                <div className="inline-flex w-fit items-center gap-2 rounded-full bg-page px-3 py-1.5 text-xs font-semibold text-body">
                  <Code2 className="h-3.5 w-3.5" />
                  {skillDemand.length} skills
                </div>
              </div>

              <div className="mt-6 overflow-hidden rounded-lg border border-border">
                {/* Table Header */}
                <div className="hidden grid-cols-[80px_1fr_180px] gap-4 bg-page px-5 py-3 text-xs font-semibold uppercase tracking-wide text-body sm:grid">
                  <span>Rank</span>
                  <span>Skill</span>
                  <span>Demand</span>
                </div>

                <div className="divide-y divide-border">
                  {skillDemand.map((item, index) => (
                    <div
                      key={item.skill}
                      className="grid gap-4 px-5 py-5 transition hover:bg-page sm:grid-cols-[80px_1fr_180px] sm:items-center"
                    >
                      {/* Rank */}
                      <div>
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                          {index + 1}
                        </span>
                      </div>

                      {/* Skill */}
                      <div>
                        <div className="flex items-center gap-2">
                          <Code2 className="h-4 w-4 text-violet" />

                          <span className="font-semibold text-heading">
                            {item.skill}
                          </span>
                        </div>

                        <div className="mt-2 h-1.5 max-w-md overflow-hidden rounded-full bg-border">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{
                              width: getBarWidth(
                                item.demand
                              ),
                            }}
                          />
                        </div>
                      </div>

                      {/* Demand */}
                      <div>
                        <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-success">
                          {item.demand} internship
                          {item.demand !== 1
                            ? "s"
                            : ""}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* =================================================
                ACADEMIA → INDUSTRY INSIGHT
            ================================================== */}
            <section className="mt-6 rounded-xl border border-violet/10 bg-gradient-to-br from-purple-50 via-white to-indigo-50 p-6 sm:p-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 rounded-full bg-violet/10 px-3 py-1.5 text-xs font-semibold text-violet">
                    <BriefcaseBusiness className="h-3.5 w-3.5" />
                    ACADEMIA → INDUSTRY
                  </div>

                  <h2 className="mt-4 font-display text-xl font-bold text-heading sm:text-2xl">
                    Connect curriculum insights with
                    industry demand
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-body">
                    Industry skill demand provides faculty
                    with visibility into the capabilities
                    organizations are currently requesting
                    through open internship opportunities.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:min-w-[260px]">
                  <InsightBox
                    value={
                      analytics?.uniqueSkills || 0
                    }
                    label="Skills"
                  />

                  <InsightBox
                    value={
                      analytics?.totalOpenInternships ||
                      0
                    }
                    label="Open Internships"
                  />
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   ANALYTICS CARD
============================================================ */

function AnalyticsCard({
  title,
  value,
  description,
  icon: Icon,
  iconStyle,
  valueSmall = false,
}) {
  return (
    <Card
      hover
      className="relative overflow-hidden"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-body">
            {title}
          </p>

          <p
            className={`mt-3 truncate font-display font-bold text-heading ${
              valueSmall
                ? "text-xl"
                : "text-3xl"
            }`}
          >
            {value}
          </p>

          <p className="mt-1 text-xs text-body">
            {description}
          </p>
        </div>

        <div
          className={`shrink-0 rounded-md p-2.5 ${iconStyle}`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </Card>
  );
}

/* ============================================================
   TREND ITEM
============================================================ */

function TrendItem({
  icon: Icon,
  title,
  value,
  description,
}) {
  return (
    <div className="rounded-lg border border-border bg-page p-4">
      <div className="flex items-start gap-3">
        <div className="rounded-md bg-white p-2 shadow-card">
          <Icon className="h-4 w-4 text-violet" />
        </div>

        <div className="min-w-0">
          <p className="text-xs font-medium text-body">
            {title}
          </p>

          <p className="mt-1 truncate text-lg font-bold text-heading">
            {value}
          </p>

          <p className="mt-1 text-xs text-body">
            {description}
          </p>
        </div>
      </div>
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

export default FacultyDashboard;
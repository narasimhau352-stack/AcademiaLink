import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BriefcaseBusiness,
  MapPin,
  Clock3,
  IndianRupee,
  UserRound,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Send,
  Building2,
  CalendarDays,
  ChevronRight,
} from "lucide-react";

import api from "../services/api";
import { getUser } from "../services/auth";
import { Card, SkillChip } from "../components/ui";

function InternshipDetails() {
  const { id } = useParams();
  const user = getUser();

  const [internship, setInternship] = useState(null);

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [applying, setApplying] = useState(false);
  const [applicationMessage, setApplicationMessage] =
    useState("");

  useEffect(() => {
    const fetchInternship = async () => {
      try {
        const response = await api.get(
          `/internships/${id}`
        );

        setInternship(
          response.data.internship
        );
      } catch (error) {
        console.error(error);

        setMessage(
          error.response?.data?.message ||
            "Failed to load internship details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchInternship();
  }, [id]);

  const handleApply = async () => {
    try {
      setApplying(true);
      setApplicationMessage("");

      const response = await api.post(
        `/internships/${id}/apply`
      );

      if (response.data.success) {
        setApplicationMessage(
          "Application submitted successfully!"
        );
      }
    } catch (error) {
      console.error(error);

      setApplicationMessage(
        error.response?.data?.message ||
          "Failed to submit application"
      );
    } finally {
      setApplying(false);
    }
  };

  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <div className="min-h-screen bg-page">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6 h-5 w-40 animate-pulse rounded bg-border" />

          <div className="overflow-hidden rounded-xl border border-border bg-white shadow-card">
            <div className="h-2 animate-pulse bg-violet-200" />

            <div className="space-y-6 p-6 sm:p-8">
              <div className="flex gap-4">
                <div className="h-16 w-16 animate-pulse rounded-2xl bg-border" />

                <div className="flex-1 space-y-3">
                  <div className="h-4 w-40 animate-pulse rounded bg-border" />
                  <div className="h-8 w-3/4 animate-pulse rounded bg-border" />
                  <div className="h-4 w-48 animate-pulse rounded bg-border" />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="h-20 animate-pulse rounded-lg bg-border" />
                <div className="h-20 animate-pulse rounded-lg bg-border" />
                <div className="h-20 animate-pulse rounded-lg bg-border" />
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <div className="h-80 animate-pulse rounded-xl bg-border lg:col-span-2" />
            <div className="h-80 animate-pulse rounded-xl bg-border" />
          </div>
        </div>
      </div>
    );
  }

  /* =========================
     ERROR
  ========================= */

  if (message || !internship) {
    return (
      <div className="min-h-screen bg-page">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Card className="border-rose-200 bg-rose-50">
            <div className="flex items-start gap-3 text-danger">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white">
                <AlertTriangle className="h-5 w-5" />
              </div>

              <div>
                <p className="font-display font-bold">
                  Unable to load internship
                </p>

                <p className="mt-1 text-sm">
                  {message || "Internship not found"}
                </p>
              </div>
            </div>
          </Card>

          <Link
            to="/internships"
            className="mt-5 inline-flex items-center gap-2 rounded-md border border-border bg-white px-4 py-2.5 text-sm font-semibold text-heading shadow-card transition hover:border-primary hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Internships
          </Link>
        </div>
      </div>
    );
  }

  const isOpen = internship.status === "OPEN";

  return (
    <div className="min-h-screen bg-page">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* =========================
            BACK NAVIGATION
        ========================= */}

        <Link
          to="/internships"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-primary-dark"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Internships
        </Link>

        {/* =========================
            HERO
        ========================= */}

        <Card className="overflow-hidden p-0">
          <div className="h-2 bg-gradient-to-r from-primary via-violet to-violet-400" />

          <div className="p-6 sm:p-8 lg:p-10">

            <div className="flex flex-col gap-7 lg:flex-row lg:items-start lg:justify-between">

              {/* Title */}

              <div className="flex min-w-0 gap-4 sm:gap-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-100">
                  <BriefcaseBusiness className="h-8 w-8 text-primary" />
                </div>

                <div className="min-w-0">
                  <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-[10px] font-bold tracking-wide text-violet">
                    <Sparkles className="h-3.5 w-3.5" />
                    INTERNSHIP OPPORTUNITY
                  </div>

                  <h1 className="mt-4 break-words font-display text-3xl font-bold tracking-tight text-heading sm:text-4xl lg:text-5xl">
                    {internship.title}
                  </h1>

                  {internship.creator && (
                    <div className="mt-4 flex items-center gap-2 text-sm text-body">
                      <Building2 className="h-4 w-4 text-primary" />

                      <span>
                        Posted by{" "}
                        <span className="font-bold text-heading">
                          {internship.creator.name}
                        </span>
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Status */}

              <StatusBadge
                status={internship.status}
                isOpen={isOpen}
              />
            </div>

            {/* Information */}

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <InfoCard
                icon={
                  <MapPin className="h-5 w-5" />
                }
                label="Location"
                value={
                  internship.location ||
                  "Not specified"
                }
              />

              <InfoCard
                icon={
                  <Clock3 className="h-5 w-5" />
                }
                label="Duration"
                value={
                  internship.duration ||
                  "Not specified"
                }
              />

              <InfoCard
                icon={
                  <IndianRupee className="h-5 w-5" />
                }
                label="Stipend"
                value={
                  internship.stipend ||
                  "Not specified"
                }
              />
            </div>
          </div>
        </Card>

        {/* =========================
            MAIN CONTENT
        ========================= */}

        <div className="mt-6 grid gap-6 lg:grid-cols-3">

          {/* LEFT COLUMN */}

          <div className="space-y-6 lg:col-span-2">

            {/* Description */}

            <Card>
              <SectionHeader
                icon={
                  <BriefcaseBusiness className="h-5 w-5" />
                }
                iconBackground="bg-indigo-50"
                iconColor="text-primary"
                title="About This Internship"
                subtitle="Opportunity overview"
              />

              <div className="mt-6">
                {internship.description ? (
                  <p className="whitespace-pre-line text-sm leading-7 text-body sm:text-base">
                    {internship.description}
                  </p>
                ) : (
                  <p className="text-sm text-body">
                    No description provided.
                  </p>
                )}
              </div>
            </Card>

            {/* Required Skills */}

            <Card>
              <SectionHeader
                icon={
                  <Sparkles className="h-5 w-5" />
                }
                iconBackground="bg-violet-50"
                iconColor="text-violet"
                title="Required Skills"
                subtitle="Skills expected for this opportunity"
              />

              <div className="mt-6">
                {internship.requiredSkills?.length >
                0 ? (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {internship.requiredSkills.map(
                      (item) => (
                        <div
                          key={item.id}
                          className="group rounded-lg border border-border bg-page p-4 transition hover:border-violet-200 hover:bg-violet-50/50"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex min-w-0 items-center gap-3">
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                                <CheckCircle2 className="h-4 w-4 text-success" />
                              </div>

                              <span className="truncate text-sm font-bold text-heading">
                                {item.skill?.name}
                              </span>
                            </div>

                            <SkillChip
                              skill={item.level}
                              type="neutral"
                            />
                          </div>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <div className="rounded-lg border border-dashed border-border bg-page p-6 text-center">
                    <Sparkles className="mx-auto h-6 w-6 text-body" />

                    <p className="mt-2 text-sm text-body">
                      No specific skills listed.
                    </p>
                  </div>
                )}
              </div>
            </Card>

            {/* Opportunity Summary */}

            <Card>
              <SectionHeader
                icon={
                  <CalendarDays className="h-5 w-5" />
                }
                iconBackground="bg-indigo-50"
                iconColor="text-primary"
                title="Opportunity Summary"
                subtitle="Key internship information"
              />

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <SummaryRow
                  icon={
                    <MapPin className="h-4 w-4" />
                  }
                  label="Location"
                  value={
                    internship.location ||
                    "Not specified"
                  }
                />

                <SummaryRow
                  icon={
                    <Clock3 className="h-4 w-4" />
                  }
                  label="Duration"
                  value={
                    internship.duration ||
                    "Not specified"
                  }
                />

                <SummaryRow
                  icon={
                    <IndianRupee className="h-4 w-4" />
                  }
                  label="Stipend"
                  value={
                    internship.stipend ||
                    "Not specified"
                  }
                />

                <SummaryRow
                  icon={
                    <BriefcaseBusiness className="h-4 w-4" />
                  }
                  label="Status"
                  value={internship.status}
                />
              </div>
            </Card>
          </div>

          {/* RIGHT COLUMN */}

          <div className="space-y-6">

            {/* Application Card */}

            {user?.role === "STUDENT" && (
              <Card className="overflow-hidden border-violet-200 p-0">
                <div className="bg-gradient-to-br from-violet-600 to-indigo-600 p-6 text-white">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                    <Send className="h-6 w-6" />
                  </div>

                  <h2 className="mt-5 font-display text-xl font-bold">
                    Interested in this opportunity?
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-violet-100">
                    Submit your application and take
                    the next step toward this
                    internship.
                  </p>
                </div>

                <div className="p-5">
                  <button
                    onClick={handleApply}
                    disabled={
                      applying || !isOpen
                    }
                    className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-5 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-page0"
                  >
                    {applying ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Applying...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        {isOpen
                          ? "Apply Now"
                          : "Applications Closed"}
                      </>
                    )}
                  </button>

                  {applicationMessage && (
                    <div
                      className={`mt-4 flex items-start gap-3 rounded-lg border p-4 ${
                        applicationMessage.includes(
                          "successfully"
                        )
                          ? "border-emerald-200 bg-emerald-50 text-success"
                          : "border-rose-200 bg-rose-50 text-danger"
                      }`}
                    >
                      {applicationMessage.includes(
                        "successfully"
                      ) ? (
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                      ) : (
                        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
                      )}

                      <p className="text-sm font-semibold leading-5">
                        {applicationMessage}
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            )}

            {/* Creator Card */}

            {internship.creator && (
              <Card>
                <SectionHeader
                  icon={
                    <Building2 className="h-5 w-5" />
                  }
                  iconBackground="bg-indigo-50"
                  iconColor="text-primary"
                  title="Posted By"
                  subtitle="Internship provider"
                />

                <div className="mt-6 rounded-lg border border-border bg-page p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm">
                      <UserRound className="h-5 w-5 text-primary" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-medium uppercase tracking-wide text-body">
                        Company / Creator
                      </p>

                      <p className="mt-1 truncate font-display text-base font-bold text-heading">
                        {internship.creator.name}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Quick Navigation */}

            <Card>
              <p className="text-xs font-bold uppercase tracking-wide text-body">
                Explore More
              </p>

              <Link
                to="/internships"
                className="mt-4 flex items-center justify-between rounded-lg border border-border bg-page p-4 transition hover:border-violet-200 hover:bg-violet-50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white">
                    <BriefcaseBusiness className="h-4 w-4 text-violet" />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-heading">
                      Browse Internships
                    </p>

                    <p className="text-xs text-body">
                      Explore more opportunities
                    </p>
                  </div>
                </div>

                <ChevronRight className="h-4 w-4 text-body" />
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   STATUS BADGE
============================================================ */

function StatusBadge({ status, isOpen }) {
  return (
    <div
      className={`inline-flex w-fit shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold ${
        isOpen
          ? "border-emerald-200 bg-emerald-50 text-success"
          : "border-border bg-page text-body"
      }`}
    >
      <span
        className={`h-2.5 w-2.5 rounded-full ${
          isOpen
            ? "bg-success"
            : "bg-page0"
        }`}
      />

      {status}
    </div>
  );
}

/* ============================================================
   SECTION HEADER
============================================================ */

function SectionHeader({
  icon,
  iconBackground,
  iconColor,
  title,
  subtitle,
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconBackground}`}
      >
        <span className={iconColor}>
          {icon}
        </span>
      </div>

      <div>
        <h2 className="font-display text-lg font-bold text-heading sm:text-xl">
          {title}
        </h2>

        <p className="mt-0.5 text-xs text-body sm:text-sm">
          {subtitle}
        </p>
      </div>
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
    <div className="rounded-lg border border-border bg-page p-4 transition hover:border-violet-200 hover:bg-violet-50/50">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-primary shadow-sm">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-wider text-body">
            {label}
          </p>

          <p className="mt-1 truncate text-sm font-bold text-heading">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   SUMMARY ROW
============================================================ */

function SummaryRow({
  icon,
  label,
  value,
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-page p-3.5">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-primary shadow-sm">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-wide text-body">
          {label}
        </p>

        <p className="mt-1 truncate text-sm font-semibold text-heading">
          {value}
        </p>
      </div>
    </div>
  );
}

export default InternshipDetails;
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  UserRound,
  GraduationCap,
  MapPin,
  Target,
  CalendarDays,
  CheckCircle2,
  AlertTriangle,
  Clock3,
  BriefcaseBusiness,
  Sparkles,
  Mail,
  ChevronDown,
  UserCheck,
} from "lucide-react";

import api from "../services/api";
import { Card, SkillChip } from "../components/ui";

function InternshipApplications() {
  const { id } = useParams();

  const [applications, setApplications] =
    useState([]);

  const [internship, setInternship] =
    useState(null);

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [updatingId, setUpdatingId] =
    useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await api.get(
          `/internships/${id}/applications`
        );

        setApplications(
          response.data.applications || []
        );

        const internshipResponse =
          await api.get(`/internships/${id}`);

        setInternship(
          internshipResponse.data.internship
        );
      } catch (error) {
        console.error(error);

        setMessage(
          error.response?.data?.message ||
            "Failed to load applications"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [id]);

  const handleStatusChange = async (
    applicationId,
    status
  ) => {
    try {
      setUpdatingId(applicationId);
      setMessage("");

      const response = await api.patch(
        `/internships/applications/${applicationId}/status`,
        {
          status,
        }
      );

      if (response.data.success) {
        setApplications(
          (currentApplications) =>
            currentApplications.map(
              (application) =>
                application.id ===
                applicationId
                  ? {
                      ...application,
                      status:
                        response.data
                          .application
                          .status,
                    }
                  : application
            )
        );

        setMessage(
          "Application status updated successfully!"
        );
      }
    } catch (error) {
      console.error(error);

      setMessage(
        error.response?.data?.message ||
          "Failed to update application status"
      );
    } finally {
      setUpdatingId(null);
    }
  };

  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <div className="min-h-screen bg-page">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <div className="h-5 w-40 animate-pulse rounded bg-border" />

            <div className="h-40 animate-pulse rounded-xl bg-border" />

            <div className="h-64 animate-pulse rounded-xl bg-border" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-page">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* =========================
            BACK
        ========================= */}

        <Link
          to="/internships"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-primary-dark"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Internships
        </Link>

        {/* =========================
            HEADER
        ========================= */}

        <div className="mt-6 overflow-hidden rounded-xl border border-border bg-white shadow-card">
          <div className="h-2 bg-gradient-to-r from-primary via-violet to-violet-400" />

          <div className="p-6 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

              {/* Heading */}

              <div className="flex min-w-0 gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-100">
                  <Users className="h-7 w-7 text-primary" />
                </div>

                <div className="min-w-0">
                  <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-[10px] font-bold tracking-wide text-violet">
                    <Sparkles className="h-3.5 w-3.5" />
                    CANDIDATE MANAGEMENT
                  </div>

                  <h1 className="mt-3 font-display text-2xl font-bold tracking-tight text-heading sm:text-3xl lg:text-4xl">
                    Internship Applications
                  </h1>

                  {internship && (
                    <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-body">
                      <BriefcaseBusiness className="h-4 w-4 shrink-0 text-primary" />

                      <span>
                        Applications for{" "}
                        <span className="font-bold text-heading">
                          {internship.title}
                        </span>
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Applicant Count */}

              <div className="flex w-fit items-center gap-4 rounded-2xl border border-indigo-100 bg-indigo-50/60 px-5 py-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm">
                  <Users className="h-5 w-5 text-primary" />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-body">
                    Total Applicants
                  </p>

                  <p className="mt-0.5 font-display text-2xl font-bold text-heading">
                    {applications.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================
            MESSAGE
        ========================= */}

        {message && (
          <div
            className={`mt-6 flex items-start gap-3 rounded-lg border p-4 ${
              message.includes("successfully")
                ? "border-emerald-200 bg-emerald-50 text-success"
                : "border-rose-200 bg-rose-50 text-danger"
            }`}
          >
            {message.includes("successfully") ? (
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
            ) : (
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
            )}

            <p className="text-sm font-semibold">
              {message}
            </p>
          </div>
        )}

        {/* =========================
            EMPTY STATE
        ========================= */}

        {applications.length === 0 ? (
          <Card className="mt-8 p-10 text-center sm:p-14">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50">
              <Users className="h-8 w-8 text-primary" />
            </div>

            <h2 className="mt-6 font-display text-xl font-bold text-heading">
              No applications yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-body">
              Students who apply for this internship
              will appear here. You can review their
              profiles and update their application
              status.
            </p>
          </Card>
        ) : (
          <div className="mt-8 space-y-5">

            {/* Candidate Summary */}

            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-lg font-bold text-heading">
                  Candidates
                </h2>

                <p className="mt-1 text-sm text-body">
                  Review applicants and manage their
                  recruitment status.
                </p>
              </div>
            </div>

            {/* =========================
                CANDIDATE CARDS
            ========================= */}

            {applications.map(
              (application) => {
                const student =
                  application.student;

                const profile =
                  student?.studentProfile;

                return (
                  <Card
                    key={application.id}
                    className="overflow-hidden p-0"
                  >
                    {/* Candidate Top */}

                    <div className="p-5 sm:p-7">
                      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

                        {/* Candidate Identity */}

                        <div className="flex min-w-0 gap-4">
                          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-100">
                            <UserRound className="h-7 w-7 text-primary" />
                          </div>

                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <h2 className="font-display text-xl font-bold text-heading">
                                {student?.name ||
                                  "Unknown Student"}
                              </h2>

                              <span className="inline-flex items-center gap-1 rounded-full bg-page px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-body">
                                <UserCheck className="h-3 w-3" />
                                Candidate
                              </span>
                            </div>

                            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-body">
                              <span className="inline-flex items-center gap-1.5">
                                <Mail className="h-4 w-4" />

                                {student?.email ||
                                  "Email not available"}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Status */}

                        <StatusBadge
                          status={
                            application.status
                          }
                        />
                      </div>

                      {/* Profile Information */}

                      {profile && (
                        <div className="mt-7">
                          <div className="mb-4 flex items-center gap-2">
                            <UserRound className="h-4 w-4 text-primary" />

                            <h3 className="text-xs font-bold uppercase tracking-wider text-heading">
                              Candidate Profile
                            </h3>
                          </div>

                          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                            <ProfileInfo
                              icon={
                                <GraduationCap className="h-4 w-4" />
                              }
                              label="Education"
                              value={
                                profile.education ||
                                "Not specified"
                              }
                            />

                            <ProfileInfo
                              icon={
                                <BriefcaseBusiness className="h-4 w-4" />
                              }
                              label="Branch"
                              value={
                                profile.branch ||
                                "Not specified"
                              }
                            />

                            <ProfileInfo
                              icon={
                                <CalendarDays className="h-4 w-4" />
                              }
                              label="Graduation Year"
                              value={
                                profile.graduationYear ||
                                "Not specified"
                              }
                            />

                            <ProfileInfo
                              icon={
                                <MapPin className="h-4 w-4" />
                              }
                              label="Location"
                              value={
                                profile.location ||
                                "Not specified"
                              }
                            />
                          </div>
                        </div>
                      )}

                      {/* Career Goal */}

                      {profile?.careerGoal && (
                        <div className="mt-5 rounded-lg border border-violet-100 bg-violet-50/60 p-4">
                          <div className="flex items-start gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white">
                              <Target className="h-4 w-4 text-violet" />
                            </div>

                            <div>
                              <p className="text-[10px] font-bold uppercase tracking-wider text-body">
                                Career Goal
                              </p>

                              <p className="mt-1 text-sm leading-6 text-heading">
                                {profile.careerGoal}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Skills */}

                      {profile?.skills?.length >
                        0 && (
                        <div className="mt-6">
                          <div className="mb-3 flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-violet" />

                            <p className="text-xs font-bold uppercase tracking-wider text-heading">
                              Skills
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {profile.skills.map(
                              (item) => (
                                <SkillChip
                                  key={item.id}
                                  skill={`${item.skill?.name} — ${item.level}`}
                                  type="verified"
                                />
                              )
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Candidate Footer */}

                    <div className="border-t border-border bg-page/70 px-5 py-5 sm:px-7">
                      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                        {/* Applied Date */}

                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm">
                            <Clock3 className="h-4 w-4 text-primary" />
                          </div>

                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-body">
                              Applied On
                            </p>

                            <p className="mt-0.5 text-sm font-semibold text-heading">
                              {new Date(
                                application.createdAt
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        {/* Status Update */}

                        <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center lg:w-auto">
                          <div className="sm:text-right">
                            <p className="text-xs font-bold text-heading">
                              Update Status
                            </p>

                            <p className="mt-0.5 text-[11px] text-body">
                              Candidate will be notified
                            </p>
                          </div>

                          <div className="relative w-full sm:w-60">
                            <select
                              value={
                                application.status
                              }
                              onChange={(event) =>
                                handleStatusChange(
                                  application.id,
                                  event.target.value
                                )
                              }
                              disabled={
                                updatingId ===
                                application.id
                              }
                              className="w-full appearance-none rounded-md border border-border bg-white px-4 py-3 pr-10 text-sm font-semibold text-heading shadow-sm outline-none transition hover:border-primary focus:border-primary focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              <option value="SUBMITTED">
                                Submitted
                              </option>

                              <option value="UNDER_REVIEW">
                                Under Review
                              </option>

                              <option value="SHORTLISTED">
                                Shortlisted
                              </option>

                              <option value="INTERVIEW">
                                Interview
                              </option>

                              <option value="SELECTED">
                                Selected
                              </option>

                              <option value="REJECTED">
                                Rejected
                              </option>
                            </select>

                            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-body" />

                            {updatingId ===
                              application.id && (
                              <span className="absolute right-9 top-1/2 h-3.5 w-3.5 -translate-y-1/2 animate-spin rounded-full border-2 border-border border-t-primary" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              }
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   PROFILE INFO
============================================================ */

function ProfileInfo({
  icon,
  label,
  value,
}) {
  return (
    <div className="rounded-lg border border-border bg-page p-4 transition hover:border-indigo-100 hover:bg-indigo-50/40">
      <div className="flex items-center gap-2 text-primary">
        {icon}

        <p className="text-[10px] font-bold uppercase tracking-wider text-body">
          {label}
        </p>
      </div>

      <p className="mt-2 truncate text-sm font-bold text-heading">
        {value}
      </p>
    </div>
  );
}

/* ============================================================
   STATUS BADGE
============================================================ */

function StatusBadge({ status }) {
  const styles = {
    SUBMITTED:
      "border-slate-200 bg-slate-50 text-body",

    UNDER_REVIEW:
      "border-amber-200 bg-amber-50 text-warning",

    SHORTLISTED:
      "border-indigo-200 bg-indigo-50 text-primary",

    INTERVIEW:
      "border-violet-200 bg-violet-50 text-violet",

    SELECTED:
      "border-emerald-200 bg-emerald-50 text-success",

    REJECTED:
      "border-rose-200 bg-rose-50 text-danger",
  };

  const labels = {
    SUBMITTED: "Submitted",
    UNDER_REVIEW: "Under Review",
    SHORTLISTED: "Shortlisted",
    INTERVIEW: "Interview",
    SELECTED: "Selected",
    REJECTED: "Rejected",
  };

  return (
    <span
      className={`inline-flex w-fit shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold ${
        styles[status] ||
        "border-border bg-page text-body"
      }`}
    >
      <span className="h-2 w-2 rounded-full bg-current" />

      {labels[status] || status}
    </span>
  );
}

export default InternshipApplications;
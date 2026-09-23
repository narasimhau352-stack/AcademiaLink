import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BriefcaseBusiness,
  MapPin,
  Clock3,
  IndianRupee,
  CalendarDays,
  ArrowRight,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Send,
  Search,
  Star,
  MessageSquare,
} from "lucide-react";

import api from "../services/api";
import { Card } from "../components/ui";

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await api.get(
          "/internships/my-applications"
        );

        setApplications(
          response.data.applications || []
        );
      } catch (error) {
        console.error(error);

        setMessage(
          error.response?.data?.message ||
            "Failed to load your applications"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "SUBMITTED":
        return {
          wrapper:
            "bg-indigo-50 text-primary border-indigo-100",
          icon: Send,
        };

      case "UNDER_REVIEW":
        return {
          wrapper:
            "bg-amber-50 text-warning border-amber-100",
          icon: Search,
        };

      case "SHORTLISTED":
        return {
          wrapper:
            "bg-violet-50 text-violet border-violet-100",
          icon: Star,
        };

      case "INTERVIEW":
        return {
          wrapper:
            "bg-orange-50 text-orange-600 border-orange-100",
          icon: MessageSquare,
        };

      case "SELECTED":
        return {
          wrapper:
            "bg-emerald-50 text-success border-emerald-100",
          icon: CheckCircle2,
        };

      case "REJECTED":
        return {
          wrapper:
            "bg-rose-50 text-danger border-rose-100",
          icon: AlertTriangle,
        };

      default:
        return {
          wrapper:
            "bg-page text-body border-border",
          icon: FileText,
        };
    }
  };

  const formatStatus = (status) => {
    if (!status) return "Unknown";

    return status
      .replaceAll("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (letter) =>
        letter.toUpperCase()
      );
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-56 rounded bg-border" />

          <div className="h-5 w-96 max-w-full rounded bg-border" />

          <div className="h-56 rounded-xl bg-border" />

          <div className="h-56 rounded-xl bg-border" />
        </div>
      </div>
    );
  }

  const selectedCount = applications.filter(
    (application) =>
      application.status === "SELECTED"
  ).length;

  const interviewCount = applications.filter(
    (application) =>
      application.status === "INTERVIEW"
  ).length;

  const underReviewCount = applications.filter(
    (application) =>
      application.status === "UNDER_REVIEW"
  ).length;

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      {/* Header */}
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-primary">
            <BriefcaseBusiness className="h-3.5 w-3.5" />
            APPLICATION TRACKER
          </div>

          <h1 className="mt-3 font-display text-3xl font-bold text-heading">
            My Applications
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-body">
            Track the internships you have applied
            for and monitor your application status
            from one place.
          </p>
        </div>

        <Link
          to="/internships"
          className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          Browse Internships
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Summary */}
      {applications.length > 0 && (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            label="Total Applications"
            value={applications.length}
            icon={
              <BriefcaseBusiness className="h-5 w-5" />
            }
            iconStyle="bg-indigo-50 text-primary"
          />

          <SummaryCard
            label="Under Review"
            value={underReviewCount}
            icon={
              <Search className="h-5 w-5" />
            }
            iconStyle="bg-amber-50 text-warning"
          />

          <SummaryCard
            label="Interviews"
            value={interviewCount}
            icon={
              <MessageSquare className="h-5 w-5" />
            }
            iconStyle="bg-violet-50 text-violet"
          />

          <SummaryCard
            label="Selected"
            value={selectedCount}
            icon={
              <CheckCircle2 className="h-5 w-5" />
            }
            iconStyle="bg-emerald-50 text-success"
          />
        </div>
      )}

      {/* Error */}
      {message && (
        <div className="mt-6 flex items-start gap-3 rounded-lg border border-rose-200 bg-rose-50 p-4 text-danger">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />

          <p className="text-sm font-semibold">
            {message}
          </p>
        </div>
      )}

      {/* Empty State */}
      {applications.length === 0 &&
        !message && (
          <Card className="mt-8 p-10 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50">
              <BriefcaseBusiness className="h-8 w-8 text-primary" />
            </div>

            <h2 className="mt-5 font-display text-xl font-semibold text-heading">
              No applications yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-body">
              You have not applied for any internships
              yet. Explore available opportunities and
              start building your industry experience.
            </p>

            <Link
              to="/internships"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              Browse Internships
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Card>
        )}

      {/* Applications */}
      {applications.length > 0 && (
        <div className="mt-8 space-y-6">
          {applications.map((application) => {
            const internship =
              application.internship;

            const company =
              internship?.creator;

            const statusStyle =
              getStatusStyle(
                application.status
              );

            const StatusIcon =
              statusStyle.icon;

            return (
              <Card
                key={application.id}
                className="overflow-hidden p-0"
              >
                {/* Top Section */}
                <div className="p-6 sm:p-7">
                  <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50">
                        <BriefcaseBusiness className="h-6 w-6 text-primary" />
                      </div>

                      <div>
                        <h2 className="font-display text-xl font-bold text-heading">
                          {internship?.title ||
                            "Internship"}
                        </h2>

                        {company && (
                          <p className="mt-1 text-sm text-body">
                            Posted by{" "}
                            <span className="font-semibold text-heading">
                              {company.name}
                            </span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Status */}
                    <span
                      className={`inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${statusStyle.wrapper}`}
                    >
                      <StatusIcon className="h-4 w-4" />

                      {formatStatus(
                        application.status
                      )}
                    </span>
                  </div>

                  {/* Description */}
                  {internship?.description && (
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-body">
                      {internship.description}
                    </p>
                  )}

                  {/* Internship Info */}
                  <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <InfoCard
                      icon={
                        <MapPin className="h-4 w-4" />
                      }
                      label="Location"
                      value={
                        internship?.location ||
                        "Not specified"
                      }
                    />

                    <InfoCard
                      icon={
                        <Clock3 className="h-4 w-4" />
                      }
                      label="Duration"
                      value={
                        internship?.duration ||
                        "Not specified"
                      }
                    />

                    <InfoCard
                      icon={
                        <IndianRupee className="h-4 w-4" />
                      }
                      label="Stipend"
                      value={
                        internship?.stipend ||
                        "Not specified"
                      }
                    />
                  </div>
                </div>

                {/* Footer */}
                <div className="flex flex-col gap-4 border-t border-border bg-page px-6 py-5 sm:px-7 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-2 text-sm text-body">
                    <CalendarDays className="h-4 w-4" />

                    <span>
                      Applied on{" "}
                      <span className="font-semibold text-heading">
                        {new Date(
                          application.createdAt
                        ).toLocaleDateString()}
                      </span>
                    </span>
                  </div>

                  {internship?.id && (
                    <Link
                      to={`/internships/${internship.id}`}
                      className="inline-flex items-center justify-center gap-2 rounded-md border border-primary bg-white px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-indigo-50"
                    >
                      View Internship
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

function SummaryCard({
  label,
  value,
  icon,
  iconStyle,
}) {
  return (
    <Card className="flex items-center gap-4 p-5">
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${iconStyle}`}
      >
        {icon}
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-body">
          {label}
        </p>

        <p className="mt-1 font-display text-2xl font-bold text-heading">
          {value}
        </p>
      </div>
    </Card>
  );
}

function InfoCard({
  icon,
  label,
  value,
}) {
  return (
    <div className="rounded-lg border border-border bg-page p-4">
      <div className="flex items-center gap-2">
        <span className="text-primary">
          {icon}
        </span>

        <p className="text-xs font-semibold uppercase tracking-wide text-body">
          {label}
        </p>
      </div>

      <p className="mt-2 truncate text-sm font-semibold text-heading">
        {value}
      </p>
    </div>
  );
}

export default MyApplications;
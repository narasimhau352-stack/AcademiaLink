import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Briefcase,
  MapPin,
  Clock,
  IndianRupee,
  Users,
  ChevronRight,
  Plus,
  Building2,
  AlertTriangle,
  Search,
  SlidersHorizontal,
  X,
  Sparkles,
} from "lucide-react";

import api from "../services/api";
import { getUser } from "../services/auth";
import { Card, SkillChip } from "../components/ui";

function InternshipList() {
  const user = getUser();

  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Search and filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [durationFilter, setDurationFilter] = useState("");

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const response = await api.get("/internships");

        setInternships(response.data.internships || []);
      } catch (error) {
        console.error(error);

        setMessage(
          error.response?.data?.message ||
            "Failed to load internships"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, []);

  /*
   * Create filter options from REAL internship data.
   * No hardcoded internship/filter values are used.
   */
  const filterOptions = useMemo(() => {
    const statuses = [
      ...new Set(
        internships
          .map((internship) => internship.status)
          .filter(Boolean)
      ),
    ];

    const locations = [
      ...new Set(
        internships
          .map((internship) => internship.location)
          .filter(Boolean)
      ),
    ];

    const durations = [
      ...new Set(
        internships
          .map((internship) => internship.duration)
          .filter(Boolean)
      ),
    ];

    return {
      statuses,
      locations,
      durations,
    };
  }, [internships]);

  /*
   * Frontend filtering only.
   * The original API and backend matching/application logic are untouched.
   */
  const filteredInternships = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return internships.filter((internship) => {
      const title = internship.title?.toLowerCase() || "";
      const description =
        internship.description?.toLowerCase() || "";
      const location =
        internship.location?.toLowerCase() || "";
      const creator =
        internship.creator?.name?.toLowerCase() || "";

      const requiredSkills =
        internship.requiredSkills
          ?.map((item) => item.skill?.name || "")
          .join(" ")
          .toLowerCase() || "";

      const matchesSearch =
        !search ||
        title.includes(search) ||
        description.includes(search) ||
        location.includes(search) ||
        creator.includes(search) ||
        requiredSkills.includes(search);

      const matchesStatus =
        !statusFilter ||
        internship.status === statusFilter;

      const matchesLocation =
        !locationFilter ||
        internship.location === locationFilter;

      const matchesDuration =
        !durationFilter ||
        internship.duration === durationFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesLocation &&
        matchesDuration
      );
    });
  }, [
    internships,
    searchTerm,
    statusFilter,
    locationFilter,
    durationFilter,
  ]);

  const hasActiveFilters =
    searchTerm ||
    statusFilter ||
    locationFilter ||
    durationFilter;

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("");
    setLocationFilter("");
    setDurationFilter("");
  };

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div className="min-h-screen bg-page px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-xl border border-border bg-white p-10 text-center shadow-card">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100">
              <Briefcase className="h-7 w-7 animate-pulse text-violet" />
            </div>

            <h2 className="mt-5 font-display text-xl font-bold text-heading">
              Loading internship opportunities
            </h2>

            <p className="mt-2 text-sm text-body">
              Finding available opportunities for you...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-page">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* ================= HEADER ================= */}

        <div className="mb-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-100 px-3 py-1.5 text-xs font-bold tracking-wide text-violet">
                <Sparkles className="h-3.5 w-3.5" />
                CAREER OPPORTUNITIES
              </div>

              <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-heading sm:text-4xl">
                Internship
                <span className="text-violet"> Opportunities</span>
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-body sm:text-base">
                Explore real internship opportunities and discover
                roles that help you build practical skills and
                career experience.
              </p>
            </div>

            {user?.role === "INDUSTRY" && (
              <Link
                to="/internships/create"
                className="inline-flex w-fit items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-primary-dark"
              >
                <Plus className="h-4 w-4" />
                Create Internship
              </Link>
            )}
          </div>
        </div>

        {/* ================= SEARCH + FILTERS ================= */}

        <Card className="mb-8 p-4 sm:p-5">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100">
              <SlidersHorizontal className="h-4 w-4 text-violet" />
            </div>

            <div>
              <h2 className="font-display text-sm font-bold text-heading">
                Find your opportunity
              </h2>

              <p className="text-xs text-body">
                Search and filter the available internships.
              </p>
            </div>
          </div>

          <div className="grid gap-3 lg:grid-cols-12">

            {/* Search */}

            <div className="relative lg:col-span-5">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-body" />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
                placeholder="Search internships, skills, company..."
                className="h-11 w-full rounded-md border border-border bg-white pl-10 pr-4 text-sm text-heading outline-none transition placeholder:text-body focus:border-violet focus:ring-2 focus:ring-violet-100"
              />
            </div>

            {/* Status */}

            <div className="lg:col-span-2">
              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value)
                }
                className="h-11 w-full rounded-md border border-border bg-white px-3 text-sm text-heading outline-none focus:border-violet focus:ring-2 focus:ring-violet-100"
              >
                <option value="">All Status</option>

                {filterOptions.statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            {/* Location */}

            <div className="lg:col-span-2">
              <select
                value={locationFilter}
                onChange={(event) =>
                  setLocationFilter(event.target.value)
                }
                className="h-11 w-full rounded-md border border-border bg-white px-3 text-sm text-heading outline-none focus:border-violet focus:ring-2 focus:ring-violet-100"
              >
                <option value="">All Locations</option>

                {filterOptions.locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            {/* Duration */}

            <div className="lg:col-span-2">
              <select
                value={durationFilter}
                onChange={(event) =>
                  setDurationFilter(event.target.value)
                }
                className="h-11 w-full rounded-md border border-border bg-white px-3 text-sm text-heading outline-none focus:border-violet focus:ring-2 focus:ring-violet-100"
              >
                <option value="">All Durations</option>

                {filterOptions.durations.map((duration) => (
                  <option key={duration} value={duration}>
                    {duration}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear */}

            <div className="lg:col-span-1">
              <button
                type="button"
                onClick={clearFilters}
                disabled={!hasActiveFilters}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-md border border-border bg-white px-3 text-sm font-semibold text-heading transition hover:bg-page disabled:cursor-not-allowed disabled:opacity-40"
              >
                <X className="h-4 w-4" />
                <span className="hidden xl:inline">
                  Clear
                </span>
              </button>
            </div>
          </div>

          {/* Result count */}

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-4">
            <p className="text-xs text-body">
              Showing{" "}
              <span className="font-bold text-heading">
                {filteredInternships.length}
              </span>{" "}
              of{" "}
              <span className="font-bold text-heading">
                {internships.length}
              </span>{" "}
              internships
            </p>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-xs font-semibold text-violet hover:underline"
              >
                Clear all filters
              </button>
            )}
          </div>
        </Card>

        {/* ================= ERROR ================= */}

        {message && (
          <div className="mb-6 flex items-start gap-3 rounded-lg border border-rose-200 bg-rose-50 p-4 text-danger">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />

            <div>
              <p className="font-bold">
                Unable to load internships
              </p>

              <p className="mt-1 text-sm">
                {message}
              </p>
            </div>
          </div>
        )}

        {/* ================= EMPTY ORIGINAL DATA ================= */}

        {internships.length === 0 && !message && (
          <EmptyState user={user} />
        )}

        {/* ================= NO FILTER RESULTS ================= */}

        {internships.length > 0 &&
          filteredInternships.length === 0 && (
            <Card className="p-10 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100">
                <Search className="h-7 w-7 text-violet" />
              </div>

              <h2 className="mt-5 font-display text-xl font-bold text-heading">
                No matching internships
              </h2>

              <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-body">
                No existing internship matches your current
                search and filters.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-primary-dark"
              >
                <X className="h-4 w-4" />
                Clear Filters
              </button>
            </Card>
          )}

        {/* ================= INTERNSHIP GRID ================= */}

        {filteredInternships.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredInternships.map((internship) => (
              <InternshipCard
                key={internship.id}
                internship={internship}
                user={user}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   INTERNSHIP CARD
============================================================ */

function InternshipCard({ internship, user }) {
  return (
    <Card
      className="group flex h-full flex-col overflow-hidden p-0"
      hover
    >
      {/* Top accent */}

      <div className="h-1 bg-gradient-to-r from-primary to-violet" />

      <div className="flex flex-1 flex-col p-5 sm:p-6">

        {/* Card header */}

        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-violet-100 px-2.5 py-1 text-[10px] font-bold tracking-wide text-violet">
              <Briefcase className="h-3 w-3" />
              INTERNSHIP
            </div>

            <h2 className="font-display text-xl font-bold leading-tight text-heading transition group-hover:text-violet">
              {internship.title}
            </h2>
          </div>

          <StatusBadge status={internship.status} />
        </div>

        {/* Creator */}

        {internship.creator && (
          <div className="mt-4 flex items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50">
              <Building2 className="h-4 w-4 text-primary" />
            </div>

            <div className="min-w-0">
              <p className="text-[10px] font-medium uppercase tracking-wide text-body">
                Company / Creator
              </p>

              <p className="truncate text-sm font-bold text-heading">
                {internship.creator.name}
              </p>
            </div>
          </div>
        )}

        {/* Description */}

        {internship.description && (
          <p className="mt-4 line-clamp-3 text-sm leading-6 text-body">
            {internship.description}
          </p>
        )}

        {/* Information */}

        <div className="mt-5 grid grid-cols-1 gap-2">
          <InfoRow
            icon={<MapPin className="h-4 w-4" />}
            label="Location"
            value={
              internship.location || "Not specified"
            }
          />

          <InfoRow
            icon={<Clock className="h-4 w-4" />}
            label="Duration"
            value={
              internship.duration || "Not specified"
            }
          />

          <InfoRow
            icon={<IndianRupee className="h-4 w-4" />}
            label="Stipend"
            value={
              internship.stipend || "Not specified"
            }
          />
        </div>

        {/* Required skills */}

        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between gap-2">
            <h3 className="text-sm font-bold text-heading">
              Required Skills
            </h3>

            {internship.requiredSkills?.length > 0 && (
              <span className="text-[11px] font-medium text-body">
                {internship.requiredSkills.length} skills
              </span>
            )}
          </div>

          {internship.requiredSkills?.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {internship.requiredSkills.map((item) => (
                <SkillChip
                  key={item.id}
                  skill={`${item.skill?.name} — ${item.level}`}
                  type="neutral"
                />
              ))}
            </div>
          ) : (
            <p className="text-xs text-body">
              No specific skills listed.
            </p>
          )}
        </div>

        {/* Actions */}

        <div className="mt-auto pt-6">
          <Link
            to={`/internships/${internship.id}`}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 text-sm font-bold text-white transition hover:bg-primary-dark"
          >
            View Details
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>

          {user?.role === "INDUSTRY" &&
            internship.creatorId === user.id && (
              <Link
                to={`/internships/${internship.id}/applications`}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-md border border-violet-200 bg-violet-50 px-4 py-3 text-sm font-bold text-violet transition hover:bg-violet-100"
              >
                <Users className="h-4 w-4" />
                View Applicants
              </Link>
            )}
        </div>
      </div>
    </Card>
  );
}

/* ============================================================
   STATUS BADGE
============================================================ */

function StatusBadge({ status }) {
  const normalizedStatus = status?.toUpperCase();

  if (normalizedStatus === "OPEN") {
    return (
      <span className="shrink-0 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-bold tracking-wide text-success">
        OPEN
      </span>
    );
  }

  if (normalizedStatus === "CLOSED") {
    return (
      <span className="shrink-0 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-[10px] font-bold tracking-wide text-danger">
        CLOSED
      </span>
    );
  }

  return (
    <span className="shrink-0 rounded-full border border-border bg-page px-3 py-1 text-[10px] font-bold tracking-wide text-body">
      {status || "UNKNOWN"}
    </span>
  );
}

/* ============================================================
   INFORMATION ROW
============================================================ */

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-md border border-border bg-page px-3 py-2.5">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-primary shadow-sm">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-medium uppercase tracking-wide text-body">
          {label}
        </p>

        <p className="truncate text-sm font-semibold text-heading">
          {value}
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   EMPTY STATE
============================================================ */

function EmptyState({ user }) {
  return (
    <Card className="p-10 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100">
        <Briefcase className="h-7 w-7 text-violet" />
      </div>

      <h2 className="mt-5 font-display text-xl font-bold text-heading">
        No internships available
      </h2>

      <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-body">
        There are currently no internship opportunities
        available.
      </p>

      {user?.role === "INDUSTRY" && (
        <Link
          to="/internships/create"
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-primary-dark"
        >
          <Plus className="h-4 w-4" />
          Create Internship
        </Link>
      )}
    </Card>
  );
}

export default InternshipList;
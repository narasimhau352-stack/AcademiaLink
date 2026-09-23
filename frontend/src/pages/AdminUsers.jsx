import { useEffect, useState } from "react";
import {
  Users,
  Search,
  ShieldCheck,
  UserRound,
  GraduationCap,
  Building2,
  CheckCircle2,
  XCircle,
  UserCheck,
  UserX,
  AlertTriangle,
  CalendarDays,
  Filter,
  ChevronDown,
  Sparkles,
} from "lucide-react";

import { Card } from "../components/ui";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [updatingUserId, setUpdatingUserId] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/admin/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (data.success) {
          setUsers(data.users);
        } else {
          setError(data.message || "Failed to load users");
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);

        setError("Failed to connect to the server");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  /* Search + role + status filtering */
  const filteredUsers = users.filter((user) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      user.name?.toLowerCase().includes(searchText) ||
      user.email?.toLowerCase().includes(searchText);

    const matchesRole =
      roleFilter === "ALL" ||
      user.role === roleFilter;

    const matchesStatus =
      statusFilter === "ALL" ||
      (statusFilter === "ACTIVE" && user.isActive) ||
      (statusFilter === "INACTIVE" && !user.isActive);

    return matchesSearch && matchesRole && matchesStatus;
  });

  /* Activate / Deactivate */
  const toggleUserStatus = async (userId) => {
    try {
      setUpdatingUserId(userId);

      const response = await fetch(
        `http://localhost:5000/api/admin/users/${userId}/status`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setUsers((currentUsers) =>
          currentUsers.map((user) =>
            user.id === userId ? data.user : user
          )
        );
      } else {
        alert(
          data.message || "Failed to update user status"
        );
      }
    } catch (error) {
      console.error(
        "Failed to update user status:",
        error
      );

      alert("Failed to connect to the server");
    } finally {
      setUpdatingUserId(null);
    }
  };

  /* Loading */
  if (loading) {
    return (
      <div className="min-h-screen bg-page">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-64 rounded-lg bg-border" />

            <div className="h-5 w-96 max-w-full rounded bg-border" />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-28 rounded-lg bg-border"
                />
              ))}
            </div>

            <div className="h-32 rounded-xl bg-border" />

            <div className="h-[500px] rounded-xl bg-border" />
          </div>
        </div>
      </div>
    );
  }

  /* Error */
  if (error) {
    return (
      <div className="min-h-screen bg-page">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Card className="border-rose-200 bg-rose-50 p-8 text-center">
            <AlertTriangle className="mx-auto h-10 w-10 text-danger" />

            <h2 className="mt-4 font-display text-xl font-bold text-heading">
              Unable to load users
            </h2>

            <p className="mt-2 text-sm text-danger">
              {error}
            </p>
          </Card>
        </div>
      </div>
    );
  }

  /* Real user statistics */
  const activeUsers = users.filter(
    (user) => user.isActive
  ).length;

  const inactiveUsers =
    users.length - activeUsers;

  const studentCount = users.filter(
    (user) => user.role === "STUDENT"
  ).length;

  const facultyCount = users.filter(
    (user) => user.role === "FACULTY"
  ).length;

  const industryCount = users.filter(
    (user) => user.role === "INDUSTRY"
  ).length;

  const adminCount = users.filter(
    (user) => user.role === "ADMIN"
  ).length;

  const hasFilters =
    search ||
    roleFilter !== "ALL" ||
    statusFilter !== "ALL";

  const clearFilters = () => {
    setSearch("");
    setRoleFilter("ALL");
    setStatusFilter("ALL");
  };

  return (
    <div className="min-h-screen bg-page">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="relative overflow-hidden rounded-xl border border-border bg-white p-6 shadow-card sm:p-8">
          <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-violet/10 blur-3xl" />

          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold tracking-wide text-primary">
                <ShieldCheck className="h-3.5 w-3.5" />
                ADMINISTRATION
              </div>

              <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-heading sm:text-4xl">
                User Management
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-body">
                Manage registered users, monitor account
                status and control access across the
                AcademiaLink platform.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-indigo-100 bg-indigo-50/70 px-5 py-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white shadow-card">
                <Users className="h-5 w-5 text-primary" />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-body">
                  Total Users
                </p>

                <p className="font-display text-2xl font-bold text-heading">
                  {users.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            label="Active Users"
            value={activeUsers}
            icon={<UserCheck className="h-5 w-5" />}
            iconStyle="bg-emerald-50 text-success"
          />

          <SummaryCard
            label="Inactive Users"
            value={inactiveUsers}
            icon={<UserX className="h-5 w-5" />}
            iconStyle="bg-rose-50 text-danger"
          />

          <SummaryCard
            label="Students"
            value={studentCount}
            icon={<GraduationCap className="h-5 w-5" />}
            iconStyle="bg-indigo-50 text-primary"
          />

          <SummaryCard
            label="Industry"
            value={industryCount}
            icon={<Building2 className="h-5 w-5" />}
            iconStyle="bg-amber-50 text-warning"
          />
        </div>

        {/* User Management Summary */}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <MiniStat
            label="Faculty"
            value={facultyCount}
            icon={<ShieldCheck className="h-4 w-4" />}
          />

          <MiniStat
            label="Administrators"
            value={adminCount}
            icon={<ShieldCheck className="h-4 w-4" />}
          />

          <MiniStat
            label="Visible Results"
            value={filteredUsers.length}
            icon={<Search className="h-4 w-4" />}
          />
        </div>

        {/* Search & Filters */}
        <Card className="mt-6 p-5 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50">
                <Filter className="h-5 w-5 text-primary" />
              </div>

              <div>
                <h2 className="font-display text-lg font-bold text-heading">
                  Search & Filters
                </h2>

                <p className="text-sm text-body">
                  Find users by name, email, role or account
                  status.
                </p>
              </div>
            </div>

            {hasFilters && (
              <button
                onClick={clearFilters}
                className="w-fit text-sm font-semibold text-primary transition hover:text-primary-dark"
              >
                Clear all filters
              </button>
            )}
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {/* Search */}
            <div className="lg:col-span-1">
              <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-body">
                Search Users
              </label>

              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-body" />

                <input
                  type="text"
                  placeholder="Name or email..."
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  className="w-full rounded-md border border-border bg-white py-3 pl-10 pr-4 text-sm text-heading outline-none transition placeholder:text-body focus:border-primary focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-body">
                Role
              </label>

              <div className="relative">
                <select
                  value={roleFilter}
                  onChange={(event) =>
                    setRoleFilter(event.target.value)
                  }
                  className="w-full appearance-none rounded-md border border-border bg-white px-4 py-3 pr-10 text-sm text-heading outline-none transition focus:border-primary focus:ring-2 focus:ring-indigo-100"
                >
                  <option value="ALL">All Roles</option>
                  <option value="STUDENT">Student</option>
                  <option value="FACULTY">Faculty</option>
                  <option value="INDUSTRY">Industry</option>
                  <option value="ADMIN">Admin</option>
                </select>

                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-body" />
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-body">
                Account Status
              </label>

              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(event.target.value)
                  }
                  className="w-full appearance-none rounded-md border border-border bg-white px-4 py-3 pr-10 text-sm text-heading outline-none transition focus:border-primary focus:ring-2 focus:ring-indigo-100"
                >
                  <option value="ALL">
                    All Statuses
                  </option>
                  <option value="ACTIVE">
                    Active
                  </option>
                  <option value="INACTIVE">
                    Inactive
                  </option>
                </select>

                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-body" />
              </div>
            </div>
          </div>
        </Card>

        {/* Results Header */}
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-body">
              Showing{" "}
              <span className="font-bold text-heading">
                {filteredUsers.length}
              </span>{" "}
              of{" "}
              <span className="font-bold text-heading">
                {users.length}
              </span>{" "}
              users
            </p>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-body shadow-card">
            <Sparkles className="h-3.5 w-3.5 text-violet" />
            Live user directory
          </div>
        </div>

        {/* Desktop Table */}
        <Card className="mt-4 hidden overflow-hidden p-0 md:block">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead className="border-b border-border bg-page">
                <tr>
                  <TableHeader>ID</TableHeader>
                  <TableHeader>User</TableHeader>
                  <TableHeader>Role</TableHeader>
                  <TableHeader>Status</TableHeader>
                  <TableHeader>Action</TableHeader>
                  <TableHeader>Joined</TableHeader>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                {filteredUsers.length === 0 ? (
                  <EmptyUsersRow />
                ) : (
                  filteredUsers.map((user) => (
                    <UserTableRow
                      key={user.id}
                      user={user}
                      updatingUserId={updatingUserId}
                      toggleUserStatus={toggleUserStatus}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Mobile Cards */}
        <div className="mt-4 space-y-4 md:hidden">
          {filteredUsers.length === 0 ? (
            <Card className="p-8 text-center">
              <Search className="mx-auto h-8 w-8 text-body" />

              <p className="mt-3 font-semibold text-heading">
                No users found
              </p>

              <p className="mt-1 text-sm text-body">
                Try changing your search or filters.
              </p>
            </Card>
          ) : (
            filteredUsers.map((user) => (
              <MobileUserCard
                key={user.id}
                user={user}
                updatingUserId={updatingUserId}
                toggleUserStatus={toggleUserStatus}
              />
            ))
          )}
        </div>

        {/* Footer information */}
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-body">
          <span className="inline-flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-violet" />
            Faculty accounts:{" "}
            <strong className="text-heading">
              {facultyCount}
            </strong>
          </span>

          <span className="inline-flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-success" />
            Active:{" "}
            <strong className="text-heading">
              {activeUsers}
            </strong>
          </span>

          <span className="inline-flex items-center gap-2">
            <XCircle className="h-4 w-4 text-danger" />
            Inactive:{" "}
            <strong className="text-heading">
              {inactiveUsers}
            </strong>
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Desktop User Row ---------------- */

function UserTableRow({
  user,
  updatingUserId,
  toggleUserStatus,
}) {
  return (
    <tr className="transition-colors hover:bg-page/70">
      {/* ID */}
      <td className="px-6 py-5">
        <span className="font-mono text-xs font-semibold text-body">
          #{user.id}
        </span>
      </td>

      {/* User */}
      <td className="px-6 py-5">
        <UserIdentity user={user} />
      </td>

      {/* Role */}
      <td className="px-6 py-5">
        <RoleBadge role={user.role} />
      </td>

      {/* Status */}
      <td className="px-6 py-5">
        <StatusBadge isActive={user.isActive} />
      </td>

      {/* Action */}
      <td className="px-6 py-5">
        <StatusToggle
          user={user}
          updatingUserId={updatingUserId}
          toggleUserStatus={toggleUserStatus}
        />
      </td>

      {/* Joined */}
      <td className="px-6 py-5">
        <div className="flex items-center gap-2 text-sm text-body">
          <CalendarDays className="h-4 w-4" />

          {new Date(
            user.createdAt
          ).toLocaleDateString()}
        </div>
      </td>
    </tr>
  );
}

/* ---------------- Mobile User Card ---------------- */

function MobileUserCard({
  user,
  updatingUserId,
  toggleUserStatus,
}) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <UserIdentity user={user} />

        <span className="font-mono text-xs font-semibold text-body">
          #{user.id}
        </span>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <RoleBadge role={user.role} />

        <StatusBadge isActive={user.isActive} />
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
        <div className="flex items-center gap-2 text-xs text-body">
          <CalendarDays className="h-4 w-4" />

          {new Date(
            user.createdAt
          ).toLocaleDateString()}
        </div>

        <StatusToggle
          user={user}
          updatingUserId={updatingUserId}
          toggleUserStatus={toggleUserStatus}
        />
      </div>
    </Card>
  );
}

/* ---------------- User Identity ---------------- */

function UserIdentity({ user }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-violet-100">
        <UserRound className="h-5 w-5 text-primary" />
      </div>

      <div className="min-w-0">
        <p className="truncate text-sm font-bold text-heading">
          {user.name}
        </p>

        <p className="mt-0.5 max-w-[250px] truncate text-xs text-body">
          {user.email}
        </p>
      </div>
    </div>
  );
}

/* ---------------- Status Toggle ---------------- */

function StatusToggle({
  user,
  updatingUserId,
  toggleUserStatus,
}) {
  const updating =
    updatingUserId === user.id;

  return (
    <button
      onClick={() =>
        toggleUserStatus(user.id)
      }
      disabled={updating}
      className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-xs font-bold transition disabled:cursor-not-allowed disabled:opacity-50 ${
        user.isActive
          ? "bg-rose-50 text-danger hover:bg-rose-100"
          : "bg-emerald-50 text-success hover:bg-emerald-100"
      }`}
    >
      {updating ? (
        <>
          <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
          Updating
        </>
      ) : user.isActive ? (
        <>
          <UserX className="h-3.5 w-3.5" />
          Deactivate
        </>
      ) : (
        <>
          <UserCheck className="h-3.5 w-3.5" />
          Activate
        </>
      )}
    </button>
  );
}

/* ---------------- Status Badge ---------------- */

function StatusBadge({ isActive }) {
  return isActive ? (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-success">
      <CheckCircle2 className="h-3.5 w-3.5" />
      Active
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-bold text-danger">
      <XCircle className="h-3.5 w-3.5" />
      Inactive
    </span>
  );
}

/* ---------------- Role Badge ---------------- */

function RoleBadge({ role }) {
  const styles = {
    STUDENT:
      "bg-indigo-50 text-primary border-indigo-100",
    FACULTY:
      "bg-violet-50 text-violet border-violet-100",
    INDUSTRY:
      "bg-amber-50 text-warning border-amber-100",
    ADMIN:
      "bg-slate-100 text-heading border-border",
  };

  const labels = {
    STUDENT: "Student",
    FACULTY: "Faculty",
    INDUSTRY: "Industry",
    ADMIN: "Admin",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-bold ${
        styles[role] ||
        "bg-page text-body border-border"
      }`}
    >
      {labels[role] || role}
    </span>
  );
}

/* ---------------- Summary Card ---------------- */

function SummaryCard({
  label,
  value,
  icon,
  iconStyle,
}) {
  return (
    <Card className="flex items-center gap-4 p-5 transition duration-200 hover:-translate-y-0.5 hover:shadow-card">
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${iconStyle}`}
      >
        {icon}
      </div>

      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-body">
          {label}
        </p>

        <p className="mt-1 font-display text-2xl font-bold text-heading">
          {value}
        </p>
      </div>
    </Card>
  );
}

/* ---------------- Mini Stat ---------------- */

function MiniStat({
  label,
  value,
  icon,
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-white p-4 shadow-card">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-indigo-50 text-primary">
          {icon}
        </div>

        <span className="text-sm font-semibold text-heading">
          {label}
        </span>
      </div>

      <span className="font-display text-xl font-bold text-heading">
        {value}
      </span>
    </div>
  );
}

/* ---------------- Table Header ---------------- */

function TableHeader({ children }) {
  return (
    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-body">
      {children}
    </th>
  );
}

/* ---------------- Empty Desktop Row ---------------- */

function EmptyUsersRow() {
  return (
    <tr>
      <td
        colSpan="6"
        className="px-6 py-14 text-center"
      >
        <Search className="mx-auto h-9 w-9 text-body" />

        <p className="mt-3 font-semibold text-heading">
          No users found
        </p>

        <p className="mt-1 text-sm text-body">
          Try changing your search or filters.
        </p>
      </td>
    </tr>
  );
}

export default AdminUsers;
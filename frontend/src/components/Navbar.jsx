import { useEffect, useState } from "react";
import {
  NavLink,
  Link,
  useNavigate,
} from "react-router-dom";

import {
  GraduationCap,
  Menu,
  X,
  ChevronDown,
  Bell,
  User,
  LogOut,
  LayoutDashboard,
  BookOpen,
  Brain,
  BriefcaseBusiness,
  FolderKanban,
  ClipboardCheck,
  Users,
  Building2,
  Plus,
  ExternalLink,
  CheckCheck,
} from "lucide-react";

import {
  isAuthenticated,
  getUser,
  logout,
} from "../services/auth";

function Navbar() {
  const navigate = useNavigate();

  const loggedIn = isAuthenticated();
  const user = getUser();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Notifications
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] =
    useState(false);
  const [notificationLoading, setNotificationLoading] =
    useState(false);

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  // ==========================================
  // CLOSE MENUS
  // ==========================================

  const closeMenus = () => {
    setMobileOpen(false);
    setMoreOpen(false);
    setProfileOpen(false);
    setShowNotifications(false);
  };

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {
    closeMenus();
    logout();
    navigate("/login");
  };

  // ==========================================
  // FETCH NOTIFICATIONS
  // ==========================================

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = localStorage.getItem("token");

      if (!token || !loggedIn) {
        setNotifications([]);
        return;
      }

      try {
        setNotificationLoading(true);

        const response = await fetch(
          "http://localhost:5000/api/notifications",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (data.success) {
          setNotifications(data.notifications || []);
        }
      } catch (error) {
        console.error(
          "Failed to fetch notifications:",
          error
        );
      } finally {
        setNotificationLoading(false);
      }
    };

    fetchNotifications();
  }, [loggedIn]);

  // ==========================================
  // MARK ONE NOTIFICATION AS READ
  // ==========================================

  const markNotificationAsRead = async (
    notificationId
  ) => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/notifications/${notificationId}/read`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setNotifications((currentNotifications) =>
          currentNotifications.map((notification) =>
            notification.id === notificationId
              ? {
                  ...notification,
                  isRead: true,
                }
              : notification
          )
        );
      }
    } catch (error) {
      console.error(
        "Failed to mark notification as read:",
        error
      );
    }
  };

  // ==========================================
  // MARK ALL NOTIFICATIONS AS READ
  // ==========================================

  const markAllNotificationsAsRead = async () => {
    const token = localStorage.getItem("token");

    if (!token || unreadCount === 0) return;

    try {
      const response = await fetch(
        "http://localhost:5000/api/notifications/read-all",
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setNotifications((currentNotifications) =>
          currentNotifications.map((notification) => ({
            ...notification,
            isRead: true,
          }))
        );
      }
    } catch (error) {
      console.error(
        "Failed to mark all notifications as read:",
        error
      );
    }
  };

  // ==========================================
  // NAV LINK STYLE
  // ==========================================

  const navLinkClass = ({ isActive }) =>
    `relative flex items-center gap-1.5 px-2.5 py-2 text-sm font-medium transition-colors duration-200 ${
      isActive
        ? "text-primary"
        : "text-heading hover:text-primary"
    }`;

  // ==========================================
  // DROPDOWN LINK STYLE
  // ==========================================

  const dropdownLinkClass =
    "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-heading transition-colors hover:bg-page hover:text-primary";

  // ==========================================
  // NOTIFICATION PANEL
  // ==========================================

  const NotificationPanel = ({ mobile = false }) => {
    return (
      <div
        className={`z-50 overflow-hidden rounded-lg border border-border bg-white shadow-card ${
          mobile
            ? "relative mt-2 w-full"
            : "absolute right-0 top-12 w-96 max-w-[calc(100vw-2rem)]"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-4 py-4">
          <div>
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-primary" />

              <h3 className="text-sm font-semibold text-heading">
                Notifications
              </h3>
            </div>

            {unreadCount > 0 ? (
              <p className="mt-1 text-xs text-body">
                {unreadCount} unread notification
                {unreadCount !== 1 ? "s" : ""}
              </p>
            ) : (
              <p className="mt-1 text-xs text-body">
                You're all caught up
              </p>
            )}
          </div>

          {unreadCount > 0 && (
            <button
              onClick={markAllNotificationsAsRead}
              className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary-dark"
            >
              <CheckCheck className="h-3.5 w-3.5" />
              Mark all
            </button>
          )}
        </div>

        {/* Notifications */}
        <div className="max-h-96 overflow-y-auto">
          {notificationLoading ? (
            <div className="px-4 py-10 text-center">
              <div className="mx-auto mb-3 h-6 w-6 animate-spin rounded-full border-2 border-border border-t-primary" />

              <p className="text-sm text-body">
                Loading notifications...
              </p>
            </div>
          ) : notifications.length === 0 ? (
            <div className="px-4 py-12 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-page">
                <Bell className="h-5 w-5 text-body" />
              </div>

              <p className="text-sm font-semibold text-heading">
                No notifications
              </p>

              <p className="mt-1 text-xs text-body">
                New updates will appear here.
              </p>
            </div>
          ) : (
            notifications.map((notification) => (
              <button
                key={notification.id}
                onClick={() =>
                  markNotificationAsRead(
                    notification.id
                  )
                }
                className={`w-full border-b border-border px-4 py-4 text-left transition-colors last:border-b-0 ${
                  !notification.isRead
                    ? "bg-primary/5 hover:bg-primary/10"
                    : "bg-white hover:bg-page"
                }`}
              >
                <div className="flex gap-3">
                  {/* Status dot */}
                  <div className="pt-1.5">
                    <span
                      className={`block h-2.5 w-2.5 rounded-full ${
                        !notification.isRead
                          ? "bg-primary"
                          : "bg-border"
                      }`}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p
                        className={`text-sm ${
                          !notification.isRead
                            ? "font-semibold text-heading"
                            : "font-medium text-heading"
                        }`}
                      >
                        {notification.title}
                      </p>

                      {!notification.isRead && (
                        <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                          NEW
                        </span>
                      )}
                    </div>

                    <p className="mt-1 text-xs leading-5 text-body">
                      {notification.message}
                    </p>

                    <p className="mt-2 text-[11px] text-body">
                      {new Date(
                        notification.createdAt
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    );
  };

  // ==========================================
  // MORE MENU
  // ==========================================

  const MoreMenu = () => {
    return (
      <div className="absolute right-0 top-12 z-50 w-64 overflow-hidden rounded-lg border border-border bg-white p-2 shadow-card">
        <div className="px-3 pb-2 pt-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-body">
            Explore
          </p>
        </div>

        <Link
          to="/projects"
          onClick={closeMenus}
          className={dropdownLinkClass}
        >
          <FolderKanban className="h-4 w-4 text-body" />
          <span>Projects</span>
        </Link>

        {loggedIn && (
          <Link
            to="/internships"
            onClick={closeMenus}
            className={dropdownLinkClass}
          >
            <BriefcaseBusiness className="h-4 w-4 text-body" />
            <span>Internships</span>
          </Link>
        )}

        {loggedIn &&
          user?.role === "STUDENT" && (
            <Link
              to="/my-applications"
              onClick={closeMenus}
              className={dropdownLinkClass}
            >
              <ClipboardCheck className="h-4 w-4 text-body" />
              <span>My Applications</span>
            </Link>
          )}

        {loggedIn &&
          (user?.role === "FACULTY" ||
            user?.role === "INDUSTRY") && (
            <Link
              to="/projects/create"
              onClick={closeMenus}
              className={dropdownLinkClass}
            >
              <Plus className="h-4 w-4 text-body" />
              <span>Create Project</span>
            </Link>
          )}

        {/* Industry */}
        {loggedIn &&
          user?.role === "INDUSTRY" && (
            <>
              <div className="my-2 border-t border-border" />

              <div className="px-3 pb-2 pt-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-body">
                  Industry
                </p>
              </div>

              <Link
                to="/industry-roles/create"
                onClick={closeMenus}
                className={dropdownLinkClass}
              >
                <Building2 className="h-4 w-4 text-body" />
                <span>Create Industry Role</span>
              </Link>

              <Link
                to="/internships/create"
                onClick={closeMenus}
                className="flex items-center gap-3 rounded-md bg-primary/5 px-3 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
              >
                <Plus className="h-4 w-4" />
                <span>Post Internship</span>
              </Link>
            </>
          )}
      </div>
    );
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-white/95 shadow-card backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex min-h-16 items-center justify-between gap-4">

          {/* =====================================
              LOGO
          ====================================== */}

          <Link
            to="/"
            onClick={closeMenus}
            className="group flex shrink-0 items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white shadow-card transition-transform duration-200 group-hover:scale-105">
              <GraduationCap className="h-5 w-5" />
            </div>

            <div className="hidden sm:block">
              <h1 className="font-display text-base font-bold tracking-tight text-heading">
                AcademiaLink
              </h1>

              <p className="text-[10px] font-medium tracking-wide text-body">
                ACADEMIA • INDUSTRY • INNOVATION
              </p>
            </div>
          </Link>

          {/* =====================================
              DESKTOP NAVIGATION
          ====================================== */}

          <div className="hidden items-center gap-1 xl:flex">

            <NavLink
              to="/"
              className={navLinkClass}
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              className={navLinkClass}
            >
              About
            </NavLink>

            <NavLink
              to="/features"
              className={navLinkClass}
            >
              Features
            </NavLink>

            {loggedIn && (
              <NavLink
                to="/dashboard"
                className={navLinkClass}
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </NavLink>
            )}

            {/* Student */}
            {loggedIn &&
              user?.role === "STUDENT" && (
                <>
                  <NavLink
                    to="/skill-assessment"
                    className={navLinkClass}
                  >
                    <ClipboardCheck className="h-4 w-4" />
                    Assessment
                  </NavLink>

                  <NavLink
                    to="/learning-recommendations"
                    className={navLinkClass}
                  >
                    <BookOpen className="h-4 w-4" />
                    Learning
                  </NavLink>

                  <NavLink
                    to="/smart-recommendations"
                    className={navLinkClass}
                  >
                    <Brain className="h-4 w-4" />
                    Smart Matches
                  </NavLink>

                  <NavLink
                    to="/portfolio"
                    className={navLinkClass}
                  >
                    Portfolio
                  </NavLink>
                </>
              )}

            {/* Faculty */}
            {loggedIn &&
              user?.role === "FACULTY" && (
                <NavLink
                  to="/faculty-dashboard"
                  className={navLinkClass}
                >
                  <Users className="h-4 w-4" />
                  Faculty Dashboard
                </NavLink>
              )}

            {/* Industry */}
            {loggedIn &&
              user?.role === "INDUSTRY" && (
                <NavLink
                  to="/industry-dashboard"
                  className={navLinkClass}
                >
                  <Building2 className="h-4 w-4" />
                  Industry Dashboard
                </NavLink>
              )}

            {/* Admin */}
            {loggedIn &&
              user?.role === "ADMIN" && (
                <>
                  <NavLink
                    to="/admin-dashboard"
                    className={navLinkClass}
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Admin Dashboard
                  </NavLink>

                  <NavLink
                    to="/admin-users"
                    className={navLinkClass}
                  >
                    <Users className="h-4 w-4" />
                    Users
                  </NavLink>
                </>
              )}

            {/* More */}
            <div className="relative">
              <button
                onClick={() =>
                  setMoreOpen(!moreOpen)
                }
                className={`flex items-center gap-1.5 px-2.5 py-2 text-sm font-medium transition-colors ${
                  moreOpen
                    ? "text-primary"
                    : "text-heading hover:text-primary"
                }`}
              >
                More

                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    moreOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {moreOpen && <MoreMenu />}
            </div>
          </div>

          {/* =====================================
              RIGHT SIDE
          ====================================== */}

          <div className="hidden items-center gap-2 lg:flex">

            {/* Notifications */}
            {loggedIn && (
              <div className="relative">
                <button
                  onClick={() => {
                    setShowNotifications(
                      !showNotifications
                    );
                    setProfileOpen(false);
                  }}
                  className={`relative flex h-10 w-10 items-center justify-center rounded-md transition-colors ${
                    showNotifications
                      ? "bg-primary/10 text-primary"
                      : "text-body hover:bg-page hover:text-primary"
                  }`}
                  title="Notifications"
                  aria-label="Notifications"
                >
                  <Bell className="h-5 w-5" />

                  {unreadCount > 0 && (
                    <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[9px] font-bold text-white ring-2 ring-white">
                      {unreadCount > 9
                        ? "9+"
                        : unreadCount}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <NotificationPanel />
                )}
              </div>
            )}

            {/* User */}
            {loggedIn ? (
              <div className="relative">
                <button
                  onClick={() => {
                    setProfileOpen(!profileOpen);
                    setShowNotifications(false);
                  }}
                  className="flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors hover:bg-page"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <User className="h-4 w-4" />
                  </div>

                  <div className="hidden max-w-28 text-left xl:block">
                    <p className="truncate text-xs font-semibold text-heading">
                      {user?.name}
                    </p>

                    <p className="text-[10px] capitalize text-body">
                      {user?.role?.toLowerCase()}
                    </p>
                  </div>

                  <ChevronDown
                    className={`h-4 w-4 text-body transition-transform ${
                      profileOpen
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 top-12 z-50 w-56 overflow-hidden rounded-lg border border-border bg-white p-2 shadow-card">
                    <div className="mb-2 border-b border-border px-3 pb-3 pt-2">
                      <p className="truncate text-sm font-semibold text-heading">
                        {user?.name}
                      </p>

                      <p className="mt-0.5 truncate text-xs text-body">
                        {user?.email}
                      </p>
                    </div>

                    {user?.role === "STUDENT" && (
                      <Link
                        to="/portfolio"
                        onClick={closeMenus}
                        className={dropdownLinkClass}
                      >
                        <User className="h-4 w-4 text-body" />
                        My Portfolio
                      </Link>
                    )}

                    <Link
                      to="/projects"
                      onClick={closeMenus}
                      className={dropdownLinkClass}
                    >
                      <FolderKanban className="h-4 w-4 text-body" />
                      Projects
                    </Link>

                    <div className="my-2 border-t border-border" />

                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-danger transition-colors hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="rounded-md border border-border px-4 py-2 text-sm font-medium text-heading transition-colors hover:bg-page"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* =====================================
              MOBILE BUTTON
          ====================================== */}

          <button
            onClick={() => {
              setMobileOpen(!mobileOpen);
              setMoreOpen(false);
              setProfileOpen(false);
              setShowNotifications(false);
            }}
            className="flex h-10 w-10 items-center justify-center rounded-md text-heading transition-colors hover:bg-page lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* =====================================
            MOBILE NAVIGATION
        ====================================== */}

        {mobileOpen && (
          <div className="border-t border-border py-4 lg:hidden">
            <div className="space-y-1">

              {/* Public */}
              <p className="px-3 pb-1 pt-1 text-[10px] font-semibold uppercase tracking-wider text-body">
                Navigation
              </p>

              <NavLink
                to="/"
                onClick={closeMenus}
                className={navLinkClass}
              >
                Home
              </NavLink>

              <NavLink
                to="/about"
                onClick={closeMenus}
                className={navLinkClass}
              >
                About
              </NavLink>

              <NavLink
                to="/features"
                onClick={closeMenus}
                className={navLinkClass}
              >
                Features
              </NavLink>

              {/* Dashboard */}
              {loggedIn && (
                <>
                  <div className="my-3 border-t border-border" />

                  <p className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-wider text-body">
                    Workspace
                  </p>

                  <NavLink
                    to="/dashboard"
                    onClick={closeMenus}
                    className={navLinkClass}
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </NavLink>
                </>
              )}

              {/* Student */}
              {loggedIn &&
                user?.role === "STUDENT" && (
                  <>
                    <NavLink
                      to="/skill-assessment"
                      onClick={closeMenus}
                      className={navLinkClass}
                    >
                      <ClipboardCheck className="h-4 w-4" />
                      Skill Assessment
                    </NavLink>

                    <NavLink
                      to="/learning-recommendations"
                      onClick={closeMenus}
                      className={navLinkClass}
                    >
                      <BookOpen className="h-4 w-4" />
                      Learning
                    </NavLink>

                    <NavLink
                      to="/smart-recommendations"
                      onClick={closeMenus}
                      className={navLinkClass}
                    >
                      <Brain className="h-4 w-4" />
                      Smart Matches
                    </NavLink>

                    <NavLink
                      to="/portfolio"
                      onClick={closeMenus}
                      className={navLinkClass}
                    >
                      <User className="h-4 w-4" />
                      My Portfolio
                    </NavLink>

                    <NavLink
                      to="/my-applications"
                      onClick={closeMenus}
                      className={navLinkClass}
                    >
                      <ClipboardCheck className="h-4 w-4" />
                      My Applications
                    </NavLink>
                  </>
                )}

              {/* Faculty */}
              {loggedIn &&
                user?.role === "FACULTY" && (
                  <NavLink
                    to="/faculty-dashboard"
                    onClick={closeMenus}
                    className={navLinkClass}
                  >
                    <Users className="h-4 w-4" />
                    Faculty Dashboard
                  </NavLink>
                )}

              {/* Industry */}
              {loggedIn &&
                user?.role === "INDUSTRY" && (
                  <>
                    <NavLink
                      to="/industry-dashboard"
                      onClick={closeMenus}
                      className={navLinkClass}
                    >
                      <Building2 className="h-4 w-4" />
                      Industry Dashboard
                    </NavLink>

                    <NavLink
                      to="/industry-roles/create"
                      onClick={closeMenus}
                      className={navLinkClass}
                    >
                      <Plus className="h-4 w-4" />
                      Create Industry Role
                    </NavLink>

                    <NavLink
                      to="/internships/create"
                      onClick={closeMenus}
                      className={navLinkClass}
                    >
                      <Plus className="h-4 w-4" />
                      Post Internship
                    </NavLink>
                  </>
                )}

              {/* Admin */}
              {loggedIn &&
                user?.role === "ADMIN" && (
                  <>
                    <NavLink
                      to="/admin-dashboard"
                      onClick={closeMenus}
                      className={navLinkClass}
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Admin Dashboard
                    </NavLink>

                    <NavLink
                      to="/admin-users"
                      onClick={closeMenus}
                      className={navLinkClass}
                    >
                      <Users className="h-4 w-4" />
                      Manage Users
                    </NavLink>
                  </>
                )}

              {/* Common */}
              {loggedIn && (
                <>
                  <div className="my-3 border-t border-border" />

                  <p className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-wider text-body">
                    Explore
                  </p>
                </>
              )}

              <NavLink
                to="/projects"
                onClick={closeMenus}
                className={navLinkClass}
              >
                <FolderKanban className="h-4 w-4" />
                Projects
              </NavLink>

              {loggedIn && (
                <NavLink
                  to="/internships"
                  onClick={closeMenus}
                  className={navLinkClass}
                >
                  <BriefcaseBusiness className="h-4 w-4" />
                  Internships
                </NavLink>
              )}

              {loggedIn &&
                (user?.role === "FACULTY" ||
                  user?.role === "INDUSTRY") && (
                  <NavLink
                    to="/projects/create"
                    onClick={closeMenus}
                    className={navLinkClass}
                  >
                    <Plus className="h-4 w-4" />
                    Create Project
                  </NavLink>
                )}

              {/* Mobile Notifications */}
              {loggedIn && (
                <>
                  <div className="my-3 border-t border-border" />

                  <button
                    onClick={() =>
                      setShowNotifications(
                        !showNotifications
                      )
                    }
                    className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium text-heading transition-colors hover:bg-page"
                  >
                    <span className="flex items-center gap-3">
                      <Bell className="h-4 w-4 text-body" />
                      Notifications
                    </span>

                    {unreadCount > 0 && (
                      <span className="rounded-full bg-danger px-2 py-0.5 text-[10px] font-bold text-white">
                        {unreadCount > 9
                          ? "9+"
                          : unreadCount}
                      </span>
                    )}
                  </button>

                  {showNotifications && (
                    <NotificationPanel mobile />
                  )}
                </>
              )}

              {/* Mobile Auth */}
              <div className="mt-4 border-t border-border pt-4">
                {loggedIn ? (
                  <>
                    <div className="mb-3 flex items-center gap-3 px-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <User className="h-4 w-4" />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-heading">
                          {user?.name}
                        </p>

                        <p className="text-xs capitalize text-body">
                          {user?.role?.toLowerCase()}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center justify-center gap-2 rounded-md border border-red-200 px-4 py-2.5 text-sm font-medium text-danger transition-colors hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      to="/login"
                      onClick={closeMenus}
                      className="rounded-md border border-border px-4 py-2.5 text-center text-sm font-medium text-heading transition-colors hover:bg-page"
                    >
                      Login
                    </Link>

                    <Link
                      to="/register"
                      onClick={closeMenus}
                      className="rounded-md bg-primary px-4 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-primary-dark"
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
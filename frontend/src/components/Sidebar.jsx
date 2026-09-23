import { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  GraduationCap, Home, Info, Sparkles, LayoutDashboard, ClipboardCheck,
  BookOpen, Brain, BriefcaseBusiness, ClipboardList, UserRound, FolderKanban,
  ChevronDown, LogOut, Settings, X, Menu, Plus, Users, Building2,
  ShieldCheck, Bell, CheckCheck, PanelLeftOpen,
} from "lucide-react";
import { isAuthenticated, getUser, logout } from "../services/auth";

function Sidebar() {
  const navigate = useNavigate();
  const loggedIn = isAuthenticated();
  const user = getUser();
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationLoading, setNotificationLoading] = useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const closeSidebar = () => {
    setOpen(false);
    setProfileOpen(false);
    setShowNotifications(false);
  };

  const handleLogout = () => {
    closeSidebar();
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = localStorage.getItem("token");
      if (!token || !loggedIn) {
        setNotifications([]);
        return;
      }
      try {
        setNotificationLoading(true);
        const response = await fetch("http://localhost:5000/api/notifications", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (data.success) setNotifications(data.notifications || []);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      } finally {
        setNotificationLoading(false);
      }
    };
    fetchNotifications();
  }, [loggedIn]);

  const markNotificationAsRead = async (notificationId) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const response = await fetch(`http://localhost:5000/api/notifications/${notificationId}/read`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        setNotifications((current) => current.map((n) => n.id === notificationId ? { ...n, isRead: true } : n));
      }
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  const markAllNotificationsAsRead = async () => {
    const token = localStorage.getItem("token");
    if (!token || unreadCount === 0) return;
    try {
      const response = await fetch("http://localhost:5000/api/notifications/read-all", {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) setNotifications((current) => current.map((n) => ({ ...n, isRead: true })));
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error);
    }
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
      isActive ? "bg-primary text-white shadow-purple" : "text-heading hover:bg-primary-light hover:text-primary"
    }`;

  const sectionTitle = "px-3 pb-2 pt-5 text-[10px] font-bold uppercase tracking-[0.15em] text-muted";

  return (
    <>
      {/* Always-visible compact navigation trigger */}
      <header className="fixed left-0 right-0 top-0 z-50 flex h-16 items-center justify-between border-b border-white/70 bg-white/70 px-4 shadow-soft backdrop-blur-xl sm:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open main navigation"
            title="Open main navigation"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white/80 text-heading transition hover:border-primary/30 hover:bg-primary-light hover:text-primary"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-violet text-white shadow-purple">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-bold leading-none text-heading">AcademiaLink</p>
              <p className="mt-1 text-[8px] font-semibold tracking-[0.13em] text-primary">ACADEMIA • INDUSTRY • INNOVATION</p>
            </div>
          </Link>
        </div>

        {loggedIn && (
          <button
            type="button"
            onClick={() => { setOpen(true); setShowNotifications(true); setProfileOpen(false); }}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white/80 text-heading transition hover:border-primary/30 hover:bg-primary-light hover:text-primary"
            aria-label="Open notifications"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-bold text-white">{unreadCount > 9 ? "9+" : unreadCount}</span>}
          </button>
        )}
      </header>

      {open && <div className="fixed inset-0 z-[60] bg-slate-950/25 backdrop-blur-[2px]" onClick={closeSidebar} />}

      <aside className={`fixed bottom-0 left-0 top-0 z-[70] flex w-[290px] max-w-[88vw] flex-col border-r border-white/80 bg-white/85 shadow-2xl backdrop-blur-2xl transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-white/80 px-5">
          <Link to="/" onClick={closeSidebar} className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-violet text-white shadow-purple"><GraduationCap className="h-6 w-6" /></div>
            <div>
              <h1 className="font-display text-base font-bold text-heading">AcademiaLink</h1>
              <p className="text-[8px] font-semibold tracking-[0.12em] text-muted">ACADEMIA • INDUSTRY</p>
            </div>
          </Link>
          <button type="button" onClick={closeSidebar} className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-white/70 text-heading hover:bg-primary-light hover:text-primary" aria-label="Close navigation">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 pb-4">
          <p className={sectionTitle}>Main Navigation</p>
          <nav className="space-y-1">
            <NavLink to="/" onClick={closeSidebar} className={linkClass}><Home className="h-[18px] w-[18px]" />Home</NavLink>
            <NavLink to="/about" onClick={closeSidebar} className={linkClass}><Info className="h-[18px] w-[18px]" />About</NavLink>
            <NavLink to="/features" onClick={closeSidebar} className={linkClass}><Sparkles className="h-[18px] w-[18px]" />Features</NavLink>
            <NavLink to="/projects" onClick={closeSidebar} className={linkClass}><FolderKanban className="h-[18px] w-[18px]" />Projects</NavLink>

            {loggedIn && <NavLink to="/dashboard" onClick={closeSidebar} className={linkClass}><LayoutDashboard className="h-[18px] w-[18px]" />Dashboard</NavLink>}

            {loggedIn && user?.role === "STUDENT" && (
              <>
                <NavLink to="/skill-assessment" onClick={closeSidebar} className={linkClass}><ClipboardCheck className="h-[18px] w-[18px]" />Skill Assessment</NavLink>
                <NavLink to="/learning-recommendations" onClick={closeSidebar} className={linkClass}><BookOpen className="h-[18px] w-[18px]" />Learning</NavLink>
                <NavLink to="/smart-recommendations" onClick={closeSidebar} className={linkClass}><Brain className="h-[18px] w-[18px]" />Smart Matches</NavLink>
                <NavLink to="/internships" onClick={closeSidebar} className={linkClass}><BriefcaseBusiness className="h-[18px] w-[18px]" />Internships</NavLink>
                <NavLink to="/my-applications" onClick={closeSidebar} className={linkClass}><ClipboardList className="h-[18px] w-[18px]" />Applications</NavLink>
                <NavLink to="/portfolio" onClick={closeSidebar} className={linkClass}><UserRound className="h-[18px] w-[18px]" />My Portfolio</NavLink>
              </>
            )}

            {loggedIn && user?.role === "FACULTY" && (
              <>
                <NavLink to="/faculty-dashboard" onClick={closeSidebar} className={linkClass}><Users className="h-[18px] w-[18px]" />Faculty Dashboard</NavLink>
                <NavLink to="/projects/create" onClick={closeSidebar} className={linkClass}><Plus className="h-[18px] w-[18px]" />Create Project</NavLink>
                <NavLink to="/industry-roles" onClick={closeSidebar} className={linkClass}><Building2 className="h-[18px] w-[18px]" />Industry Roles</NavLink>
              </>
            )}

            {loggedIn && user?.role === "INDUSTRY" && (
              <>
                <NavLink to="/industry-dashboard" onClick={closeSidebar} className={linkClass}><Building2 className="h-[18px] w-[18px]" />Industry Dashboard</NavLink>
                <NavLink to="/internships" onClick={closeSidebar} className={linkClass}><BriefcaseBusiness className="h-[18px] w-[18px]" />Internships</NavLink>
                <NavLink to="/internships/create" onClick={closeSidebar} className={linkClass}><Plus className="h-[18px] w-[18px]" />Post Internship</NavLink>
                <NavLink to="/industry-roles/create" onClick={closeSidebar} className={linkClass}><Building2 className="h-[18px] w-[18px]" />Create Industry Role</NavLink>
                <NavLink to="/industry-roles" onClick={closeSidebar} className={linkClass}><BriefcaseBusiness className="h-[18px] w-[18px]" />Industry Roles</NavLink>
                <NavLink to="/projects/create" onClick={closeSidebar} className={linkClass}><Plus className="h-[18px] w-[18px]" />Create Project</NavLink>
              </>
            )}

            {loggedIn && user?.role === "ADMIN" && (
              <>
                <NavLink to="/admin-dashboard" onClick={closeSidebar} className={linkClass}><ShieldCheck className="h-[18px] w-[18px]" />Admin Dashboard</NavLink>
                <NavLink to="/admin-users" onClick={closeSidebar} className={linkClass}><Users className="h-[18px] w-[18px]" />Manage Users</NavLink>
              </>
            )}
          </nav>
        </div>

        {loggedIn && showNotifications && (
          <div className="absolute bottom-24 left-3 right-3 z-[80] overflow-hidden rounded-2xl border border-white/80 bg-white/95 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-border px-4 py-4">
              <div><div className="flex items-center gap-2"><Bell className="h-4 w-4 text-primary" /><h3 className="text-sm font-semibold text-heading">Notifications</h3></div><p className="mt-1 text-xs text-muted">{unreadCount ? `${unreadCount} unread notification${unreadCount !== 1 ? "s" : ""}` : "You're all caught up"}</p></div>
              {unreadCount > 0 && <button type="button" onClick={markAllNotificationsAsRead} className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary-dark"><CheckCheck className="h-3.5 w-3.5" />Mark all</button>}
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notificationLoading ? <div className="px-4 py-8 text-center text-sm text-body">Loading notifications...</div> : notifications.length === 0 ? <div className="px-4 py-8 text-center"><Bell className="mx-auto h-6 w-6 text-muted" /><p className="mt-2 text-sm font-semibold text-heading">No notifications</p></div> : notifications.map((notification) => (
                <button type="button" key={notification.id} onClick={() => markNotificationAsRead(notification.id)} className={`w-full border-b border-border px-4 py-3 text-left last:border-b-0 ${!notification.isRead ? "bg-primary/5" : "hover:bg-page"}`}>
                  <div className="flex gap-3"><span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${!notification.isRead ? "bg-primary" : "bg-border"}`} /><div className="min-w-0 flex-1"><p className="text-sm font-semibold text-heading">{notification.title}</p><p className="mt-1 text-xs leading-5 text-body">{notification.message}</p></div></div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="relative shrink-0 border-t border-white/80 bg-white/60 p-3">
          {loggedIn ? (
            <>
              <button type="button" onClick={() => { setProfileOpen(!profileOpen); setShowNotifications(false); }} className={`flex w-full items-center gap-3 rounded-2xl p-3 text-left ${profileOpen ? "bg-primary/10" : "bg-page hover:bg-primary-light"}`}>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-violet text-sm font-bold text-white">{user?.name?.charAt(0)?.toUpperCase() || "U"}</div>
                <div className="min-w-0 flex-1"><p className="truncate text-sm font-bold text-heading">{user?.name || "User"}</p><p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted">{user?.role || "USER"}</p></div>
                <ChevronDown className={`h-4 w-4 text-muted transition-transform ${profileOpen ? "rotate-180" : ""}`} />
              </button>
              {profileOpen && <div className="absolute bottom-[calc(100%+8px)] left-3 right-3 overflow-hidden rounded-2xl border border-border bg-white p-2 shadow-2xl">
                <div className="mb-2 rounded-xl bg-page px-3 py-3"><p className="truncate text-sm font-bold text-heading">{user?.name}</p><p className="mt-1 truncate text-xs text-muted">{user?.email}</p></div>
                {user?.role === "STUDENT" && <Link to="/student-profile" onClick={closeSidebar} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-heading hover:bg-page hover:text-primary"><UserRound className="h-4 w-4 text-primary" />Student Profile</Link>}
                {user?.role === "STUDENT" && <Link to="/portfolio" onClick={closeSidebar} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-heading hover:bg-page hover:text-primary"><UserRound className="h-4 w-4 text-primary" />My Portfolio</Link>}
                <Link to="/settings" onClick={closeSidebar} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-heading hover:bg-page hover:text-primary"><Settings className="h-4 w-4 text-primary" />Settings</Link>
                <button type="button" onClick={() => { setProfileOpen(false); setShowNotifications(true); }} className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-heading hover:bg-page hover:text-primary"><span className="flex items-center gap-3"><Bell className="h-4 w-4 text-primary" />Notifications</span>{unreadCount > 0 && <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-white">{unreadCount}</span>}</button>
                <div className="my-2 border-t border-border" />
                <button type="button" onClick={handleLogout} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-danger hover:bg-red-50"><LogOut className="h-4 w-4" />Logout</button>
              </div>}
            </>
          ) : <div className="grid grid-cols-2 gap-2"><Link to="/login" onClick={closeSidebar} className="rounded-xl border border-border bg-white px-3 py-2.5 text-center text-sm font-semibold text-heading hover:bg-page">Login</Link><Link to="/register" onClick={closeSidebar} className="rounded-xl bg-gradient-to-r from-primary to-violet px-3 py-2.5 text-center text-sm font-semibold text-white">Register</Link></div>}
        </div>
      </aside>
    </>
  );
}

export default Sidebar;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  UserPlus,
  User,
  Mail,
  Lock,
  Users,
  GraduationCap,
  Building2,
  BriefcaseBusiness,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Eye,
  EyeOff,
  Sparkles,
} from "lucide-react";

import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "STUDENT",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await api.post(
        "/auth/register",
        formData
      );

      setMessage(response.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-page">

      <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl lg:grid-cols-2">

        {/* =====================================================
            LEFT PURPLE BRANDING PANEL
        ====================================================== */}

        <div className="relative hidden overflow-hidden bg-gradient-to-br from-primary via-indigo-600 to-violet lg:flex">

          {/* Decorative elements */}
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <div className="absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

          <div className="absolute right-16 top-24 h-28 w-28 rounded-full bg-white/5" />

          <div className="relative flex w-full flex-col justify-between p-12 xl:p-16">

            {/* Branding */}
            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
                <Sparkles className="h-6 w-6 text-white" />
              </div>

              <div>
                <p className="font-display text-xl font-bold text-white">
                  AcademiaLink
                </p>

                <p className="text-xs text-white/70">
                  Academia • Industry • Innovation
                </p>
              </div>

            </div>

            {/* Main content */}
            <div className="max-w-xl">

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur">
                <UserPlus className="h-4 w-4" />
                Join AcademiaLink
              </div>

              <h1 className="font-display text-4xl font-bold leading-tight text-white xl:text-5xl">
                Build your
                <span className="block text-indigo-100">
                  industry-ready
                </span>
                future.
              </h1>

              <p className="mt-6 max-w-lg text-base leading-7 text-white/75">
                Create your AcademiaLink account and
                connect your skills, learning, internships
                and career opportunities in one place.
              </p>

              {/* Benefits */}
              <div className="mt-10 space-y-5">

                <RegisterBenefit
                  title="Build Your Skill Profile"
                  description="Showcase your skills, projects and achievements."
                />

                <RegisterBenefit
                  title="Discover Opportunities"
                  description="Find internships based on your skills and goals."
                />

                <RegisterBenefit
                  title="Connect With Industry"
                  description="Build meaningful academic and professional connections."
                />

              </div>

              {/* Ecosystem */}
              <div className="mt-10">

                <p className="mb-4 text-xs font-bold uppercase tracking-wider text-white/60">
                  AcademiaLink Ecosystem
                </p>

                <div className="flex flex-wrap items-center gap-3">

                  <EcosystemItem
                    icon={
                      <GraduationCap className="h-4 w-4" />
                    }
                    label="Students"
                  />

                  <span className="text-white/40">
                    →
                  </span>

                  <EcosystemItem
                    icon={
                      <Users className="h-4 w-4" />
                    }
                    label="Faculty"
                  />

                  <span className="text-white/40">
                    →
                  </span>

                  <EcosystemItem
                    icon={
                      <Building2 className="h-4 w-4" />
                    }
                    label="Industry"
                  />

                </div>

              </div>

            </div>

            {/* Bottom */}
            <div className="flex items-center gap-3 text-sm text-white/70">

              <CheckCircle2 className="h-5 w-5 text-emerald-300" />

              <span>
                One connected platform for education and
                industry.
              </span>

            </div>

          </div>
        </div>

        {/* =====================================================
            RIGHT REGISTRATION AREA
        ====================================================== */}

        <div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-12 xl:px-20">

          <div className="w-full max-w-md">

            {/* Mobile branding */}
            <div className="mb-8 text-center lg:hidden">

              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Sparkles className="h-6 w-6" />
              </div>

              <h1 className="mt-3 font-display text-xl font-bold text-heading">
                AcademiaLink
              </h1>

              <p className="mt-1 text-xs text-body">
                Academia • Industry • Innovation
              </p>

            </div>

            {/* Registration card */}
            <div className="rounded-xl border border-border bg-white p-6 shadow-card sm:p-8">

              {/* Header */}
              <div>

                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50 text-primary">
                  <UserPlus className="h-6 w-6" />
                </div>

                <h2 className="mt-6 font-display text-2xl font-bold tracking-tight text-heading sm:text-3xl">
                  Create your account
                </h2>

                <p className="mt-2 text-sm leading-6 text-body">
                  Join AcademiaLink and start building your
                  career journey.
                </p>

              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="mt-7 space-y-5"
              >

                {/* Name */}
                <div>

                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-heading"
                  >
                    Full name
                  </label>

                  <div className="relative">

                    <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-body" />

                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                      autoComplete="name"
                      className="w-full rounded-md border border-border bg-white py-3.5 pl-11 pr-4 text-sm text-heading outline-none transition-all placeholder:text-body focus:border-primary focus:ring-4 focus:ring-indigo-100"
                    />

                  </div>

                </div>

                {/* Email */}
                <div>

                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-heading"
                  >
                    Email address
                  </label>

                  <div className="relative">

                    <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-body" />

                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      autoComplete="email"
                      className="w-full rounded-md border border-border bg-white py-3.5 pl-11 pr-4 text-sm text-heading outline-none transition-all placeholder:text-body focus:border-primary focus:ring-4 focus:ring-indigo-100"
                    />

                  </div>

                </div>

                {/* Password */}
                <div>

                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-semibold text-heading"
                  >
                    Password
                  </label>

                  <div className="relative">

                    <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-body" />

                    <input
                      id="password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a password"
                      required
                      minLength={6}
                      autoComplete="new-password"
                      className="w-full rounded-md border border-border bg-white py-3.5 pl-11 pr-12 text-sm text-heading outline-none transition-all placeholder:text-body focus:border-primary focus:ring-4 focus:ring-indigo-100"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-body transition hover:bg-page hover:text-heading"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>

                  </div>

                  {/* Password requirements */}
                  <div className="mt-3 rounded-md border border-border bg-page p-3">

                    <p className="mb-2 text-xs font-bold text-heading">
                      Password requirements
                    </p>

                    <div className="flex items-center gap-2 text-xs text-body">

                      <CheckCircle2
                        className={`h-3.5 w-3.5 ${
                          formData.password.length >= 6
                            ? "text-success"
                            : "text-muted"
                        }`}
                      />

                      At least 6 characters

                    </div>

                  </div>

                </div>

                {/* Role */}
                <div>

                  <label
                    htmlFor="role"
                    className="mb-2 block text-sm font-semibold text-heading"
                  >
                    Account type
                  </label>

                  <div className="relative">

                    <Users className="pointer-events-none absolute left-3.5 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-body" />

                    <select
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full appearance-none rounded-md border border-border bg-white py-3.5 pl-11 pr-4 text-sm text-heading outline-none transition-all focus:border-primary focus:ring-4 focus:ring-indigo-100"
                    >
                      <option value="STUDENT">
                        Student
                      </option>

                      <option value="FACULTY">
                        Faculty
                      </option>

                      <option value="INDUSTRY">
                        Industry
                      </option>
                    </select>

                  </div>

                  {/* Selected role */}
                  <div className="mt-3 flex items-center gap-2 rounded-md border border-indigo-100 bg-indigo-50 px-3 py-2.5">

                    {formData.role === "STUDENT" && (
                      <GraduationCap className="h-4 w-4 text-primary" />
                    )}

                    {formData.role === "FACULTY" && (
                      <Users className="h-4 w-4 text-violet" />
                    )}

                    {formData.role === "INDUSTRY" && (
                      <BriefcaseBusiness className="h-4 w-4 text-warning" />
                    )}

                    <span className="text-xs font-semibold text-heading">
                      {formData.role === "STUDENT"
                        ? "Student account"
                        : formData.role === "FACULTY"
                        ? "Faculty account"
                        : "Industry account"}
                    </span>

                  </div>

                </div>

                {/* Success */}
                {message && (
                  <div className="flex items-start gap-3 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-success">

                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />

                    <p>{message}</p>

                  </div>
                )}

                {/* Error */}
                {error && (
                  <div className="flex items-start gap-3 rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-danger">

                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-danger" />

                    <p>{error}</p>

                  </div>
                )}

                {/* Register */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark hover:shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                      Creating account...
                    </>
                  ) : (
                    <>
                      Create account

                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>

              </form>

              {/* Login link */}
              <div className="mt-7 border-t border-border pt-6 text-center">

                <p className="text-sm text-body">
                  Already have an account?{" "}

                  <Link
                    to="/login"
                    className="font-semibold text-primary transition-colors hover:text-primary-dark"
                  >
                    Login
                  </Link>
                </p>

              </div>

            </div>

            {/* Security note */}
            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-body">

              <ShieldCheck className="h-4 w-4 text-success" />

              <span>
                Your account information is protected.
              </span>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

/* ============================================================
   REGISTER BENEFIT
============================================================ */

function RegisterBenefit({
  title,
  description,
}) {
  return (
    <div className="flex items-start gap-3">

      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white/10">
        <CheckCircle2 className="h-4 w-4 text-emerald-300" />
      </div>

      <div>
        <p className="text-sm font-semibold text-white">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-white/60">
          {description}
        </p>
      </div>

    </div>
  );
}

/* ============================================================
   ECOSYSTEM ITEM
============================================================ */

function EcosystemItem({
  icon,
  label,
}) {
  return (
    <div className="flex items-center gap-2 rounded-md border border-white/10 bg-white/10 px-3 py-2 backdrop-blur">

      <div className="text-white">
        {icon}
      </div>

      <span className="text-xs font-medium text-white">
        {label}
      </span>

    </div>
  );
}

export default Register;
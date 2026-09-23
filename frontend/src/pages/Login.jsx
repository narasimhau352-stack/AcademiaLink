import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LogIn,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Eye,
  EyeOff,
  Sparkles,
  GraduationCap,
  Building2,
  BriefcaseBusiness,
} from "lucide-react";

import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await api.post(
        "/auth/login",
        formData
      );

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials."
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

          {/* Decorative circles */}
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />

          <div className="absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

          <div className="absolute right-20 top-20 h-24 w-24 rounded-full bg-white/5" />

          <div className="relative flex w-full flex-col justify-between p-12 xl:p-16">

            {/* Branding */}
            <div>
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
            </div>

            {/* Main message */}
            <div className="max-w-xl">

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur">
                <ShieldCheck className="h-4 w-4" />
                Secure platform access
              </div>

              <h1 className="font-display text-4xl font-bold leading-tight text-white xl:text-5xl">
                Connect your
                <span className="block text-indigo-100">
                  skills to opportunities.
                </span>
              </h1>

              <p className="mt-6 max-w-lg text-base leading-7 text-white/75">
                Build your skills, discover internships,
                showcase your portfolio and connect
                academia with industry through one
                intelligent platform.
              </p>

              {/* Platform features */}
              <div className="mt-10 grid gap-4 sm:grid-cols-3">

                <PlatformFeature
                  icon={
                    <GraduationCap className="h-5 w-5" />
                  }
                  title="Students"
                  text="Build skills"
                />

                <PlatformFeature
                  icon={
                    <Building2 className="h-5 w-5" />
                  }
                  title="Faculty"
                  text="Guide talent"
                />

                <PlatformFeature
                  icon={
                    <BriefcaseBusiness className="h-5 w-5" />
                  }
                  title="Industry"
                  text="Find talent"
                />

              </div>

            </div>

            {/* Bottom text */}
            <div className="flex items-center gap-3 text-sm text-white/70">

              <CheckCircle2 className="h-5 w-5 text-emerald-300" />

              <span>
                One connected ecosystem for education and
                industry.
              </span>

            </div>

          </div>
        </div>

        {/* =====================================================
            RIGHT LOGIN AREA
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

            {/* Login card */}
            <div className="rounded-xl border border-border bg-white p-6 shadow-card sm:p-8">

              {/* Header */}
              <div>

                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50 text-primary">
                  <LogIn className="h-6 w-6" />
                </div>

                <h2 className="mt-6 font-display text-2xl font-bold tracking-tight text-heading sm:text-3xl">
                  Welcome back
                </h2>

                <p className="mt-2 text-sm leading-6 text-body">
                  Sign in to continue to your AcademiaLink
                  account.
                </p>

              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="mt-7 space-y-5"
              >

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

                  <div className="mb-2 flex items-center justify-between">

                    <label
                      htmlFor="password"
                      className="block text-sm font-semibold text-heading"
                    >
                      Password
                    </label>

                  </div>

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
                      placeholder="Enter your password"
                      required
                      autoComplete="current-password"
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

                </div>

                {/* Error */}
                {error && (
                  <div className="flex items-start gap-3 rounded-md border border-danger/20 bg-danger/5 px-4 py-3 text-sm text-danger">
                    <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-danger" />

                    <p>{error}</p>
                  </div>
                )}

                {/* Login button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark hover:shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                      Logging in...
                    </>
                  ) : (
                    <>
                      Login

                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>

              </form>

              {/* Register */}
              <div className="mt-7 border-t border-border pt-6 text-center">

                <p className="text-sm text-body">
                  Don't have an account?{" "}

                  <Link
                    to="/register"
                    className="font-semibold text-primary transition-colors hover:text-primary-dark"
                  >
                    Create an account
                  </Link>
                </p>

              </div>

            </div>

            {/* Security */}
            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-body">

              <ShieldCheck className="h-4 w-4 text-success" />

              <span>
                Secure authentication powered by AcademiaLink
              </span>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

/* ============================================================
   PLATFORM FEATURE
============================================================ */

function PlatformFeature({
  icon,
  title,
  text,
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/10 p-4 backdrop-blur-sm">

      <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white/10 text-white">
        {icon}
      </div>

      <p className="mt-3 text-sm font-semibold text-white">
        {title}
      </p>

      <p className="mt-1 text-xs text-white/60">
        {text}
      </p>

    </div>
  );
}

export default Login;
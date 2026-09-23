import {
  GraduationCap,
  BriefcaseBusiness,
  FlaskConical,
  ArrowRight,
  Sparkles,
  FolderKanban,
  Users,
  Building2,
  Mail,
  Target,
} from "lucide-react";

import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-[#17152b] text-white">

      {/* Background glow */}

      <div className="pointer-events-none absolute -left-40 top-0 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-violet/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-16">

        {/* =================================================
            MAIN
        ================================================= */}

        <div className="grid gap-12 lg:grid-cols-12">

          {/* BRAND */}

          <div className="lg:col-span-5">

            <Link
              to="/"
              className="group inline-flex items-center gap-3"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-violet text-white shadow-card transition-transform group-hover:scale-105">
                <GraduationCap className="h-6 w-6" />
              </div>

              <div>
                <h2 className="font-display text-xl font-bold">
                  AcademiaLink
                </h2>

                <p className="text-[9px] font-bold tracking-[0.15em] text-primary-light">
                  ACADEMIA • INDUSTRY • INNOVATION
                </p>
              </div>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-7 text-white/70">
              Connecting students, faculty, researchers and
              industry through skills, opportunities and
              meaningful collaboration.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-medium text-white/70">
              <Sparkles className="h-4 w-4 text-primary" />
              Learn • Connect • Collaborate • Grow
            </div>

          </div>

          {/* PLATFORM */}

          <div className="lg:col-span-2">

            <h3 className="text-sm font-bold text-white">
              Platform
            </h3>

            <ul className="mt-5 space-y-3">

              <FooterLink
                to="/features"
                label="Features"
              />

              <FooterLink
                to="/about"
                label="About Us"
              />

              <FooterLink
                to="/projects"
                label="Projects"
              />

              <FooterLink
                to="/internships"
                label="Internships"
              />

            </ul>

          </div>

          {/* ECOSYSTEM */}

          <div className="lg:col-span-2">

            <h3 className="text-sm font-bold text-white">
              Ecosystem
            </h3>

            <ul className="mt-5 space-y-4">

              <FooterInfo
                icon={<GraduationCap className="h-4 w-4" />}
                label="Students"
              />

              <FooterInfo
                icon={<Users className="h-4 w-4" />}
                label="Faculty & Researchers"
              />

              <FooterInfo
                icon={<Building2 className="h-4 w-4" />}
                label="Industry"
              />

              <FooterInfo
                icon={<FlaskConical className="h-4 w-4" />}
                label="Research"
              />

            </ul>

          </div>

          {/* VISION */}

          <div className="lg:col-span-3">

            <h3 className="text-sm font-bold text-white">
              Our Vision
            </h3>

            <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-5">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
                <Target className="h-5 w-5" />
              </div>

              <p className="mt-4 text-sm leading-6 text-white/70">
                Connecting knowledge with opportunity and
                helping academia and industry grow together.
              </p>

            </div>

          </div>

        </div>

        {/* =================================================
            CTA
        ================================================= */}

        <div className="relative mt-12 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-r from-primary/20 to-violet/20 p-6 sm:p-7">

          <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <div className="flex items-center gap-2">

                <Sparkles className="h-4 w-4 text-primary" />

                <p className="text-sm font-bold text-white">
                  Ready to connect?
                </p>

              </div>

              <p className="mt-1 text-xs leading-5 text-white/50">
                Join the AcademiaLink ecosystem and discover
                new opportunities.
              </p>

            </div>

            <Link
              to="/register"
              className="inline-flex shrink-0 items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-primary-dark"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>

          </div>

        </div>

        {/* =================================================
            BOTTOM
        ================================================= */}

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} AcademiaLink. All
            rights reserved.
          </p>

          <div className="flex items-center gap-2 text-xs text-white/50">
            <Mail className="h-3.5 w-3.5" />
            Connecting knowledge with opportunity.
          </div>

        </div>

      </div>
    </footer>
  );
}

/* ============================================================
   FOOTER LINK
============================================================ */

function FooterLink({ to, label }) {
  return (
    <li>
      <Link
        to={to}
        className="group flex items-center gap-1.5 text-sm text-white/70 transition-colors hover:text-white"
      >
        <span>{label}</span>

        <ArrowRight className="h-3 w-3 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
      </Link>
    </li>
  );
}

/* ============================================================
   FOOTER INFO
============================================================ */

function FooterInfo({ icon, label }) {
  return (
    <li className="flex items-center gap-3 text-sm text-white/70">
      <span className="text-primary">
        {icon}
      </span>

      <span>{label}</span>
    </li>
  );
}

export default Footer;
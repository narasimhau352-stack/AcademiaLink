import {
  GraduationCap,
  Building2,
  Users,
  Lightbulb,
  Target,
  Handshake,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Network,
  BookOpen,
  BriefcaseBusiness,
} from "lucide-react";

import { Link } from "react-router-dom";
import { Card, Button } from "../components/ui";

function About() {
  return (
    <div className="overflow-hidden bg-white">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-gradient-to-br from-page via-white to-indigo-50">

        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-violet/5 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:py-24">

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4 py-2 text-xs font-semibold text-primary">
            <Sparkles className="h-4 w-4" />
            About AcademiaLink
          </div>

          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-heading sm:text-5xl lg:text-6xl">
            Bridging
            <span className="text-primary"> Academia </span>
            and
            <span className="text-violet"> Industry</span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-body sm:text-lg">
            AcademiaLink is a collaboration platform designed to bring
            students, faculty, researchers and industry professionals
            together in one connected ecosystem.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">

            <Link to="/register">
              <Button className="px-6 py-3">
                Join AcademiaLink
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <Link to="/features">
              <Button
                variant="secondary"
                className="px-6 py-3"
              >
                Explore Features
              </Button>
            </Link>

          </div>

        </div>
      </section>

      {/* =====================================================
          OUR PURPOSE
      ====================================================== */}

      <section className="px-4 py-20 sm:px-6">

        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">

          {/* Content */}

          <div>

            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              Our Purpose
            </p>

            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-heading sm:text-4xl">
              Creating Meaningful Connections
            </h2>

            <p className="mt-5 leading-7 text-body">
              Academia and industry have valuable knowledge, skills
              and opportunities. AcademiaLink provides a common
              platform where these participants can discover each
              other and collaborate.
            </p>

            <p className="mt-4 leading-7 text-body">
              The platform focuses on projects, internships,
              research, networking and other opportunities that
              connect academic learning with real-world
              requirements.
            </p>

            <div className="mt-7 space-y-3">

              <AboutCheck text="Connect academic learning with industry needs" />

              <AboutCheck text="Create meaningful collaboration opportunities" />

              <AboutCheck text="Support practical learning and innovation" />

            </div>

          </div>

          {/* Ecosystem visual */}

          <div className="relative">

            <Card className="overflow-hidden bg-page p-6 sm:p-8">

              <div className="grid grid-cols-2 gap-4">

                {/* Academia */}

                <div className="rounded-lg border border-border bg-white p-5 text-center shadow-card">

                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <GraduationCap className="h-6 w-6" />
                  </div>

                  <h3 className="mt-3 text-sm font-bold text-heading">
                    Academia
                  </h3>

                  <p className="mt-1 text-xs text-body">
                    Students & Faculty
                  </p>

                </div>

                {/* Industry */}

                <div className="rounded-lg border border-border bg-white p-5 text-center shadow-card">

                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-violet/10 text-violet">
                    <Building2 className="h-6 w-6" />
                  </div>

                  <h3 className="mt-3 text-sm font-bold text-heading">
                    Industry
                  </h3>

                  <p className="mt-1 text-xs text-body">
                    Companies & Teams
                  </p>

                </div>

                {/* Collaboration */}

                <div className="col-span-2 rounded-lg border border-primary/10 bg-white p-6 text-center shadow-card">

                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white">
                    <Handshake className="h-7 w-7" />
                  </div>

                  <h3 className="mt-3 text-base font-bold text-heading">
                    Collaboration
                  </h3>

                  <p className="mt-1 text-xs text-body">
                    Knowledge → Skills → Opportunities
                  </p>

                </div>

              </div>

            </Card>

          </div>

        </div>

      </section>

      {/* =====================================================
          ECOSYSTEM
      ====================================================== */}

      <section className="bg-page px-4 py-20 sm:px-6">

        <div className="mx-auto max-w-7xl">

          <SectionHeader
            eyebrow="OUR ECOSYSTEM"
            title="Who Can Connect?"
            description="AcademiaLink brings different participants together to encourage knowledge sharing, skill development and collaboration."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">

            <EcosystemCard
              icon={
                <GraduationCap className="h-7 w-7" />
              }
              iconBg="bg-primary/10"
              iconColor="text-primary"
              title="Students"
              description="Explore projects, internships, practical opportunities and professional connections."
              features={[
                "Build a skill profile",
                "Discover internships",
                "Find learning opportunities",
              ]}
            />

            <EcosystemCard
              icon={
                <Users className="h-7 w-7" />
              }
              iconBg="bg-violet/10"
              iconColor="text-violet"
              title="Faculty & Researchers"
              description="Share expertise, research interests and academic knowledge with industry."
              features={[
                "View industry skill demand",
                "Support student development",
                "Connect academic expertise",
              ]}
            />

            <EcosystemCard
              icon={
                <Building2 className="h-7 w-7" />
              }
              iconBg="bg-success/10"
              iconColor="text-success"
              title="Industry"
              description="Discover talent, collaborate with academia and participate in innovative projects."
              features={[
                "Find skilled candidates",
                "Post internships",
                "Collaborate with academia",
              ]}
            />

          </div>

        </div>
      </section>

      {/* =====================================================
          HOW THE ECOSYSTEM CONNECTS
      ====================================================== */}

      <section className="px-4 py-20 sm:px-6">

        <div className="mx-auto max-w-6xl">

          <SectionHeader
            eyebrow="THE CONNECTION"
            title="From Knowledge to Opportunity"
            description="AcademiaLink connects the different parts of the academic and industry ecosystem."
          />

          <div className="mt-12 grid gap-5 md:grid-cols-4">

            <ConnectionCard
              icon={<BookOpen className="h-6 w-6" />}
              title="Knowledge"
              text="Academic learning and expertise."
            />

            <ConnectionCard
              icon={<Target className="h-6 w-6" />}
              title="Skills"
              text="Identify and develop relevant skills."
            />

            <ConnectionCard
              icon={<Network className="h-6 w-6" />}
              title="Collaboration"
              text="Connect people, ideas and projects."
            />

            <ConnectionCard
              icon={<BriefcaseBusiness className="h-6 w-6" />}
              title="Opportunity"
              text="Create real-world career opportunities."
            />

          </div>

        </div>
      </section>

      {/* =====================================================
          GOAL + INNOVATION
      ====================================================== */}

      <section className="bg-page px-4 py-20 sm:px-6">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-6 md:grid-cols-2">

            {/* Goal */}

            <Card className="p-7 sm:p-8">

              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Target className="h-6 w-6" />
              </div>

              <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-primary">
                Our Goal
              </p>

              <h2 className="mt-2 font-display text-2xl font-bold text-heading">
                Creating a Connected Environment
              </h2>

              <p className="mt-4 leading-7 text-body">
                To create a connected environment where academic
                knowledge and industry opportunities can meet and
                create meaningful collaboration.
              </p>

            </Card>

            {/* Innovation */}

            <Card className="p-7 sm:p-8">

              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-violet/10 text-violet">
                <Lightbulb className="h-6 w-6" />
              </div>

              <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-violet">
                Innovation
              </p>

              <h2 className="mt-2 font-display text-2xl font-bold text-heading">
                Turning Ideas Into Outcomes
              </h2>

              <p className="mt-4 leading-7 text-body">
                By connecting people, ideas and opportunities,
                AcademiaLink supports collaboration that can lead to
                practical solutions and innovation.
              </p>

            </Card>

          </div>

        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}

      <section className="px-4 py-20 sm:px-6">

        <div className="mx-auto max-w-6xl overflow-hidden rounded-xl bg-gradient-to-br from-primary to-violet px-6 py-14 text-center text-white shadow-card sm:px-12">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/15">
            <Handshake className="h-7 w-7" />
          </div>

          <h2 className="mt-6 font-display text-3xl font-bold sm:text-4xl">
            Build Connections. Create Opportunities.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/80 sm:text-base">
            AcademiaLink brings the academic and industry ecosystem
            closer together through collaboration.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">

            <Link to="/register">
              <button className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-page">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </Link>

            <Link to="/features">
              <button className="inline-flex items-center justify-center rounded-md border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/20">
                Explore Platform
              </button>
            </Link>

          </div>

        </div>

      </section>

    </div>
  );
}

/* ============================================================
   SECTION HEADER
============================================================ */

function SectionHeader({
  eyebrow,
  title,
  description,
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">

      <p className="text-xs font-semibold uppercase tracking-wider text-primary">
        {eyebrow}
      </p>

      <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-heading sm:text-4xl">
        {title}
      </h2>

      <p className="mt-4 leading-7 text-body">
        {description}
      </p>

    </div>
  );
}

/* ============================================================
   ABOUT CHECK
============================================================ */

function AboutCheck({ text }) {
  return (
    <div className="flex items-center gap-3">

      <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />

      <span className="text-sm font-medium text-heading">
        {text}
      </span>

    </div>
  );
}

/* ============================================================
   ECOSYSTEM CARD
============================================================ */

function EcosystemCard({
  icon,
  iconBg,
  iconColor,
  title,
  description,
  features,
}) {
  return (
    <Card
      hover
      className="p-7"
    >

      <div
        className={`flex h-14 w-14 items-center justify-center rounded-lg ${iconBg} ${iconColor}`}
      >
        {icon}
      </div>

      <h3 className="mt-5 text-xl font-bold text-heading">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-body">
        {description}
      </p>

      <div className="mt-5 space-y-2.5">

        {features.map((feature) => (
          <div
            key={feature}
            className="flex items-center gap-2 text-xs text-body"
          >
            <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
            {feature}
          </div>
        ))}

      </div>

    </Card>
  );
}

/* ============================================================
   CONNECTION CARD
============================================================ */

function ConnectionCard({
  icon,
  title,
  text,
}) {
  return (
    <Card
      hover
      className="p-6 text-center"
    >

      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>

      <h3 className="mt-4 font-bold text-heading">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-body">
        {text}
      </p>

    </Card>
  );
}

export default About;
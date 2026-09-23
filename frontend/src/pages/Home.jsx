import {
  GraduationCap,
  Building2,
  Lightbulb,
  BriefcaseBusiness,
  FlaskConical,
  Users,
  ArrowRight,
  CheckCircle2,
  Target,
  BookOpen,
  Brain,
  Award,
  Sparkles,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkBackendHealth } from "../services/api";

import {
  Card,
  Button,
} from "../components/ui";
function Home() {
  const [backendStatus, setBackendStatus] =
    useState("Checking...");

  useEffect(() => {
    checkBackendHealth()
      .then((data) => {
        if (
          data.success &&
          data.database === "connected"
        ) {
          setBackendStatus(
            "Backend & Database Connected"
          );
        } else {
          setBackendStatus("Backend Connected");
        }
      })
      .catch(() => {
        setBackendStatus("Backend Not Connected");
      });
  }, []);

  const backendConnected =
    backendStatus !== "Backend Not Connected" &&
    backendStatus !== "Checking...";

  return (
    <div className="overflow-hidden bg-page">

      {/* =====================================================
          BACKEND STATUS
      ====================================================== */}

      <div className="border-b border-border bg-primary-light/60">
        <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6">
          <div
            className={`inline-flex items-center gap-2 text-xs font-medium ${
              backendConnected
                ? "text-success"
                : "text-muted"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                backendConnected
                  ? "bg-success"
                  : "bg-muted"
              }`}
            />

            {backendStatus}
          </div>
        </div>
      </div>

      <section className="glass-hero relative overflow-hidden">

        {/* Background decoration */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-violet/10 blur-3xl" />

        <div className="glass-hero-panel relative mx-auto grid max-w-7xl items-center gap-14 rounded-2xl px-5 py-12 sm:px-8 md:grid-cols-2 lg:my-10 lg:py-20">

          {/* Left */}
          <div>

            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4 py-2 text-xs font-semibold text-primary">
              <Sparkles className="h-4 w-4" />
              Academia • Industry • Innovation
            </div>

            {/* Heading */}
            <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-heading sm:text-5xl lg:text-6xl">

              Bridge Your

              <span className="block text-primary">
                Skills
              </span>

              With Industry
              <span className="block text-violet">
                Opportunities
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-xl text-base leading-7 text-body sm:text-lg">
              AcademiaLink connects students, faculty and
              industry through skill mapping, intelligent
              recommendations, internships and real-world
              collaboration.
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap gap-3">

              <Link to="/register">
                <Button className="px-6 py-3">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              <Link to="/features">
                <Button
                  variant="secondary"
                  className="px-6 py-3"
                >
                  Explore Platform
                </Button>
              </Link>

            </div>

            {/* Trust points */}
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs text-body">

              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                Skill-based matching
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                Internship opportunities
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                Digital portfolio
              </div>

            </div>
          </div>

          {/* Right visual */}
          <div className="relative">

            <div className="mx-auto max-w-lg">

              <Card className="glass-hero-card relative overflow-hidden p-5 sm:p-7">

                {/* Top label */}
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-muted">
                      AcademiaLink
                    </p>

                    <h3 className="mt-1 text-lg font-bold text-heading">
                      Your Career Journey
                    </h3>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Target className="h-5 w-5" />
                  </div>
                </div>

                {/* Journey */}
                <div className="space-y-3">

                  <div className="flex items-center gap-3 rounded-lg border border-border bg-primary-light/50 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary text-white">
                      <ClipboardIcon />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-heading">
                        Assess Your Skills
                      </p>

                      <p className="text-xs text-muted">
                        Discover your strengths
                      </p>
                    </div>

                    <CheckCircle2 className="ml-auto h-5 w-5 text-success" />
                  </div>

                  <div className="flex items-center gap-3 rounded-lg border border-border bg-white p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-violet text-white">
                      <Brain className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-heading">
                        Find Skill Gaps
                      </p>

                      <p className="text-xs text-muted">
                        Understand what industry needs
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-lg border border-border bg-white p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-success text-white">
                      <BookOpen className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-heading">
                        Learn & Improve
                      </p>

                      <p className="text-xs text-muted">
                        Get personalized learning
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-lg border border-primary/15 bg-primary-light/60 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary text-white">
                      <BriefcaseBusiness className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-heading">
                        Match With Opportunities
                      </p>

                      <p className="text-xs text-muted">
                        Internships & placements
                      </p>
                    </div>

                    <ArrowRight className="ml-auto h-5 w-5 text-primary" />
                  </div>

                </div>

                {/* Bottom stats */}
                <div className="mt-5 grid grid-cols-3 gap-2 border-t border-border pt-5">

                  <MiniStat
                    value="Skills"
                    label="Mapping"
                  />

                  <MiniStat
                    value="AI"
                    label="Matching"
                  />

                  <MiniStat
                    value="Career"
                    label="Growth"
                  />

                </div>

              </Card>

            </div>
          </div>

        </div>
      </section>

      {/* =====================================================
          CORE JOURNEY
      ====================================================== */}

      <section className="px-4 py-20 sm:px-6">

        <div className="mx-auto max-w-7xl">

          <SectionHeader
            eyebrow="HOW ACADEMIALINK WORKS"
            title="From Skills to Opportunities"
            description="A connected journey that helps students understand their skills, close gaps and connect with relevant industry opportunities."
          />

          <div className="mt-12 grid gap-4 md:grid-cols-3 lg:grid-cols-6">

            <JourneyCard
              number="01"
              icon={<ClipboardIcon />}
              title="Assess"
              description="Evaluate your current skills."
            />

            <JourneyCard
              number="02"
              icon={<Target className="h-5 w-5" />}
              title="Identify"
              description="Discover your skill gaps."
            />

            <JourneyCard
              number="03"
              icon={<BookOpen className="h-5 w-5" />}
              title="Learn"
              description="Follow relevant learning paths."
            />

            <JourneyCard
              number="04"
              icon={<Brain className="h-5 w-5" />}
              title="Match"
              description="Find suitable opportunities."
            />

            <JourneyCard
              number="05"
              icon={<BriefcaseBusiness className="h-5 w-5" />}
              title="Internship"
              description="Apply for real opportunities."
            />

            <JourneyCard
              number="06"
              icon={<Award className="h-5 w-5" />}
              title="Grow"
              description="Build your career portfolio."
            />

          </div>

        </div>
      </section>

      {/* =====================================================
          PLATFORM USERS
      ====================================================== */}

      <section className="bg-page px-4 py-20 sm:px-6">

        <div className="mx-auto max-w-7xl">

          <SectionHeader
            eyebrow="ONE CONNECTED ECOSYSTEM"
            title="Built for Every Stakeholder"
            description="AcademiaLink creates value for students, faculty and industry through one connected platform."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">

            {/* Student */}
            <StakeholderCard
              icon={
                <GraduationCap className="h-7 w-7" />
              }
              iconBg="bg-primary/10"
              iconColor="text-primary"
              title="Students"
              description="Build your skill profile, identify gaps, learn relevant skills and discover internships and career opportunities."
              features={[
                "Skill assessment",
                "Learning recommendations",
                "Smart opportunity matching",
                "Digital portfolio",
              ]}
            />

            {/* Faculty */}
            <StakeholderCard
              icon={
                <Users className="h-7 w-7" />
              }
              iconBg="bg-violet/10"
              iconColor="text-violet"
              title="Faculty"
              description="Understand industry skill demand and connect academic learning with current industry requirements."
              features={[
                "Industry skill demand",
                "Student skill insights",
                "Project collaboration",
                "Industry connection",
              ]}
            />

            {/* Industry */}
            <StakeholderCard
              icon={
                <Building2 className="h-7 w-7" />
              }
              iconBg="bg-success/10"
              iconColor="text-success"
              title="Industry"
              description="Discover skilled candidates, publish internships and collaborate with academic talent."
              features={[
                "Post internships",
                "Find skilled candidates",
                "Manage applications",
                "Industry role requirements",
              ]}
            />

          </div>
        </div>
      </section>

      {/* =====================================================
          KEY FEATURES
      ====================================================== */}

      <section className="px-4 py-20 sm:px-6">

        <div className="mx-auto max-w-7xl">

          <SectionHeader
            eyebrow="PLATFORM CAPABILITIES"
            title="Everything You Need to Build Industry Readiness"
            description="AcademiaLink brings skill development, intelligent matching and collaboration into one platform."
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            <FeatureCard
              icon={
                <Target className="h-6 w-6" />
              }
              title="Skill Mapping"
              description="Understand your current strengths and identify the skills required for your target opportunities."
            />

            <FeatureCard
              icon={
                <Brain className="h-6 w-6" />
              }
              title="Smart Matching"
              description="Match student skills and career goals with relevant industry opportunities."
              ai
            />

            <FeatureCard
              icon={
                <BookOpen className="h-6 w-6" />
              }
              title="Learning Hub"
              description="Discover courses, certifications and learning resources based on identified skill gaps."
            />

            <FeatureCard
              icon={
                <BriefcaseBusiness className="h-6 w-6" />
              }
              title="Internships"
              description="Connect students with industry internships and manage applications through one platform."
            />

            <FeatureCard
              icon={
                <Award className="h-6 w-6" />
              }
              title="Digital Portfolio"
              description="Showcase skills, projects, certifications, experience and assessment results."
            />

            <FeatureCard
              icon={
                <FlaskConical className="h-6 w-6" />
              }
              title="Projects"
              description="Create and discover academic and industry-oriented project opportunities."
            />

            <FeatureCard
              icon={
                <Users className="h-6 w-6" />
              }
              title="Faculty Insights"
              description="View industry skill demand and understand changing workforce requirements."
            />

            <FeatureCard
              icon={
                <Building2 className="h-6 w-6" />
              }
              title="Industry Collaboration"
              description="Help organizations connect with academic talent and relevant skill sets."
            />

          </div>
        </div>
      </section>

      {/* =====================================================
          COLLABORATION VISUAL
      ====================================================== */}

      <section className="bg-page px-4 py-20 sm:px-6">

        <div className="mx-auto max-w-6xl">

          <div className="grid items-center gap-10 md:grid-cols-2">

            <div>

              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                Academia ↔ Industry
              </p>

              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-heading sm:text-4xl">
                Turn the skills gap into a collaboration opportunity.
              </h2>

              <p className="mt-5 leading-7 text-body">
                AcademiaLink creates visibility between what students
                know, what industry needs and what learners can do
                next to become opportunity-ready.
              </p>

              <div className="mt-7 space-y-4">

                <CheckItem text="Identify current student skills" />

                <CheckItem text="Understand industry skill demand" />

                <CheckItem text="Find and close skill gaps" />

                <CheckItem text="Connect learners with opportunities" />

              </div>

            </div>

            {/* Collaboration graphic */}
            <div className="relative">

              <Card className="p-6">

                <div className="flex items-center justify-between">

                  <div className="flex flex-col items-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <GraduationCap className="h-8 w-8" />
                    </div>

                    <p className="mt-3 text-sm font-semibold text-heading">
                      Academia
                    </p>
                  </div>

                  <div className="flex flex-1 items-center justify-center px-4">

                    <div className="relative h-px w-full bg-border">

                      <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-white shadow-card">
                        <Lightbulb className="h-5 w-5" />
                      </div>

                    </div>

                  </div>

                  <div className="flex flex-col items-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-violet/10 text-violet">
                      <Building2 className="h-8 w-8" />
                    </div>

                    <p className="mt-3 text-sm font-semibold text-heading">
                      Industry
                    </p>
                  </div>

                </div>

                <div className="mt-8 rounded-lg bg-page p-5 text-center">

                  <p className="text-xs font-semibold uppercase tracking-wider text-body">
                    Shared Outcome
                  </p>

                  <p className="mt-2 text-lg font-bold text-heading">
                    Skills → Collaboration → Innovation
                  </p>

                </div>

              </Card>

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}

      <section className="px-4 py-20 sm:px-6">

        <div className="mx-auto max-w-6xl overflow-hidden rounded-xl bg-gradient-to-br from-primary to-violet px-6 py-14 text-center text-white shadow-card sm:px-12">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/15">
            <GraduationCap className="h-7 w-7" />
          </div>

          <h2 className="mt-6 font-display text-3xl font-bold sm:text-4xl">
            Ready to build your industry-ready future?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/80 sm:text-base">
            Create your profile, discover your skills, learn what
            matters and connect with meaningful opportunities.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">

            <Link to="/register">
              <button className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-page">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </Link>

            <Link to="/about">
              <button className="inline-flex items-center justify-center rounded-md border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/20">
                Learn More
              </button>
            </Link>

          </div>

        </div>

      </section>

    </div>
  );
}

/* ============================================================
   SMALL COMPONENTS
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

function MiniStat({ value, label }) {
  return (
    <div className="rounded-md bg-page px-3 py-3 text-center">
      <p className="text-xs font-bold text-heading">
        {value}
      </p>

      <p className="mt-0.5 text-[10px] text-body">
        {label}
      </p>
    </div>
  );
}

function JourneyCard({
  number,
  icon,
  title,
  description,
}) {
  return (
    <div className="group relative rounded-lg border border-border bg-white p-5 text-center shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card">

      <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
        {icon}
      </div>

      <p className="text-[10px] font-bold tracking-wider text-body">
        STEP {number}
      </p>

      <h3 className="mt-1 text-sm font-bold text-heading">
        {title}
      </h3>

      <p className="mt-2 text-xs leading-5 text-body">
        {description}
      </p>
    </div>
  );
}

function StakeholderCard({
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

function FeatureCard({
  icon,
  title,
  description,
  ai = false,
}) {
  return (
    <Card
      hover
      className="p-6"
    >
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-md ${
          ai
            ? "bg-violet/10 text-violet"
            : "bg-primary/10 text-primary"
        }`}
      >
        {icon}
      </div>

      <h3 className="mt-5 font-bold text-heading">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-body">
        {description}
      </p>

      {ai && (
        <div className="mt-4 inline-flex items-center gap-1 rounded-full bg-violet/10 px-2.5 py-1 text-[10px] font-semibold text-violet">
          <Sparkles className="h-3 w-3" />
          AI Powered
        </div>
      )}
    </Card>
  );
}

function CheckItem({ text }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success/10">
        <CheckCircle2 className="h-4 w-4 text-success" />
      </div>

      <span className="text-sm font-medium text-heading">
        {text}
      </span>
    </div>
  );
}

function ClipboardIcon() {
  return (
    <div className="relative">
      <div className="h-5 w-4 rounded-sm border-2 border-current" />
      <div className="absolute -top-1 left-1 h-1 w-2 rounded-full bg-current" />
    </div>
  );
}

export default Home;
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  User,
  MapPin,
  GraduationCap,
  BriefcaseBusiness,
  Award,
  Code2,
  ExternalLink,
  CheckCircle2,
  Target,
  CalendarDays,
  FolderKanban,
  AlertCircle,
  Loader2,
  ShieldCheck,
  ArrowLeft,
  Sparkles,
} from "lucide-react";

import { Card, SkillChip, ProgressBar } from "../components/ui";

function PublicPortfolio() {
  const { studentId } = useParams();

  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/portfolio/public/${studentId}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load portfolio"
          );
        }

        setPortfolio(data.portfolio);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [studentId]);

  /* ============================================================
     LOADING
  ============================================================ */

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-page px-6">

        <div className="flex items-center gap-3 text-sm text-body">

          <Loader2 className="h-5 w-5 animate-spin text-primary" />

          Loading portfolio...

        </div>

      </div>
    );
  }

  /* ============================================================
     ERROR
  ============================================================ */

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-page px-6">

        <Card className="w-full max-w-md p-8 text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-danger/10 text-danger">

            <AlertCircle className="h-8 w-8" />

          </div>

          <h2 className="mt-5 font-display text-2xl font-bold text-heading">
            Portfolio Unavailable
          </h2>

          <p className="mt-3 text-sm leading-6 text-body">
            {error}
          </p>

          <Link
            to="/"
            className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to AcademiaLink
          </Link>

        </Card>

      </div>
    );
  }

  if (!portfolio) {
    return null;
  }

  const profile = portfolio.profile;

  return (
    <div className="min-h-screen bg-page">

      {/* ========================================================
          HERO / PROFILE HEADER
      ========================================================= */}

      <section className="relative overflow-hidden border-b border-border bg-white">

        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-violet/5 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">

          <div className="flex flex-col items-center text-center">

            {/* Avatar */}

            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-3xl font-bold text-primary ring-8 ring-primary/5">

              {portfolio.name
                ?.charAt(0)
                ?.toUpperCase()}

            </div>

            {/* Name */}

            <h1 className="mt-6 font-display text-3xl font-bold tracking-tight text-heading sm:text-4xl">

              {portfolio.name}

            </h1>

            {/* Career goal */}

            <p className="mt-2 text-base text-body">
              {profile?.careerGoal || "Student Portfolio"}
            </p>

            {/* Location */}

            {profile?.location && (
              <div className="mt-3 flex items-center gap-1.5 text-sm text-body">

                <MapPin className="h-4 w-4" />

                {profile.location}

              </div>
            )}

            {/* Public badge */}

            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-success/20 bg-success/5 px-4 py-2 text-xs font-semibold text-success">

              <ShieldCheck className="h-4 w-4" />

              Public Portfolio

            </div>

          </div>

        </div>

      </section>

      {/* ========================================================
          CONTENT
      ========================================================= */}

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">

        {/* ======================================================
            ABOUT / EDUCATION
        ======================================================= */}

        <PortfolioSection
          icon={<GraduationCap className="h-5 w-5" />}
          title="About"
          subtitle="Academic background and career information"
        >

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            <InfoItem
              label="Education"
              value={profile?.education}
            />

            <InfoItem
              label="Branch"
              value={profile?.branch}
            />

            <InfoItem
              label="Graduation Year"
              value={profile?.graduationYear}
            />

          </div>

        </PortfolioSection>

        {/* ======================================================
            SKILLS
        ======================================================= */}

        <PortfolioSection
          icon={<Code2 className="h-5 w-5" />}
          title="Skills"
          subtitle="Technical and professional skills"
        >

          {profile?.skills?.length > 0 ? (

            <div className="flex flex-wrap gap-3">

              {profile.skills.map((item) => (

                <div
                  key={item.id}
                  className="flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4 py-2"
                >

                  <CheckCircle2 className="h-4 w-4 text-success" />

                  <span className="text-sm font-semibold text-primary">
                    {item.skill.name}
                  </span>

                  <span className="text-xs text-body">
                    {item.level}
                  </span>

                </div>

              ))}

            </div>

          ) : (

            <EmptyMessage text="No skills added." />

          )}

        </PortfolioSection>

        {/* ======================================================
            PROJECTS
        ======================================================= */}

        <PortfolioSection
          icon={<FolderKanban className="h-5 w-5" />}
          title="Projects"
          subtitle="Academic and industry project experience"
        >

          {portfolio.projects?.length > 0 ? (

            <div className="grid gap-5 md:grid-cols-2">

              {portfolio.projects.map((project) => (

                <Card
                  key={project.id}
                  hover
                  className="p-6"
                >

                  <div className="flex items-start justify-between gap-4">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">

                      <BriefcaseBusiness className="h-5 w-5" />

                    </div>

                    <SkillChip
                      skill={project.status || "Project"}
                      type="neutral"
                    />

                  </div>

                  <h3 className="mt-5 text-lg font-bold text-heading">
                    {project.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-body">
                    {project.description}
                  </p>

                  {project.skills && (
                    <div className="mt-4 rounded-md bg-page px-3 py-2.5">

                      <p className="text-xs font-semibold text-heading">
                        Skills
                      </p>

                      <p className="mt-1 text-xs leading-5 text-body">
                        {project.skills}
                      </p>

                    </div>
                  )}

                </Card>

              ))}

            </div>

          ) : (

            <EmptyMessage text="No projects added." />

          )}

        </PortfolioSection>

        {/* ======================================================
            CERTIFICATIONS
        ======================================================= */}

        <PortfolioSection
          icon={<Award className="h-5 w-5" />}
          title="Certifications"
          subtitle="Professional certifications and credentials"
        >

          {portfolio.certifications?.length > 0 ? (

            <div className="space-y-4">

              {portfolio.certifications.map((cert) => (

                <Card
                  key={cert.id}
                  className="p-5"
                >

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                    <div className="flex items-start gap-4">

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-warning/10 text-warning">

                        <Award className="h-5 w-5" />

                      </div>

                      <div>

                        <h3 className="font-semibold text-heading">
                          {cert.title}
                        </h3>

                        {cert.issuer && (
                          <p className="mt-1 text-sm text-body">
                            Issued by {cert.issuer}
                          </p>
                        )}

                        {cert.issueDate && (
                          <div className="mt-2 flex items-center gap-1.5 text-xs text-body">

                            <CalendarDays className="h-3.5 w-3.5" />

                            {new Date(
                              cert.issueDate
                            ).toLocaleDateString()}

                          </div>
                        )}

                      </div>

                    </div>

                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary-dark"
                      >
                        View Credential
                        <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                      </a>
                    )}

                  </div>

                </Card>

              ))}

            </div>

          ) : (

            <EmptyMessage text="No certifications added." />

          )}

        </PortfolioSection>

        {/* ======================================================
            EXPERIENCE
        ======================================================= */}

        <PortfolioSection
          icon={<BriefcaseBusiness className="h-5 w-5" />}
          title="Experience"
          subtitle="Professional and practical experience"
        >

          {portfolio.experiences?.length > 0 ? (

            <div className="space-y-5">

              {portfolio.experiences.map((experience) => (

                <Card
                  key={experience.id}
                  className="relative overflow-hidden p-6"
                >

                  <div className="flex gap-4">

                    <div className="hidden shrink-0 sm:block">

                      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-violet/10 text-violet">

                        <BriefcaseBusiness className="h-5 w-5" />

                      </div>

                    </div>

                    <div className="min-w-0 flex-1">

                      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">

                        <div>

                          <h3 className="text-lg font-bold text-heading">
                            {experience.role}
                          </h3>

                          <p className="mt-1 font-medium text-primary">
                            {experience.company}
                          </p>

                        </div>

                        <span className="text-xs text-body">
                          {experience.startDate
                            ? new Date(
                                experience.startDate
                              ).toLocaleDateString()
                            : "Start date not specified"}

                          {" — "}

                          {experience.isCurrent
                            ? "Present"
                            : experience.endDate
                            ? new Date(
                                experience.endDate
                              ).toLocaleDateString()
                            : "End date not specified"}
                        </span>

                      </div>

                      {experience.description && (
                        <p className="mt-4 text-sm leading-6 text-body">
                          {experience.description}
                        </p>
                      )}

                    </div>

                  </div>

                </Card>

              ))}

            </div>

          ) : (

            <EmptyMessage text="No experience added." />

          )}

        </PortfolioSection>

        {/* ======================================================
            ASSESSMENT RESULTS
        ======================================================= */}

        <PortfolioSection
          icon={<Target className="h-5 w-5" />}
          title="Skill Assessment Results"
          subtitle="Verified assessment performance"
        >

          {portfolio.assessmentResults?.length > 0 ? (

            <div className="grid gap-5 md:grid-cols-2">

              {portfolio.assessmentResults.map(
                (result) => (

                  <Card
                    key={result.id}
                    className="p-6"
                  >

                    <div className="flex items-start justify-between gap-4">

                      <div>

                        <h3 className="font-bold text-heading">
                          {result.skill.name}
                        </h3>

                        <p className="mt-1 text-xs text-body">
                          Skill Assessment
                        </p>

                      </div>

                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/10 text-sm font-bold text-success">
                        {result.percentage}%
                      </div>

                    </div>

                    <div className="mt-5">

                      <div className="mb-2 flex items-center justify-between text-xs">

                        <span className="text-body">
                          Score
                        </span>

                        <span className="font-semibold text-heading">
                          {result.score}/
                          {result.totalQuestions}
                        </span>

                      </div>

                      <ProgressBar
                        progress={Number(result.percentage) || 0}
                      />

                    </div>

                    <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary">

                      <CheckCircle2 className="h-3.5 w-3.5" />

                      Level: {result.level}

                    </div>

                  </Card>

                )
              )}

            </div>

          ) : (

            <EmptyMessage text="No assessment results available." />

          )}

        </PortfolioSection>

        {/* ======================================================
            END
        ======================================================= */}

        <div className="pb-8 pt-4 text-center">

          <div className="mx-auto flex items-center justify-center gap-2 text-xs text-body">

            <GraduationCap className="h-4 w-4 text-primary" />

            <span>
              AcademiaLink • Academia • Industry • Innovation
            </span>

          </div>

        </div>

      </main>

    </div>
  );
}

/* ============================================================
   PORTFOLIO SECTION
============================================================ */

function PortfolioSection({
  icon,
  title,
  subtitle,
  children,
}) {
  return (
    <section className="mb-6">

      <Card className="p-6 sm:p-7">

        <div className="mb-6 flex items-start gap-3">

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>

          <div>

            <h2 className="font-display text-xl font-bold text-heading">
              {title}
            </h2>

            <p className="mt-1 text-xs text-body">
              {subtitle}
            </p>

          </div>

        </div>

        {children}

      </Card>

    </section>
  );
}

/* ============================================================
   INFO ITEM
============================================================ */

function InfoItem({ label, value }) {
  return (
    <div className="rounded-lg border border-border bg-page p-4">

      <p className="text-xs font-semibold uppercase tracking-wider text-body">
        {label}
      </p>

      <p className="mt-2 text-sm font-semibold text-heading">
        {value || "Not specified"}
      </p>

    </div>
  );
}

/* ============================================================
   EMPTY MESSAGE
============================================================ */

function EmptyMessage({ text }) {
  return (
    <div className="rounded-lg border border-dashed border-border bg-page px-5 py-8 text-center">

      <p className="text-sm text-body">
        {text}
      </p>

    </div>
  );
}

export default PublicPortfolio;
import { useEffect, useState } from "react";
import {
  UserRound,
  Mail,
  GraduationCap,
  MapPin,
  Target,
  Globe,
  Copy,
  CheckCircle2,
  XCircle,
  Plus,
  Trash2,
  Award,
  BriefcaseBusiness,
  FolderKanban,
  ClipboardCheck,
  CalendarDays,
  ExternalLink,
  TrendingUp,
  ShieldCheck,
  Sparkles,
  Building2,
  Link2,
  ArrowUpRight,
} from "lucide-react";

import {
  Card,
  Button,
  SkillChip,
  ProgressBar,
} from "../components/ui";

function StudentPortfolio() {
  const [portfolio, setPortfolio] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isPortfolioPublic, setIsPortfolioPublic] =
    useState(false);

  const [sharingLoading, setSharingLoading] =
    useState(false);

  const [copied, setCopied] = useState(false);

  const [showCertificationForm, setShowCertificationForm] =
    useState(false);

  const [showExperienceForm, setShowExperienceForm] =
    useState(false);

  // Certification form
  const [certification, setCertification] = useState({
    title: "",
    issuer: "",
    issueDate: "",
    credentialUrl: "",
  });

  // Experience form
  const [experience, setExperience] = useState({
    company: "",
    role: "",
    description: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
  });

  const token = localStorage.getItem("token");

  // =====================================================
  // GET PORTFOLIO
  // =====================================================

  const fetchPortfolio = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:5000/api/portfolio/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load portfolio"
        );
      }

      if (data.success) {
        setPortfolio(data.portfolio);

        setIsPortfolioPublic(
          data.portfolio.profile?.isPortfolioPublic ||
            false
        );
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  // =====================================================
  // PUBLIC PORTFOLIO
  // =====================================================

  const handlePortfolioSharing = async () => {
    try {
      setSharingLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/portfolio/sharing",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            isPortfolioPublic: !isPortfolioPublic,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to update portfolio sharing"
        );
      }

      setIsPortfolioPublic(data.isPortfolioPublic);

      fetchPortfolio();
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setSharingLoading(false);
    }
  };

  const copyPublicLink = async () => {
    if (!portfolio?.id) return;

    const publicLink = `${window.location.origin}/public-portfolio/${portfolio.id}`;

    try {
      await navigator.clipboard.writeText(publicLink);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(error);
      alert("Unable to copy the public link");
    }
  };

  // =====================================================
  // CERTIFICATION
  // =====================================================

  const handleCertificationChange = (e) => {
    setCertification({
      ...certification,
      [e.target.name]: e.target.value,
    });
  };

  const addCertification = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/portfolio/certifications",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(certification),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to add certification"
        );
      }

      setCertification({
        title: "",
        issuer: "",
        issueDate: "",
        credentialUrl: "",
      });

      setShowCertificationForm(false);

      fetchPortfolio();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const deleteCertification = async (id) => {
    if (
      !window.confirm(
        "Delete this certification?"
      )
    ) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/portfolio/certifications/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to delete certification"
        );
      }

      fetchPortfolio();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  // =====================================================
  // EXPERIENCE
  // =====================================================

  const handleExperienceChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setExperience({
      ...experience,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    });
  };

  const addExperience = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/portfolio/experiences",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(experience),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to add experience"
        );
      }

      setExperience({
        company: "",
        role: "",
        description: "",
        startDate: "",
        endDate: "",
        isCurrent: false,
      });

      setShowExperienceForm(false);

      fetchPortfolio();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const deleteExperience = async (id) => {
    if (
      !window.confirm(
        "Delete this experience?"
      )
    ) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/portfolio/experiences/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to delete experience"
        );
      }

      fetchPortfolio();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-page">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-6">

            <div className="h-72 rounded-xl bg-border" />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="h-28 rounded-lg bg-border" />
              <div className="h-28 rounded-lg bg-border" />
              <div className="h-28 rounded-lg bg-border" />
              <div className="h-28 rounded-lg bg-border" />
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="h-96 rounded-xl bg-border lg:col-span-2" />
              <div className="h-96 rounded-xl bg-border" />
            </div>

          </div>
        </div>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <div className="min-h-screen bg-page">
        <div className="mx-auto max-w-4xl px-6 py-12">
          <Card className="border-rose-200 bg-rose-50 p-10 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white">
              <XCircle className="h-7 w-7 text-danger" />
            </div>

            <h2 className="mt-5 font-display text-2xl font-bold text-heading">
              Unable to load portfolio
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-danger">
              {error}
            </p>

            <Button
              className="mt-6"
              onClick={fetchPortfolio}
            >
              Try Again
            </Button>

          </Card>
        </div>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen bg-page">
        <div className="mx-auto max-w-4xl px-6 py-12">
          <Card className="p-10 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-page">
              <UserRound className="h-7 w-7 text-body" />
            </div>

            <h2 className="mt-5 font-display text-2xl font-bold text-heading">
              Portfolio not found
            </h2>

            <p className="mt-2 text-sm text-body">
              Your portfolio information is not available yet.
            </p>

          </Card>
        </div>
      </div>
    );
  }

  const profile = portfolio.profile;

  const skills = profile?.skills || [];
  const certifications =
    portfolio.certifications || [];
  const experiences =
    portfolio.experiences || [];
  const projects = portfolio.projects || [];
  const assessmentResults =
    portfolio.assessmentResults || [];

  // =====================================================
  // PROFILE COMPLETION
  // =====================================================

  const completionItems = [
    portfolio.name,
    portfolio.email,
    profile?.education,
    profile?.branch,
    profile?.graduationYear,
    profile?.careerGoal,
    profile?.location,
    skills.length > 0,
    certifications.length > 0,
    projects.length > 0,
  ];

  const completedItems =
    completionItems.filter(Boolean).length;

  const profileCompletion = Math.round(
    (completedItems /
      completionItems.length) *
      100
  );

  return (
    <div className="min-h-screen bg-page">

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* =================================================
            TOP LABEL
        ================================================== */}

        <div className="mb-7">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold tracking-wide text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            DIGITAL CAREER PORTFOLIO
          </div>

          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-heading sm:text-4xl">
            My Professional Profile
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-body">
            Showcase your education, skills, projects,
            achievements and professional experience
            to industry opportunities.
          </p>
        </div>

        {/* =================================================
            PROFILE HERO
        ================================================== */}

        <Card className="overflow-hidden p-0">

          <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-violet-50">

            {/* Decorative background */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-violet-200/30 blur-3xl" />

            <div className="relative p-6 sm:p-8 lg:p-10">

              <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

                {/* Profile identity */}
                <div className="flex min-w-0 items-start gap-5">

                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-primary text-3xl font-bold text-white shadow-lg shadow-indigo-200">
                    {portfolio.name
                      ?.charAt(0)
                      ?.toUpperCase() || "S"}
                  </div>

                  <div className="min-w-0">

                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-display text-2xl font-bold text-heading sm:text-3xl">
                        {portfolio.name}
                      </h2>

                      {isPortfolioPublic && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-success">
                          <Globe className="h-3.5 w-3.5" />
                          Public Profile
                        </span>
                      )}
                    </div>

                    <p className="mt-2 text-base font-semibold text-primary">
                      {profile?.careerGoal ||
                        "Career goal not added"}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-body">

                      {portfolio.email && (
                        <span className="inline-flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          {portfolio.email}
                        </span>
                      )}

                      {profile?.location && (
                        <span className="inline-flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {profile.location}
                        </span>
                      )}

                      {profile?.branch && (
                        <span className="inline-flex items-center gap-2">
                          <GraduationCap className="h-4 w-4" />
                          {profile.branch}
                        </span>
                      )}

                    </div>

                  </div>
                </div>

                {/* Public controls */}
                <div className="w-full lg:max-w-sm">

                  <div className="rounded-xl border border-white/80 bg-white/80 p-4 shadow-card backdrop-blur">

                    <div className="flex items-start gap-3">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50">
                        <Globe className="h-5 w-5 text-primary" />
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm font-bold text-heading">
                          Public Portfolio
                        </p>

                        <p className="mt-1 text-xs leading-5 text-body">
                          {isPortfolioPublic
                            ? "Recruiters can view your portfolio."
                            : "Make your profile visible to industry professionals."}
                        </p>
                      </div>

                    </div>

                    <div className="mt-4 flex flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">

                      <Button
                        variant={
                          isPortfolioPublic
                            ? "secondary"
                            : "primary"
                        }
                        onClick={
                          handlePortfolioSharing
                        }
                        disabled={sharingLoading}
                        className="flex-1"
                      >
                        {sharingLoading ? (
                          "Updating..."
                        ) : isPortfolioPublic ? (
                          <>
                            <XCircle className="mr-2 h-4 w-4" />
                            Disable
                          </>
                        ) : (
                          <>
                            <Globe className="mr-2 h-4 w-4" />
                            Enable
                          </>
                        )}
                      </Button>

                      {isPortfolioPublic && (
                        <Button
                          variant="secondary"
                          onClick={copyPublicLink}
                          className="flex-1"
                        >
                          {copied ? (
                            <>
                              <CheckCircle2 className="mr-2 h-4 w-4 text-success" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="mr-2 h-4 w-4" />
                              Copy Link
                            </>
                          )}
                        </Button>
                      )}

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {isPortfolioPublic && (
            <div className="flex flex-wrap items-center gap-2 border-t border-emerald-100 bg-emerald-50 px-6 py-3 text-xs font-semibold text-success sm:px-8">
              <ShieldCheck className="h-4 w-4" />
              Your portfolio is publicly accessible.
            </div>
          )}

        </Card>

        {/* =================================================
            QUICK STATS
        ================================================== */}

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <StatCard
            label="Skills"
            value={skills.length}
            icon={<TrendingUp className="h-5 w-5" />}
          />

          <StatCard
            label="Projects"
            value={projects.length}
            icon={<FolderKanban className="h-5 w-5" />}
          />

          <StatCard
            label="Certifications"
            value={certifications.length}
            icon={<Award className="h-5 w-5" />}
          />

          <StatCard
            label="Assessments"
            value={assessmentResults.length}
            icon={<ClipboardCheck className="h-5 w-5" />}
          />

        </div>

        {/* =================================================
            MAIN CAREER AREA
        ================================================== */}

        <div className="mt-6 grid gap-6 lg:grid-cols-3">

          {/* MAIN COLUMN */}
          <div className="space-y-6 lg:col-span-2">

            {/* =================================================
                ABOUT
            ================================================== */}

            <Card>

              <SectionHeader
                icon={<UserRound className="h-5 w-5" />}
                title="About Me"
                subtitle="Your academic identity and career direction."
              />

              <div className="mt-6 rounded-xl bg-page p-5">

                <div className="grid gap-4 sm:grid-cols-2">

                  <InfoItem
                    icon={<GraduationCap className="h-4 w-4" />}
                    label="Education"
                    value={
                      profile?.education ||
                      "Not added"
                    }
                  />

                  <InfoItem
                    icon={<BriefcaseBusiness className="h-4 w-4" />}
                    label="Branch"
                    value={
                      profile?.branch ||
                      "Not added"
                    }
                  />

                  <InfoItem
                    icon={<CalendarDays className="h-4 w-4" />}
                    label="Graduation Year"
                    value={
                      profile?.graduationYear ||
                      "Not added"
                    }
                  />

                  <InfoItem
                    icon={<MapPin className="h-4 w-4" />}
                    label="Location"
                    value={
                      profile?.location ||
                      "Not added"
                    }
                  />

                </div>

                <div className="mt-4 rounded-lg border border-indigo-100 bg-white p-5">

                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-primary">
                    <Target className="h-4 w-4" />
                    Career Goal
                  </div>

                  <p className="mt-2 font-display text-lg font-bold text-heading">
                    {profile?.careerGoal ||
                      "Career goal not added"}
                  </p>

                </div>

              </div>

            </Card>

            {/* =================================================
                SKILLS
            ================================================== */}

            <Card>

              <SectionHeader
                icon={<TrendingUp className="h-5 w-5" />}
                title="Skills & Competencies"
                subtitle="Your current technical and professional capabilities."
              />

              {skills.length > 0 ? (
                <div className="mt-6 grid gap-4 sm:grid-cols-2">

                  {skills.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-lg border border-border bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-card"
                    >

                      <div className="flex items-center justify-between gap-3">

                        <SkillChip
                          skill={item.skill.name}
                          type="verified"
                        />

                        <span className="text-xs font-bold text-body">
                          {item.level}
                        </span>

                      </div>

                      <div className="mt-4">
                        <ProgressBar
                          progress={getSkillProgress(
                            item.level
                          )}
                        />
                      </div>

                    </div>
                  ))}

                </div>
              ) : (
                <EmptyState
                  icon={<TrendingUp className="h-7 w-7" />}
                  message="No skills added yet."
                />
              )}

            </Card>

            {/* =================================================
                PROJECTS
            ================================================== */}

            <Card>

              <SectionHeader
                icon={<FolderKanban className="h-5 w-5" />}
                title="Projects"
                subtitle="Practical work that demonstrates your capabilities."
              />

              {projects.length > 0 ? (
                <div className="mt-6 grid gap-5 md:grid-cols-2">

                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="group rounded-xl border border-border bg-white p-5 transition hover:-translate-y-1 hover:shadow-card"
                    >

                      <div className="flex items-start justify-between gap-4">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-primary">
                          <FolderKanban className="h-5 w-5" />
                        </div>

                        {project.status && (
                          <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-bold text-primary">
                            {project.status}
                          </span>
                        )}

                      </div>

                      <h3 className="mt-5 font-display text-lg font-bold text-heading">
                        {project.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-body">
                        {project.description ||
                          "No project description added."}
                      </p>

                      {project.skills && (
                        <div className="mt-5 rounded-lg bg-page p-3">
                          <p className="text-[11px] font-bold uppercase tracking-wide text-body">
                            Technologies / Skills
                          </p>

                          <p className="mt-1 text-sm font-semibold text-heading">
                            {project.skills}
                          </p>
                        </div>
                      )}

                    </div>
                  ))}

                </div>
              ) : (
                <EmptyState
                  icon={<FolderKanban className="h-7 w-7" />}
                  message="No projects added yet."
                />
              )}

            </Card>

            {/* =================================================
                EXPERIENCE
            ================================================== */}

            <Card>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <SectionHeader
                  icon={
                    <BriefcaseBusiness className="h-5 w-5" />
                  }
                  title="Experience"
                  subtitle="Your internships, work experience and practical exposure."
                />

                <Button
                  variant="secondary"
                  onClick={() =>
                    setShowExperienceForm(
                      !showExperienceForm
                    )
                  }
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Experience
                </Button>

              </div>

              {experiences.length > 0 ? (
                <div className="mt-7 space-y-6">

                  {experiences.map((exp) => (
                    <div
                      key={exp.id}
                      className="relative pl-8"
                    >

                      <div className="absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-full bg-violet-100 text-violet ring-4 ring-white">
                        <BriefcaseBusiness className="h-3.5 w-3.5" />
                      </div>

                      <div className="absolute bottom-0 left-3 top-7 w-px bg-border" />

                      <div className="rounded-xl border border-border p-5 transition hover:shadow-card">

                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                          <div>

                            <h3 className="font-display text-lg font-bold text-heading">
                              {exp.role}
                            </h3>

                            <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-violet">
                              <Building2 className="h-4 w-4" />
                              {exp.company}
                            </p>

                            <p className="mt-2 flex items-center gap-1.5 text-xs text-body">
                              <CalendarDays className="h-3.5 w-3.5" />

                              {exp.startDate
                                ? new Date(
                                    exp.startDate
                                  ).toLocaleDateString()
                                : "Start date not added"}

                              {" — "}

                              {exp.isCurrent
                                ? "Present"
                                : exp.endDate
                                ? new Date(
                                    exp.endDate
                                  ).toLocaleDateString()
                                : "End date not added"}
                            </p>

                          </div>

                          <button
                            onClick={() =>
                              deleteExperience(exp.id)
                            }
                            className="inline-flex h-fit items-center justify-center gap-2 rounded-md bg-rose-50 px-3 py-2 text-xs font-semibold text-danger transition hover:bg-rose-100"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Delete
                          </button>

                        </div>

                        {exp.description && (
                          <p className="mt-4 text-sm leading-6 text-body">
                            {exp.description}
                          </p>
                        )}

                        {exp.isCurrent && (
                          <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-success">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Currently working
                          </span>
                        )}

                      </div>

                    </div>
                  ))}

                </div>
              ) : (
                <EmptyState
                  icon={
                    <BriefcaseBusiness className="h-7 w-7" />
                  }
                  message="No experience added yet."
                />
              )}

              {/* Add Experience Form */}
              {showExperienceForm && (
                <ExperienceForm
                  experience={experience}
                  handleExperienceChange={
                    handleExperienceChange
                  }
                  addExperience={addExperience}
                  onCancel={() =>
                    setShowExperienceForm(false)
                  }
                />
              )}

            </Card>

            {/* =================================================
                CERTIFICATIONS
            ================================================== */}

            <Card>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <SectionHeader
                  icon={<Award className="h-5 w-5" />}
                  title="Certifications"
                  subtitle="Credentials that validate your learning and expertise."
                />

                <Button
                  variant="secondary"
                  onClick={() =>
                    setShowCertificationForm(
                      !showCertificationForm
                    )
                  }
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Certification
                </Button>

              </div>

              {certifications.length > 0 ? (
                <div className="mt-6 grid gap-4 md:grid-cols-2">

                  {certifications.map((cert) => (
                    <div
                      key={cert.id}
                      className="rounded-xl border border-border p-5 transition hover:-translate-y-0.5 hover:shadow-card"
                    >

                      <div className="flex items-start justify-between gap-4">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-warning">
                          <Award className="h-5 w-5" />
                        </div>

                        <button
                          onClick={() =>
                            deleteCertification(
                              cert.id
                            )
                          }
                          className="rounded-md p-2 text-body transition hover:bg-rose-50 hover:text-danger"
                          title="Delete certification"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>

                      </div>

                      <h3 className="mt-5 font-display font-bold text-heading">
                        {cert.title}
                      </h3>

                      <p className="mt-1 text-sm font-medium text-body">
                        {cert.issuer ||
                          "Issuer not specified"}
                      </p>

                      {cert.issueDate && (
                        <p className="mt-3 flex items-center gap-1.5 text-xs text-body">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {new Date(
                            cert.issueDate
                          ).toLocaleDateString()}
                        </p>
                      )}

                      {cert.credentialUrl && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark"
                        >
                          View Credential
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}

                    </div>
                  ))}

                </div>
              ) : (
                <EmptyState
                  icon={<Award className="h-7 w-7" />}
                  message="No certifications added yet."
                />
              )}

              {/* Add Certification Form */}
              {showCertificationForm && (
                <CertificationForm
                  certification={certification}
                  handleCertificationChange={
                    handleCertificationChange
                  }
                  addCertification={addCertification}
                  onCancel={() =>
                    setShowCertificationForm(false)
                  }
                />
              )}

            </Card>

            {/* =================================================
                ASSESSMENT RESULTS
            ================================================== */}

            <Card>

              <SectionHeader
                icon={<ClipboardCheck className="h-5 w-5" />}
                title="Skill Assessment Results"
                subtitle="Verified assessment performance and proficiency."
              />

              {assessmentResults.length > 0 ? (
                <div className="mt-6 space-y-4">

                  {assessmentResults.map(
                    (result) => (
                      <div
                        key={result.id}
                        className="rounded-xl border border-border p-5"
                      >

                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                          <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-primary">
                              <ClipboardCheck className="h-5 w-5" />
                            </div>

                            <div>
                              <h3 className="font-display font-bold text-heading">
                                {result.skill.name}
                              </h3>

                              <p className="mt-1 text-xs text-body">
                                {result.score}/
                                {result.totalQuestions}{" "}
                                correct
                              </p>
                            </div>

                          </div>

                          <div className="flex items-center gap-3">

                            <span className="font-display text-xl font-bold text-primary">
                              {result.percentage}%
                            </span>

                            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-primary">
                              {result.level}
                            </span>

                          </div>

                        </div>

                        <div className="mt-5">
                          <ProgressBar
                            progress={
                              result.percentage
                            }
                          />
                        </div>

                      </div>
                    )
                  )}

                </div>
              ) : (
                <EmptyState
                  icon={
                    <ClipboardCheck className="h-7 w-7" />
                  }
                  message="No assessment results yet."
                />
              )}

            </Card>

          </div>

          {/* =================================================
              SIDEBAR
          ================================================== */}

          <aside className="space-y-6">

            {/* Profile summary */}
            <Card>

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-primary">
                  <UserRound className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="font-display font-bold text-heading">
                    Career Snapshot
                  </h2>

                  <p className="text-xs text-body">
                    Your professional overview
                  </p>
                </div>

              </div>

              <div className="mt-5 space-y-3">

                <SummaryRow
                  icon={<GraduationCap className="h-4 w-4" />}
                  label="Education"
                  value={
                    profile?.education ||
                    "Not added"
                  }
                />

                <SummaryRow
                  icon={<BriefcaseBusiness className="h-4 w-4" />}
                  label="Branch"
                  value={
                    profile?.branch ||
                    "Not added"
                  }
                />

                <SummaryRow
                  icon={<CalendarDays className="h-4 w-4" />}
                  label="Graduation"
                  value={
                    profile?.graduationYear ||
                    "Not added"
                  }
                />

                <SummaryRow
                  icon={<MapPin className="h-4 w-4" />}
                  label="Location"
                  value={
                    profile?.location ||
                    "Not added"
                  }
                />

              </div>

            </Card>

            {/* Profile completion */}
            <Card>

              <div className="flex items-center justify-between gap-3">

                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-body">
                    Profile Completion
                  </p>

                  <p className="mt-1 text-sm text-body">
                    Keep your profile updated.
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50">
                  <span className="font-display text-sm font-bold text-primary">
                    {profileCompletion}%
                  </span>
                </div>

              </div>

              <div className="mt-5">
                <ProgressBar
                  progress={profileCompletion}
                />
              </div>

              <p className="mt-3 text-xs leading-5 text-body">
                {completedItems} of{" "}
                {completionItems.length} profile
                elements completed.
              </p>

              {profileCompletion === 100 && (
                <div className="mt-4 flex items-center gap-2 rounded-md bg-emerald-50 px-3 py-2 text-xs font-bold text-success">
                  <CheckCircle2 className="h-4 w-4" />
                  Profile complete
                </div>
              )}

            </Card>

            {/* Career goal */}
            <Card className="overflow-hidden border-indigo-100 bg-gradient-to-br from-indigo-50 to-violet-50">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-card">
                <Target className="h-5 w-5 text-primary" />
              </div>

              <p className="mt-5 text-xs font-bold uppercase tracking-wide text-primary">
                Career Goal
              </p>

              <h2 className="mt-2 font-display text-xl font-bold text-heading">
                {profile?.careerGoal ||
                  "Not added"}
              </h2>

              <p className="mt-3 text-sm leading-6 text-body">
                Keep your career goal aligned with
                your skills, assessments and industry
                opportunities.
              </p>

            </Card>

            {/* Public sharing */}
            <Card>

              <div className="flex items-start gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50">
                  <ShieldCheck className="h-5 w-5 text-success" />
                </div>

                <div>
                  <h2 className="font-display font-bold text-heading">
                    Portfolio Visibility
                  </h2>

                  <p className="mt-1 text-xs leading-5 text-body">
                    Control whether recruiters and
                    industry professionals can view
                    your portfolio.
                  </p>
                </div>

              </div>

              <div className="mt-5 flex items-center justify-between rounded-lg bg-page p-3">

                <span className="text-sm font-semibold text-heading">
                  Status
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    isPortfolioPublic
                      ? "bg-emerald-50 text-success"
                      : "bg-border text-body"
                  }`}
                >
                  {isPortfolioPublic
                    ? "PUBLIC"
                    : "PRIVATE"}
                </span>

              </div>

              {isPortfolioPublic && (
                <Button
                  variant="secondary"
                  className="mt-3 w-full"
                  onClick={copyPublicLink}
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="mr-2 h-4 w-4 text-success" />
                      Link Copied
                    </>
                  ) : (
                    <>
                      <Link2 className="mr-2 h-4 w-4" />
                      Copy Public Link
                    </>
                  )}
                </Button>
              )}

            </Card>

          </aside>

        </div>

        {/* =================================================
            CAREER JOURNEY
        ================================================== */}

        <Card className="mt-6 overflow-hidden border-indigo-100 bg-gradient-to-r from-indigo-50 via-white to-violet-50">

          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex items-start gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-card">
                <Sparkles className="h-6 w-6 text-violet" />
              </div>

              <div>
                <h2 className="font-display text-lg font-bold text-heading">
                  Your AcademiaLink Career Journey
                </h2>

                <p className="mt-1 max-w-2xl text-sm leading-6 text-body">
                  Build your profile, validate your
                  skills, identify gaps, learn, gain
                  experience and connect with industry.
                </p>
              </div>

            </div>

            <div className="flex flex-wrap items-center gap-2">

              <JourneyStep text="Profile" />
              <span className="text-body">→</span>

              <JourneyStep text="Assessment" />
              <span className="text-body">→</span>

              <JourneyStep text="Skill Gap" />
              <span className="text-body">→</span>

              <JourneyStep text="Learning" />
              <span className="text-body">→</span>

              <JourneyStep text="Internship" />
              <span className="text-body">→</span>

              <JourneyStep text="Placement" />

            </div>

          </div>

        </Card>

        <div className="h-6" />

      </div>

    </div>
  );
}

// =====================================================
// CERTIFICATION FORM
// =====================================================

function CertificationForm({
  certification,
  handleCertificationChange,
  addCertification,
  onCancel,
}) {
  return (
    <div className="mt-6 rounded-xl border border-indigo-100 bg-indigo-50/50 p-5">

      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-primary shadow-card">
          <Plus className="h-4 w-4" />
        </div>

        <div>
          <h3 className="font-display font-bold text-heading">
            Add Certification
          </h3>

          <p className="text-xs text-body">
            Add a credential to your professional profile.
          </p>
        </div>
      </div>

      <form
        onSubmit={addCertification}
        className="mt-5 grid gap-4 md:grid-cols-2"
      >

        <FormInput
          name="title"
          placeholder="Certification title"
          value={certification.title}
          onChange={handleCertificationChange}
          required
        />

        <FormInput
          name="issuer"
          placeholder="Issuing organization"
          value={certification.issuer}
          onChange={handleCertificationChange}
        />

        <FormInput
          type="date"
          name="issueDate"
          value={certification.issueDate}
          onChange={handleCertificationChange}
        />

        <FormInput
          type="url"
          name="credentialUrl"
          placeholder="Credential URL"
          value={certification.credentialUrl}
          onChange={handleCertificationChange}
        />

        <div className="flex flex-wrap gap-3 md:col-span-2">

          <Button type="submit">
            <Award className="mr-2 h-4 w-4" />
            Add Certification
          </Button>

          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
          >
            Cancel
          </Button>

        </div>

      </form>
    </div>
  );
}

// =====================================================
// EXPERIENCE FORM
// =====================================================

function ExperienceForm({
  experience,
  handleExperienceChange,
  addExperience,
  onCancel,
}) {
  return (
    <div className="mt-6 rounded-xl border border-violet-100 bg-violet-50/50 p-5">

      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-violet shadow-card">
          <Plus className="h-4 w-4" />
        </div>

        <div>
          <h3 className="font-display font-bold text-heading">
            Add Experience
          </h3>

          <p className="text-xs text-body">
            Add your professional or internship experience.
          </p>
        </div>
      </div>

      <form
        onSubmit={addExperience}
        className="mt-5 space-y-4"
      >

        <div className="grid gap-4 md:grid-cols-2">

          <FormInput
            name="company"
            placeholder="Company"
            value={experience.company}
            onChange={handleExperienceChange}
            required
          />

          <FormInput
            name="role"
            placeholder="Role"
            value={experience.role}
            onChange={handleExperienceChange}
            required
          />

          <FormInput
            type="date"
            name="startDate"
            value={experience.startDate}
            onChange={handleExperienceChange}
          />

          <FormInput
            type="date"
            name="endDate"
            value={experience.endDate}
            onChange={handleExperienceChange}
            disabled={experience.isCurrent}
          />

        </div>

        <textarea
          name="description"
          placeholder="Describe your experience..."
          value={experience.description}
          onChange={handleExperienceChange}
          rows="4"
          className="w-full rounded-md border border-border bg-white px-4 py-3 text-sm text-heading outline-none transition placeholder:text-body focus:border-primary focus:ring-2 focus:ring-indigo-100"
        />

        <label className="flex items-center gap-2 text-sm font-medium text-heading">
          <input
            type="checkbox"
            name="isCurrent"
            checked={experience.isCurrent}
            onChange={handleExperienceChange}
            className="h-4 w-4 rounded border-border text-primary"
          />

          I currently work here
        </label>

        <div className="flex flex-wrap gap-3">

          <Button type="submit">
            <BriefcaseBusiness className="mr-2 h-4 w-4" />
            Add Experience
          </Button>

          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
          >
            Cancel
          </Button>

        </div>

      </form>
    </div>
  );
}

// =====================================================
// STAT CARD
// =====================================================

function StatCard({
  label,
  value,
  icon,
}) {
  return (
    <Card className="group flex items-center gap-4 p-5 transition hover:-translate-y-0.5 hover:shadow-card">

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-primary transition group-hover:bg-primary group-hover:text-white">
        {icon}
      </div>

      <div>
        <p className="text-[11px] font-bold uppercase tracking-wider text-body">
          {label}
        </p>

        <p className="mt-1 font-display text-2xl font-bold text-heading">
          {value}
        </p>
      </div>

    </Card>
  );
}

// =====================================================
// SECTION HEADER
// =====================================================

function SectionHeader({
  icon,
  title,
  subtitle,
}) {
  return (
    <div className="flex items-start gap-3">

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-primary">
        {icon}
      </div>

      <div>
        <h2 className="font-display text-lg font-bold text-heading">
          {title}
        </h2>

        <p className="mt-1 text-sm leading-5 text-body">
          {subtitle}
        </p>
      </div>

    </div>
  );
}

// =====================================================
// INFO ITEM
// =====================================================

function InfoItem({
  icon,
  label,
  value,
}) {
  return (
    <div className="rounded-lg border border-border bg-white p-4">

      <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-body">
        <span className="text-primary">
          {icon}
        </span>
        {label}
      </div>

      <p className="mt-2 text-sm font-semibold text-heading">
        {value}
      </p>

    </div>
  );
}

// =====================================================
// SUMMARY ROW
// =====================================================

function SummaryRow({
  icon,
  label,
  value,
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-border p-3">

      <div className="mt-0.5 text-primary">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-wide text-body">
          {label}
        </p>

        <p className="mt-1 break-words text-sm font-semibold text-heading">
          {value}
        </p>
      </div>

    </div>
  );
}

// =====================================================
// EMPTY STATE
// =====================================================

function EmptyState({
  icon,
  message,
}) {
  return (
    <div className="mt-6 rounded-xl border border-dashed border-border bg-page p-9 text-center">

      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-body shadow-card">
        {icon}
      </div>

      <p className="mt-3 text-sm font-medium text-body">
        {message}
      </p>

    </div>
  );
}

// =====================================================
// FORM INPUT
// =====================================================

function FormInput({
  type = "text",
  ...props
}) {
  return (
    <input
      type={type}
      {...props}
      className="w-full rounded-md border border-border bg-white px-4 py-3 text-sm text-heading outline-none transition placeholder:text-body focus:border-primary focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-page"
    />
  );
}

// =====================================================
// JOURNEY STEP
// =====================================================

function JourneyStep({ text }) {
  return (
    <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-primary shadow-card">
      {text}
    </span>
  );
}

// =====================================================
// SKILL LEVEL → VISUAL PROGRESS
// Display only. Backend data is unchanged.
// =====================================================

function getSkillProgress(level) {
  const normalized =
    String(level || "").toLowerCase();

  if (
    normalized.includes("expert") ||
    normalized.includes("advanced")
  ) {
    return 90;
  }

  if (
    normalized.includes("intermediate") ||
    normalized.includes("medium")
  ) {
    return 70;
  }

  if (
    normalized.includes("beginner") ||
    normalized.includes("basic")
  ) {
    return 40;
  }

  return 50;
}

export default StudentPortfolio;
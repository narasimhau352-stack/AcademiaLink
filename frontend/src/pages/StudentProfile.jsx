import { useEffect, useState } from "react";
import {
  UserRound,
  GraduationCap,
  BriefcaseBusiness,
  MapPin,
  Plus,
  Save,
  CheckCircle2,
  Award,
  Target,
  Sparkles,
  AlertTriangle,
  CalendarDays,
  Mail,
  ChevronRight,
} from "lucide-react";

import api from "../services/api";
import {
  Card,
  SkillChip,
  ProgressBar,
} from "../components/ui";

function StudentProfile() {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [assessmentResults, setAssessmentResults] =
    useState([]);

  const [availableSkills, setAvailableSkills] =
    useState([]);

  const [education, setEducation] = useState("");
  const [branch, setBranch] = useState("");
  const [graduationYear, setGraduationYear] =
    useState("");
  const [careerGoal, setCareerGoal] = useState("");
  const [location, setLocation] = useState("");

  const [selectedSkill, setSelectedSkill] =
    useState("");
  const [selectedLevel, setSelectedLevel] =
    useState("BEGINNER");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [addingSkill, setAddingSkill] =
    useState(false);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  /* ================= FETCH DATA ================= */

  useEffect(() => {
    fetchProfile();
    fetchSkills();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get(
        "/student-profile"
      );

      const profileData = response.data.profile;

      setProfile(profileData);
      setSkills(profileData.skills || []);

      setAssessmentResults(
        response.data.assessmentResults || []
      );

      setEducation(
        profileData.education || ""
      );

      setBranch(
        profileData.branch || ""
      );

      setGraduationYear(
        profileData.graduationYear || ""
      );

      setCareerGoal(
        profileData.careerGoal || ""
      );

      setLocation(
        profileData.location || ""
      );
    } catch (err) {
      if (err.response?.status === 404) {
        setProfile(null);
      } else {
        setError(
          err.response?.data?.message ||
            "Failed to load student profile."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchSkills = async () => {
    try {
      const response = await api.get("/skills");

      setAvailableSkills(
        response.data.skills || []
      );
    } catch (err) {
      console.error(
        "Failed to load skills",
        err
      );
    }
  };

  /* ================= SAVE PROFILE ================= */

  const handleSaveProfile = async (event) => {
    event.preventDefault();

    setSaving(true);
    setError("");
    setMessage("");

    try {
      const response = await api.post(
        "/student-profile",
        {
          education,
          branch,
          graduationYear,
          careerGoal,
          location,
        }
      );

      setProfile(response.data.profile);

      setMessage(
        "Profile saved successfully."
      );

      await fetchProfile();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to save profile."
      );
    } finally {
      setSaving(false);
    }
  };

  /* ================= ADD SKILL ================= */

  const handleAddSkill = async (event) => {
    event.preventDefault();

    if (!selectedSkill) {
      setError("Please select a skill.");
      return;
    }

    setAddingSkill(true);
    setError("");
    setMessage("");

    try {
      await api.post(
        "/student-profile/skills",
        {
          skillId: Number(selectedSkill),
          level: selectedLevel,
        }
      );

      setMessage(
        "Skill added successfully."
      );

      setSelectedSkill("");
      setSelectedLevel("BEGINNER");

      await fetchProfile();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to add skill."
      );
    } finally {
      setAddingSkill(false);
    }
  };

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div className="min-h-screen bg-page">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <div className="h-5 w-40 animate-pulse rounded bg-border" />

            <div className="h-48 animate-pulse rounded-xl bg-border" />

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="h-80 animate-pulse rounded-xl bg-border" />
              <div className="h-80 animate-pulse rounded-xl bg-border" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-page">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* ================= PROFILE HEADER ================= */}

        <Card className="overflow-hidden p-0">
          <div className="h-2 bg-gradient-to-r from-primary via-violet to-violet-400" />

          <div className="p-6 sm:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

              <div className="flex min-w-0 items-center gap-5">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-100">
                  <UserRound className="h-9 w-9 text-primary" />
                </div>

                <div className="min-w-0">
                  <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-[10px] font-bold tracking-wide text-primary">
                    <UserRound className="h-3.5 w-3.5" />
                    STUDENT PROFILE
                  </div>

                  <h1 className="mt-3 truncate font-display text-2xl font-bold text-heading sm:text-3xl">
                    {profile?.user?.name ||
                      profile?.name ||
                      "Student Profile"}
                  </h1>

                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-body">
                    {profile?.user?.email && (
                      <span className="inline-flex items-center gap-1.5">
                        <Mail className="h-4 w-4" />
                        {profile.user.email}
                      </span>
                    )}

                    {location && (
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" />
                        {location}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {careerGoal && (
                <div className="w-full rounded-2xl border border-violet-100 bg-violet-50/70 p-5 md:max-w-sm">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white">
                      <Target className="h-5 w-5 text-violet" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-body">
                        Career Goal
                      </p>

                      <p className="mt-1 text-sm font-bold leading-5 text-heading">
                        {careerGoal}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* ================= MESSAGES ================= */}

        {error && (
          <div className="mt-6 flex items-start gap-3 rounded-lg border border-rose-200 bg-rose-50 p-4 text-danger">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />

            <div>
              <p className="font-semibold">
                Something went wrong
              </p>

              <p className="mt-1 text-sm">
                {error}
              </p>
            </div>
          </div>
        )}

        {message && (
          <div className="mt-6 flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-success">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />

            <div>
              <p className="font-semibold">
                Success
              </p>

              <p className="mt-1 text-sm">
                {message}
              </p>
            </div>
          </div>
        )}

        {/* ================= PERSONAL / EDUCATION ================= */}

        <div className="mt-6">
          <Card className="p-6 sm:p-8">
            <SectionHeader
              icon={
                <GraduationCap className="h-5 w-5" />
              }
              iconBackground="bg-indigo-50"
              iconColor="text-primary"
              title="Personal & Academic Information"
              subtitle="Keep your education and career information up to date."
            />

            <form
              onSubmit={handleSaveProfile}
              className="mt-7"
            >
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                <FormField
                  label="Education"
                  icon={
                    <GraduationCap className="h-4 w-4" />
                  }
                >
                  <input
                    type="text"
                    value={education}
                    onChange={(event) =>
                      setEducation(
                        event.target.value
                      )
                    }
                    placeholder="B.Tech"
                    className={inputStyle}
                  />
                </FormField>

                <FormField
                  label="Branch"
                  icon={
                    <BriefcaseBusiness className="h-4 w-4" />
                  }
                >
                  <input
                    type="text"
                    value={branch}
                    onChange={(event) =>
                      setBranch(
                        event.target.value
                      )
                    }
                    placeholder="Computer Science"
                    className={inputStyle}
                  />
                </FormField>

                <FormField
                  label="Graduation Year"
                  icon={
                    <CalendarDays className="h-4 w-4" />
                  }
                >
                  <input
                    type="number"
                    value={graduationYear}
                    onChange={(event) =>
                      setGraduationYear(
                        event.target.value
                      )
                    }
                    placeholder="2028"
                    className={inputStyle}
                  />
                </FormField>

                <FormField
                  label="Location"
                  icon={
                    <MapPin className="h-4 w-4" />
                  }
                >
                  <input
                    type="text"
                    value={location}
                    onChange={(event) =>
                      setLocation(
                        event.target.value
                      )
                    }
                    placeholder="Telangana"
                    className={inputStyle}
                  />
                </FormField>

                <div className="sm:col-span-2 lg:col-span-4">
                  <FormField
                    label="Career Goal"
                    icon={
                      <Target className="h-4 w-4" />
                    }
                  >
                    <input
                      type="text"
                      value={careerGoal}
                      onChange={(event) =>
                        setCareerGoal(
                          event.target.value
                        )
                      }
                      placeholder="Full Stack Developer"
                      className={inputStyle}
                    />
                  </FormField>
                </div>
              </div>

              <div className="mt-6 border-t border-border pt-6">
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Save className="h-4 w-4" />

                  {saving
                    ? "Saving..."
                    : "Save Profile"}
                </button>
              </div>
            </form>
          </Card>
        </div>

        {/* ================= SKILLS ================= */}

        <div className="mt-6">
          <Card className="p-6 sm:p-8">
            <SectionHeader
              icon={
                <Sparkles className="h-5 w-5" />
              }
              iconBackground="bg-emerald-50"
              iconColor="text-success"
              title="Skills & Proficiency"
              subtitle="Showcase your current technical skills and proficiency levels."
            />

            {/* Skill Cards */}

            {skills.length === 0 ? (
              <div className="mt-6 rounded-lg border border-dashed border-border bg-page p-8 text-center">
                <Sparkles className="mx-auto h-7 w-7 text-body" />

                <p className="mt-3 text-sm text-body">
                  No skills added yet.
                </p>
              </div>
            ) : (
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {skills.map(
                  (studentSkill) => (
                    <SkillCard
                      key={studentSkill.id}
                      skill={studentSkill}
                    />
                  )
                )}
              </div>
            )}

            {/* Add Skill */}

            <div className="mt-8 border-t border-border pt-7">
              <div className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-primary" />

                <h3 className="font-display text-base font-bold text-heading">
                  Add / Update Skill
                </h3>
              </div>

              <form
                onSubmit={handleAddSkill}
                className="mt-5 grid gap-4 md:grid-cols-3"
              >
                <select
                  value={selectedSkill}
                  onChange={(event) =>
                    setSelectedSkill(
                      event.target.value
                    )
                  }
                  className={selectStyle}
                >
                  <option value="">
                    Select Skill
                  </option>

                  {availableSkills.map(
                    (skill) => (
                      <option
                        key={skill.id}
                        value={skill.id}
                      >
                        {skill.name}
                      </option>
                    )
                  )}
                </select>

                <select
                  value={selectedLevel}
                  onChange={(event) =>
                    setSelectedLevel(
                      event.target.value
                    )
                  }
                  className={selectStyle}
                >
                  <option value="BEGINNER">
                    Beginner
                  </option>

                  <option value="INTERMEDIATE">
                    Intermediate
                  </option>

                  <option value="ADVANCED">
                    Advanced
                  </option>

                  <option value="EXPERT">
                    Expert
                  </option>
                </select>

                <button
                  type="submit"
                  disabled={addingSkill}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-heading px-6 py-3 text-sm font-bold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Plus className="h-4 w-4" />

                  {addingSkill
                    ? "Saving..."
                    : "Add Skill"}
                </button>
              </form>
            </div>
          </Card>
        </div>

        {/* ================= ASSESSMENT RESULTS ================= */}

        <div className="mt-6">
          <Card className="p-6 sm:p-8">
            <SectionHeader
              icon={
                <Target className="h-5 w-5" />
              }
              iconBackground="bg-violet-50"
              iconColor="text-violet"
              title="Skill Assessment Results"
              subtitle="Track your assessment performance and skill levels."
            />

            {assessmentResults.length === 0 ? (
              <div className="mt-6 rounded-lg border border-dashed border-border bg-page p-8 text-center">
                <Target className="mx-auto h-7 w-7 text-body" />

                <p className="mt-3 text-sm text-body">
                  No assessments completed yet.
                </p>
              </div>
            ) : (
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {assessmentResults.map(
                  (result) => (
                    <AssessmentCard
                      key={result.id}
                      result={result}
                    />
                  )
                )}
              </div>
            )}
          </Card>
        </div>

        {/* ================= CERTIFICATIONS ================= */}

        <div className="mt-6">
          <Card className="p-6 sm:p-8">
            <SectionHeader
              icon={
                <Award className="h-5 w-5" />
              }
              iconBackground="bg-amber-50"
              iconColor="text-warning"
              title="Certifications"
              subtitle="Your professional certifications and credentials."
            />

            <div className="mt-6 rounded-lg border border-dashed border-border bg-page p-7 text-center">
              <Award className="mx-auto h-7 w-7 text-body" />

              <p className="mt-3 text-sm font-medium text-heading">
                Certification information
              </p>

              <p className="mt-1 text-xs text-body">
                Certifications will appear here when available.
              </p>
            </div>
          </Card>
        </div>

        {/* ================= PROJECTS ================= */}

        <div className="mt-6">
          <Card className="p-6 sm:p-8">
            <SectionHeader
              icon={
                <BriefcaseBusiness className="h-5 w-5" />
              }
              iconBackground="bg-indigo-50"
              iconColor="text-primary"
              title="Projects"
              subtitle="Your practical work and academic projects."
            />

            <div className="mt-6 rounded-lg border border-dashed border-border bg-page p-7 text-center">
              <BriefcaseBusiness className="mx-auto h-7 w-7 text-body" />

              <p className="mt-3 text-sm font-medium text-heading">
                Project information
              </p>

              <p className="mt-1 text-xs text-body">
                Your projects will appear here when available.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   SKILL CARD
============================================================ */

function SkillCard({ skill }) {
  const levelMap = {
    BEGINNER: 25,
    INTERMEDIATE: 50,
    ADVANCED: 75,
    EXPERT: 100,
  };

  const progress =
    levelMap[skill.level] || 0;

  return (
    <div className="rounded-lg border border-border bg-white p-5 transition hover:border-indigo-100 hover:shadow-card">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>

          <h3 className="truncate text-sm font-bold text-heading">
            {skill.skill?.name}
          </h3>
        </div>

        <SkillChip
          skill={skill.level}
          type="verified"
        />
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wide text-body">
            Proficiency
          </span>

          <span className="text-xs font-bold text-heading">
            {progress}%
          </span>
        </div>

        <ProgressBar
          progress={progress}
          color="bg-primary"
        />
      </div>
    </div>
  );
}

/* ============================================================
   ASSESSMENT CARD
============================================================ */

function AssessmentCard({ result }) {
  return (
    <div className="rounded-lg border border-border bg-white p-5 transition hover:border-violet-100 hover:shadow-card">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50">
            <CheckCircle2 className="h-5 w-5 text-success" />
          </div>

          <div className="min-w-0">
            <h3 className="truncate font-display text-base font-bold text-heading">
              {result.skill?.name}
            </h3>

            <p className="mt-1 text-xs text-body">
              Assessment Result
            </p>
          </div>
        </div>

        <SkillChip
          skill={result.level}
          type="neutral"
        />
      </div>

      <div className="mt-5 flex items-end justify-between">
        <div>
          <p className="text-xs text-body">
            Score
          </p>

          <p className="mt-1 font-display text-lg font-bold text-heading">
            {result.score}/
            {result.totalQuestions}
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs text-body">
            Percentage
          </p>

          <p className="mt-1 font-display text-2xl font-bold text-primary">
            {Math.round(result.percentage)}%
          </p>
        </div>
      </div>

      <div className="mt-5">
        <ProgressBar
          progress={result.percentage}
          color="bg-primary"
        />
      </div>
    </div>
  );
}

/* ============================================================
   SECTION HEADER
============================================================ */

function SectionHeader({
  icon,
  iconBackground,
  iconColor,
  title,
  subtitle,
}) {
  return (
    <div className="flex items-start gap-4">
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconBackground}`}
      >
        <span className={iconColor}>
          {icon}
        </span>
      </div>

      <div>
        <h2 className="font-display text-lg font-bold text-heading sm:text-xl">
          {title}
        </h2>

        <p className="mt-1 text-xs leading-5 text-body sm:text-sm">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   FORM FIELD
============================================================ */

function FormField({
  label,
  icon,
  children,
}) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-sm font-bold text-heading">
        <span className="text-primary">
          {icon}
        </span>

        {label}
      </label>

      {children}
    </div>
  );
}

/* ============================================================
   STYLES
============================================================ */

const inputStyle =
  "w-full rounded-md border border-border bg-white px-4 py-3 text-sm text-heading outline-none transition placeholder:text-body focus:border-primary focus:ring-2 focus:ring-indigo-100";

const selectStyle =
  "w-full rounded-md border border-border bg-white px-4 py-3 text-sm font-medium text-heading outline-none transition focus:border-primary focus:ring-2 focus:ring-indigo-100";

export default StudentProfile;
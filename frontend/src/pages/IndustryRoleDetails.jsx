import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BriefcaseBusiness,
  CheckCircle2,
  GraduationCap,
  MapPin,
  Target,
  AlertTriangle,
  TrendingUp,
  Users,
  Clock3,
} from "lucide-react";

import api from "../services/api";
import {
  Card,
  SkillChip,
  ProgressBar,
} from "../components/ui";

const levelValue = {
  BEGINNER: 1,
  INTERMEDIATE: 2,
  ADVANCED: 3,
  EXPERT: 4,
};

const levelLabel = {
  BEGINNER: "Beginner",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
  EXPERT: "Expert",
};

function IndustryRoleDetails() {
  const { id } = useParams();

  const [role, setRole] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          roleResponse,
          profileResponse,
        ] = await Promise.all([
          api.get(`/industry-roles/${id}`),
          api.get("/student-profile"),
        ]);

        setRole(roleResponse.data.role);
        setProfile(profileResponse.data.profile);
      } catch (error) {
        console.error(error);

        setMessage(
          error.response?.data?.message ||
            "Failed to load role details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-10">
        <Card className="p-10 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50">
            <BriefcaseBusiness className="h-7 w-7 text-primary" />
          </div>

          <h2 className="mt-5 font-display text-xl font-semibold text-heading">
            Loading role details
          </h2>

          <p className="mt-2 text-sm text-body">
            Comparing this role with your current skills...
          </p>
        </Card>
      </div>
    );
  }

  if (message || !role) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-10">
        <Card className="p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-rose-50">
              <AlertTriangle className="h-6 w-6 text-danger" />
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-heading">
                Unable to load role
              </h2>

              <p className="mt-1 text-sm text-body">
                {message || "Industry role not found"}
              </p>
            </div>
          </div>

          <Link
            to="/industry-roles"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Industry Roles
          </Link>
        </Card>
      </div>
    );
  }

  const studentSkills = profile?.skills || [];

  const skillAnalysis = role.requiredSkills.map(
    (requiredSkill) => {
      const studentSkill = studentSkills.find(
        (item) =>
          item.skillId === requiredSkill.skillId
      );

      const requiredValue =
        levelValue[requiredSkill.level];

      const studentValue = studentSkill
        ? levelValue[studentSkill.level]
        : 0;

      let status;
      let statusType;

      if (!studentSkill) {
        status = "SKILL GAP";
        statusType = "gap";
      } else if (studentValue >= requiredValue) {
        status = "MATCH";
        statusType = "matched";
      } else {
        status = "IMPROVE";
        statusType = "improve";
      }

      return {
        skill: requiredSkill.skill,
        requiredLevel: requiredSkill.level,
        studentLevel:
          studentSkill?.level || null,
        status,
        statusType,
      };
    }
  );

  const matchedSkills = skillAnalysis.filter(
    (item) => item.status === "MATCH"
  ).length;

  const gapSkills = skillAnalysis.filter(
    (item) =>
      item.status === "SKILL GAP" ||
      item.status === "IMPROVE"
  ).length;

  const totalSkills = skillAnalysis.length;

  const matchPercentage =
    totalSkills > 0
      ? Math.round(
          (matchedSkills / totalSkills) * 100
        )
      : 0;

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      {/* Back */}
      <Link
        to="/industry-roles"
        className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-primary-dark"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Industry Roles
      </Link>

      {/* Hero */}
      <Card className="mt-5 overflow-hidden p-0">
        <div className="border-b border-border bg-gradient-to-r from-indigo-50 to-violet-50 p-7 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-primary">
                <BriefcaseBusiness className="h-3.5 w-3.5" />
                INDUSTRY ROLE
              </div>

              <h1 className="mt-4 font-display text-3xl font-bold text-heading sm:text-4xl">
                {role.title}
              </h1>

              {role.description && (
                <p className="mt-4 text-sm leading-7 text-body sm:text-base">
                  {role.description}
                </p>
              )}
            </div>

            {/* Match Score */}
            <div className="shrink-0 rounded-xl bg-white p-5 text-center shadow-card">
              <p className="text-xs font-semibold uppercase tracking-wide text-body">
                Your Skill Match
              </p>

              <p className="mt-1 font-display text-4xl font-bold text-primary">
                {matchPercentage}%
              </p>

              <div className="mt-3 w-32">
                <ProgressBar
                  progress={matchPercentage}
                  color="bg-primary"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Role Information */}
        <div className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3">
          <InfoItem
            icon={
              <MapPin className="h-5 w-5" />
            }
            label="Location"
            value={
              role.location || "Not specified"
            }
          />

          <InfoItem
            icon={
              <Clock3 className="h-5 w-5" />
            }
            label="Experience"
            value={`${role.experience} years`}
          />

          <InfoItem
            icon={
              <GraduationCap className="h-5 w-5" />
            }
            label="Education"
            value={
              role.education || "Not specified"
            }
          />
        </div>
      </Card>

      {/* Required Skills */}
      <Card className="mt-8 p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-indigo-50">
            <Award className="h-5 w-5 text-primary" />
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-heading">
              Required Skills
            </h2>

            <p className="mt-1 text-sm text-body">
              Skills and proficiency levels expected for
              this industry role.
            </p>
          </div>
        </div>

        {role.requiredSkills.length === 0 ? (
          <div className="mt-6 rounded-lg border border-dashed border-border bg-page p-6 text-center">
            <p className="text-sm text-body">
              No specific skills have been listed for
              this role.
            </p>
          </div>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {role.requiredSkills.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 rounded-lg border border-border p-4 transition hover:shadow-card"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-page">
                    <Target className="h-4 w-4 text-primary" />
                  </div>

                  <span className="font-semibold text-heading">
                    {item.skill?.name}
                  </span>
                </div>

                <SkillChip
                  skill={
                    levelLabel[item.level]
                  }
                  type="neutral"
                />
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Skill Gap Analysis */}
      <Card className="mt-8 p-6 sm:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-violet-50">
                <TrendingUp className="h-5 w-5 text-violet" />
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold text-heading">
                  Your Skill Gap Analysis
                </h2>

                <p className="mt-1 text-sm text-body">
                  Based on your current student skill
                  profile.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-indigo-50 px-6 py-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-body">
              Skill Match
            </p>

            <p className="mt-1 font-display text-3xl font-bold text-primary">
              {matchPercentage}%
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-7">
          <div className="mb-2 flex justify-between text-xs font-medium text-body">
            <span>Current Skill Alignment</span>

            <span>
              {matchedSkills}/{totalSkills} matched
            </span>
          </div>

          <ProgressBar
            progress={matchPercentage}
            color="bg-primary"
          />
        </div>

        {/* Summary Cards */}
        <div className="mt-7 grid gap-4 sm:grid-cols-3">
          <SummaryCard
            icon={
              <CheckCircle2 className="h-5 w-5" />
            }
            label="Matched Skills"
            value={matchedSkills}
            type="success"
          />

          <SummaryCard
            icon={
              <AlertTriangle className="h-5 w-5" />
            }
            label="Skill Gaps"
            value={gapSkills}
            type="warning"
          />

          <SummaryCard
            icon={
              <Award className="h-5 w-5" />
            }
            label="Required Skills"
            value={totalSkills}
            type="neutral"
          />
        </div>

        {/* Skill Analysis */}
        <div className="mt-8">
          <h3 className="mb-4 font-display text-lg font-semibold text-heading">
            Skill-by-Skill Analysis
          </h3>

          {/* Desktop Table */}
          <div className="hidden overflow-hidden rounded-lg border border-border md:block">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border bg-page text-left">
                  <th className="p-4 text-xs font-semibold uppercase tracking-wide text-body">
                    Skill
                  </th>

                  <th className="p-4 text-xs font-semibold uppercase tracking-wide text-body">
                    Your Level
                  </th>

                  <th className="p-4 text-xs font-semibold uppercase tracking-wide text-body">
                    Required Level
                  </th>

                  <th className="p-4 text-xs font-semibold uppercase tracking-wide text-body">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {skillAnalysis.map((item) => (
                  <tr
                    key={item.skill.id}
                    className="border-b border-border last:border-b-0"
                  >
                    <td className="p-4 font-semibold text-heading">
                      {item.skill.name}
                    </td>

                    <td className="p-4 text-sm text-body">
                      {item.studentLevel
                        ? levelLabel[
                            item.studentLevel
                          ]
                        : "Not added"}
                    </td>

                    <td className="p-4 text-sm text-body">
                      {levelLabel[
                        item.requiredLevel
                      ]}
                    </td>

                    <td className="p-4">
                      <StatusBadge
                        status={item.status}
                        type={item.statusType}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="space-y-3 md:hidden">
            {skillAnalysis.map((item) => (
              <div
                key={item.skill.id}
                className="rounded-lg border border-border p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <h4 className="font-semibold text-heading">
                    {item.skill.name}
                  </h4>

                  <StatusBadge
                    status={item.status}
                    type={item.statusType}
                  />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-md bg-page p-3">
                    <p className="text-xs text-body">
                      Your Level
                    </p>

                    <p className="mt-1 text-sm font-semibold text-heading">
                      {item.studentLevel
                        ? levelLabel[
                            item.studentLevel
                          ]
                        : "Not added"}
                    </p>
                  </div>

                  <div className="rounded-md bg-page p-3">
                    <p className="text-xs text-body">
                      Required
                    </p>

                    <p className="mt-1 text-sm font-semibold text-heading">
                      {levelLabel[
                        item.requiredLevel
                      ]}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Improvement Message */}
        {gapSkills > 0 && (
          <div className="mt-6 flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-warning" />

            <div>
              <p className="font-semibold text-amber-900">
                Skills need improvement
              </p>

              <p className="mt-1 text-sm text-amber-800">
                Focus on the skills marked as{" "}
                <strong>SKILL GAP</strong> or{" "}
                <strong>IMPROVE</strong> to better match
                this industry role.
              </p>
            </div>
          </div>
        )}

        {gapSkills === 0 &&
          totalSkills > 0 && (
            <div className="mt-6 flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />

              <div>
                <p className="font-semibold text-emerald-900">
                  All required skills matched
                </p>

                <p className="mt-1 text-sm text-emerald-800">
                  Your current skill levels meet the
                  required levels for all listed skills.
                </p>
              </div>
            </div>
          )}
      </Card>

      {/* Navigation */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          to="/industry-roles"
          className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-white px-5 py-3 text-sm font-semibold text-heading transition hover:bg-page"
        >
          <ArrowLeft className="h-4 w-4" />
          Browse Other Roles
        </Link>

        {gapSkills > 0 && (
          <Link
            to="/learning-recommendations"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-violet px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-hover"
          >
            Improve Your Skills
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
}) {
  return (
    <div className="rounded-lg bg-page p-4">
      <div className="flex items-center gap-3">
        <div className="text-primary">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-xs font-medium text-body">
            {label}
          </p>

          <p className="mt-1 truncate font-semibold text-heading">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({
  icon,
  label,
  value,
  type,
}) {
  const styles = {
    success: {
      wrapper:
        "bg-emerald-50 border-emerald-200",
      icon: "text-success",
      value: "text-emerald-800",
    },

    warning: {
      wrapper:
        "bg-amber-50 border-amber-200",
      icon: "text-warning",
      value: "text-amber-800",
    },

    neutral: {
      wrapper:
        "bg-page border-border",
      icon: "text-body",
      value: "text-heading",
    },
  };

  const style = styles[type];

  return (
    <div
      className={`rounded-lg border p-4 ${style.wrapper}`}
    >
      <div className={style.icon}>
        {icon}
      </div>

      <p className="mt-3 text-sm text-body">
        {label}
      </p>

      <p
        className={`mt-1 font-display text-2xl font-bold ${style.value}`}
      >
        {value}
      </p>
    </div>
  );
}

function StatusBadge({
  status,
  type,
}) {
  if (type === "matched") {
    return (
      <SkillChip
        skill="MATCH"
        type="verified"
      />
    );
  }

  if (type === "gap") {
    return (
      <SkillChip
        skill="SKILL GAP"
        type="gap"
      />
    );
  }

  return (
    <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-warning">
      IMPROVE
    </span>
  );
}

export default IndustryRoleDetails;
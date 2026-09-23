import { useEffect, useState } from "react";
import {
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ExternalLink,
  Target,
  GraduationCap,
} from "lucide-react";

import api from "../services/api";
import {
  Card,
  SkillChip,
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

function LearningRecommendations() {
  const [profile, setProfile] = useState(null);
  const [roles, setRoles] = useState([]);
  const [resources, setResources] = useState([]);
  const [selectedRoleId, setSelectedRoleId] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          profileResponse,
          rolesResponse,
          resourcesResponse,
        ] = await Promise.all([
          api.get("/student-profile"),
          api.get("/industry-roles"),
          api.get("/learning-resources"),
        ]);

        setProfile(profileResponse.data.profile);
        setRoles(rolesResponse.data.roles || []);
        setResources(
          resourcesResponse.data.resources || []
        );
      } catch (error) {
        console.error(error);

        setMessage(
          error.response?.data?.message ||
            "Failed to load learning recommendations"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-10">
        <Card className="p-10 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-violet-50">
            <BookOpen className="h-7 w-7 text-violet" />
          </div>

          <h2 className="mt-5 font-display text-xl font-semibold text-heading">
            Loading your recommendations
          </h2>

          <p className="mt-2 text-sm text-body">
            Analyzing your skills and learning opportunities...
          </p>
        </Card>
      </div>
    );
  }

  const studentSkills = profile?.skills || [];

  const selectedRole = roles.find(
    (role) => role.id === Number(selectedRoleId)
  );

  let gapSkillIds = [];

  if (selectedRole) {
    gapSkillIds = selectedRole.requiredSkills
      .filter((requiredSkill) => {
        const studentSkill = studentSkills.find(
          (item) =>
            item.skillId === requiredSkill.skillId
        );

        if (!studentSkill) {
          return true;
        }

        return (
          levelValue[studentSkill.level] <
          levelValue[requiredSkill.level]
        );
      })
      .map((item) => item.skillId);
  } else {
    gapSkillIds = studentSkills
      .filter(
        (item) => item.level === "BEGINNER"
      )
      .map((item) => item.skillId);
  }

  const recommendedResources = resources.filter(
    (resource) =>
      gapSkillIds.includes(resource.skillId)
  );

  const gapSkills = gapSkillIds
    .map((skillId) => {
      const resource = resources.find(
        (item) => item.skillId === skillId
      );

      const studentSkill = studentSkills.find(
        (item) => item.skillId === skillId
      );

      const requiredSkill =
        selectedRole?.requiredSkills.find(
          (item) => item.skillId === skillId
        );

      return {
        id: skillId,
        name:
          resource?.skill?.name || "Skill",
        studentLevel:
          studentSkill?.level || null,
        requiredLevel:
          requiredSkill?.level || null,
      };
    })
    .filter(
      (skill) => skill.name !== "Skill"
    );

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet">
          <Sparkles className="h-3.5 w-3.5" />
          AI LEARNING PATH
        </div>

        <h1 className="mt-3 font-display text-3xl font-bold text-heading">
          Learning Recommendations
        </h1>

        <p className="mt-2 max-w-2xl text-body">
          Discover what skills you need to improve and
          find learning resources matched to your career
          goals.
        </p>
      </div>

      {/* Error */}
      {message && (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-rose-200 bg-rose-50 p-4 text-danger">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />

          <div>
            <p className="font-semibold">
              Something went wrong
            </p>

            <p className="mt-1 text-sm">
              {message}
            </p>
          </div>
        </div>
      )}

      {/* Role Selection */}
      <Card className="mb-8 p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-indigo-50">
            <BriefcaseBusiness className="h-6 w-6 text-primary" />
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-heading">
              Choose Your Target Role
            </h2>

            <p className="mt-1 text-sm text-body">
              Select an industry role to compare your
              current skills against its requirements.
            </p>
          </div>
        </div>

        <div className="mt-6">
          <label className="mb-2 block text-sm font-semibold text-heading">
            Industry Role
          </label>

          <select
            value={selectedRoleId}
            onChange={(event) =>
              setSelectedRoleId(event.target.value)
            }
            className="w-full rounded-md border border-border bg-white px-4 py-3 text-sm text-heading outline-none transition focus:border-primary focus:ring-2 focus:ring-indigo-100"
          >
            <option value="">
              General Skill Improvement
            </option>

            {roles.map((role) => (
              <option
                key={role.id}
                value={role.id}
              >
                {role.title}
                {role.location
                  ? ` — ${role.location}`
                  : ""}
              </option>
            ))}
          </select>

          <div className="mt-3 flex items-start gap-2 text-sm text-body">
            <Target className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

            <p>
              {selectedRole
                ? `Recommendations are based on the requirements for ${selectedRole.title}.`
                : "General recommendations are based on your current beginner-level skills."}
            </p>
          </div>
        </div>
      </Card>

      {/* Skill Gaps */}
      <section className="mb-10">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold text-heading">
              Your Skill Gaps
            </h2>

            <p className="mt-1 text-sm text-body">
              Skills that need improvement based on your
              selected target.
            </p>
          </div>

          <div className="hidden h-11 w-11 items-center justify-center rounded-lg bg-amber-50 sm:flex">
            <AlertTriangle className="h-5 w-5 text-warning" />
          </div>
        </div>

        {gapSkills.length === 0 ? (
          <Card className="border-emerald-200 bg-emerald-50 p-7">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white">
                <CheckCircle2 className="h-6 w-6 text-success" />
              </div>

              <div>
                <h3 className="font-display text-lg font-semibold text-emerald-900">
                  No skill gaps found
                </h3>

                <p className="mt-1 text-sm text-emerald-800">
                  Your current skills meet the selected
                  requirements.
                </p>
              </div>
            </div>
          </Card>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {gapSkills.map((skill) => (
              <Card
                key={skill.id}
                hover
                className="p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-50">
                    <AlertTriangle className="h-5 w-5 text-warning" />
                  </div>

                  <SkillChip
                    skill="Skill Gap"
                    type="gap"
                  />
                </div>

                <h3 className="mt-5 font-display text-lg font-semibold text-heading">
                  {skill.name}
                </h3>

                <div className="mt-4 space-y-2">
                  <p className="text-sm text-body">
                    Your level:{" "}
                    <span className="font-semibold text-heading">
                      {skill.studentLevel
                        ? levelLabel[
                            skill.studentLevel
                          ]
                        : "Not added"}
                    </span>
                  </p>

                  {skill.requiredLevel && (
                    <p className="text-sm text-body">
                      Required:{" "}
                      <span className="font-semibold text-heading">
                        {levelLabel[
                          skill.requiredLevel
                        ]}
                      </span>
                    </p>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Recommended Learning */}
      <section>
        <div className="mb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-violet-50">
              <GraduationCap className="h-5 w-5 text-violet" />
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-heading">
                Recommended Learning
              </h2>

              <p className="mt-1 text-sm text-body">
                Resources selected to help you close your
                identified skill gaps.
              </p>
            </div>
          </div>
        </div>

        {recommendedResources.length === 0 ? (
          <Card className="p-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-page">
              <BookOpen className="h-7 w-7 text-body" />
            </div>

            <h3 className="mt-4 font-display text-lg font-semibold text-heading">
              No learning resources available
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm text-body">
              There are no learning resources available
              for your current skill gaps yet.
            </p>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {recommendedResources.map(
              (resource) => (
                <Card
                  key={resource.id}
                  hover
                  className="flex h-full flex-col p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 shrink-0 text-violet" />

                        <h3 className="font-display text-xl font-semibold text-heading">
                          {resource.title}
                        </h3>
                      </div>

                      {resource.skill?.name && (
                        <div className="mt-3">
                          <SkillChip
                            skill={
                              resource.skill.name
                            }
                            type="neutral"
                          />
                        </div>
                      )}
                    </div>

                    <span className="shrink-0 rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet">
                      {resource.type}
                    </span>
                  </div>

                  {resource.description && (
                    <p className="mt-5 text-sm leading-6 text-body">
                      {resource.description}
                    </p>
                  )}

                  {resource.provider && (
                    <div className="mt-5 flex items-center gap-2 text-sm text-body">
                      <span>Provider:</span>

                      <span className="font-semibold text-heading">
                        {resource.provider}
                      </span>
                    </div>
                  )}

                  {resource.url && (
                    <div className="mt-auto pt-6">
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-md bg-violet px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-hover"
                      >
                        Start Learning
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  )}
                </Card>
              )
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default LearningRecommendations;
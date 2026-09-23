import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  MapPin,
  Clock,
  IndianRupee,
  CheckCircle2,
  AlertTriangle,
  BriefcaseBusiness,
  Target,
  ChevronRight,
  BrainCircuit,
  UserRound,
  GraduationCap,
} from "lucide-react";

import api from "../services/api";
import { Card, SkillChip, ProgressBar } from "../components/ui";

function SmartRecommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await api.get("/matching/recommendations");

        setRecommendations(response.data.recommendations || []);
        setStudent(response.data.student || null);
      } catch (error) {
        console.error(error);

        setMessage(
          error.response?.data?.message ||
            "Failed to load recommendations"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="min-h-screen bg-page">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Header student={student} />

        {message && <ErrorState message={message} />}

        {!message && recommendations.length === 0 && (
          <EmptyState />
        )}

        {recommendations.length > 0 && (
          <>
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <BrainCircuit className="h-5 w-5 text-violet" />

                  <h2 className="font-display text-2xl font-bold text-heading">
                    Recommended Opportunities
                  </h2>
                </div>

                <p className="mt-1 text-sm text-body">
                  Personalized using your existing profile and skill data.
                </p>
              </div>

              <span className="w-fit rounded-full bg-violet-100 px-3 py-1.5 text-xs font-semibold text-violet">
                {recommendations.length}{" "}
                {recommendations.length === 1
                  ? "recommendation"
                  : "recommendations"}
              </span>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              {recommendations.map((internship) => (
                <RecommendationCard
                  key={internship.id}
                  internship={internship}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Header({ student }) {
  return (
    <div className="mb-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-100 px-3 py-1.5 text-xs font-bold tracking-wide text-violet">
            <Sparkles className="h-3.5 w-3.5" />
            AI POWERED MATCHING
          </div>

          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-heading sm:text-4xl">
            Smart Internship
            <span className="block text-violet">Recommendations</span>
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-body sm:text-base">
            Discover internships matched with your skills, career goals,
            location, and profile information.
          </p>
        </div>

        <Link
          to="/internships"
          className="inline-flex w-fit items-center gap-2 rounded-md border border-border bg-white px-4 py-2.5 text-sm font-semibold text-heading shadow-card transition hover:border-violet-300 hover:bg-violet-50"
        >
          Browse All Internships
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      {student && (
        <div className="mt-6 overflow-hidden rounded-xl border border-violet-200 bg-gradient-to-r from-violet-100 to-indigo-50 p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet text-white">
                <UserRound className="h-5 w-5" />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-violet">
                  Matching Profile
                </p>

                <h2 className="mt-1 font-display text-lg font-bold text-heading">
                  {student.name || "Student"}
                </h2>

                <p className="mt-1 text-sm text-body">
                  Your recommendations are based on your current profile.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {student.careerGoal && (
                <ProfileBadge
                  icon={<Target className="h-3.5 w-3.5" />}
                  label="Career Goal"
                  value={student.careerGoal}
                />
              )}

              {student.location && (
                <ProfileBadge
                  icon={<MapPin className="h-3.5 w-3.5" />}
                  label="Location"
                  value={student.location}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function RecommendationCard({ internship }) {
  const breakdown = internship.scoreBreakdown || {};

  const matchPercentage = Number(internship.matchPercentage || 0);

  const matchedSkills = internship.matchedSkills || [];
  const skillGaps = internship.skillGaps || [];
  const reasons = internship.reasons || [];
  const requiredSkills = internship.requiredSkills || [];

  return (
    <Card className="overflow-hidden p-0">
      {/* Card heading */}
      <div className="border-b border-border bg-white p-5 sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-violet-100 px-2.5 py-1 text-xs font-bold text-violet">
              <Sparkles className="h-3.5 w-3.5" />
              AI RECOMMENDED
            </div>

            <h2 className="break-words font-display text-xl font-bold text-heading">
              {internship.title}
            </h2>

            {internship.creator?.name && (
              <div className="mt-2 flex items-center gap-2 text-sm text-body">
                <BriefcaseBusiness className="h-4 w-4 shrink-0" />

                <span>
                  Posted by{" "}
                  <span className="font-semibold text-heading">
                    {internship.creator.name}
                  </span>
                </span>
              </div>
            )}
          </div>

          <MatchCircle percentage={matchPercentage} />
        </div>

        {internship.description && (
          <p className="mt-5 line-clamp-3 text-sm leading-6 text-body">
            {internship.description}
          </p>
        )}

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <DetailItem
            icon={<MapPin className="h-4 w-4" />}
            label="Location"
            value={internship.location || "Not specified"}
          />

          <DetailItem
            icon={<Clock className="h-4 w-4" />}
            label="Duration"
            value={internship.duration || "Not specified"}
          />

          <DetailItem
            icon={<IndianRupee className="h-4 w-4" />}
            label="Stipend"
            value={internship.stipend || "Not specified"}
          />
        </div>
      </div>

      {/* AI score breakdown */}
      <div className="border-b border-violet-200 bg-gradient-to-br from-violet-50 to-indigo-50 p-5 sm:p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet text-white shadow-sm">
            <BrainCircuit className="h-5 w-5" />
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-heading">
              AI Match Breakdown
            </h3>

            <p className="text-xs text-body">
              Existing matching score components
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <ScoreRow
            label="Skill Score"
            score={breakdown.skillScore}
            maximum={60}
            color="bg-primary"
          />

          <ScoreRow
            label="Career Goal Score"
            score={breakdown.careerScore}
            maximum={20}
            color="bg-violet"
          />

          <ScoreRow
            label="Location Score"
            score={breakdown.locationScore}
            maximum={10}
            color="bg-success"
          />

          <ScoreRow
            label="Experience Score"
            score={breakdown.experienceScore}
            maximum={10}
            color="bg-warning"
          />
        </div>
      </div>

      {/* Skill information */}
      <div className="space-y-6 p-5 sm:p-6">
        <SkillSection
          title="Matched Skills"
          icon={<CheckCircle2 className="h-4 w-4" />}
          iconClass="text-success"
          skills={matchedSkills}
          type="verified"
          emptyText="No matched skills were returned."
        />

        <SkillSection
          title="Skill Gaps"
          icon={<AlertTriangle className="h-4 w-4" />}
          iconClass="text-warning"
          skills={skillGaps}
          type="gap"
          emptyText="No skill gaps were returned."
        />

        <SkillSection
          title="Required Skills"
          icon={<GraduationCap className="h-4 w-4" />}
          iconClass="text-primary"
          skills={requiredSkills}
          type="neutral"
          required
          emptyText="No required skills were specified."
        />

        {reasons.length > 0 && (
          <section>
            <SectionHeading
              icon={<Sparkles className="h-4 w-4" />}
              title="Why This Was Recommended"
              iconClass="text-violet"
            />

            <div className="space-y-3">
              {reasons.map((reason, index) => (
                <div
                  key={`${reason}-${index}`}
                  className="flex items-start gap-2.5 rounded-md bg-page p-3 text-sm leading-5 text-body"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  <span>{reason}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Action */}
      <div className="border-t border-border bg-page p-5 sm:p-6">
        <Link
          to={`/internships/${internship.id}`}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-violet px-4 py-3 text-sm font-bold text-white transition hover:bg-violet-hover focus:outline-none focus:ring-2 focus:ring-violet focus:ring-offset-2"
        >
          View Internship Details
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </Card>
  );
}

function MatchCircle({ percentage }) {
  const safePercentage = Math.max(0, Math.min(100, percentage));

  return (
    <div
      className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-full"
      style={{
        background: `conic-gradient(#7c3aed ${safePercentage}%, #ede9fe ${safePercentage}% 100%)`,
      }}
      aria-label={`${safePercentage}% match`}
    >
      <div className="flex h-[76px] w-[76px] flex-col items-center justify-center rounded-full bg-white">
        <span className="font-display text-xl font-bold text-violet">
          {safePercentage}%
        </span>

        <span className="text-[10px] font-bold uppercase tracking-wide text-body">
          Match
        </span>
      </div>
    </div>
  );
}

function ScoreRow({ label, score = 0, maximum, color }) {
  const numericScore = Number(score || 0);
  const percentage = maximum
    ? Math.min(100, Math.max(0, Math.round((numericScore / maximum) * 100)))
    : 0;

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between gap-3">
        <span className="text-xs font-semibold text-heading">
          {label}
        </span>

        <span className="text-xs font-bold tabular-nums text-body">
          {numericScore}/{maximum}
        </span>
      </div>

      <ProgressBar progress={percentage} color={color} />
    </div>
  );
}

function SkillSection({
  title,
  icon,
  iconClass,
  skills,
  type,
  required = false,
  emptyText,
}) {
  return (
    <section>
      <SectionHeading
        icon={icon}
        title={title}
        iconClass={iconClass}
      />

      {skills.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => {
            const name = required
              ? getRequiredSkillLabel(skill)
              : getSkillName(skill);

            return (
              <SkillChip
                key={`${name}-${index}`}
                skill={name}
                type={type}
              />
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-body">{emptyText}</p>
      )}
    </section>
  );
}

function SectionHeading({ icon, title, iconClass }) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <span className={iconClass}>{icon}</span>

      <h3 className="font-display text-sm font-bold text-heading">
        {title}
      </h3>
    </div>
  );
}

function DetailItem({ icon, label, value }) {
  return (
    <div className="min-w-0 rounded-md border border-border bg-page p-3">
      <div className="flex items-center gap-1.5 text-xs text-body">
        {icon}
        <span>{label}</span>
      </div>

      <p className="mt-1 truncate text-sm font-semibold text-heading">
        {value}
      </p>
    </div>
  );
}

function ProfileBadge({ icon, label, value }) {
  return (
    <div className="max-w-full rounded-md border border-white bg-white px-3 py-2 shadow-sm">
      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-body">
        {icon}
        {label}
      </div>

      <p className="mt-1 max-w-[220px] truncate text-xs font-semibold text-heading">
        {value}
      </p>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="min-h-screen bg-page px-4 py-12">
      <div className="mx-auto max-w-2xl rounded-xl border border-violet-200 bg-white p-10 text-center shadow-card">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-violet-100">
          <Sparkles className="h-7 w-7 animate-pulse text-violet" />
        </div>

        <h2 className="mt-5 font-display text-xl font-bold text-heading">
          Finding your best opportunities
        </h2>

        <p className="mt-2 text-sm text-body">
          Analyzing your existing skills, career goal, location, and profile.
        </p>
      </div>
    </div>
  );
}

function ErrorState({ message }) {
  return (
    <div className="mb-6 flex items-start gap-3 rounded-lg border border-rose-200 bg-rose-50 p-4 text-danger">
      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />

      <div>
        <p className="font-bold">Unable to load recommendations</p>

        <p className="mt-1 text-sm">{message}</p>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <Card className="p-10 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-violet-100">
        <Sparkles className="h-8 w-8 text-violet" />
      </div>

      <h2 className="mt-5 font-display text-xl font-bold text-heading">
        No recommendations available
      </h2>

      <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-body">
        Add more skills to your student profile or check again after new
        internships are posted.
      </p>

      <Link
        to="/internships"
        className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-primary-dark"
      >
        Browse Internships
        <ChevronRight className="h-4 w-4" />
      </Link>
    </Card>
  );
}

function getSkillName(skill) {
  if (typeof skill === "string") {
    return skill;
  }

  return skill?.name || skill?.skill?.name || "Unnamed skill";
}

function getRequiredSkillLabel(skill) {
  if (typeof skill === "string") {
    return skill;
  }

  const skillName = skill?.skill?.name || skill?.name || "Unnamed skill";
  const level = skill?.level;

  return level ? `${skillName} — ${level}` : skillName;
}

export default SmartRecommendations;
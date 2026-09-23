import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BriefcaseBusiness,
  MapPin,
  GraduationCap,
  Clock3,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Save,
} from "lucide-react";

import api from "../services/api";
import { Card, SkillChip } from "../components/ui";

function IndustryRoleCreate() {
  const navigate = useNavigate();

  const [skills, setSkills] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState(0);
  const [education, setEducation] = useState("");

  const [selectedSkills, setSelectedSkills] =
    useState([]);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await api.get("/skills");

        setSkills(response.data.skills || []);
      } catch (error) {
        console.error(error);
        setMessage("Failed to load skills");
      }
    };

    fetchSkills();
  }, []);

  const handleSkillChange = (skillId) => {
    const id = Number(skillId);

    const alreadySelected =
      selectedSkills.find(
        (skill) => skill.skillId === id
      );

    if (alreadySelected) {
      setSelectedSkills(
        selectedSkills.filter(
          (skill) => skill.skillId !== id
        )
      );
    } else {
      setSelectedSkills([
        ...selectedSkills,
        {
          skillId: id,
          level: "BEGINNER",
        },
      ]);
    }
  };

  const handleLevelChange = (
    skillId,
    level
  ) => {
    setSelectedSkills(
      selectedSkills.map((skill) =>
        skill.skillId === skillId
          ? { ...skill, level }
          : skill
      )
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim()) {
      setMessage("Please enter a role title");
      return;
    }

    if (selectedSkills.length === 0) {
      setMessage(
        "Please select at least one required skill"
      );
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await api.post(
        "/industry-roles",
        {
          title,
          description,
          location,
          experience: Number(experience),
          education,
          requiredSkills: selectedSkills,
        }
      );

      if (response.data.success) {
        setMessage(
          "Industry role created successfully!"
        );

        setTimeout(() => {
          navigate("/industry-roles");
        }, 1000);
      }
    } catch (error) {
      console.error(error);

      setMessage(
        error.response?.data?.message ||
          "Failed to create industry role"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-primary">
          <BriefcaseBusiness className="h-3.5 w-3.5" />
          INDUSTRY ROLE SETUP
        </div>

        <h1 className="mt-3 font-display text-3xl font-bold text-heading">
          Create Industry Role
        </h1>

        <p className="mt-2 max-w-2xl text-body">
          Define the role requirements so students can
          understand the skills and qualifications needed
          by industry.
        </p>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit}>
        {/* Basic Information */}
        <Card className="p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-indigo-50">
              <BriefcaseBusiness className="h-5 w-5 text-primary" />
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-heading">
                Role Information
              </h2>

              <p className="mt-1 text-sm text-body">
                Provide the basic details of the industry
                role.
              </p>
            </div>
          </div>

          <div className="mt-7 space-y-5">
            {/* Title */}
            <FormField
              label="Role Title"
              icon={
                <BriefcaseBusiness className="h-4 w-4" />
              }
            >
              <input
                type="text"
                value={title}
                onChange={(event) =>
                  setTitle(event.target.value)
                }
                placeholder="Example: Full Stack Developer"
                className={inputStyle}
              />
            </FormField>

            {/* Description */}
            <FormField
              label="Description"
              icon={
                <Sparkles className="h-4 w-4" />
              }
            >
              <textarea
                value={description}
                onChange={(event) =>
                  setDescription(event.target.value)
                }
                placeholder="Describe the role, responsibilities, and expectations..."
                rows={5}
                className={`${inputStyle} resize-none`}
              />
            </FormField>

            {/* Location / Experience */}
            <div className="grid gap-5 md:grid-cols-2">
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
                    setLocation(event.target.value)
                  }
                  placeholder="Example: Hyderabad"
                  className={inputStyle}
                />
              </FormField>

              <FormField
                label="Experience (years)"
                icon={
                  <Clock3 className="h-4 w-4" />
                }
              >
                <input
                  type="number"
                  min="0"
                  value={experience}
                  onChange={(event) =>
                    setExperience(event.target.value)
                  }
                  className={inputStyle}
                />
              </FormField>
            </div>

            {/* Education */}
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
                  setEducation(event.target.value)
                }
                placeholder="Example: B.Tech / B.E / MCA"
                className={inputStyle}
              />
            </FormField>
          </div>
        </Card>

        {/* Skills */}
        <Card className="mt-6 p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-violet-50">
              <Sparkles className="h-5 w-5 text-violet" />
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-heading">
                Required Skills
              </h2>

              <p className="mt-1 text-sm text-body">
                Select the skills candidates need and set
                the expected proficiency level.
              </p>
            </div>
          </div>

          {/* Selected Count */}
          <div className="mt-6 flex items-center justify-between rounded-lg bg-page p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white">
                <CheckCircle2 className="h-4 w-4 text-success" />
              </div>

              <div>
                <p className="text-sm font-semibold text-heading">
                  Skills Selected
                </p>

                <p className="text-xs text-body">
                  Choose at least one required skill
                </p>
              </div>
            </div>

            <span className="font-display text-xl font-bold text-primary">
              {selectedSkills.length}
            </span>
          </div>

          {/* Skill List */}
          <div className="mt-6 space-y-3">
            {skills.length === 0 ? (
              <div className="rounded-lg border border-dashed border-border bg-page p-7 text-center">
                <Sparkles className="mx-auto h-7 w-7 text-body" />

                <p className="mt-3 text-sm text-body">
                  No skills available.
                </p>
              </div>
            ) : (
              skills.map((skill) => {
                const selected =
                  selectedSkills.find(
                    (item) =>
                      item.skillId === skill.id
                  );

                return (
                  <div
                    key={skill.id}
                    className={`rounded-lg border p-4 transition ${
                      selected
                        ? "border-indigo-200 bg-indigo-50/50"
                        : "border-border bg-white hover:shadow-card"
                    }`}
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <label className="flex cursor-pointer items-center gap-3">
                        <input
                          type="checkbox"
                          checked={!!selected}
                          onChange={() =>
                            handleSkillChange(
                              skill.id
                            )
                          }
                          className="h-4 w-4 accent-indigo-600"
                        />

                        <span className="font-semibold text-heading">
                          {skill.name}
                        </span>
                      </label>

                      {selected && (
                        <div className="flex items-center gap-3">
                          <SkillChip
                            skill={
                              selected.level
                            }
                            type="neutral"
                          />

                          <select
                            value={
                              selected.level
                            }
                            onChange={(event) =>
                              handleLevelChange(
                                skill.id,
                                event.target.value
                              )
                            }
                            className={smallSelectStyle}
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
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </Card>

        {/* Message */}
        {message && (
          <div
            className={`mt-6 flex items-start gap-3 rounded-lg border p-4 ${
              message.includes(
                "successfully"
              )
                ? "border-emerald-200 bg-emerald-50 text-success"
                : "border-rose-200 bg-rose-50 text-danger"
            }`}
          >
            {message.includes(
              "successfully"
            ) ? (
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
            ) : (
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
            )}

            <div>
              <p className="font-semibold">
                {message.includes(
                  "successfully"
                )
                  ? "Success"
                  : "Please check your information"}
              </p>

              <p className="mt-1 text-sm">
                {message}
              </p>
            </div>
          </div>
        )}

        {/* Submit */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() =>
              navigate("/industry-roles")
            }
            className="rounded-md border border-border bg-white px-6 py-3 text-sm font-semibold text-heading transition hover:bg-page"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-7 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Creating Role...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Create Industry Role
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

const inputStyle =
  "w-full rounded-md border border-border bg-white px-4 py-3 text-sm text-heading outline-none transition placeholder:text-body focus:border-primary focus:ring-2 focus:ring-indigo-100";

const smallSelectStyle =
  "rounded-md border border-border bg-white px-3 py-2 text-sm text-heading outline-none focus:border-primary focus:ring-2 focus:ring-indigo-100";

function FormField({
  label,
  icon,
  children,
}) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-heading">
        <span className="text-primary">
          {icon}
        </span>

        {label}
      </label>

      {children}
    </div>
  );
}

export default IndustryRoleCreate;
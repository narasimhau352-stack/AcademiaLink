import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Brain,
  BookOpen,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  ChevronRight,
  CircleHelp,
  RotateCcw,
  Sparkles,
  Target,
  Trophy,
  AlertTriangle,
  Loader2,
} from "lucide-react";

import api from "../services/api";
import {
  Card,
  ProgressBar,
} from "../components/ui";

function SkillAssessment() {
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState("");

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answers, setAnswers] = useState([]);

  const [result, setResult] = useState(null);
  const [answerReview, setAnswerReview] = useState([]);

  const [loadingSkills, setLoadingSkills] = useState(true);
  const [loadingQuestions, setLoadingQuestions] =
    useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");

  /* ================= FETCH SKILLS ================= */

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await api.get("/skills");

        setSkills(response.data.skills);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to load skills."
        );
      } finally {
        setLoadingSkills(false);
      }
    };

    fetchSkills();
  }, []);

  /* ================= START ASSESSMENT ================= */

  const startAssessment = async () => {
    if (!selectedSkill) {
      setError("Please select a skill.");
      return;
    }

    setLoadingQuestions(true);
    setError("");

    try {
      const response = await api.get(
        `/assessment/questions?skillId=${selectedSkill}`
      );

      setQuestions(response.data.questions);

      setCurrentQuestion(0);
      setSelectedAnswer("");
      setAnswers([]);
      setResult(null);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to load assessment questions."
      );
    } finally {
      setLoadingQuestions(false);
    }
  };

  /* ================= QUESTION NAVIGATION ================= */

  const saveCurrentAnswer = () => {
    if (!questions[currentQuestion] || !selectedAnswer) {
      return answers;
    }

    const questionId = questions[currentQuestion].id;
    const answerObject = {
      questionId,
      answer: selectedAnswer,
    };

    const existingIndex = answers.findIndex(
      (item) => item.questionId === questionId
    );

    if (existingIndex === -1) {
      return [...answers, answerObject];
    }

    return answers.map((item, index) =>
      index === existingIndex ? answerObject : item
    );
  };

  const handlePrevious = () => {
    if (currentQuestion === 0) return;

    const updatedAnswers = saveCurrentAnswer();
    setAnswers(updatedAnswers);

    const previousQuestionIndex = currentQuestion - 1;
    const previousQuestion = questions[previousQuestionIndex];
    const previousAnswer = updatedAnswers.find(
      (item) => item.questionId === previousQuestion.id
    );

    setCurrentQuestion(previousQuestionIndex);
    setSelectedAnswer(previousAnswer?.answer || "");
    setError("");
  };

  const handleNext = async () => {
    if (!selectedAnswer || submitting) {
      return;
    }

    const updatedAnswers = saveCurrentAnswer();
    setAnswers(updatedAnswers);

    if (currentQuestion === questions.length - 1) {
      await submitAssessment(updatedAnswers);
      return;
    }

    const nextQuestionIndex = currentQuestion + 1;
    const nextQuestion = questions[nextQuestionIndex];
    const nextAnswer = updatedAnswers.find(
      (item) => item.questionId === nextQuestion.id
    );

    setCurrentQuestion(nextQuestionIndex);
    setSelectedAnswer(nextAnswer?.answer || "");
    setError("");
  };

  /* ================= SUBMIT ================= */

  const submitAssessment = async (
    finalAnswers
  ) => {
    setSubmitting(true);
    setError("");

    try {
      const response = await api.post(
        "/assessment/submit",
        {
          skillId: Number(selectedSkill),
          answers: finalAnswers,
        }
      );

      const serverResult = response.data.result || {};
      setResult(serverResult);
      setAnswerReview(buildAnswerReview(questions, finalAnswers, serverResult));
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to submit assessment."
      );
    } finally {
      setSubmitting(false);
    }
  };

  /* ================= RESET ================= */

  const resetAssessment = () => {
    setResult(null);
    setAnswerReview([]);
    setQuestions([]);
    setSelectedSkill("");
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedAnswer("");
    setError("");
  };

  const selectedSkillName =
    skills.find(
      (skill) =>
        skill.id === Number(selectedSkill)
    )?.name || "";

  /* ================= LOADING ================= */

  if (loadingSkills) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
        <Card className="border-primary/10 p-8 text-center shadow-card sm:p-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-light">
            <Loader2 className="h-7 w-7 animate-spin text-primary" />
          </div>

          <h2 className="mt-5 font-display text-xl font-semibold text-heading">
            Loading skills
          </h2>

          <p className="mt-2 text-sm text-body">
            Preparing your skill assessment...
          </p>
        </Card>
      </div>
    );
  }

  /* ================= RESULT ================= */

  if (result) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">

        {/* Header */}

        <div className="mb-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50">
            <Trophy className="h-8 w-8 text-success" />
          </div>

          <h1 className="mt-5 font-display text-3xl font-bold text-heading">
            Assessment Completed!
          </h1>

          <p className="mt-2 text-body">
            Your{" "}
            <span className="font-semibold text-heading">
              {selectedSkillName}
            </span>{" "}
            assessment has been evaluated.
          </p>
        </div>

        <Card className="border-primary/10 p-5 shadow-card sm:p-8">

          {/* Result Cards */}

          <div className="grid gap-5 md:grid-cols-3">

            {/* Score */}

            <div className="rounded-xl border border-primary/10 bg-primary-light/60 p-6">
              <div className="flex items-center gap-2 text-primary">
                <Target className="h-5 w-5" />

                <p className="text-sm font-semibold">
                  Score
                </p>
              </div>

              <p className="mt-4 font-display text-3xl font-bold text-heading">
                {result.score}
                <span className="text-lg font-medium text-muted">
                  /{result.totalQuestions}
                </span>
              </p>
            </div>

            {/* Percentage */}

            <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-6">
              <div className="flex items-center gap-2 text-success">
                <CheckCircle2 className="h-5 w-5" />

                <p className="text-sm font-semibold">
                  Percentage
                </p>
              </div>

              <p className="mt-4 font-display text-3xl font-bold text-heading">
                {Math.round(result.percentage)}%
              </p>

              <div className="mt-4">
                <ProgressBar
                  progress={Math.round(
                    result.percentage
                  )}
                  color="bg-success"
                />
              </div>
            </div>

            {/* Level */}

            <div className="rounded-xl border border-violet-100 bg-violet-50 p-6">
              <div className="flex items-center gap-2 text-violet">
                <Sparkles className="h-5 w-5" />

                <p className="text-sm font-semibold">
                  Skill Level
                </p>
              </div>

              <p className="mt-4 font-display text-2xl font-bold text-heading">
                {result.level}
              </p>
            </div>
          </div>

          {/* Answer Review */}

          <div className="mt-8 rounded-xl border border-border bg-white/80 p-5 sm:p-7">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
                <ClipboardReviewIcon />
              </div>
              <div>
                <h3 className="font-bold text-heading">Answer Review</h3>
                <p className="mt-1 text-sm leading-6 text-body">
                  Check every answer, see which ones were correct, and review the correct answer for questions you missed.
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              {answerReview.length === 0 ? (
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                  The assessment service did not return an answer key for these questions. Questions with a configured answer key will still show the exact correct answer below.
                </div>
              ) : answerReview.map((item, index) => (
                <div key={item.questionId || index} className={`rounded-xl border p-4 sm:p-5 ${item.isCorrect === true ? "border-emerald-200 bg-emerald-50/60" : item.isCorrect === false ? "border-rose-200 bg-rose-50/60" : "border-border bg-page"}`}>
                  <div className="flex items-start gap-3">
                    {item.isCorrect === true ? <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" /> : item.isCorrect === false ? <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-danger" /> : <CircleHelp className="mt-0.5 h-5 w-5 shrink-0 text-muted" />}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-heading">Question {index + 1}</p>
                      <p className="mt-1 text-sm leading-6 text-heading">{item.question}</p>

                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-lg border border-white/80 bg-white/75 p-3">
                          <p className="text-[11px] font-bold uppercase tracking-wide text-muted">Your answer</p>
                          <p className={`mt-1 text-sm font-semibold ${item.isCorrect === true ? "text-success" : item.isCorrect === false ? "text-danger" : "text-body"}`}>{item.selectedText || "Not answered"}</p>
                        </div>
                        <div className="rounded-lg border border-white/80 bg-white/75 p-3">
                          <p className="text-[11px] font-bold uppercase tracking-wide text-muted">Correct answer</p>
                          <p className="mt-1 text-sm font-semibold text-success">{item.correctText || "Not provided by the assessment service"}</p>
                        </div>
                      </div>

                      {item.isCorrect === false && item.correctText && (
                        <div className="mt-3 rounded-lg border border-emerald-200 bg-white/70 p-3 text-sm text-heading">
                          <span className="font-bold text-success">Learn from this:</span> Review the concept behind the correct answer before retaking the assessment.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Result Message */}

          <div className="mt-8 rounded-xl border border-border bg-primary-light/45 p-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />

              <div>
                <h3 className="font-semibold text-heading">
                  Skill assessment recorded
                </h3>

                <p className="mt-1 text-sm leading-6 text-body">
                  Your assessment result has been
                  evaluated and can be used for your
                  AcademiaLink skill profile and
                  future recommendations.
                </p>
              </div>
            </div>
          </div>

          {/* Recommended knowledge */}

          <div className="mt-8 rounded-xl border border-primary/10 bg-gradient-to-br from-primary-light/70 to-violet/10 p-6 sm:p-7">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-heading">What to learn next</h3>
                <p className="mt-1 text-sm leading-6 text-body">
                  Use this result as a learning roadmap for <span className="font-bold text-heading">{selectedSkillName}</span>.
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {getLearningTopics(result.level).map((topic) => (
                <div key={topic} className="flex items-start gap-3 rounded-lg border border-border bg-white/75 p-4">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  <span className="text-sm font-semibold text-heading">{topic}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to="/learning-recommendations"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-primary-dark"
              >
                <BookOpen className="h-4 w-4" />
                Open Learning Recommendations
              </Link>
            </div>
          </div>

          {/* Action */}

          <div className="mt-8 flex justify-center">
            <button
              onClick={resetAssessment}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
            >
              <RotateCcw className="h-4 w-4" />
              Take Another Assessment
            </button>
          </div>

        </Card>
      </div>
    );
  }

  /* ================= SKILL SELECTION ================= */

  if (questions.length === 0) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">

        {/* Header */}

        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-light px-3 py-1 text-xs font-semibold text-primary">
            <Brain className="h-3.5 w-3.5" />
            SKILL ASSESSMENT
          </div>

          <h1 className="mt-3 font-display text-3xl font-bold text-heading">
            Test Your Skills
          </h1>

          <p className="mt-2 max-w-2xl text-body">
            Select a skill and answer a set of questions
            to evaluate your current knowledge level.
          </p>
        </div>

        {/* Error */}

        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-danger">
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

        {/* Selection Card */}

        <Card className="max-w-3xl border-primary/10 p-6 shadow-card sm:p-8">

          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-light">
              <Target className="h-6 w-6 text-primary" />
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-heading">
                Choose a skill
              </h2>

              <p className="mt-1 text-sm text-body">
                Select the skill you want to assess.
              </p>
            </div>
          </div>

          <div className="mt-7">

            <label
              htmlFor="skill"
              className="mb-2 block text-sm font-semibold text-heading"
            >
              Skill
            </label>

            <select
              id="skill"
              value={selectedSkill}
              onChange={(event) =>
                setSelectedSkill(
                  event.target.value
                )
              }
              className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-heading outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option value="">
                Select a skill
              </option>

              {skills.map((skill) => (
                <option
                  key={skill.id}
                  value={skill.id}
                >
                  {skill.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-6 rounded-xl border border-border bg-primary-light/45 p-4">
            <div className="flex items-start gap-3">
              <CircleHelp className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

              <div>
                <p className="text-sm font-semibold text-heading">
                  How it works
                </p>

                <p className="mt-1 text-sm leading-6 text-body">
                  Choose a skill, answer each question,
                  and complete the assessment to receive
                  your score and skill level.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={startAssessment}
            disabled={
              !selectedSkill ||
              loadingQuestions
            }
            className="mt-7 flex w-full items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loadingQuestions ? (
              "Loading Questions..."
            ) : (
              <>
                Start Assessment
                <ChevronRight className="h-4 w-4" />
              </>
            )}
          </button>
        </Card>
      </div>
    );
  }

  /* ================= ASSESSMENT ================= */

  const question =
    questions[currentQuestion];

  const options = [
    {
      key: "A",
      value: question.optionA,
    },
    {
      key: "B",
      value: question.optionB,
    },
    {
      key: "C",
      value: question.optionC,
    },
    {
      key: "D",
      value: question.optionD,
    },
  ];

  const progress =
    ((currentQuestion + 1) /
      questions.length) *
    100;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10">

      {/* Header */}

      <div className="mb-7">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-light px-3 py-1 text-xs font-semibold text-primary">
              <Brain className="h-3.5 w-3.5" />
              ASSESSMENT
            </div>

            <h1 className="mt-3 font-display text-2xl font-bold text-heading">
              {selectedSkillName}
            </h1>

            <p className="mt-1 text-sm text-body">
              Answer the questions to determine your
              current skill level.
            </p>
          </div>

          <div className="text-left sm:text-right">
            <p className="text-xs font-medium text-muted">
              Progress
            </p>

            <p className="mt-1 text-sm font-semibold text-heading">
              {currentQuestion + 1} of{" "}
              {questions.length}
            </p>
          </div>
        </div>
      </div>

      {/* Assessment Card */}

      <Card className="border-primary/10 p-5 shadow-card sm:p-8">

        {/* Progress */}

        <div className="mb-7">

          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium text-body">
              Question{" "}
              {currentQuestion + 1}
            </span>

            <span className="rounded-full border border-primary/15 bg-primary-light px-3 py-1 text-xs font-semibold text-primary">
              {question.difficulty}
            </span>
          </div>

          <ProgressBar
            progress={progress}
            color="bg-primary"
          />
        </div>

        {/* Question */}

        <div className="rounded-xl border border-border bg-primary-light/45 p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
              {currentQuestion + 1}
            </div>

            <h2 className="pt-1 text-lg font-semibold leading-7 text-heading">
              {question.question}
            </h2>
          </div>
        </div>

        {/* Options */}

        <div className="mt-6 space-y-3">

          {options.map((option) => {
            const isSelected =
              selectedAnswer === option.key;

            return (
              <button
                key={option.key}
                onClick={() =>
                  setSelectedAnswer(
                    option.key
                  )
                }
                className={`group flex w-full items-start gap-4 rounded-xl border p-4 text-left transition ${
                  isSelected
                    ? "border-primary bg-primary-light ring-2 ring-primary/15"
                    : "border-border bg-white hover:border-primary/40 hover:bg-primary-light/40"
                }`}
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold transition ${
                    isSelected
                      ? "bg-primary text-white"
                      : "bg-primary-light text-heading group-hover:bg-primary-light group-hover:text-primary"
                  }`}
                >
                  {option.key}
                </span>

                <span
                  className={`pt-1 text-sm leading-6 ${
                    isSelected
                      ? "font-medium text-heading"
                      : "text-body"
                  }`}
                >
                  {option.value}
                </span>

                {isSelected && (
                  <CheckCircle2 className="ml-auto mt-1 h-5 w-5 shrink-0 text-primary" />
                )}
              </button>
            );
          })}
        </div>

        {/* Error */}

        {error && (
          <div className="mt-5 flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-danger">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />

            <p className="text-sm">
              {error}
            </p>
          </div>
        )}

        {/* Next */}

        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentQuestion === 0 || submitting}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-white px-5 py-3 text-sm font-semibold text-heading transition hover:border-primary/30 hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-50 sm:min-w-32"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </button>

          <button
            onClick={handleNext}
            disabled={!selectedAnswer || submitting}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50 sm:min-w-48"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : currentQuestion === questions.length - 1 ? (
              <>
                Finish Assessment
                <CheckCircle2 className="h-4 w-4" />
              </>
            ) : (
              <>
                Next Question
                <ChevronRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>

      </Card>
    </div>
  );
}

function normalizeCorrectKey(value, question) {
  if (value === null || value === undefined || value === "") return "";
  const raw = String(value).trim();
  const upper = raw.toUpperCase();
  if (["A", "B", "C", "D"].includes(upper)) return upper;
  const options = { A: question.optionA, B: question.optionB, C: question.optionC, D: question.optionD };
  const match = Object.entries(options).find(([, text]) => String(text ?? "").trim() === raw);
  return match?.[0] || "";
}

function extractReviewItem(serverReview, questionId) {
  if (!Array.isArray(serverReview)) return null;
  return serverReview.find((item) => Number(item.questionId ?? item.id) === Number(questionId)) || null;
}

function buildAnswerReview(questionList, submittedAnswers, serverResult) {
  const serverReview =
    serverResult?.answerReview ||
    serverResult?.answersReview ||
    serverResult?.review ||
    serverResult?.answers;

  return questionList.map((question) => {
    const submitted = submittedAnswers.find(
      (item) => Number(item.questionId) === Number(question.id)
    );
    const serverItem = extractReviewItem(serverReview, question.id);

    const selectedKey = normalizeCorrectKey(
      serverItem?.selectedAnswer ??
        serverItem?.userAnswer ??
        submitted?.answer,
      question
    );

    // IMPORTANT: Never guess a correct answer in the frontend.
    // The assessment backend must provide the answer key.
    const rawCorrect =
      serverItem?.correctAnswer ??
      serverItem?.correctOption ??
      serverItem?.correctKey ??
      serverItem?.answerKey ??
      null;

    const correctKey = normalizeCorrectKey(rawCorrect, question);
    const options = {
      A: question.optionA,
      B: question.optionB,
      C: question.optionC,
      D: question.optionD,
    };

    const selectedText =
      serverItem?.selectedText ||
      serverItem?.userAnswerText ||
      options[selectedKey] ||
      submitted?.answer ||
      "Not answered";

    const correctText =
      serverItem?.correctText ||
      serverItem?.correctAnswerText ||
      options[correctKey] ||
      (typeof rawCorrect === "string" && rawCorrect.trim()
        ? rawCorrect.trim()
        : "Answer key not returned by the assessment service");

    const explicitCorrect =
      typeof serverItem?.isCorrect === "boolean"
        ? serverItem.isCorrect
        : null;

    const isCorrect =
      explicitCorrect !== null
        ? explicitCorrect
        : correctKey && selectedKey
          ? correctKey === selectedKey
          : null;

    return {
      questionId: question.id,
      question: question.question,
      selectedKey,
      selectedText,
      correctKey,
      correctText,
      isCorrect,
      hasAnswerKey: Boolean(correctKey || explicitCorrect !== null),
    };
  });
}

function ClipboardReviewIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
      <path d="M9 5h6" /><path d="M9 3h6a1 1 0 0 1 1 1v2H8V4a1 1 0 0 1 1-1Z" /><rect x="5" y="5" width="14" height="16" rx="2" /><path d="m8 13 2 2 5-5" />
    </svg>
  );
}

function getLearningTopics(level) {
  const normalized = String(level || "").toLowerCase();

  if (normalized.includes("beginner") || normalized.includes("basic")) {
    return [
      "Review the core concepts and terminology",
      "Practice small exercises from the fundamentals",
      "Learn common patterns and problem-solving steps",
      "Build one small practical project using the skill",
    ];
  }

  if (normalized.includes("intermediate")) {
    return [
      "Strengthen advanced concepts and practical patterns",
      "Solve medium-level exercises and real scenarios",
      "Build a project that uses the skill end-to-end",
      "Study common industry practices and tools",
    ];
  }

  return [
    "Explore advanced concepts and edge cases",
    "Work on larger real-world projects",
    "Study optimization, architecture, and best practices",
    "Use the skill in an industry-oriented project or internship",
  ];
}

export default SkillAssessment;

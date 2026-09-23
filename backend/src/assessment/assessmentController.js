import prisma from "../config/database.js";

const getOptionText = (question, answer) => {
  if (answer === null || answer === undefined) return null;

  const value = String(answer).trim();
  const key = value.toUpperCase();

  const options = {
    A: question.optionA,
    B: question.optionB,
    C: question.optionC,
    D: question.optionD,
  };

  // If the frontend sends A/B/C/D, return the corresponding text.
  if (options[key]) {
    return options[key];
  }

  // If the frontend sends the option text itself, keep it.
  return value;
};

const normalizeAnswer = (answer) => {
  if (answer === null || answer === undefined) return "";

  return String(answer).trim().toLowerCase();
};

const isAnswerCorrect = (question, submittedAnswer) => {
  const submitted = normalizeAnswer(submittedAnswer);

  if (!submitted) return false;

  const correctKey = normalizeAnswer(question.correctAnswer);
  const correctText = normalizeAnswer(
    getOptionText(question, question.correctAnswer)
  );

  // Accept either the answer key (A/B/C/D) or the option text.
  return submitted === correctKey || submitted === correctText;
};

export const getQuestions = async (req, res) => {
  try {
    // Assessment is only for students.
    if (req.user.role !== "STUDENT") {
      return res.status(403).json({
        success: false,
        message: "Only students can take skill assessments",
      });
    }

    const skillId = Number(req.query.skillId);
    const { difficulty } = req.query;

    if (!skillId) {
      return res.status(400).json({
        success: false,
        message: "Skill ID is required",
      });
    }

    const questions = await prisma.assessmentQuestion.findMany({
      where: {
        skillId,
        ...(difficulty && { difficulty }),
      },
      select: {
        id: true,
        question: true,
        optionA: true,
        optionB: true,
        optionC: true,
        optionD: true,
        difficulty: true,
      },
      orderBy: {
        id: "asc",
      },
    });

    res.json({
      success: true,
      questions,
    });
  } catch (error) {
    console.error("Get assessment questions error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch assessment questions",
    });
  }
};

export const submitAssessment = async (req, res) => {
  try {
    // Assessment is only for students.
    if (req.user.role !== "STUDENT") {
      return res.status(403).json({
        success: false,
        message: "Only students can submit skill assessments",
      });
    }

    const skillId = Number(req.body.skillId);
    const answers = req.body.answers;

    if (!skillId || !Array.isArray(answers)) {
      return res.status(400).json({
        success: false,
        message: "Skill ID and answers are required",
      });
    }

    const questionIds = [
      ...new Set(
        answers
          .map((answer) => Number(answer.questionId))
          .filter((id) => Number.isInteger(id) && id > 0)
      ),
    ];

    if (questionIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid assessment answers were submitted",
      });
    }

    // IMPORTANT:
    // correctAnswer is read only on the backend and is never exposed
    // by GET /questions.
    const questions = await prisma.assessmentQuestion.findMany({
      where: {
        id: { in: questionIds },
        skillId,
      },
      orderBy: {
        id: "asc",
      },
    });

    if (questions.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid assessment questions were found",
      });
    }

    const questionMap = new Map(
      questions.map((question) => [question.id, question])
    );

    let score = 0;

    const answerReview = answers
      .map((answer) => {
        const questionId = Number(answer.questionId);
        const question = questionMap.get(questionId);

        if (!question) return null;

        const selectedAnswer = answer.answer ?? "";
        const isCorrect = isAnswerCorrect(question, selectedAnswer);

        if (isCorrect) {
          score++;
        }

        const selectedAnswerText = getOptionText(
          question,
          selectedAnswer
        );

        const correctAnswerText = getOptionText(
          question,
          question.correctAnswer
        );

        return {
          questionId: question.id,
          question: question.question,

          // Raw keys are useful if the frontend needs them.
          selectedAnswer: String(selectedAnswer),
          correctAnswerKey: question.correctAnswer,

          // Human-readable values for the Answer Review UI.
          selectedAnswerText,
          correctAnswerText,

          // Also expose these names for compatibility with
          // frontends that already expect them.
          yourAnswer: selectedAnswerText,
          correctAnswer: correctAnswerText,

          isCorrect,
          difficulty: question.difficulty,
        };
      })
      .filter(Boolean);

    const totalQuestions = answerReview.length;

    const percentage =
      totalQuestions > 0
        ? Math.round((score / totalQuestions) * 100)
        : 0;

    let level;

    if (percentage < 40) {
      level = "BEGINNER";
    } else if (percentage < 70) {
      level = "INTERMEDIATE";
    } else if (percentage < 90) {
      level = "ADVANCED";
    } else {
      level = "EXPERT";
    }

    const result = await prisma.assessmentResult.create({
      data: {
        userId: req.user.id,
        skillId,
        score,
        totalQuestions,
        percentage,
        level,
      },
    });

    const profile = await prisma.studentProfile.findUnique({
      where: {
        userId: req.user.id,
      },
    });

    if (profile) {
      await prisma.studentSkill.upsert({
        where: {
          profileId_skillId: {
            profileId: profile.id,
            skillId,
          },
        },
        update: {
          level,
        },
        create: {
          profileId: profile.id,
          skillId,
          level,
        },
      });
    }

    res.json({
      success: true,
      message: "Assessment submitted successfully",

      result: {
        ...result,
        answerReview,
      },

      // Also expose it at the top level for frontend compatibility.
      answerReview,
    });
  } catch (error) {
    console.error("Submit assessment error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to submit assessment",
    });
  }
};

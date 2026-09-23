# Assessment Answer Review

The frontend now displays:
- Your answer
- Correct / Wrong state
- Correct answer
- Learning hint

The frontend prefers the backend `result.answerReview` array when it exists. Recommended backend response from `POST /api/assessment/submit`:

```json
{
  "result": {
    "score": 3,
    "totalQuestions": 4,
    "percentage": 75,
    "level": "Intermediate",
    "answerReview": [
      {
        "questionId": 1,
        "selectedAnswer": "A",
        "correctAnswer": "A",
        "isCorrect": true
      }
    ]
  }
}
```

The current frontend also contains local fallback answers for the four Python questions currently visible in the assessment bank. Backend `answerReview` takes priority whenever supplied.

import mongoose from "mongoose";

const quizSubmissionSchema = new mongoose.Schema(
  {
    _id: String,
    quizId: { type: String, ref: "QuizModel" },
    courseId: { type: String, ref: "CourseModel" },
    studentId: { type: String, ref: "UserModel" },
    attemptNumber: Number,
    answers: [
      {
        questionId: String,
        questionType: {
          type: String,
          enum: ["MULTIPLE_CHOICE", "TRUE_FALSE", "FILL_BLANK"],
          required: true
        },
        userAnswer: mongoose.Schema.Types.Mixed, // Can be string or boolean
        correctAnswer: mongoose.Schema.Types.Mixed, // Can be string or boolean
        points: Number,
        maxPoints: Number,
        isCorrect: Boolean,
        question: String,
        explanation: String,
        choices: [
          {
            text: String,
            isCorrect: Boolean
          }
        ]
      }
    ],
    startTime: Date,
    endTime: Date,
    timeSpent: Number, // in seconds
    score: Number,
    maxScore: Number,
    percentage: Number,
    status: {
      type: String,
      enum: ["completed", "in-progress"],
      default: "in-progress"
    }
  },
  { collection: "quizsubmissions" }
);

export default quizSubmissionSchema;
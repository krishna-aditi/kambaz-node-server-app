import mongoose from "mongoose";

const quizQuestionSchema = new mongoose.Schema(
  {
    _id: String,
    quizId: { type: String, ref: "QuizModel" },
    courseId: { type: String, ref: "CourseModel" },
    title: String,
    points: Number,
    questionType: {
      type: String,
      enum: ["MULTIPLE_CHOICE", "TRUE_FALSE", "FILL_BLANK"],
      required: true
    },
    question: {
      type: String,
      required: true
    },
    // For MULTIPLE_CHOICE questions
    choices: [{
      text: String,
      isCorrect: Boolean
    }],
    // For TRUE_FALSE questions
    correctAnswer: Boolean,
    // For FILL_BLANK questions
    correctAnswers: [{
      text: String,
      caseSensitive: {
        type: Boolean,
        default: false
      }
    }],
    order: {
      type: Number,
      default: 0
    }
  },
  { collection: "quizquestions" }
);

export default quizQuestionSchema;
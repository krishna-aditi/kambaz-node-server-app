import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    _id: String,
    title: String,
    course: { type: String, ref: "CourseModel" },
    points: Number,
    numberOfQuestions: Number,
    accessCode: String,
    lockQuestionsAfterAnswering: Boolean,
    description: String,
    dueDate: String,
    availableFromDate: String,
    availableUntilDate: String,
    quizType: String,
    assignmentGroup: String,
    shuffleAnswers: Boolean,
    timeLimit: Number,
    multipleAttempts: Boolean,
    numberOfAttempts: Number,
    showCorrectAnswers: Boolean,
    oneQuestionAtTime: Boolean,
    webcamRequired: Boolean,
    published: Boolean
  },
  { collection: "quizzes" }
);
export default schema;
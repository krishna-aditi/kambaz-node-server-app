import Quizzes from "../Database/quizzes.js";
import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

// Create a new quiz and add it to the in-memory array
export const createQuiz = (quiz) => {
    const newQuiz = { ...quiz, _id: uuidv4() };
    // Quizzes.push(newQuiz);
    // return newQuiz;
    return model.create(newQuiz);
};

// Find and return all quizzes for a given courseId
export const findQuizzesForCourse = (courseId) => {
    // return Quizzes.filter((quiz) => quiz.course === courseId);
    return model.find({ course: courseId });
};

// Find a quiz by its ID
export const findQuizById = (quizId) => {
    // return Quizzes.find((quiz) => quiz._id === quizId);
    return model.findOne({ _id: quizId });
};

// Update a quiz by its ID using the provided updates
export const updateQuiz = (quizId, quizUpdates) => {
    // const quiz = Quizzes.find((q) => q._id === quizId);
    // if (quiz) {
    //     Object.assign(quiz, quizUpdates);
    // }
    // return quiz;
    return model.updateOne({ _id: quizId }, quizUpdates);
};

// Delete a quiz by its ID
// export const deleteQuiz = (quizId) => {
//     Quizzes = Quizzes.filter((quiz) => quiz._id !== quizId);
// };

export const deleteQuiz = (quizId) => {
    // const index = Quizzes.findIndex((quiz) => quiz._id === quizId);
    // if (index !== -1) {
    //     Quizzes.splice(index, 1);
    //     return { success: true };
    // }
    // return { success: false };
    return model.deleteOne({ _id: quizId })
};

// Toggle the published status for a quiz by its ID and return the updated quiz
// export const publishQuiz = (quizId) => {
//     const quiz = Quizzes.find((q) => q._id === quizId);
//     if (quiz) {
//         quiz.published = !quiz.published;
//     }
//     return quiz;
// };
export const publishQuiz = (quizId) => {
    // First retrieve the current quiz to check its status
    return model.findById(quizId)
        .then(quiz => {
            if (!quiz) return null;
            // Update with toggled published status
            return model.updateOne({ _id: quizId }, { published: !quiz.published });
        });
};

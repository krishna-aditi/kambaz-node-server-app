// import QuizQuestions from "../../Database/quizquestions.js";
// import Quizzes from "../../Database/quizzes.js";
import { v4 as uuidv4 } from "uuid";
import model from "./model.js";
import quizModel from "../model.js";

// Create a new question and update the quiz's question count
// export const createQuestion = (question) => {
//     const newQuestion = { ...question, _id: uuidv4() };
//     // Add the new question to the quizQuestions array
//     QuizQuestions.push(newQuestion);

//     // Increment the numberOfQuestions for the corresponding quiz
//     const quiz = Quizzes.find((q) => q._id === question.quizId);
//     if (quiz) {
//         quiz.numberOfQuestions = (quiz.numberOfQuestions || 0) + 1;
//     }
//     return newQuestion;
// };
export const createQuestion = (question) => {
    const newQuestion = { ...question, _id: uuidv4() };
    
    // First create the question
    return model.create(newQuestion)
        .then(createdQuestion => {
            // Then update the quiz's numberOfQuestions
            return quizModel.updateOne(
                { _id: question.quizId }, 
                { $inc: { numberOfQuestions: 1 } }
            )
            .then(() => {
                // Return the created question
                return createdQuestion;
            });
        });
};

// Find and return all questions for a quiz, sorted by order
// and update the quiz with the correct number of questions
// export const findQuestionsForQuiz = (quizId) => {
//     const questions = QuizQuestions
//         .filter((q) => q.quizId === quizId)
//         .sort((a, b) => a.order - b.order);

//     const quiz = Quizzes.find((q) => q._id === quizId);
//     if (quiz) {
//         quiz.numberOfQuestions = questions.length;
//     }
//     return questions;
// };
export const findQuestionsForQuiz = (quizId) => {
    // First find the questions
    return model.find({ quizId: quizId }).sort({ order: 1 })
        .then(questions => {
            // Then update the quiz with the correct count
            return quizModel.updateOne(
                { _id: quizId },
                { $set: { numberOfQuestions: questions.length } }
            )
            .then(() => {
                // Return the questions
                return questions;
            });
        });
};

// Find a single question by its ID
// export const findQuestionById = (questionId) => {
//     return QuizQuestions.find((q) => q._id === questionId);
// };
export const findQuestionById = (questionId) => {
    return model.findOne({ _id: questionId });
};

// Update an existing question using provided updates
// export const updateQuestion = (questionId, questionUpdates) => {
//     const question = QuizQuestions.find((q) => q._id === questionId);
//     if (question) {
//         Object.assign(question, questionUpdates);
//     }
//     return question;
// };
export const updateQuestion = (questionId, questionUpdates) => {
    return model.updateOne({ _id: questionId }, { $set: questionUpdates });
};

// Delete a question by its ID and decrement the quiz's question count
// export const deleteQuestion = (questionId) => {
//     const question = QuizQuestions.find((q) => q._id === questionId);
//     if (!question) return;

//     // Remove the question from the array
//     const index = QuizQuestions.findIndex((q) => q._id === questionId);
//     if (index !== -1) {
//         QuizQuestions.splice(index, 1);
//     }

//     // Decrement the numberOfQuestions for the corresponding quiz
//     const quiz = Quizzes.find((q) => q._id === question.quizId);
//     if (quiz) {
//         quiz.numberOfQuestions = Math.max((quiz.numberOfQuestions || 1) - 1, 0);
//     }
// };
export const deleteQuestion = (questionId) => {
    // First find the question to get its quizId
    return model.findOne({ _id: questionId })
        .then(question => {
            if (!question) return { acknowledged: false };
            
            const quizId = question.quizId;
            
            // Then delete the question
            return model.deleteOne({ _id: questionId })
                .then(result => {
                    // Then update the quiz's numberOfQuestions
                    if (result.acknowledged) {
                        return quizModel.updateOne(
                            { _id: quizId },
                            { $inc: { numberOfQuestions: -1 } }
                        )
                        .then(() => result);
                    }
                    return result;
                });
        });
};

// Reorder questions for a quiz based on an array of {questionId, order}
// export const reorderQuestions = (quizId, questionOrders) => {
//     questionOrders.forEach(({ questionId, order }) => {
//         const question = QuizQuestions.find(
//             (q) => q._id === questionId && q.quizId === quizId
//         );
//         if (question) {
//             question.order = order;
//         }
//     });
// };
export const reorderQuestions = (quizId, questionOrders) => {
    const updates = questionOrders.map(({ questionId, order }) => 
        model.updateOne(
            { _id: questionId, quizId: quizId },
            { $set: { order: order } }
        )
    );
    
    return Promise.all(updates);
};

// Calculate the total points for all questions in a quiz
// export const calculateQuizPoints = (quizId) => {
//     const totalPoints = QuizQuestions
//         .filter((q) => q.quizId === quizId)
//         .reduce((sum, question) => sum + question.points, 0);
//     return totalPoints;
// };
export const calculateQuizPoints = (quizId) => {
    return model.find({ quizId: quizId })
        .then(questions => 
            questions.reduce((sum, question) => sum + (question.points || 0), 0)
        );
};
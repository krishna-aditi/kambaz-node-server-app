import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export function getEnrollmentsByUser(userId) { 
    const { enrollments } = Database;
    return enrollments.filter((enrollment) => enrollment.user === userId);
}

export function enrollUserInCourse(courseId, userId) {
    const { enrollments } = Database;
    enrollments.push({ _id: uuidv4(), user: userId, course: courseId });
}

export function unenrollUserFromCourse(courseId, userId) {
    const { enrollments } = Database;
    Database.enrollments = enrollments.filter(
        (enrollment) => !( enrollment.user === userId && enrollment.course === courseId)
    );
}

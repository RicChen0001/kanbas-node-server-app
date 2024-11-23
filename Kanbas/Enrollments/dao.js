import Database from "../Database/index.js";

export function enrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;
  enrollments.push({ _id: Date.now(), user: userId, course: courseId });
}

export function unenrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;
  const enrollmentUnenrolled = enrollments.find((enrollment) => enrollment.user === userId && enrollment.course === courseId);
  Database.enrollments = enrollments.filter((enrollment) => enrollment._id !== enrollmentUnenrolled._id);
}
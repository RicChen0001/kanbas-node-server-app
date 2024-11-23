import Database from "../Database/index.js";

export function findAssignmentsForCourse(courseId) {
  const { assignments } = Database;
  return assignments.filter((assignment) => assignment.course === courseId);
}

export function findAssignmentById(assignmentId) {
  const { assignments } = Database;
  return assignments.find((assignment) => assignment._id === assignmentId);
}

export function createAssignment(assignment) {
  const newAssignment = { ...assignment, _id: Date.now().toString() };
  Database.assignments = [...Database.assignments, newAssignment];
  return newAssignment;
}

export function deleteAssignment(assignmentId) {
  const { assignments } = Database;
  const initialLength = assignments.length;
  Database.assignments = assignments.filter((assignment) => assignment._id !== assignmentId);
  return Database.assignments.length < initialLength;
}

export function updateAssignment(assignmentId, assignmentUpdates) {
  const { assignments } = Database;
  const assignment = assignments.find((assignment) => assignment._id === assignmentId);
  if (assignment) {
    Object.assign(assignment, assignmentUpdates);
    return assignment;
  }
  return null;
}
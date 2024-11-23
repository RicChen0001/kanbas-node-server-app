import * as dao from "./dao.js";

export default function EnrollmentRoutes(app) {

  app.delete("/api/enrollments/", (req, res) => {
    const { userId, courseId } = req.params;
    dao.unenrollUserInCourse(userId, courseId);
    res.sendStatus(204);
  });

  app.put("/api/enrollments/", (req, res) => {
    const { userId, courseId } = req.params;
    dao.enrollUserInCourse(userId, courseId);
    res.sendStatus(204);
  });

}
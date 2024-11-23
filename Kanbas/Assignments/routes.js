import * as assignmentsDao from "./dao.js";

export default function AssignmentRoutes(app) {
  app.delete("/api/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    assignmentsDao.deleteAssignment(assignmentId);
    res.sendStatus(204);
  });

  app.put("/api/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    const assignmentUpdates = req.body;
    const updatedAssignment = assignmentsDao.updateAssignment(
      assignmentId,
      assignmentUpdates
    );
    res.json(updatedAssignment);
  });
}
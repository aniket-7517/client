import React from "react";

function TaskModal({ isOpen, onClose, task }) {
  if (!isOpen || !task) return null;

  const formatDescription = (description) => {
    return description
      .split("\n")
      .map((line, index) => <p key={index}>{line}</p>);
  };

  return (
    <div
      className="modal show"
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <strong>Title:</strong> {task.title}
            </h5>
          </div>
          <div
            className="modal-body"
            style={{ maxHeight: "60vh", overflowY: "auto" }}
          >
            <p>
              <strong>Description:</strong>
            </p>
            {formatDescription(task.description)}
            <p>
              <strong>Completed:</strong> {task.completed ? "Yes" : "No"}
            </p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;

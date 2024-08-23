import react, { useState } from "react";
import { useTaskStore } from "./task.store";
import { Button } from "react-bootstrap";

export default function TaskCard({ task, onDelete }) {
  const [tasks, updateTasks] = useTaskStore((state) => [
    state.tasks,
    state.updateTasks,
  ]);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const handleChangeStatus = (taskId, newStatus) => {
    console.log(taskId, newStatus);

    updateTasks(
      tasks?.map((h) => {
        return h?.id === taskId
          ? {
              ...h,
              status: newStatus,
            }
          : h;
      })
    );
    updateTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <div
      className="card mb-2"
      onClick={handleToggle}
      style={{ cursor: "pointer" }}
    >
      <div className="">
        <Button variant="danger" size="sm" onClick={() => onDelete(task.id)}>
          Delete
        </Button>{" "}
      </div>

      <div className="card-body">
        <h5 className="card-title">
          <button className="btn">{task.title}</button>
        </h5>
        {isOpen && <p className="card-text">{task.description}</p>}
      </div>

      <select
        value={task.status}
        onChange={(e) => handleChangeStatus(task.id, e.target.value)}
      >
        <option value="todo">To Do</option>
        <option value="doing">Doing</option>
        <option value="review">Review</option>
        <option value="done">Done</option>
      </select>
    </div>
  );
}

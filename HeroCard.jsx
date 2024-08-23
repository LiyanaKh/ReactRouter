import { useState, useEffect } from "react"; //добавляет новые задачи
import TaskCard from "./TaskCard";
import { Modal, Form, Button } from "react-bootstrap";
import { useTaskStore } from "./task.store";

export default function HeroCard({ title }) {
  const [show, setShow] = useState(false); //модальное окно
  const [tasks, setTasks] = useState(""); // задачи в карточке
  const [newTask, setNewTask] = useState(""); // состояние для отслеживания текста
  const [newTaskStatus, setNewTaskStatus] = useState("todo"); // статус новой задачи
  const [newTaskDescription, setNewTaskDescription] = useState(""); //описание задачи

  const handleClose = () => setShow(false); //закрывает модальное окно
  const handleShow = () => setShow(true);

  const handleChangeStatus = (taskId, newStatus) => {
    //обровляет статус задачи
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };
  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId)); //удаляет
  };

  const sendTaskToServer = async (task) => {
    //отправка данных на сервер
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://0006-46-251-204-111.ngrok-free.app/tasks",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(task),
        }
      );
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error sending:", errorText);
        throw new Error("Error sending");
      }
      const data = await response.json();
      console.log("Send success:", data);
    } catch (error) {
      console.error("Error sending:", error.message);
    }
  };

  const handleAddTask = () => {
    //объект задач и отпр на сервер
    const task = {
      title: newTask,
      description: newTaskDescription,
      status: newTaskStatus,
    };

    if (!task.title || !task.description || !task.status) {
      console.error("fill in all the fields");
      return;
    }
    sendTaskToServer(task);

    setNewTask("");
    setNewTaskDescription("");
    setNewTaskStatus("");
    handleClose();
  };

  // console.log("new Task Added:", task);
  // setTasks([...tasks, task]);
  // setNewTask("");
  // setNewTaskStatus("todo");
  // handleClose();
  //sendTaskToServer(task);
  //};

  return (
    <div className="card">
      <div className="task-column">
        <div className="shadow p-3 bg-body-tertiary rounded">
          <div className="card-body">
            <div className="d-flex flex-column">
              <h5 className="card-title">{title}</h5>

              {tasks.length ? ( //проверяет кол-во элементов в массиве
                tasks.map((task) => (
                  <TaskCard
                    key={task?.id}
                    task={task}
                    onDelete={handleDeleteTask}
                    onChangeStatus={handleChangeStatus}
                  />
                ))
              ) : (
                <p>no tasks</p>
              )}
            </div>

            <Button
              variant="outline-primary"
              size="sm"
              onClick={handleShow}
              className="mt-2"
            >
              +Add Task
            </Button>
          </div>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formTaskName">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter task"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                  />

                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="enter description"
                    value={newTaskDescription}
                    onChange={(e) => setNewTaskDescription(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="Secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="Primary" onClick={handleAddTask}>
                {" "}
                Add Task
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}

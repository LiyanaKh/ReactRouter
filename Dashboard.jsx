import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import TaskCard from "./components/TaskCard";
import HeroCard from "./components/HeroCard";
import { useTaskStore } from "./components/task.store";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [heroes, setHeroes] = useState([
    { name: "todo", title: "Todo", order: 1 },
    { name: "doing", title: "Doing", order: 2 },
    { name: "review", title: "Review", order: 3 },
    { name: "done", title: "Done", order: 4 },
  ]);

  const [tasks, fetchTasks] = useTaskStore((state) => [
    //хук zustand для доступа к состоянию задач

    state.tasks, //доступ к массиву задач
    state.fetchTasks, //доступ к функции
  ]);

  useEffect(() => {
    //для получения данных о задачах с сервера. данные будут загружены и сохранены в состоянии инициализации
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    if (tasks?.length) {
      console.log(tasks);
      setHeroes(heroes);
    }
  }, [tasks]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("signin");
  };
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate("editProfile");
  };

  return (
    <div className="container-fluid bg-$teal-100 min-vh-100">
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <a className="navbar-brand" href="#">
          Dashboard
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
          <span className="navbar-toggler-collapse" id="navbarNav"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbar">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="dashboard"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img alt="/" className="rounded-circle"></img>
                Menu
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a className="dropdown-item" onClick={handleEditProfile}>
                    Edit profile
                  </a>
                  <a
                    className="dropdown-item"
                    href="signin"
                    onClick={handleLogout}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>

      <div className="row">
        {heroes
          .map((h, i) => {
            return (
              <div key={i} className="col-md-3 mb-4">
                {" "}
                <HeroCard
                  name={h.name}
                  title={h.title}
                  tasks={tasks?.filter((t) => t?.status === h.name)} //задачи
                />
              </div>
            );
          })
          .sort((a, b) => a.order - b.order)}
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom"; //компонент который позволяет использовать маршрутизацию
import Auth from "./Auth"; //импортирует компонент страницу авторизации
import SignUp from "./SignUp";
import Dashboard from "./Dashboard";
import EditProfile from "./EditProfile";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/signin");
      return;
    }

    navigate("/dashboard");
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/signin" element={<Auth />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/editprofile" element={<EditProfile />} />
      </Routes>
    </div>
  );
};
export default App;

//Routes управляет списком маршрутов и выбирает компонент для отображения на основе текущего URL
//Route определяет конкретный маршрут
//Router представляет контекст маршрутизации для всех дочерник компонентов позволяя использовать Route, Routes.

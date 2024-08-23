import { useState } from "react"; //хук позволяет добавлять состояния в компоненты
import { useNavigate } from "react-router-dom"; //хук для программной навигации
import "bootstrap/dist/css/bootstrap.min.css";

const Auth = () => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); //хук для перенаправления пользователя на другие страницы

  const handleLogin = async () => {
    if (!userName || !password) {
      alert("Please, fill in all the fields.");
    } else {
      try {
        const response = await (
          await fetch("https://0006-46-251-204-111.ngrok-free.app/auth/login", {
            //ожидание запроса
            method: "POST",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({ username: userName, password: password }),
          })
        ).json();

        localStorage.setItem("token", response?.token); //сохраняет токен
        localStorage.setItem("user", JSON.stringify(response?.resUser)); //сохраняется инфо и пользователе

        console.log("Login SUccess");

        navigate("/dashboard");
      } catch (error) {
        alert("Unexpected error!" + error.message);
      }
    }
  };

  const handleSignUpRedirect = () => {
    navigate("/signup");
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <h1 className="mb-4 text-center">Sign In</h1>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>

            <input
              type="text" //поле ввода текста
              id="username"
              className="form-control"
              placeholder="Username" // атрибут
              onChange={(e) => setUsername(e.target.value)} //обработчик события который обновляет userName при изменении текста
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="btn btn-primary w-100 mb-2" onClick={handleLogin}>
            Login
          </button>

          <button
            className="btn btn-primary w-100"
            onClick={handleSignUpRedirect}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};
export default Auth;

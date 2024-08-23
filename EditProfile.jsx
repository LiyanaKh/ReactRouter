import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "./store/user.store";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { ToastBody, ToastHeader } from "react-bootstrap";

const EditProfile = () => {
  const [user, setUser] = useUserStore((state) => [state.user, state.setUser]);
  const [showToast, setShowToast] = useState(false);

  const [email, setEmail] = useState(user?.email || "mypage@gmail.com");
  const [username, setUsername] = useState(user?.username || "myPage02");
  // const [password, setPassword] = useState(user?.password || "00000000");
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  const navigate = useNavigate(); //состояние полей которые можно редактировать
  const handleEditEmail = () => {
    setIsEditingEmail((prev) => !prev); //состояния для отслеживания
  };

  const handleEditUsername = () => {
    setIsEditingUsername((prev) => !prev);
  };

  useEffect(() => {}, []);
  const handleSubmit = async (e) => {
    //при отправке формы
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://0006-46-251-204-111.ngrok-free.app/users",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "69420",
          },
          body: JSON.stringify({ email, username }),
        }
      );

      // const result = await response.json();
      // console.log(result);

      if (response.ok) {
        // setUser(result.data);
        setUser(null);
        // toast.success("Profile updated!");
        setShowToast(true);

        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      } else {
        console.error(response);
        // console.error(result.message);
      }
    } catch (error) {
      console.error(`An error occurred: ${error.message}`);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <h2>Edit Profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <div className="input-group">
                {isEditingEmail ? (
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    readOnly={!isEditingEmail}
                    required
                  />
                ) : (
                  <p className="form--text">{email}</p>
                )}{" "}
                {isEditingEmail ? (
                  <span
                    className="input-group-text"
                    onClick={handleEditEmail}
                    style={{ cursor: "pointer" }}
                  >
                    <i class="bi bi-check-lg"></i>
                  </span>
                ) : (
                  <span
                    className="input-group-text"
                    onClick={handleEditEmail}
                    style={{ cursor: "pointer" }}
                  >
                    <i className="bi bi-pencil"></i>
                  </span>
                )}
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <div className="input-group">
                {isEditingUsername ? (
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    readOnly={!isEditingUsername}
                    required
                  />
                ) : (
                  <p className="form--text">{username}</p>
                )}{" "}
                {isEditingUsername ? (
                  <span
                    className="input-group-text"
                    onClick={handleEditUsername}
                    style={{ cursor: "pointer" }}
                  >
                    <i class="bi bi-check-lg"></i>
                  </span>
                ) : (
                  <span
                    className="input-group-text"
                    onClick={handleEditUsername}
                    style={{ cursor: "pointer" }}
                  >
                    <i class="bi bi-pencil"></i>
                  </span>
                )}
              </div>
            </div>
            <div className="mb-3">
              {/* <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              /> */}
            </div>
            <button type="Submit" className="btn btn-primary">
              Save
            </button>
          </form>
          <ToastContainer position="bottom-center">
            <Toast onClose={() => setShowToast(false)} show={showToast}>
              <ToastHeader>
                <i className="bi bi-check-circle-fill me-2 text-success"></i>
                <strong className="me-auto">Success</strong>
              </ToastHeader>
              <Toast.Body> Profile has been updated successfully </Toast.Body>
            </Toast>
          </ToastContainer>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;

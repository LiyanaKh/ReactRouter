// import React, { useState } from "react";

// const AddTaskForm = ({ onAddTask }) => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [status, setStatus] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const newTask = {
//       title,
//       description,
//       status,
//     };

//     onAddTask(newTask);
//     setTitle("");
//     setDescription("");
//     setStatus("");
//   };

//   return (
//     <form onSubmit={handleSubmit} className="card card-body">
//       <h5 className="mb-3">Add New Task</h5>
//       <div className="mb-3">
//         <label htmlFor="taskTitle" className="form-label">
//           Title
//         </label>
//         <input
//           type="text"
//           id="taskTitle"
//           className="form-control"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//           placeholder="Enter task title"
//         />
//       </div>
//       <div className="mb-3">
//         <label htmlFor="taskDescription" className="form-label">
//           Description
//         </label>
//         <textarea
//           id="taskDescription"
//           className="form-control"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           placeholder="Enter task description"
//         />
//       </div>
//       <div className="mb-3">
//         <label htmlFor="taskStatus" className="form-label">
//           Status
//         </label>
//         <select
//           id="taskStatus"
//           className="form-select"
//           value={status}
//           onChange={(e) => setStatus(e.target.value)}
//         >
//           <option value="todo">To Do</option>
//           <option value="doing">Doing</option>
//           <option value="review">Review</option>
//           <option value="done">Done</option>
//         </select>
//       </div>
//       <button type="submit" className="btn btn-primary">
//         Add Task
//       </button>
//     </form>
//   );
// };

// export default AddTaskForm;

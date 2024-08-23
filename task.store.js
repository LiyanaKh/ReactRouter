import { create } from "zustand"; //хранилище для управления задачами

const fetchTasks = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    const response = await fetch(
      "https://0006-46-251-204-111.ngrok-free.app/tasks",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "69420",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

const useTaskStore = create((set) => ({
  //управление состоянием задач

  tasks: [],
  fetchTasks: async () => {
    //функция для получения задач с сервера и обновления состония

    const response = await fetchTasks();
    set({ tasks: response?.tasks || [] });

    console.log(response?.data);
    set({ tasks: response?.data || [] });
  },
  updateTasks: async (newTasks) => {
    //обновляет задачи в хранилище

    console.log(newTasks);
    set({ tasks: newTasks });
  },
}));

export { useTaskStore };

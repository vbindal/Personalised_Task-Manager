import React, { useState, useContext,useEffect } from "react";
import axios from "axios";
import UserContext from "./userProvider";

const TaskForm = () => {
  const { user, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      axios
        .get("/userdata", { headers })
        .then((response) => {
          const userData = response.data;
          setUser(userData);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        })
        .finally(() => {
          setIsLoading(false); 
        });
    } else {
      console.error("Token not found in localStorage. Please log in.");
      setIsLoading(false);
    }
  }, [setUser]);

  const [taskName, setTaskName] = useState("");

  const handleTaskCreate = async () => {
    try {
      // Send a POST request to create a task, passing the user's ID as data
      const response = await axios.post(`/api/v1/users/${user._id}`, {
        taskName: taskName,
      });

      // Handle success (e.g., show a success message or update the UI)
      console.log("Task created:", response.data);

      // Clear the task input field
      setTaskName("");
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error("Error creating task:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Task name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <button onClick={handleTaskCreate}>Create Task</button>
    </div>
  );
};

export default TaskForm;

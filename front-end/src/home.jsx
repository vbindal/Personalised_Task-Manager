import React, { useEffect, useState } from "react";
import Navbar from "./partials/navbar";
import Todo from "./partials/Todo";
import AddTodo from "./partials/AddTodo";
import useAuth from "./useAuth";
import axios from "./axios";

const Home = () => {
  const [taskList, setTaskList] = useState([]);
  const { auth } = useAuth();
  const userEmail = auth.email;
  const GET_TASKS = `/api/v1/tasks/${userEmail}`;
  const [refreshList, setRefreshList] = useState();


  useEffect(() => {
    fetchTasksList();
  }, [refreshList]);

  async function fetchTasksList() {
    try {
      const response = await axios.get(GET_TASKS);

      if (response.status === 200) {
        const tasks = response.data.tasks;
        if (Array.isArray(tasks)) {
          setTaskList(tasks);
        } else {
          console.error("Invalid tasks data received:", tasks);
        }
      } else {
        console.error("Error fetching tasks. Status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }
  

  return (
    <div>
      <Navbar/>
      <div className="container">
        <div className="row justify-content-md-center mt-4">
          {Array.isArray(taskList) &&
            taskList.map((tasks) => (
              <Todo
                task={tasks}
                key={tasks._id}
                setRefreshList={setRefreshList}
              />
            ))}
        </div>
      </div>
      <div
        className=""
        style={{ position: "fixed", right: 50, bottom: 50, zIndex: 1030 }}
      >
        <button
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          className="btn btn-online-light"
        >
          Add
        </button>
      </div>

      <AddTodo setRefreshList={setRefreshList} />
    </div>
  );
};

export default Home;

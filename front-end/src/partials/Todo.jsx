import React from "react";
import moment from "moment/moment";
import axios from "../axios";
import { useState } from "react";

const Todo = ({ task, setRefreshList }) => {
  const [loading, setLoading] = useState(false);
  if (!task) {
    return null;
  }
  const handleDelete = async()=>{
    const DELETE_URL = `/api/v1/tasks/${task._id}`
    //console.log(DELETE_URL)
    const response = await axios.delete(DELETE_URL)
    console.log(response)
    if(response.status===200){
      setRefreshList(new Date())
      alert('task deleted')
    }else{
      alert('failed to delete the task try again')
    }
  }
  const handleUpdate = async () => {
    if (loading) {
      return; // Prevent multiple clicks while a request is in progress
    }

    setLoading(true);

    const UPDATE_URL = `/api/v1/tasks/${task._id}`;
    const isCompleted = !task.completed;

    const updatedTask = {
      completed: isCompleted,
    };

    try {
      const response = await axios.patch(UPDATE_URL, updatedTask);
      if (response.status === 200) {
        setRefreshList(new Date());
        alert('Task updated');
      } else {
        alert('Some error while updating, please try again');
      }
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Failed to update task. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="col-sm-3 mx-3 my-2 alert bg-light">
      <div className="card-header">
        {task.completed===true ? "Completed" : "Not Completed"}
      </div>
      <div className="card-body">
        <h4 className="card-title" style={{textDecoration: task.completed ? 'line-through' : 'none'}}>{task.name}</h4>
        <p className="card-text">{moment(task.createdAt).fromNow()}</p>
      </div>
      <div className="actionButtons d-flex justify-content-between align-items-center">
        <div className="deleteButton">
          <button className="btn btn-sm btn-danger" onClick={handleDelete}>Delete</button>
        </div>
        <div className="markButton">
          <button
            className={`btn btn-sm ${
              task.completed ? "btn-warning" : "btn-success"
            }`}
            onClick={handleUpdate}>
            {task.completed ? "Mark UnComplete" : "Mark Complete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todo;

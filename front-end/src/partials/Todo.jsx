import React from "react";
import moment from "moment/moment";
import axios from "../axios";

const Todo = ({ task, setRefreshList }) => {
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

  return (
    <div className="col-sm-3 mx-3 my-2 alert bg-light">
      <div className="card-header">
        {task.completed ? "Completed" : "Not Completed"}
      </div>
      <div className="card-body">
        <h4 className="card-title">{task.name}</h4>
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
          >
            {task.completed ? "Mark UnComplete" : "Mark Complete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todo;

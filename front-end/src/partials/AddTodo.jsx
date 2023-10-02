import React, { useState } from "react";
import useAuth from "../useAuth";
import axios from '../axios'

const AddTodo = ({setRefreshList}) => {
  const {auth} = useAuth()
  const userEmail = auth.email
  const CREATE_TASK = `/api/v1/tasks/${userEmail}`
  const [taskDesc,setTaskDesc]=useState('')
  

    const handleSubmit = async () => {
      if (taskDesc === "") {
        alert("Blank entry not allowed");
        return;
      }


      try {
        
        console.log(userEmail)
        const task = {
          name: taskDesc,
        };
        await axios.post(CREATE_TASK, task);
        alert("Task created successfully!");
        setRefreshList(new Date())
        setTaskDesc("");
      } catch (error) {
     
        console.error("Error creating task:", error);
        
      }
    }
  return (

    <div className="modal mt-5" id="exampleModal">
       
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title">Add New Task</div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              area-label="close"
            >
              <span arial-hidden="true"></span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <textarea
                name=""
                className="form-control"
                rows={3}
                onChange={(e)=>{setTaskDesc(e.target.value)}}
                placeholder="Enter Your Task..."
              ></textarea>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={handleSubmit} data-bs-dismiss="modal">Save Task</button>
            <button className="btn btn-secondary" data-bs-dismiss="modal"
            onClick={()=>{setTaskDesc('')}}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTodo;

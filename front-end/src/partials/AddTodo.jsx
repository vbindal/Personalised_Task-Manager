import React, { useState } from "react";
// import {ToastContainer,toast} from 'react-toastify'

const AddTodo = () => {
    const [taskDesc,setTaskDesc]=useState('')
    const handleSubmit=()=>{
        console.log(taskDesc)
        if(taskDesc===''){
            alert('blank entry not allowed')
            return
        }
    }
  return (

    <div className="modal mt-5" id="exampleModal">
        {/* <ToastContainer/> */}
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
            <button className="btn btn-secondary" onClick={handleSubmit}>Save Task</button>
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

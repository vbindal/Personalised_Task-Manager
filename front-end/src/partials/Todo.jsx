import React from 'react';
import moment from 'moment/moment';

const Todo = ({ task }) => {
 
  if (!task) {
    return null; 
  }

  return (
    <div className='col-sm-3 mx-3 my-2 alert bg-light'>
      <div className="card-header">
        {task.completed ? "Completed" : "Not Completed"}
      </div>
      <div className="card-body">
        <h4 className='card-title'>{task.name}</h4>
        <p className='card-text'>{moment(task.date).fromNow()}</p>
      </div>
    </div>
  );
}

export default Todo;

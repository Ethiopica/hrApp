
import React from 'react';
import './Todos.css'; 

const TodoCard = ({ todo, userName }) => {
  return (
    <li className="todo-card">
      <div>
        <div className="todo-title">{todo.title}</div>
        <div className="todo-meta">by {userName}</div>
      </div>
      <div className="todo-status">
        {todo.completed ? 'Completed ✅' : 'Not Completed ❌'}
      </div>
    </li>
  );
};

export default TodoCard;

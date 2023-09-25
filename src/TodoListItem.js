import React from "react";
import style from "./TodoListItem.module.css"; 

const TodoListItem = ({ todo, onRemoveTodo, onUpdateCompletion }) => {
  const handleRemove = () => {
    onRemoveTodo(todo.id);
  };

  const handleCheckboxChange = () => {
    // Toggle the completion status when the checkbox is clicked
    const updatedTodo = { ...todo, completed: !todo.completed };
    onUpdateCompletion(updatedTodo); 
  };

  // Completed tasks style
  const taskClassName = todo.completed ? `${style.TaskCompleted} ${style.ListItem}` : style.ListItem;

  return (
    <li key={todo.id} className={taskClassName}>
      <label>
        <input className={style.checkbox}
          type="checkbox"
          checked={!!todo.completed} 
          onChange={handleCheckboxChange}
        />
        {todo.title}
      </label>
      <button className={style.removeButton} type="button" onClick={handleRemove}>
        Remove
      </button>
    </li>
  );
};

export default TodoListItem;
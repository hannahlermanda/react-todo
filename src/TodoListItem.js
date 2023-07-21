import React from "react";

const TodoListItem = ({todo, onRemoveTodo}) =>{
    
    const handleRemove = () => {
        onRemoveTodo(todo.id);
      };
    
        return(
            <> <li key={todo.id}> {todo.title}</li>
            <button type="button" onClick={handleRemove}>Remove</button>
            </>
        )   
};

export default TodoListItem;
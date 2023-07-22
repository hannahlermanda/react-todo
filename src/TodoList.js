import React from "react";
import TodoListItem from "./TodoListItem";

const todoList = [
    {id: 1, title: "Wake up"},
    {id: 2, title: "Drink water"},
    {id: 3, title: "Brush teeth"}
  ];

function TodoList({todoList, onRemoveTodo}) {
    return (
        <div style={{ textAlign: 'left'}}>
            <ul>
                {todoList.map(todo => <TodoListItem key={todo.id} todo={todo} onRemoveTodo={onRemoveTodo} />)}
            </ul>
          </div>
    );
}

export default TodoList;
import React from "react";
import TodoListItem from "./TodoListItem";

const todoList = [
    {id: 1, title: "Wake up"},
    {id: 2, title: "Drink water"},
    {id: 3, title: "Brush teeth"}
  ];

function TodoList(props) {
    return (
        <div style={{ textAlign: 'left'}}>
            <ul>
                {props.todoList.map((todo) => {
                    return <TodoListItem key={todo.id} todo={todo} />;
                })}
            </ul>
          </div>
    );
}

export default TodoList;
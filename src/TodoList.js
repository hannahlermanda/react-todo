import React from "react";
import TodoListItem from "./TodoListItem";

const toDoList = [
    {id: 1, title: "Wake up"},
    {id: 2, title: "Drink water"},
    {id: 3, title: "Brush teeth"}
  ];

function TodoList() {
    return (
        <div style={{ textAlign: 'left', backgroundColor: "aquamarine" }}>
            <ul>
                {toDoList.map(function (todo) {
                return <TodoListItem key={todo.id} todo={todo} />;
                })}
            </ul>
          </div>
    );
}

export default TodoList;
import React from "react";

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
                return <li key={todo.id}>{todo.title}</li>;
                })}
            </ul>
          </div>
    );
}

export default TodoList;
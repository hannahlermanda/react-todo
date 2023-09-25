import React from "react";
import TodoListItem from "./TodoListItem";
import style from "./TodoList.module.css"; 

const todoList = [
    {id: 1, title: "Wake up"},
    {id: 2, title: "Drink water"},
    {id: 3, title: "Brush teeth"}
  ];

function TodoList({todoList, onRemoveTodo, onUpdateCompletion}) {
    return (
        <div >
            <ul className={style.fullList}>
                {todoList.map(todo => <TodoListItem key={todo.id}
            todo={todo}
            onRemoveTodo={onRemoveTodo}
            onUpdateCompletion={onUpdateCompletion} />)}
            </ul>
          </div>
    );
}

export default TodoList;
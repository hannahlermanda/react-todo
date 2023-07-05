import React from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddtodoForm';
import "./style.css"

function App() {

  let [todoList, setTodoList] = React.useState([]);

  function addTodo (newTodo){
    setTodoList(existingTodoList => [...existingTodoList, newTodo]);
  }

  return (
      <header>
        <div style={{ textAlign: 'center', backgroundColor: "blue" }}>
          <h1> To-Do List </h1>
        </div>
        <AddTodoForm onAddTodo={addTodo} />
        <TodoList todoList={todoList} />
      </header>
  );
}

export default App;

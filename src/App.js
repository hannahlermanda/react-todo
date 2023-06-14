import React from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddtodoForm';

function App() {
  return (
      <header>
        <div style={{ textAlign: 'center', backgroundColor: "blue" }}>
          <h1> To-Do List </h1>
        </div>
        < AddTodoForm/>
        <TodoList />
      </header>
  );
}

export default App;

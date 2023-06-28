import React from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddtodoForm';

function App() {

  let [newTodo, setNewTodo] = React.useState('');

  return (
      <header>
        <div style={{ textAlign: 'center', backgroundColor: "blue" }}>
          <h1> To-Do List </h1>
        </div>
        <AddTodoForm onAddTodo={setNewTodo} />
        <p>{newTodo}</p>
        <TodoList />
      </header>
  );
}

export default App;

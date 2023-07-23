import React from 'react';
import TodoList from './TodoList.js';
import AddTodoForm from './AddtodoForm.js';
import './style.css';

function App() {
  let savedTodoList = localStorage.getItem('savedTodoList');
  let [todoList, setTodoList] = React.useState(JSON.parse(savedTodoList || '[]'));
  let [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    localStorage.setItem('savedTodoList', JSON.stringify(todoList));
  }, [todoList]);

  React.useEffect(() => {
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ data: { todoList: todoList } });
      }, 2000);
    }).then((result) => {
      setTodoList(result.data.todoList || []);
      setIsLoading(false);
    });
  }, []);

  function addTodo (newTodo) {
    setTodoList([...todoList, newTodo]);
  }

  function removeTodo (id) {
    setTodoList(todoList.filter(todo => todo.id !== id));
  }

  return (
    <>
      <div style={{ textAlign: 'center', backgroundColor: 'blue' }}>
        <h1> To-Do List </h1>
      </div>
      <AddTodoForm onAddTodo={addTodo} />
        {isLoading ? <p>Loading...</p> : <TodoList todoList={todoList} onRemoveTodo={removeTodo} />}
    </>
  );
}

export default App;
import React, { useEffect } from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddtodoForm';
import "./style.css"

function useSemiPersistentState(){

  let savedTodoList = localStorage.getItem("savedTodoList");
  let [todoList, setTodoList] = React.useState(JSON.parse(savedTodoList || '[]'));

  useEffect(() => {
    localStorage.setItem("savedTodoList", JSON.stringify(todoList));
  }, [todoList]);

  return [todoList, setTodoList];

}

function App() {

  const [todoList, setTodoList] = useSemiPersistentState();

  function addTodo (newTodo) {
    setTodoList([...todoList, newTodo]);
  }

  function removeTodo(id) {
    setTodoList(todoList.filter(todo => todo.id !== id));
  }

  return (
      <>
        <div style={{ textAlign: 'center', backgroundColor: "blue" }}>
          <h1> To-Do List </h1>
        </div>
        <AddTodoForm onAddTodo={addTodo} />
        <TodoList todoList={todoList} onRemoveTodo={removeTodo}/>
      </>
  );
}

export default App;

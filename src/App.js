import React from 'react';

const toDoList = [
  {id: 1, title: "Wake up"},
  {id: 2, title: "Drink water"},
  {id: 3, title: "Brush teeth"}
];

function App() {
  return (
      <header>
        <div style={{ textAlign: 'center', backgroundColor: "blue" }}>
          <h1> To-Do List </h1>
        </div>
        <div style={{ textAlign: 'left', backgroundColor: "aquamarine" }}>
          <ul>
            {toDoList.map(function (todo) {
              return <li key={todo.id}>{todo.title}</li>;
            })}
          </ul>
          </div>
      </header>
  );
}

export default App;

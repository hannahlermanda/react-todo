import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TodoList from './TodoList.js';
import AddTodoForm from './AddtodoForm.js';
import './style.css';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        },
      };

      try {
        const response = await fetch(url, options);

        if (response.ok === false) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();

        const todos = data.records.map((record) => ({
          title: record.fields.Title,
          id: record.id,
        }));

        setTodoList(todos);
        setIsLoading(false);

        return data;
      } catch (error) {
        console.error('Error fetching data:', error.message);
        return null;
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem('savedTodoList', JSON.stringify(todoList));
  }, [todoList]);

  async function createRecordInAirtable(newTodo) {
    const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          Title: newTodo.title,
        },
      }),
    };

    try {
      const response = await fetch(url, options);

      if (response.ok === false) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Created record in Airtable:', data);

      return data;
    } catch (error) {
      console.error('Error creating record in Airtable:', error.message);
      return null;
    }
  }

  function addTodo(newTodo) {
    setTodoList([...todoList, newTodo]);
    createRecordInAirtable(newTodo);
  }

  function removeTodo(id) {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <>
            <div style={{ textAlign: 'center', backgroundColor: 'blue' }}>
              <h1> To-Do List </h1>
            </div>
            <AddTodoForm onAddTodo={addTodo} />
            {isLoading ? <p>Loading...</p> : <TodoList todoList={todoList} onRemoveTodo={removeTodo} />}
          </>
        } />
        <Route path="/new" element={<h1>New Todo List</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
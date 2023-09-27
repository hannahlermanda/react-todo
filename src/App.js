import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddtodoForm';
import Navigation from './components/Nav'
import style from './App.module.css'

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //Default to ascending order (A-Z)
  const [sortOrder, setSortOrder] = useState('asc'); 
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    async function fetchData() {
      
       // Define the query parameters for sorting
      const queryParams = new URLSearchParams({
        'sort[0][field]': 'Title',
        'sort[0][direction]': 'asc',
      });
      
      const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}?${queryParams}`;
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

        // Sort by "Title"
        data.records.sort((recordA, recordB) => {
          const titleA = recordA.fields.Title.toUpperCase();
          const titleB = recordB.fields.Title.toUpperCase();

          if (sortOrder === 'asc') {
            if (titleA < titleB) {
              return -1;
            } else if (titleA > titleB) {
              return 1;
            } else {
              return 0;
            }
          } else {
            // Descending order
            if (titleA > titleB) {
              return -1;
            } else if (titleA < titleB) {
              return 1;
            } else {
              return 0;
            }
          }
        });

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

   //Scroll to Top Function
   function handleScroll() {
    if (window.scrollY >= 200) {
      setShowScrollToTop(true);
    } else {
      setShowScrollToTop(false);
    }
  }
  
  //Scroll Event Listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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

  function updateCompletion(updatedTodo) {
    // Find the index of the updated todo in todoList
    const index = todoList.findIndex((todo) => todo.id === updatedTodo.id);
  
    if (index !== -1) {
      // Create a new copy of todoList with the updated todo
      const updatedTodoList = [...todoList];
      updatedTodoList[index] = updatedTodo;
  
      setTodoList(updatedTodoList);
    }
  }

  function toggleSortOrder() {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    console.log('Toggle Sort Order function called');
    console.log('New Sort Order:', newSortOrder);
  
    // Sort List
    const sortedTodoList = [...todoList].sort((todoA, todoB) => {
      const titleA = todoA.title.toUpperCase();
      const titleB = todoB.title.toUpperCase();
  
      if (newSortOrder === 'asc') {
        if (titleA < titleB) return -1;
        if (titleA > titleB) return 1;
        return 0;
      } else {
        if (titleA < titleB) return 1;
        if (titleA > titleB) return -1;
        return 0;
      }
    });
  
    console.log('Sorted Todo List:', sortedTodoList);
  
    setSortOrder(newSortOrder);
    setTodoList(sortedTodoList);
  }

  // Function to scroll to the top of the page
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  async function removeTodo(id) {
    try {
      //Delete record from Airtable
      const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}/${id}`;
      const options = {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        },
      };

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error deleting record: ${response.status}`);
      }

      // Adjust local state after deleting record
      setTodoList((prevTodoList) => prevTodoList.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error deleting record:', error.message);
    }
  }


  return (
    <BrowserRouter>
      <Navigation onToggleSortOrder={toggleSortOrder}/>
      <Routes>
        <Route path="/" element={
          <>
            <div style={{ textAlign: 'center'}}>
              <h1 className={style.header}> To-Do List </h1>
            </div>
            <AddTodoForm onAddTodo={addTodo} />
            {isLoading ? <p>Loading...</p> : <TodoList todoList={todoList} onRemoveTodo={removeTodo} onUpdateCompletion={updateCompletion}/>}
          </>
        } />
        <Route path="/new" element={<h1>New Todo List</h1>} />
      </Routes>
      {showScrollToTop && (
        <button className={style.scrollToTopButton} onClick={scrollToTop}>
          Scroll to Top
        </button>
      )}
    </BrowserRouter>
  );
}

export default App;
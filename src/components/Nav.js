import React from 'react';
import { Link } from 'react-router-dom';
import AddTodoForm from './AddtodoForm';
import style from "./Nav.module.css"; 


function scrollToTarget() {
  const targetElement = document.getElementById('enterNewTask');
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: 'smooth' });
  }
}


function Navigation() {
  return (
    <nav>
      <ul className={style.navLinks}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="#enterNewTask" onClick={scrollToTarget}>Add New To-Do</Link></li>
        <li><Link to="/completed">Completed To-Do's</Link></li>
      </ul>
    </nav>
  );
}

export default Navigation;

import React from "react";
import InputWithLabel from "./InputWithLabel";
import styles from "./AddtodoForm.module.css"
import PropTypes from 'prop-types'

function AddTodoForm({onAddTodo}) {

    let [todoTitle, setTodoTitle] = React.useState('');

    function handleTitleChange(event) {
        let newTodoTitle = event.target.value;
        setTodoTitle(newTodoTitle);
    }

    function handleAddTodo (event){
        event.preventDefault();
        let newTodo = {
            title: todoTitle, 
            id: Date.now() 
          };
        onAddTodo(newTodo);
        console.log(todoTitle);
        setTodoTitle('');

    };

    return(
        <form onSubmit={handleAddTodo} className={styles.title} id="enterNewTask">
            <InputWithLabel
                id="todoTitle"
                label={"Title"}
                value={todoTitle}
                onChange={handleTitleChange}
            >
                Add New Task
            </InputWithLabel>
        </form>
    );
}

AddTodoForm.propTypes = {
    onAddTodo: PropTypes.func 
};

export default AddTodoForm;
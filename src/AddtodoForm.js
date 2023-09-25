import React from "react";
import InputWithLabel from "./InputWithLabel";
import styles from "./AddtodoForm.module.css"

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

export default AddTodoForm;
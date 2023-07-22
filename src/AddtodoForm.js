import React from "react";
import InputWithLabel from "./InputWithLabel";

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
        <form onSubmit={handleAddTodo}>
            <InputWithLabel
                id="todoTitle"
                label={"Title"}
                value={todoTitle}
                onChange={handleTitleChange}
            >
                Title
            </InputWithLabel>
        </form>
    );
}

export default AddTodoForm;
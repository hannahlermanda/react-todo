import React from "react";

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
            <label htmlFor="todoTitle">Title</label>
            <input id="todoTitle" type="text" name="title" value={todoTitle} onChange={handleTitleChange}></input>
            <button type="submit">Add</button>
        </form>
    );
}

export default AddTodoForm;
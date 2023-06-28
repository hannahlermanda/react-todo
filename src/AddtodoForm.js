import React from "react";


function AddTodoForm(props) {

    function handleAddTodo (event){
        event.preventDefault();
        const todoTitle = event.target.elements.title.value;
        props.onAddTodo(todoTitle);
        console.log(todoTitle);
        event.target.reset();
    };

    return(
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoTitle">Title</label>
            <input id="todoTitle" type="text" name="title"></input>
            <button type="submit">Add</button>
        </form>
    );
}

export default AddTodoForm;
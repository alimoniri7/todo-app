import React , { useState, useContext } from 'react';

import { Todo } from './context/TodoProvider';

const AddNew = () => {
    const [newItem , setNewItem] = useState('')

    const {dispatch} = useContext(Todo)


// console.log(todoList);
    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch({type : 'ADD_ITEM' , payload: newItem})
        setNewItem('')

    }

    const onchangeHandler = (e) => {
        setNewItem(e.target.value)
    }

    return (
        <form onSubmit={submitHandler}>
            <input type="text" placeholder='create a new todo' value={newItem} onChange={onchangeHandler}/>
            <button type='submit'>Add</button>
        </form>
    );
};

export default AddNew;
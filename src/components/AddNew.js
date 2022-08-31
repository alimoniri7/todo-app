import React , { useState, useContext } from 'react';

// Context
import { Todo } from './context/TodoProvider';
import { Theme } from './context/ThemeProvider';

// Styles
import styled from 'styled-components';



const Form = styled.form`
    display: flex;
    width: 100%;
    height: 65px;
    justify-content: space-between;
    background-color: ${(props=> props.flag ? '#fff' : '#2b2e49')};
    border-radius: 7px;
    align-items: center;
    gap: 10px;
    padding: 0 1.5rem;
    margin-top: 2rem;
    div{
        width: 25px;
        height: 25px;
        border: 1px solid #b9b9b99a;
        border-radius: 10000px;
    }
    input{
        width: 85%;
        outline: none;
        font-size: 1.1rem;
        color: ${(props=> props.flag ? '#474747' : '#e1e1e1')};
        &::placeholder{
            font-size: 1.1rem;
            color: #9d9d9d;
        }
    }
`


const AddNew = () => {
    const [newItem , setNewItem] = useState('')

    const {dispatch} = useContext(Todo)
    const {flag} = useContext(Theme)


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
        <Form onSubmit={submitHandler} flag={flag}>
            <div></div>
            <input type="text" placeholder='Create a new todo...' value={newItem} onChange={onchangeHandler}/>
            <button type='submit'><svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke={flag ? '#474747' : '#fff'} stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg></button>
        </Form>
    );
};

export default AddNew;
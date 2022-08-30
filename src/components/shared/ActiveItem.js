import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { Todo } from '../context/TodoProvider';

const ActiveItem = ({header}) => {

    const {todoList , dispatch} = useContext(Todo)


    const checked = () => {
        dispatch({type : 'CHECKED' , payload: header})
    }

    useEffect(()=>{
        return console.log(todoList);
    })

    return (
        <li>
            <button onClick={checked}>check</button>
            <span>{header}</span>
            <button>delete</button>
        </li>
    );
};

export default ActiveItem;
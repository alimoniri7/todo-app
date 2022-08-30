import React from 'react';
import { useContext } from 'react';
import { Todo } from '../context/TodoProvider';

const ActiveItem = ({header}) => {

    const {dispatch} = useContext(Todo)


    const checked = () => {
        dispatch({type : 'CHECKED' , payload: header})
    }

    const deleteItem = ()=>{
        dispatch({type: 'DELETE', payload: header})
    }

    return (
        <li>
            <button onClick={checked}>check</button>
            <span>{header}</span>
            <button onClick={deleteItem}>delete</button>
        </li>
    );
};

export default ActiveItem;
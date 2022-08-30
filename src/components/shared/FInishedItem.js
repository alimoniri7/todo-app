import React from 'react';
import { useContext } from 'react';
import { Todo } from '../context/TodoProvider';


const FinishedItem = ({header}) => {

    const {dispatch} = useContext(Todo)

    const unCheck = () => {
        dispatch({type : 'UNCHECKED' , payload: header})
    }

    const deleteItem = ()=>{
        dispatch({type: 'DELETE', payload: header})
    }

    return (
        <li>
            <button onClick={unCheck} >Un Check</button>
            <span>{header}</span>
            <button onClick={deleteItem}>delete</button>
        </li>
    );
};

export default FinishedItem;
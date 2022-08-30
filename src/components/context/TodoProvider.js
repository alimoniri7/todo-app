import React , { createContext } from 'react';
import { useReducer } from 'react';

export const Todo = createContext()


const initialTodoList = {
    active : [],
    finished : [],
    totalActives : 0,
}

const todoReducer = (todoList , action) => {
    console.log(todoList);
    switch (action.type) {
        case 'ADD_ITEM' : 
            if(action.payload === ''){
                alert('please inter someting')
            }else if (todoList.active.find(item => item.header === action.payload)){
                alert('this item alredy exist')
            }else{
                todoList.active.push({
                    header : action.payload,
                });
                todoList.totalActives = todoList.totalActives + 1
            }
            return{
                ...todoList
            }

        case 'CHECKED' :
            let newItems = todoList.active.filter(item => item.header !== action.payload)
            let checked = todoList.active.filter(item=> item.header===action.payload)
            todoList.finished.push({
                header : checked
            })
            todoList.totalActives = todoList.totalActives - 1
            return{
                ...todoList,
                active : [...newItems]
            }
    }
    
}




const TodoProvider = ({children}) => {

    const [todoList , dispatch] = useReducer(todoReducer , initialTodoList)

    return (
        <Todo.Provider value={{todoList , dispatch}}>
            {children}
        </Todo.Provider>
    );
};

export default TodoProvider;
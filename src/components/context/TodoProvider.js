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

                if(todoList.finished.find(item=> item.header===action.payload)){
                    let finshedIndex = todoList.finished.findIndex(item=> item.header===action.payload)
                    console.log(finshedIndex);
                    todoList.finished.splice(finshedIndex,1)
                }

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
            let checked = todoList.active.find(item=> item.header===action.payload)
            todoList.finished.push({
                header : checked.header
            })
            todoList.totalActives = todoList.totalActives - 1
            return{
                ...todoList,
                active : [...newItems]
            }

        case 'UNCHECKED' :
            let newFinishes = todoList.finished.filter(item=> item.header !== action.payload)
            if (todoList.active.find(item => item.header === action.payload)){
                alert('this item alredy exist')
            }else{
                todoList.active.push({
                    header : action.payload,
                });
                todoList.totalActives = todoList.totalActives + 1
            }
            return{
                ...todoList,
                finished : [...newFinishes]
            }

        case 'DELETE' :
            if(todoList.active.find(item=> item.header===action.payload)){
                let deleteIndex=todoList.active.findIndex(item=> item.header===action.payload)
                todoList.active.splice(deleteIndex,1)
                todoList.totalActives = todoList.totalActives - 1

            }else{
                let deleteIndex=todoList.active.findIndex(item=> item.header===action.payload)
                todoList.finished.splice(deleteIndex , 1)
            }
            return{
                ...todoList
            }

        default:
            return{
                ...todoList
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
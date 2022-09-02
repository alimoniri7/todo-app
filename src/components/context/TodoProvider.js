import React , { createContext } from 'react';
import { useReducer } from 'react';

// Toastify
import { toast } from 'react-toastify';

export const Todo = createContext()


let initialTodoList = {}

if(localStorage.getItem('myList')){
    let data = JSON.parse(localStorage.getItem('myList'))
     initialTodoList ={
        ...data
     }
}else{
    initialTodoList = {
       active : [],
       finished : [],
       totalActives : 0,
       filterActive : false,
       filterCompleted : false
    }
}


const todoReducer = (todoList , action) => {
    console.log(todoList);
    switch (action.type) {
        case 'ADD_ITEM' : 
            if(action.payload.trim() === ''){
                toast.info('Please inter someting !', {
                    theme: 'colored',
                    });
            }else if (todoList.active.find(item => item === action.payload)){
                toast.warn('This item alredy exist !', {
                    theme: 'colored',
                    });

            }else{

                if(todoList.finished.find(item=> item===action.payload)){
                    let finshedIndex = todoList.finished.findIndex(item=> item===action.payload)
                    console.log(finshedIndex);
                    todoList.finished.splice(finshedIndex,1)
                }

                todoList.active.unshift(action.payload);
                todoList.totalActives = todoList.totalActives + 1
                
            }
            localStorage.setItem("myList" ,JSON.stringify(todoList))
            return{
                ...todoList
            }

        case 'CHECKED' :
            let newItems = todoList.active.filter(item => item !== action.payload)
            let checked = todoList.active.find(item=> item===action.payload)
            todoList.finished.unshift(checked)
            todoList.totalActives = todoList.totalActives - 1
            localStorage.setItem("myList" ,JSON.stringify({...todoList , active : [...newItems]}))
            return{
                ...todoList,
                active : [...newItems]
            }

        case 'UNCHECKED' :
            let newFinishes = todoList.finished.filter(item=> item !== action.payload)
            if (todoList.active.find(item => item === action.payload)){
                alert('this item alredy exist')
            }else{
                todoList.active.unshift(action.payload);
                todoList.totalActives = todoList.totalActives + 1
            }

            localStorage.setItem("myList" ,JSON.stringify({...todoList , finished: [...newFinishes]}))
            return{
                ...todoList,
                finished : [...newFinishes]
            }

        case 'DELETE' :
            if(todoList.active.find(item=> item===action.payload)){
                let deleteIndex=todoList.active.findIndex(item=> item===action.payload)
                todoList.active.splice(deleteIndex,1)
                todoList.totalActives = todoList.totalActives - 1

            }else{
                let deleteIndex=todoList.active.findIndex(item=> item===action.payload)
                todoList.finished.splice(deleteIndex , 1)
            }
            localStorage.setItem("myList" ,JSON.stringify(todoList))
            return{
                ...todoList
            }

        case 'CLEAR_COMPLETED':
            localStorage.setItem("myList" ,JSON.stringify({...todoList , finished: []}))
            return{
                ...todoList,
                finished : []
            }
        
        case 'DND_ACTIVE':
            localStorage.setItem("myList" ,JSON.stringify({...todoList , active : [...action.payload]}))
            return{
                ...todoList,
                active: [...action.payload]
            }

        case 'DND_FINISHED':
            localStorage.setItem("myList" ,JSON.stringify({...todoList , finished: [...action.payload]}))
            return{
                ...todoList,
                finished: [...action.payload]
            }

        case 'FILTER_ACTIVE':
            localStorage.setItem("myList" ,JSON.stringify({...todoList , filterActive: true , filterCompleted: false}))
            return{
                ...todoList,
                filterCompleted : false,
                filterActive : true
            }

        case "FILTER_COMPLETED":
            localStorage.setItem("myList" ,JSON.stringify({...todoList , filterActive: false , filterCompleted: true}))
            return{
                ...todoList,
                filterActive : false,
                filterCompleted: true
            }

        case 'NO_FILTER' :
            localStorage.setItem("myList" ,JSON.stringify({...todoList , filterActive: false, filterCompleted: false}))
            return{
            ...todoList,
            filterActive : false,
            filterCompleted: false
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
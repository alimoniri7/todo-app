import React , { useContext } from 'react';
import AddNew from './AddNew';
import { Theme } from './context/ThemeProvider';
import { Todo } from './context/TodoProvider';
import ActiveItem from './shared/ActiveItem';
import FinishedItem from './shared/FinishedItem';

const List = () => {


const {todoList} = useContext(Todo)
const {flag , setFlag} = useContext(Theme)

const toggleTheme = () => {
    setFlag(prevFlag=> !prevFlag)
}
console.log(flag);

    return (
        <div>
            <div>
                <h1>TODO</h1>
                <button onClick={toggleTheme} >toggle Theme</button>
            </div>

            <AddNew/>

            <ul>
                {todoList.active.map(item => <ActiveItem key={item.header} header = {item.header} />)}
            </ul>

            <ul>
                {todoList.finished.map(item=> <FinishedItem key={item.header} header={item.header} />)}
            </ul>

            <div>{todoList.totalActives}</div>
        </div>
    );
};

export default List;
import React from 'react';
import { useContext } from 'react';
import AddNew from './AddNew';
import { Todo } from './context/TodoProvider';
import ActiveItem from './shared/ActiveItem';
import FinishedItem from './shared/FinishedItem';

const List = () => {


const {todoList , dispath} = useContext(Todo)

    return (
        <div>
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
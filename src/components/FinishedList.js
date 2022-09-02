import React , {useContext} from 'react';

// Contexts
import { Todo } from './context/TodoProvider';
import { Theme } from './context/ThemeProvider';

//styles
import styled from 'styled-components';
import styles from './mainList.module.scss'

// Components
import FinishedItem from "./shared/FinishedItem";

// drag and drop
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";






const TodoList = styled.div`
    width: 100%;
    margin-top: 2rem;
    li{
        &:first-child{
            border-radius: 7px 7px 0 0 ;
        }
        &:last-child{
            border-radius: 0 0 7px 7px;
        }
        background-color: ${(props=> props.flag ? '#fff' : '#2b2e49')};
    }

    @media (max-width: 600px) {
        li{
            border-radius: 7px;
        }
}
`






const FinishedList = () => {

    const {todoList , dispatch} = useContext(Todo)
    const {flag} = useContext(Theme)


    const finishedHandleDrop = (droppedItem) => {
        if (!droppedItem.destination) return;
        var updatedList = [...todoList.finished];
        const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
        updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
        dispatch({type:'DND_FINISHED' , payload: updatedList})
    };



    return (
        <DragDropContext onDragEnd={finishedHandleDrop}>
            <Droppable droppableId="list-container">
                {(provided) => (
                    <TodoList
                    flag={flag}
                    className={styles.listContainer}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    >
                    {todoList.finished.map((item, index) => (
                        <Draggable key={item} draggableId={item} index={index}>
                        {(provided) => (
                            <li
                            className={styles.itemContainer}
                            ref={provided.innerRef}
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            >
                                <FinishedItem header={item} />
                            
                            </li>
                        )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                    </TodoList>
                )}
            </Droppable>
      </DragDropContext>
    );
};

export default FinishedList;
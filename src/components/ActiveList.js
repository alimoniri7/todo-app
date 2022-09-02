import React , { useContext } from 'react';

//Context
import { Todo } from "./context/TodoProvider";
import { Theme } from "./context/ThemeProvider";

//drag and drop
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


// Styles
import styles from './mainList.module.scss'
import styled from 'styled-components';

// Components
import ActiveItem from "./shared/ActiveItem";






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







const ActiveList = () => {

    const {todoList , dispatch} = useContext(Todo)
    const {flag} = useContext(Theme)



    const activeHandleDrop = (droppedItem) => {
        // Ignore drop outside droppable container
        if (!droppedItem.destination) return;
        var updatedList = [...todoList.active];
        // Remove dragged item
        const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
        // Add dropped item
        updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
        // Update State
        dispatch({type:'DND_ACTIVE' , payload: updatedList})
      };







    return (
        <DragDropContext onDragEnd={activeHandleDrop}>
            <Droppable droppableId="list-container">
              {(provided) => (
                <TodoList
                  flag={flag}
                  className={styles.listContainer}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {todoList.active.map((item, index) => (
                    <Draggable key={item} draggableId={item} index={index}>
                      {(provided) => (
                        <li
                         
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                        >
                            <ActiveItem header={item} />
                          
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

export default ActiveList;
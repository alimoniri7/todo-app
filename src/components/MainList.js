import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// Components
import AddNew from "./AddNew";

// context
import { useContext } from "react";
import { Todo } from "./context/TodoProvider";
import { Theme } from "./context/ThemeProvider";

// Toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

// Assets
import desktopbgLight from '../assets/images/bg-desktop-light.jpg'
import desktopbgDark from '../assets/images/bg-desktop-dark.jpg'
import mobilebgDark from '../assets/images/bg-mobile-dark.jpg'
import mobilebgLight from '../assets/images/bg-mobile-light.jpg'
import sun from '../assets/images/icon-sun.svg'
import moon from '../assets/images/icon-moon.svg'

// styles
import styled from "styled-components";
import styles from './mainList.module.scss'
import ActiveItem from "./shared/ActiveItem";
import FinishedItem from "./shared/FinishedItem";
import SubMenu from "./SubMenu";

const BgColor = styled.div`
background-color: ${(props=> props.flag ? '#e3e3e3' : '#0e1124')};
width: 100%;
height: 100%;
min-height: 100vh;

z-index: -2;
`

const BgImage=styled.span`
    background-image:url(${props=> props.flag ? desktopbgLight : desktopbgDark});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 100vw;
    height: 300px;
    z-index: 0;
    position: fixed;
    top: 0;
    left: 0;
    @media (max-width : 600px) {
        background: url(${(props=> props.flag ? mobilebgLight : mobilebgDark)});
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        height: 200px;
}`

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

const MainList = () => {

    const {todoList , dispatch} = useContext(Todo)
    const {flag ,setFlag} = useContext(Theme)


    // drag and drop functions
  // Function to update list on drop
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


  const finishedHandleDrop = (droppedItem) => {
    if (!droppedItem.destination) return;
    var updatedList = [...todoList.finished];
    const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
    updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
    dispatch({type:'DND_FINISHED' , payload: updatedList})
  };



  // theme toggle button function
  const toggleTheme = () => {
      setFlag(prevFlag=> !prevFlag)
  }


  return (
    <BgColor flag={flag}>
        <BgImage flag={flag} />



        <div className={styles.DNDContainer}>
        
            <div className={styles.header} >
                <h1>TODO</h1>
                <button onClick={toggleTheme} >{flag ? <img src={moon} alt='moon'/> : <img src={sun} alt='sun'/>}</button>
            </div>

          <AddNew/>


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

          <SubMenu/>
        </div>



        <ToastContainer/>
    </BgColor>
  );
}

export default MainList;
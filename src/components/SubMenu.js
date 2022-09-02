import React from 'react';
import { useContext } from 'react';
import { Todo } from './context/TodoProvider';

// Styles 
import styles from './subMenu.module.scss'
import styled from 'styled-components';
import { Theme } from './context/ThemeProvider';

const Container = styled.div`
    background-color: ${(props=> props.flag ? '#fff' : '#2b2e49')};
    
`

const AllBtn = styled.button`
    color: ${(props=> props.filterActive || props.filterCompleted ? '' : '#2f42f0')};
    font-weight: ${(props=> props.filterActive || props.filterCompleted ? '300' : '900')};
`
const ActiveBtn = styled.button`
    color: ${(props=> props.filterActive ? '#2f42f0' : '')};
    font-weight: ${(props=> props.filterActive ? '900' :'300' )};
`
const CompletedBtn = styled.button`
    color: ${(props=> props.filterCompleted ? '#2f42f0' : '')};
    font-weight: ${(props=> props.filterCompleted ? '900' : '300')};
`


const SubMenu = () => {

    const {todoList , dispatch} = useContext(Todo)
    const {flag} = useContext(Theme)

    return (
        <Container flag={flag} className={styles.container}>
            <div>
                <ActiveBtn filterActive={todoList.filterActive}  onClick={()=> dispatch({type : 'FILTER_ACTIVE'})}>Actives</ActiveBtn>
                <AllBtn filterActive={todoList.filterActive} filterCompleted={todoList.filterCompleted}  onClick={()=> dispatch({type : 'NO_FILTER'})}>All</AllBtn>
                <CompletedBtn filterCompleted={todoList.filterCompleted}  onClick={()=> dispatch({type : 'FILTER_COMPLETED'})}>Completed</CompletedBtn>
            </div>
            <p>{todoList.totalActives} items left</p>
            <button onClick={()=> dispatch({type:'CLEAR_COMPLETED'})}  className={flag ? styles.hoverLight : styles.hoverDark} >Clear Completed</button>

        </Container>
    );
};

export default SubMenu;
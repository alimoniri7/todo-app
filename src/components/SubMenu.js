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


const SubMenu = () => {

    const {todoList , dispatch} = useContext(Todo)
    const {flag} = useContext(Theme)

    return (
        <Container flag={flag} className={styles.container}>
            <p>{todoList.totalActives} items left</p>
            <div>
                <button className={flag ? styles.hoverLight : styles.hoverDark}>All</button>
                <button className={flag ? styles.hoverLight : styles.hoverDark}>Active</button>
                <button className={flag ? styles.hoverLight : styles.hoverDark}>Completed</button>
            </div>

            <button onClick={()=> dispatch({type:'CLEAR_COMPLETED'})}  className={flag ? styles.hoverLight : styles.hoverDark} >Clear Completed</button>
        </Container>
    );
};

export default SubMenu;
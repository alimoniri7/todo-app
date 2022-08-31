import React from 'react';

// Contenxt
import { useContext } from 'react';
import { Todo } from '../context/TodoProvider';
import { Theme } from '../context/ThemeProvider';

// Styles
import styles from './item.module.scss'
import styled from 'styled-components'

// Assets
import crossMark from '../../assets/images/icon-cross.svg'

const StyledHeader = styled.span`
font-weight: 500;
    color: ${(props=> props.flag ? '#393939' : '#ffffffcf')};
`



const ActiveItem = ({header}) => {

    const {dispatch} = useContext(Todo)
    const {flag} = useContext(Theme)


    const checked = () => {
        dispatch({type : 'CHECKED' , payload: header})
    }

    const deleteItem = ()=>{
        dispatch({type: 'DELETE', payload: header})
    }

    return (
        <li className={styles.liContainer}>
            <div>
                <button onClick={checked}></button>
                <StyledHeader flag={flag}>{header}</StyledHeader>
            </div>
            <button onClick={deleteItem}><img src={crossMark} alt="cross" /></button>
        </li>
    );
};

export default ActiveItem;
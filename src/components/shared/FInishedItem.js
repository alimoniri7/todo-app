import React from 'react';

// Context
import { useContext } from 'react';
import { Todo } from '../context/TodoProvider';
import { Theme } from '../context/ThemeProvider';

// Styles
import styles from './item.module.scss'
import styled from 'styled-components'

// Assets
import checkMark from '../../assets/images/icon-check.svg'
import crossMark from '../../assets/images/icon-cross.svg'

const StyledHeader = styled.span`
font-weight: 300;
    color: ${(props=> props.flag ? '#393939' : '#ffffff78')};
    text-decoration: line-through;
    @media (max-width:600px) {
        font-size:.9rem;
    }
`


const FinishedItem = ({header}) => {

    const {dispatch} = useContext(Todo)
    const {flag} = useContext(Theme)

    const unCheck = () => {
        dispatch({type : 'UNCHECKED' , payload: header})
    }

    const deleteItem = ()=>{
        dispatch({type: 'DELETE', payload: header})
    }

    return (
        <li className={styles.liContainer} >
            <div>
                <button onClick={unCheck} className={styles.mark} ><img src={checkMark} alt="check" /></button >
                <StyledHeader flag={flag}>{header}</StyledHeader>
            </div>
            <button onClick={deleteItem}><img src={crossMark} alt="cross" /></button>
        </li>
    );
};

export default FinishedItem;
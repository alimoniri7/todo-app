import React , { useContext } from 'react';

// components
import AddNew from './AddNew';
import ActiveItem from './shared/ActiveItem';
import FinishedItem from './shared/FinishedItem';

// Contexts
import { Theme } from './context/ThemeProvider';
import { Todo } from './context/TodoProvider';

//styles
import styled from 'styled-components';
import styles from './list.module.scss'

// Assets
import desktopbgLight from '../assets/images/bg-desktop-light.jpg'
import desktopbgDark from '../assets/images/bg-desktop-dark.jpg'
import mobilebgDark from '../assets/images/bg-mobile-dark.jpg'
import mobilebgLight from '../assets/images/bg-mobile-light.jpg'
import sun from '../assets/images/icon-sun.svg'
import moon from '../assets/images/icon-moon.svg'
import SubMenu from './SubMenu';

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
        }

    `
    const BgColor = styled.div`
        background-color: ${(props=> props.flag ? '#e3e3e3' : '#0e1124')};
        width: 100%;
        height: 100%;
        min-height: 100vh;

        z-index: -2;
        
    `

    const TodoList = styled.div`
        width: 100%;
        margin-top: 2rem;
        ul{
            border-radius: 7px 7px 0 0;
            background-color: ${(props=> props.flag ? '#fff' : '#2b2e49')};
        }

        @media (max-width: 600px) {
            ul{
                border-radius: 7px;
            }
        }
    `





const List = () => {

    const {todoList} = useContext(Todo)
    const {flag , setFlag} = useContext(Theme)

    const toggleTheme = () => {
        setFlag(prevFlag=> !prevFlag)
    }
    

    return (
        <BgColor flag={flag}>
            <BgImage flag={flag}></BgImage>
            <div className={styles.container}>
                <div className={styles.header} >
                    <h1>TODO</h1>
                    <button onClick={toggleTheme} >{flag ? <img src={moon} alt='moon'/> : <img src={sun} alt='sun'/>}</button>
                </div>

                <AddNew/>

                <TodoList flag={flag}>
                    <ul>
                        {todoList.active.map(item => <ActiveItem key={item.header} header = {item.header} />)}
                    </ul>

                    <ul>
                        {todoList.finished.map(item=> <FinishedItem key={item.header} header={item.header} />)}
                    </ul>
                </TodoList>

                <SubMenu/>
            </div>
        </BgColor>
    );
};

export default List;
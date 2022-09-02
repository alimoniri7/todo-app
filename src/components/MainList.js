import React from "react";

// Components
import AddNew from "./AddNew";
import SubMenu from "./SubMenu";
import ActiveList from "./ActiveList";
import FinishedList from "./FinishedList";

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
        height: 30vh;
}`



const MainList = () => {

    const {flag ,setFlag} = useContext(Theme)
    const {todoList} = useContext(Todo)


  // theme toggle button function
  const toggleTheme = async () => {
      await setFlag(prevFlag=> !prevFlag)
      localStorage.setItem('theme' ,String(flag))
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

          {!todoList.active.length && !todoList.finished.length
              ? <div className={styles.listPreview2} >Your todo list is empty !</div>
              : <>
                  {!todoList.active.length && !todoList.filterCompleted ? <div className={styles.listPreview1} >All todos have done !</div> : <>{!todoList.filterCompleted &&<ActiveList/>}</>}
                  {!todoList.finished.length && !todoList.filterActive ? <div className={styles.listPreview1} >There is no completed todo</div> : <>{!todoList.filterActive &&  <FinishedList/>}</>}
                  
                  
                </>
          }


          <SubMenu/>

          <p className={styles.subtitle}>Drag and drop to reorder list</p>
        </div>

        <ToastContainer/>

    </BgColor>
  );
}

export default MainList;
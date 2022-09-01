import React from 'react';
import TodoProvider from './components/context/TodoProvider';
import ThemeProvider from './components/context/ThemeProvider';
import MainList from './components/MainList';

const App = () => {
    return (
        <TodoProvider>
            <ThemeProvider>
                <MainList />
            </ThemeProvider>
        </TodoProvider>
    );
};

export default App;
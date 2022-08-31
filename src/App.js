import React from 'react';
import TodoProvider from './components/context/TodoProvider';
import List from './components/List';
import ThemeProvider from './components/context/ThemeProvider';

const App = () => {
    return (
        <TodoProvider>
            <ThemeProvider>
                <List />
            </ThemeProvider>
        </TodoProvider>
    );
};

export default App;
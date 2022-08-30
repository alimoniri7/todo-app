import React from 'react';
import TodoProvider from './components/context/TodoProvider';
import List from './components/List';

const App = () => {
    return (
        <TodoProvider>
            <List />
        </TodoProvider>
    );
};

export default App;
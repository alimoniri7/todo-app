import React, { createContext, useState } from 'react';

export const Theme = createContext()


const ThemeProvider = ({children}) => {
    const [flag , setFlag] = useState(true)


    return (
        <Theme.Provider value={{flag , setFlag}}>
            {children}
        </Theme.Provider>
    );
};

export default ThemeProvider;
import React from 'react';

const FInishedItem = () => {
    return (
        <li>
            <button onClick={checked}>check</button>
            <span>{header}</span>
            <button>delete</button>
        </li>
    );
};

export default FInishedItem;
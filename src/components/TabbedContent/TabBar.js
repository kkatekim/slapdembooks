import React from 'react';

export const TabBar = (props) => (
    <div className="TabBar">
        {props.children}
    </div>
);

export const TabItem = (props) => (
    <div class={'TabItem' + (props.active ? ' active' : '')}>
        {props.children}
    </div>
);
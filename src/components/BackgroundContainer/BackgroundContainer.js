import React from 'react';
import './BackgroundContainer.scss';

const BackgroundContainer = (props) => (
    <div className="BackgroundContainer">
        {props.children}
    </div>
);

export default BackgroundContainer;
import React from 'react';
import './ContainerPanel.scss';

const ContainerPanel = (props) => (
    <div className="ContainerPanel">
        {props.children}
    </div>
);

export default ContainerPanel;
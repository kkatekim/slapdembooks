import React, { useState } from 'react';
import './TabbedContent.scss';

const TabBar = (props) => (
    <div className="TabBar">
        {props.children}
    </div>
);

const TabItem = (props) => (
    <div class={'TabItem' + (props.active ? ' active' : '')} onClick={props.onClick}>
        {props.children}
    </div>
);

/**
 * A list of tabbed content
 * props.tabs  list of tabs names
 * props.tabContents  list of content to display if given tab is active (e.g. if first
 *                    tab is selected, first item from tabContents list is displayed)
 */
const TabbedContent = (props) => {
    // Set the first tab as the active tab, and track which tab is selected
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="TabbedContent">
            <TabBar>
                {
                    props.tabs.map((tabName, i) => <TabItem key={i} active={i == activeTab} onClick={() => {setActiveTab(i)}}>{tabName}</TabItem>)
                }
            </TabBar>

            {props.tabContents[activeTab]}
        </div>
    );
};

export default TabbedContent;
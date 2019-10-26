import React from 'react';
import './AddFriends.scss';
import BackgroundContainer from '../../components/BackgroundContainer/BackgroundContainer';
import Header from '../../components/Header/Header.js';
import { Link } from 'react-router-dom';

const AddFriends = (props) => (
    <div className="Page AddFriends">
        <Header action="close"/>

        <div className="add-form">
            Friend's username
            <input type="text"></input>
            <button>Add friend</button>
        </div>

        <div className="FriendList">
            Your Friend's
            <ul>
                <li>Person #1</li>
                <li>Person #2</li>
            </ul>
        </div>
    </div>
);

export default AddFriends;
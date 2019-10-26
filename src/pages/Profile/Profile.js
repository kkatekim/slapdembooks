import React, { useState, useEffect } from 'react';
import './Profile.scss';
import BackgroundContainer from '../../components/BackgroundContainer/BackgroundContainer';
import Header from '../../components/Header/Header.js';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../../components/Firebase';

const Profile = (props) => {
    return (
        <div className="Page Profile">
            <Header action="close"/>
                {
                <>
                    <img src="https://lh3.googleusercontent.com/-bxij4YMT3XY/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdUVPzzXHLpEwHq5RjzTY5Ayid6xA/photo.jpg" className="pic"/>
                    <div className="accountName">Logan Ralston</div>
                    <div className="accountUsername">logan-r</div>

                    <div className="currentCourses">
                        <div className="infoTitle">
                            <i class="fas fa-clipboard-list"></i>&nbsp;
                            Logan Ralston is currently taking
                            <ul className="couseList">
                                <li>MATH223</li>
                                <li>PSYC305</li>
                                <li>PHIL210</li>
                                <li>COMP303</li>
                            </ul>
                        </div>
                        <div className="infoTitle">
                            Status: Checked In
                        </div>
                        <div className="infoTitle">
                            <i class="fas fa-map-marker-alt"></i>
                            Studying in Bronfman
                        </div>
                        <div className="infoTitle">
                            <i class="fas fa-book"></i>
                            Focusing on <span className="courseFocus"> MATH223</span>
                        </div>
                    </div>
                </>
                }
        </div>
    )
}

export default Profile;
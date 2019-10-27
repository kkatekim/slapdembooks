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
                    <div className="center">
                        <img src="https://lh3.googleusercontent.com/-bxij4YMT3XY/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdUVPzzXHLpEwHq5RjzTY5Ayid6xA/photo.jpg" className="pic"/>
                    </div>
                    <div className="accountName">Logan Ralston</div>
                    <div className="accountUsername">logan-r</div>
                    
                    <div className="defaultFontSize">
                        <div className="currentCourses">
                            <div className="infoTitle">
                                <i className="icon fas fa-clipboard-list"></i>
                                Logan Ralston is currently taking <span className="edit">edit</span>
                            </div>
                            <ul className="courseList">
                                <li>MATH223</li>
                                <li>PSYC305</li>
                                <li>COMP302</li>
                                <li>COMP303</li>
                            </ul>
                            </div>

                            <hr></hr>

                            <div className="checkInInfo">
                                <div className="infoTitle">
                                    Status: Checked In
                                    <span className="edit">edit</span>
                                </div>
                                <div className="infoTitle">
                                    <i className="icon fas fa-map-marker-alt"></i> 
                                    Studying in Bronfman
                                </div>
                                <div className="infoTitle">
                                    <i className="icon fas fa-book"></i> 
                                    Focusing on <span className="courseFocus"> MATH223</span>
                                    
                                </div>
                                <p className="description">I'm working on Assignment 2 right now. Come join me!</p>
                            </div>
                        
                    </div>
                </>
                }
        </div>
    )
}

export default Profile;
import React, { useState, useEffect } from 'react';
import './Friends.scss';
import BackgroundContainer from '../../components/BackgroundContainer/BackgroundContainer';
import Header from '../../components/Header/Header.js';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../../components/Firebase';

const Friends = (props) => {
    return (
        <div className="Page Friends">
            <Header/>
            <SearchBar/>
            <h1 className="pageTitle">Your Friends</h1>
            <ul className="friendsList">
                <li><Person/></li>
                <li><Person/></li>
                <li><Person/></li>
            </ul>
        </div>
    )
}

class Person extends React.Component{

    constructor(props){
        super(props);
        this.image= "https://lh3.googleusercontent.com/-bxij4YMT3XY/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdUVPzzXHLpEwHq5RjzTY5Ayid6xA/photo.jpg";
        this.name= "Logan Ralston";
        this.username= "logan-r";
    }

    render(){
        return(
            <div className="box">
                <img src={this.image} className="pic"/>
                <div className = "name">{this.name}</div>
                <div className = "username">{this.username}</div>
            </div>
        );
    }
}

class SearchBar extends React.Component{
    render(){
        return(
            <div class="searchbar">
                <form>
                    
                    <i class="fas fa-search" id="searchIcon"></i>
                    
                    <input type="text" value="Search"/>
                    
                </form>
            </div>
        );
    }
}

export default Friends;
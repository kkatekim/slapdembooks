import React, { useState, useEffect } from 'react';
import './Friends.scss';
import BackgroundContainer from '../../components/BackgroundContainer/BackgroundContainer';
import Header from '../../components/Header/Header.js';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../../components/Firebase';
import { throwStatement } from '@babel/types';

//test json obj for filter
const friends = [
    {
        "username": "logan-r",
        "name": "Logan Ralston",
        "img": "https://lh3.googleusercontent.com/-bxij4YMT3XY/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdUVPzzXHLpEwHq5RjzTY5Ayid6xA/photo.jpg"
    },
    {
        "username": "sasha123",
        "name": "Sasha Williams",
        "img": "https://image.freepik.com/free-vector/pack-colorful-square-emoticons_23-2147589525.jpg"
    },
    {
        "username": "gqianmoney",
        "name": "Grace Qian",
        "img": "http://www.studio8apps.com/wp-content/uploads/2014/05/square_instapic_200-200x200.png"
    }
]

//higher order function that
//since this is outside, it doesn't have function to the state, so we must pass state in
function searchingFor(term){
    return function(x){//make sure when filtering, what we want meets the condition we're setting in here
        return x.username.toLowerCase().includes(term.toLowerCase()) ||
            x.name.toLowerCase().includes(term.toLowerCase()) ||
            !term;//include !term to account for when nothing is passed in, we do nothing


    }
}


class Friends extends React.Component{

    constructor(props){
        super(props);
        //state refers to the state of the search
        //term refers to what is input in the search bar
        this.state = {
            friends: friends,
            term: '',
        }
        this.searchHandler = this.searchHandler.bind(this);
    }

    searchHandler(event){
        this.setState({term: event.target.value})
    }

    render(){
        //makes it so we can use "term" instead of "this.state.term" and "friends" instead of "this.state.friends"
        const{term, friends} = this.state;
        return (
            <div className="Page Friends">
                <Header/>
                <div class="searchbar">
                    <form>
                        <i class="fas fa-search" id="searchIcon"></i>
                        <input id="searchInput" type="text" placeholder="Search" onChange={this.searchHandler} value={term}/>
                    </form>
                </div>
                <h1 className="pageTitle">Your Friends</h1>
                {
                    //load list of friends onto the page from the array "friends"
                    //map through the state
                    friends.filter(searchingFor(term)).map((person) =>
                            <div key={person.username}>
                                <Person img={person.img}
                                        name={person.name}
                                        username={person.username}/>
                            </div> 
                    )
                    
                }
            
            </div> 
        );
    }
        



            /* <ul className="friendsList">
                <li><Person 
                    img="https://lh3.googleusercontent.com/-bxij4YMT3XY/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdUVPzzXHLpEwHq5RjzTY5Ayid6xA/photo.jpg" 
                    name="Logan Ralston"
                    username="logan-r"/></li>
                <li><Person
                    img="http://www.studio8apps.com/wp-content/uploads/2014/05/square_instapic_200-200x200.png" 
                    name="Grace Qian"
                    username="gqianmoney"/></li>
                <li><Person
                    img="https://image.freepik.com/free-vector/pack-colorful-square-emoticons_23-2147589525.jpg" 
                    name="Sasha Williams"
                    username="sasha123"/></li>
            </ul> */
        // </div>
    // )
}

//each person is displayed as button so when you click on that person's button, it will go to their profile.
class Person extends React.Component{

    render(){
        return(
            <button className="box">
                <img src={this.props.img} className="pic"/>
                <div className = "name">{this.props.name}</div>
                <div className = "username">{this.props.username}</div>
            </button>
        );
    }
}

// class SearchBar extends React.Component{


//     render(){
//         return(
//             <div class="searchbar">
//                 <form>
//                     <i class="fas fa-search" id="searchIcon"></i>
//                     <input id="searchInput" type="text" placeholder="Search" onChange={this.searchHandler} value={term}/>
//                 </form>
//             </div>
//         );
//     }
// }

export default Friends;

import React, { useState, useEffect } from 'react';
import './Friends.scss';
import BackgroundContainer from '../../components/BackgroundContainer/BackgroundContainer';
import Header from '../../components/Header/Header.js';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../../components/Firebase';


//higher order function that
//since this is outside, it doesn't have function to the state, so we must pass state in
function searchingFor(term){
    return function(x){//make sure when filtering, what we want meets the condition we're setting in here
    console.log(x)
        return x.username.toLowerCase().includes(term.toLowerCase()) ||
            x.displayName.toLowerCase().includes(term.toLowerCase()) ||
            !term;//include !term to account for when nothing is passed in, we do nothing


    }
}

function FriendsWrapper(props) {
    return (
        <FirebaseContext.Consumer>
            {firebase => <Friends firebase={firebase}></Friends>}
        </FirebaseContext.Consumer>
    )
}

class Friends extends React.Component{
    constructor(props) {
        super(props);
        //state refers to the state of the search
        //term refers to what is input in the search bar
        this.state = {
            people: [],
            term: '',
            user: null,
            friends: []
        }
        this.searchHandler = this.searchHandler.bind(this);
    }

    componentWillMount() {
        // Get the logged in user
        this.props.firebase.auth.onAuthStateChanged((_user) => {
			if (_user) {
               this.props.firebase.db.collection('users').where('uid', '==', _user.uid).get().then((querySnapshot) => {
                    let userData = querySnapshot.docs[0].data()
                    this.setState({user: {username: querySnapshot.docs[0].id, ...userData}, friends: userData.friends})
                    querySnapshot.docs[0].data()
                    // Load a list of this active user's possible friends
                    this.props.firebase.db.collection('users').get().then((querySnapshot) => {
                        let friendsList = [];
                        querySnapshot.forEach((doc) => {
                            if (doc.id !== this.state.user.username) {
                                friendsList.push({
                                    username: doc.id,
                                    ...doc.data()
                                    // ...doc.data() same as saying:
                                    //photoURL: doc.data().photoURL,
                                    //displayName: doc.data().displayName
                                })
                            }
                        });
                        this.setState({people: friendsList});
                    });
                }).catch(e => alert("Error " + e))
			} else {
				this.setState({user: null})
			}
		});
    }

    searchHandler(event){
        this.setState({term: event.target.value})
    }

    render() {
        //makes it so we can use "term" instead of "this.state.term" and "friends" instead of "this.state.friends"
        const{term, people} = this.state;
        return (
            <div className="Page Friends">
                <Header title="Add Friends" action="close"/>
                <div class="searchbar">
                    <form>
                        <i class="fas fa-search" id="searchIcon"></i>
                        <input id="searchInput" type="text" placeholder="Search" onChange={this.searchHandler} value={term}/>
                    </form>
                </div>
                {
                    //load list of friends onto the page from the array "friends"
                    //map through the state
                    people.filter(searchingFor(term)).map((person) =>
                            <div key={person.username}>
                                <Person img={person.photoURL}
                                        name={person.displayName}
                                        username={person.username}
                                        alreadyFriended={this.state.friends.indexOf(person.username) !== -1}
                                        handleAddFriend={() => {
                                            this.props.firebase.doMakeFriends(this.state.user.username, person.username);
                                            this.setState({friends: this.state.friends + [person.username]})
                                        }}/>
                            </div> 
                    )
                    
                }
            
            </div> 
        );
    }
}

//each person is displayed as button so when you click on that person's button, it will go to their profile.
class Person extends React.Component{

    render(){
        return(
            <div className="box">
                <img src={this.props.img} className="pic"/>
                <div className="person-info">
                    <div className = "name">{this.props.name}</div>
                    <div className = "username">{this.props.username}</div>
                </div>
                {
                    this.props.alreadyFriended ? 
                    <div class="add-friend-btn">
                        <i class="fas fa-check"></i>
                    </div> :
                    <div class="add-friend-btn" onClick={this.props.handleAddFriend}>
                        <i class="fas fa-user-plus"></i>
                    </div>
                }
                
                
            </div>
        );
    }
}


export default FriendsWrapper;

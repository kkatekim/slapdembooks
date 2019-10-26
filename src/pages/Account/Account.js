import React, { useState, useEffect } from 'react';
import './Account.scss';
import BackgroundContainer from '../../components/BackgroundContainer/BackgroundContainer';
import Header from '../../components/Header/Header.js';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../../components/Firebase';

const AccountInner = (props) => {
    const [userDoc, setUserDoc] = useState(null);
    // useEffect(() => {
    //     props.firebase.getCurrentUserDoc().then((doc) => {
    //         alert(doc)
    //         setUserDoc(doc);
    //     })
    // }, [])
    setUserDoc(props.firebase);
    return (
        <div className="Page Account">
            <BackgroundContainer>
                <Header action="close"/>
                    {
                    <>
                        <img src="https://lh3.googleusercontent.com/-bxij4YMT3XY/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdUVPzzXHLpEwHq5RjzTY5Ayid6xA/photo.jpg" className="pic"/>
                        <div className="accountName">{props.firebase.activeUserName}</div>

                        <div className="options">
                            <Link to='/addfriends'>
                                <i class="fas fa-user-plus"></i>&nbsp;
                                Add Friends
                            </Link>
                            <Link to='/profile'>
                                <i class="fas fa-user-circle"></i>&nbsp;
                                View Profile
                            </Link>
                            <Link to='/logout'>
                                <i class="fas fa-sign-out-alt"></i>&nbsp;
                                Logout
                            </Link>
                        </div>
                    </>
                }
            </BackgroundContainer>
        </div>
    )
}

const Account = (props) => (
    <FirebaseContext.Consumer>
        { firebase => <AccountInner firebase={firebase}/> }
    </FirebaseContext.Consumer>
);

export default Account;
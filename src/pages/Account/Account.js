import React, { useState, useEffect } from 'react';
import './Account.scss';
import BackgroundContainer from '../../components/BackgroundContainer/BackgroundContainer';
import Header from '../../components/Header/Header.js';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../../components/Firebase';

const AccountInner = (props) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        // Track if user is logged in or not
        props.firebase.auth.onAuthStateChanged((_user) => {
			if (_user) {
                props.firebase.db.collection('users').where('uid', '==', _user.uid).get().then((querySnapshot) => {
                    setUser({username: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data()});
                }).catch(e => alert("Error " + e))
			} else {
				setUser(_user);
			}
		});
    }, []);

    return (
        <div className="Page Account">
            <BackgroundContainer>
                <Header action="close"/>
                    {
                        user && <>
                            <img src={user.photoURL} className="pic"/>
                            <div className="accountName">{user.username}</div>

                            <div className="options">
                                <Link to='/friends'>
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
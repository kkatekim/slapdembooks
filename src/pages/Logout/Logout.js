import React, { useEffect, useState } from 'react';
import './Logout.scss';
import BackgroundContainer from '../../components/BackgroundContainer/BackgroundContainer.js';
import { FirebaseContext } from '../../components/Firebase';
import { Redirect } from 'react-router-dom';

const LogoutNested = (props) => {
    // Login screen can either be loading or redirecting
    const [doneSigningOut, setDoneSigningOut] = useState(false);
    useEffect(() => {
        console.log(props.firebase)
        props.firebase.doSignOut().then(() => setDoneSigningOut(true))
    }, []);
    if (doneSigningOut) {
        return <Redirect to='/login'></Redirect>
    }
      

    return (
        <div className="Page Logout">
            <BackgroundContainer>
            </BackgroundContainer>
        </div>
    );
};

const Logout = (props) => (
    <FirebaseContext.Consumer>
        {
            firebase => <LogoutNested firebase={firebase}></LogoutNested>
        }
    </FirebaseContext.Consumer>
);

export default Logout;
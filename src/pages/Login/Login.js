import React, { useEffect, useState } from 'react';
import './Login.scss';
import BackgroundContainer from '../../components/BackgroundContainer/BackgroundContainer.js';
import { FirebaseContext } from '../../components/Firebase';
import { Redirect } from 'react-router-dom';

const LoginNested = (props) => {
    // Login screen can either be loading, redirecting or login
    const [mode, setMode] = useState('loading');
    useEffect(() => {
        props.firebase.auth.onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in
                setMode('redirecting')
            } else {
                setMode('login')
            }
        });
    }, []);
    if (mode === 'redirecting') {
        return <Redirect to='/'></Redirect>
    }
      

    return (
        <div className="Page Login">
            <BackgroundContainer>
                <div class="aligner">
                    <div className="logoPlaceholder"></div>
                    {
                        mode === 'login' &&
                        <div className="btn-login googleLogin" onClick={props.firebase.doSignInWithGoogle}>
                            Login with Google
                        </div>
                    }
                </div>
            </BackgroundContainer>
        </div>
    );
};

const Login = (props) => (
    <FirebaseContext.Consumer>
        {
            firebase => <LoginNested firebase={firebase}></LoginNested>
        }
    </FirebaseContext.Consumer>
);

export default Login;
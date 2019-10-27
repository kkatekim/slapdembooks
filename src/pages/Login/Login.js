import React, { useEffect, useState } from 'react';
import './Login.scss';
import BackgroundContainer from '../../components/BackgroundContainer/BackgroundContainer.js';
import { FirebaseContext } from '../../components/Firebase';
import { Redirect } from 'react-router-dom';
import Logo from '../../logo.png';

const LoginNested = (props) => {
    // Login screen can either be loading, redirecting or login
    const [mode, setMode] = useState('loading');
    useEffect(() => {
        props.firebase.auth.onAuthStateChanged(function(user) {
            if (user) {
                props.firebase.db.collection('users').where('uid', '==', user.uid).get().then((querySnapshot) => {
                    console.log(querySnapshot)
                    if (querySnapshot.docs.length > 0) {
                        // User has already logged in with google, don't need to go through setup process
                        setMode('redirect to home');
                    } else {
                        // User hasn't logged in with google before, go through setup process
                        setMode('redirect to setup');
                    }
                }).catch(e => alert("Error " + e))
            } else {
                setMode('login')
            }
        });
    }, []);
    if (mode === 'redirect to setup') {
        return <Redirect to='/setup'></Redirect>
    }
    if (mode === 'redirect to home') {
        return <Redirect to='/'></Redirect>
    }
      

    return (
        <div className="Page Login">
            <BackgroundContainer>
                <div class="aligner">
                    <div className="logoWrapper">
                        <img id="logo" src={Logo}/>
                    </div>
                    {
                        mode === 'login' &&
                        <div id="btn-login" className="btn-login googleLogin" onClick={props.firebase.doSignInWithGoogle}>
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
import React, { useState } from 'react';
import './SetupAccount.scss';
import BackgroundContainer from '../../components/BackgroundContainer/BackgroundContainer';
import { FirebaseContext } from '../../components/Firebase';
import { Redirect } from 'react-router-dom';

const SetupAccount = (props) => {
    // Track the value the user has currently typed in the username field
    const [username, setUsername] = useState('');

    // Track if the user has completed setup and is ready to be redirected to the homepage
    const [completed, setCompleted] = useState(false)
    if (completed) {
        return <Redirect to='/'/>
    }

    return (
        <div className="Page SetupAccount">
            <BackgroundContainer>
                <div className="welcome-message">
                    Welcome to SlapDemBooks!
                </div>

                <div className="input-form">
                    Select a username:
                    <input type="text" className="username" value={username} onChange={e => setUsername(e.target.value)}></input>
                </div>

                <footer>
                    <FirebaseContext.Consumer>
                        {
                            firebase => <button className="confirm-btn" onClick={() => firebase.doSetupUser(username).then(() => setCompleted(true))}>Confirm &raquo;</button>
                        }
                    </FirebaseContext.Consumer>
                </footer>
            </BackgroundContainer>
        </div>
    );
};

export default SetupAccount;
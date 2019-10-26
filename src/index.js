import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './normalize.css'
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Logout from './pages/Logout/Logout';
import Account from './pages/Account/Account';
import Firebase, { FirebaseContext } from './components/Firebase';
import AddFriends from './pages/AddFriends/AddFriends';
import SetupAccount from './pages/SetupAccount/SetupAccount';
import CheckIn from './pages/CheckIn/CheckIn';
import Profile from './pages/Profile/Profile';

ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
        <Router>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/logout' component={Logout} />
            <Route exact path='/setup' component={SetupAccount} />
            <Route exact path='/checkin' component={CheckIn} />
            <Route exact path='/account' component={Account} />
            <Route exact path='/addfriends' component={AddFriends} />
            <Route exact path='/profile' component={Profile} />
        </Router>
    </FirebaseContext.Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

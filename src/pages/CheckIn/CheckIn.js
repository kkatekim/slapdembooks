import React, { useState, useEffect } from 'react';
import './CheckIn.scss';
import Header from '../../components/Header/Header.js';
import { Redirect } from 'react-router-dom';
import { FirebaseContext } from '../../components/Firebase';

const courses = ['MATH223', 'MATH240', 'PHIL210', 'COMP550', 'COMP551'];

const CheckInInner = (props) => {
    const [user, _setUser] = useState(null);
    const setUser = (newUser) => {
        _setUser(newUser);
        if (newUser !== null) {
            setBuilding(newUser.checkedin.location);
            setSubject(newUser.checkedin.subject);
            setMessage(newUser.checkedin.message);
        }
    };
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

    // Track fields user has entered in form
    const [building, setBuilding] = useState('');
    const [subject, setSubject] = useState(courses[0]);
    const [message, setMessage] = useState('');

    // Track if the user should be redirect back to home page
    const [redirectHome, setRedirectHome] = useState(false);

    // Cause the user to sign in and then redirect them to main page
    const handleCheckIn = () => {
        // Build doc ref from doc.id
        props.firebase.db.collection("users").doc(user.username).update({checkedin: {
            active: true,
            location: building,
            subject,
            message
        }}).then(() => setRedirectHome(true));
    };

    if (redirectHome) {
        return <Redirect to='/'/>
    }

    if (!user) {
        return <></>
    }

    return <div className="Page CheckIn">
        <Header action="close" title="Check In"/>

        <div className="field">
            What building are you studying in?
            <input type="text" value={building} onChange={e => setBuilding(e.target.value)}></input>
        </div>

        <div className="field">
            What subject are you studying?
            <select value={subject} onChange={e => setSubject(e.target.value)}>
                {courses.map((course, i) => <option key={i}>{course}</option>)}
            </select>
        </div>

        <div className="field">
            Public message? (optional)
            <textarea value={message} onChange={e => setMessage(e.target.value)}></textarea>
        </div>

        <a className="btn btn-primary" onClick={handleCheckIn}>Check In</a>
    </div>;
}

const CheckIn = () => <FirebaseContext.Consumer>{firebase => <CheckInInner firebase={firebase}/>}</FirebaseContext.Consumer>;

export default CheckIn;
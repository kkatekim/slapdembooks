import React, { useState, useEffect } from 'react';
import './Home.scss';
import BackgroundContainer from '../../components/BackgroundContainer/BackgroundContainer';
import CheckedInStatus from '../../components/CheckedInStatus/CheckedInStatus';
import Header from '../../components/Header/Header.js';
import ContainerPanel from '../../components/ContainerPanel/ContainerPanel.js';
import TabbedContent from '../../components/TabbedContent/TabbedContent.js';
import StudyBox from '../../components/StudyBox/StudyBox.js';
import { FirebaseContext } from '../../components/Firebase';
import { Redirect } from 'react-router-dom';

const HomeInner = (props) => {
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

    // Track if page needs to be refreshed
    const [redirectHome, setRedirectHome] = useState(false);

    // Check the user out of their current studying event
    const handleCheckOut = () => {
        // Find current user and mark them as not active
        props.firebase.db.collection("users").doc(user.username).update({checkedin: {
            active: false,
            location: '',
            subject: '',
            message: ''
        }}).then(() => window.location.reload());
    }

    if (redirectHome) {
        return <Redirect to='/'/>;
    }

    if (!user) {
        return <></>
    }

    return (<div className="Page Home">
        <BackgroundContainer>
            <Header/>
            <CheckedInStatus user={user} handleCheckOut={handleCheckOut}/>
            <ContainerPanel>
                <TabbedContent tabs={['Friends', 'Courses']}
                               tabContents={[
                                   <div>
                                       <StudyBox contacts={[{name: 'Kate', course: 'NSCI200'}, {name: 'Sasha', course: 'PHIL210'}]} location="McLennan" noun={['friend is', 'friends are']}/>
                                       <StudyBox contacts={[{name: 'Grace', course: 'MATH223'}]} location="Burnside" noun={['friend is', 'friends are']}/>
                                   </div>,
                                   <div>
                                       Find other people studying the same course as you

                                       <StudyBox contacts={[{name: 'Kate', course: 'NSCI200'}, {name: 'Sasha', course: 'PHIL210'}]} location="McLennan" noun={['person is', 'people are']}/>
                                   </div>
                               ]}/>
            </ContainerPanel>
        </BackgroundContainer>
    </div>);
};

const Home = (props) => (
    <FirebaseContext.Consumer>
        { firebase => <HomeInner firebase={firebase}/> }
    </FirebaseContext.Consumer>
);

export default Home;
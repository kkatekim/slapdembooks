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
    const [redirectToLogin, setRedirectToLogin] = useState(false);
    const [user, setUser] = useState(null);
    const [friendsByLocation, setFriendsByLocation] = useState({});
    useEffect(() => {
        // Track if user is logged in or not
        props.firebase.auth.onAuthStateChanged((_user) => {
			if (_user !== null) {
                props.firebase.db.collection('users').where('uid', '==', _user.uid).get().then((querySnapshot) => {
                    let userData = querySnapshot.docs[0].data();
                    setUser({username: querySnapshot.docs[0].id, ...userData});
                    let friendsNames = userData.friends;
                    
                    props.firebase.db.collection('users').get().then((querySnapshot) => {
                        let friendsList = [];
                        querySnapshot.forEach((doc) => {
                            if (friendsNames.indexOf(doc.id) !== -1) {
                                friendsList.push({
                                    username: doc.id,
                                    ...doc.data()
                                    // ...doc.data() same as saying:
                                    //photoURL: doc.data().photoURL,
                                    //displayName: doc.data().displayName
                                })
                            }
                        });
                        friendsList = friendsList.filter(friend => friend.checkedin.active);
                        let friendsByLocationTemp = {}
                        friendsList.forEach(friend => {
                            if (friendsByLocationTemp[friend.checkedin.location] === undefined) {
                                friendsByLocationTemp[friend.checkedin.location] = [friend];
                            } else {
                                friendsByLocationTemp[friend.checkedin.location].push(friend);
                            }
                        });
                        setFriendsByLocation(friendsByLocationTemp);
                    });
                }).catch(e => alert("Error " + e))
			} else {
                setUser(_user);
                setRedirectToLogin(true);
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

    if (redirectToLogin) {
        return <Redirect to='/login'/>;
    }

    if (!user) {
        return <></>
    }

    return (<div className="Page Home">
        <BackgroundContainer>
            <Header/>
            <CheckedInStatus user={user} handleCheckOut={handleCheckOut}/>
            <ContainerPanel>
                <TabbedContent  tabs={['Friends', 'Courses']}
                                tabContents={[
                                   <div>
                                        {
                                            Object.keys(friendsByLocation).map(
                                               (location, i) =>
                                               <StudyBox key={i} location={location} contacts={friendsByLocation[location]} noun={['friend is', 'friends are']}/>
                                            )
                                        }
                                    </div>,
                                    <div>
                                        Find other people studying the same course as you

                                        {
                                            Object.keys(friendsByLocation).map(
                                                (location, i) =>
                                                <StudyBox key={i} location={location} contacts={friendsByLocation[location]} noun={['person is', 'friends are']}/>
                                            )
                                        }
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
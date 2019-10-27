import React from 'react';
import './StudyBox.scss';

/**
 * List a group of contact studying at a location
 * props.contacts  list of contacts at the location
 * props.location  name of the location
 */
const StudyBox = (props) => {
    let introMessage = props.contacts.length.toString() + ' ' + props.noun[props.contacts.length === 1 ? 0 : 1] + ' studying at ' + props.location;

    return (
        <div className="StudyBox">
            <div class="intro-label">{introMessage}</div>
            <div class="ContactList">
                {
                    props.contacts.map((contact, i) => (
                        <div class="Contact" key={i}>
                            <img class="pic" src={contact.photoURL}/>
                            {contact.displayName} is studying {contact.checkedin.subject}
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default StudyBox;
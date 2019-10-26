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
                            <img class="pic" src={'https://i.pravatar.cc/' + (38 + i).toString()}/>
                            {contact.name} is studying {contact.course}
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default StudyBox;
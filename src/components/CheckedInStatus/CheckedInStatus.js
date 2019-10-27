import React from 'react';
import './CheckedInStatus.scss';
import { Link } from 'react-router-dom';

/**
 * prop.user  the user that is logged in
 */
const CheckedInStatus = (props) => (
    <div class="CheckedInStatus">
        {
            props.user.checkedin.active ? <>
                You're checked in as studying {props.user.checkedin.subject} at {props.user.checkedin.location}
        
                <div class="ActionRow">
                    <a class="btn btn-primary" onClick={props.handleCheckOut}>Check Out</a>
                    <Link to="/checkin"><div class="btn btn-text">Edit Status</div></Link>
                </div>
            </> :
            <>
                Check in to let your friends know you are studying.
                
                <div class="ActionRow">
                    <Link to="/checkin"><div class="btn btn-primary">Check In</div></Link>
                </div>
            </>
        }
        
    </div>
);

export default CheckedInStatus;
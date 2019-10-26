import React from 'react';
import './CheckedInStatus.scss';

const CheckedInStatus = (props) => (
    <div class="CheckedInStatus">
    You're checked in as studying MATH 223 at Redpath Library
    
    <div class="ActionRow">
        <a class="btn btn-primary">Check Out</a>
        <a class="btn btn-text">Edit Status</a>
    </div>
</div>
);

export default CheckedInStatus;
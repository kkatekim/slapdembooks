import React from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';

const Header = (props) => (
    <div className="Header">
        <div className="left">
            <h1>{props.title || 'Slap dem Books'}</h1>
        </div>
        <div className="right">
            {
                props.action === 'close' ?
                <Link to="/"><i class="fas fa-times"></i></Link> :
                <Link to="/account"><i class="fas fa-ellipsis-v"></i></Link>
            }
        </div>
    </div>
);

export default Header;
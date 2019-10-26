import React from 'react';
import './CheckIn.scss';
import BackgroundContainer from '../../components/BackgroundContainer/BackgroundContainer';
import Header from '../../components/Header/Header.js';
import { Link } from 'react-router-dom';

const CheckIn = (props) => (
    <div className="Page CheckIn">
        <Header action="close"/>

        <div className="field">
            What building are you studying in?
            <input type="text"></input>
        </div>

        <div className="field">
            What subject are you studying?
            <select>
                <option>MATH223</option>
                <option>MATH240</option>
                <option>PHIL210</option>
                <option>COMP550</option>
                <option>COMP551</option>
            </select>
        </div>

        <div className="field">
            Additional info? (optional)
            <textarea></textarea>
        </div>

        <div class="seperator"></div>
    </div>
);

export default CheckIn;
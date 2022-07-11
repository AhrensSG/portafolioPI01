import React from "react";
import {Link} from 'react-router-dom';
import c from './styles/created.module.css'

export default function LandingPage(){
    return (
        <div>
            <h1>Welcome to VideoGame</h1>
            <Link to = '/home'>
                <button className={c.landing}>Ingresar</button>
                
            </Link>
        </div>
    );
}

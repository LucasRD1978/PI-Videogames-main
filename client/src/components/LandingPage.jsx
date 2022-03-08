import React from "react";
import {Link} from 'react-router-dom';
import style from './LandingPage.module.css';

export default function LandingPage () {
    return (
        <div className={style.container}>
            <h1>Wellcome to Video Game App</h1>
            <Link to = '/home'>
                <button className={style.button}>Get Into</button>
            </Link>
        </div>
    )
}
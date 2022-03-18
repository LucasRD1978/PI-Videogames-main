import React from 'react';
import {useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import {getDetail} from '../actions';
import {useDispatch, useSelector} from "react-redux";
import style from './Deatil.module.css'

export function Detail(){
    const dispacht = useDispatch();
    const {id} = useParams();

    useEffect(() => {
        dispacht(getDetail(id));
    }, []);

    const myVidegame = useSelector((state) => state.detail);
    console.log(myVidegame);

    return(
        <div className={style.container}>
            <div className={style.area}>
            {
                
                <div>
                    <div className={style.title}>
                    <h1>{myVidegame.name}</h1>
                    </div>
                    <img src={myVidegame.image} className={style.img} alt = "" width="450" height="550"/>
                    <h2>Genre: {myVidegame.createInDb? myVidegame.genres.name : myVidegame.genres}</h2>
                    <h3>Platforms: {myVidegame.platform}</h3>
                    <h3>Rating: {myVidegame.rating}</h3>
                    <h3>Released Date: {myVidegame.release_date}</h3>
                    <h4>Description: {myVidegame.description}</h4>
                </div> 
                
            }
            
            <Link to = '/home'>
                <button className={style.button}>Back to Home</button>
            </Link>
            </div>
            
        </div>
    )

}

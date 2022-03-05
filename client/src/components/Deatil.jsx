import React from 'react';
import {useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import {getDetail} from '../actions';
import {useDispatch, useSelector} from "react-redux";

export function Detail(){
    const dispacht = useDispatch();
    const {id} = useParams();

    useEffect(() => {
        dispacht(getDetail(id));
    }, [dispacht.id]);

    const myVidegame = useSelector((state) => state.detail);
    console.log(myVidegame);

    return(
        <div>
            {
                
                <div>
                    <h1>{myVidegame.name}</h1>
                    <img src={myVidegame.image} alt = "" width="450" height="550"/>
                    <h2>Genre: {myVidegame.createInDb? myVidegame.genre.name : myVidegame.genre}</h2>
                    <h3>Platforms: {myVidegame.platform}</h3>
                    <h3>Rating: {myVidegame.rating}</h3>
                    <h3>Released Date: {myVidegame.release_date}</h3>
                </div> 
                
            }
            <Link to = '/home'>
                <button>Back to Home</button>
            </Link>
        </div>
    )

}

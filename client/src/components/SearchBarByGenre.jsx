import React from "react";
import { useState } from "react";
import {useDispatch} from "react-redux";
import {getVideogamesByGenre} from "../actions";
import style from './SearchBar.module.css';

export function SearchByGenre(){
    const dispacht = useDispatch();
    const [genre, setGenre] = useState("");

    function handleInputGenre (e){
        e.preventDefault();
        setGenre(e.target.value);
    };

    function handleSubmit(e){
        e.preventDefault();
        dispacht(getVideogamesByGenre(genre));
        setGenre(" ");
    };

    return (
        <div className={style.container}>
            <input className={style.input} type = "text" placeholder="Search By Genre" onChange={e => handleInputGenre (e)}/>
            <button className={style.button} type="submit" onClick={e => handleSubmit(e) }>Search</button>
        </div>
    )
}
import React from "react";
import { useState } from "react";
import {useDispatch} from "react-redux";
import {getVideogamesByName} from '../actions';
import style from './SearchBar.module.css';

export function SearchBar () {
    const dispacht = useDispatch();
    const [name, setName] = useState("");

    function handleInputName (e){
        e.preventDefault();
        setName(e.target.value);
    };

    function handleSubmit (e){
        e.preventDefault();
        dispacht(getVideogamesByName(name));
        setName("");
    };

    return (
        <div className={style.container}>
            <input className={style.input} type = "text" placeholder="Search By Name" onChange={e => handleInputName(e)} />
            <button className={style.button} type="submit"  onClick={e => handleSubmit(e)}>Search</button>
        </div>
    )
}
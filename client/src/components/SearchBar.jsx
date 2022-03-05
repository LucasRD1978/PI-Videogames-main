import React from "react";
import { useState } from "react";
import {useDispatch} from "react-redux";
import {getVideogamesByName} from '../actions';

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
        <div>
            <input type = "text" placeholder="Search By Name" onChange={e => handleInputName(e)} />
            <button type="submit"  onClick={e => handleSubmit(e)}>Search</button>
        </div>
    )
}
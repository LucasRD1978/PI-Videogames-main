import React from "react";
import { useState } from "react";
import {useDispatch} from "react-redux";
import {getVideogamesByGenre} from "../actions";

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
        <div>
            <input type = "text" placeholder="Search By Genre" onChange={e => handleInputGenre (e)}/>
            <button type="submit" onClick={e => handleSubmit(e) }>Search</button>
        </div>
    )
}
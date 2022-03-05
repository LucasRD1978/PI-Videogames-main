import React from "react";

export default function Card ( {image, name, genre}) {
    return (
        <div>
            <img src = {image} alt = "img not found" width="280px" height="250px"/>
            <h2>{name}</h2>
            <h3>Genre: {genre}</h3>
        </div>
    );

} 
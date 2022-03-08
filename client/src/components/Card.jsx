import React from "react";
import style from './Card.module.css'

export default function Card ( {image, name, genre}) {
    return (
        <div className={style.container}>
            <div className={style.card}>
            <img classname={style.img} src = {image} alt = "img not found" width="250px" height="200px"/>
            <h3>{name}</h3>
            <p>Genre: {genre}</p>
            </div>
        </div>
    );
} 
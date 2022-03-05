import React from "react";
import './Paginated.css';

export function Paginated ({videogamesPerPage, allVidegames, paginated}){
    const pageNumber = [];

    for(let i = 1; i <= Math.ceil(allVidegames / videogamesPerPage); i++){
        pageNumber.push(i)
    };

    return (
        <nav>
            <ul classname = "paginated">
                {pageNumber && pageNumber.map(n => (
                    <li className="number" key = {n}>
                        <button onClick={()=> paginated(n)}>{n}</button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
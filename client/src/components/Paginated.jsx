import React from "react";
import style from './Paginated.module.css';

export function Paginated ({videogamesPerPage, allVidegames, paginated, currentPage}){
    const pageNumber = [];

    for(let i = 1; i <= Math.ceil(allVidegames / videogamesPerPage); i++){
        pageNumber.push(i)
    };

    return (
        <nav>
            <ul classname = {style.pagination}>
                {pageNumber && pageNumber.map(n => (
                    <li className={style.pag} key = {n}>
                        <a onClick={()=> paginated(n)}>{n}</a>
                    </li>
                ))}                              
            </ul>
            <span>{`Actual Page ${currentPage}`}</span> 
        </nav>
        
    )
}
import React from "react";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getVideogames, getCreated, orderBy} from '../actions';
import {Link} from 'react-router-dom';
import Card from "./Card";
import { Paginated } from "./Paginated";
import {SearchBar} from "./SearchBar";
import { SearchByGenre } from "./SearchBarByGenre";
import style from './Home.module.css';

export default function Home (){
    const dispacht = useDispatch();
    const allVidegames = useSelector((state) => state.videogames);
    const [order, setOrder] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [videogamesPerPage, setVideogamesPerPage] = useState(15);
    const indexOfLastVideogame = currentPage * videogamesPerPage;
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
    const currentVideogames = allVidegames.slice(indexOfFirstVideogame, indexOfLastVideogame);

    const paginated = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect (() => {
        dispacht(getVideogames())
    },[]);

    function handleClick(e){
        e.prevent.default();
        dispacht(getVideogames())
    };

    function handleFilterCreated (e) {
        dispacht(getCreated(e.target.value))
    };

    function handleOrder (e){
        e.preventDefault();
        dispacht(orderBy(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordenado ${e.target.value}`)
    };




    return (
        <div classname={style.st1}>
            <div>
            <div className={style.st2}>
            <Link to ='/videogame'>
            <button className={style.but}>Create Video Game</button>    
            </Link>
            <button onClick={e => {handleClick(e)}} className={style.but}>Reload Video Games</button>
            </div>
            <div className={style.st5}>
            <SearchBar/>
            </div>
            <div className={style.st5}>
            <SearchByGenre/>
            </div>
            </div>
            <div>
                <select onChange={e => handleFilterCreated(e)} classname = {style.filter}>
                    <option value="All">All</option>
                    <option value="Created">Created</option>
                    <option value="Existing">Existing</option>
                </select>
                <select onChange={e => handleOrder(e)} classname = {style.filter}>
                    <option value="asc-alp">Ascending Alphabetic</option>
                    <option value="desc-alp">Descending Alphabetic</option>
                    <option value="asc-rat">Ascending Rating</option>
                    <option value="dec-rat">Descending Rating</option>
                </select>
                <Paginated className = {style.st3}
                videogamesPerPage = {videogamesPerPage}
                allVidegames = {allVidegames.length}
                currentPage = {currentPage}
                paginated = {paginated}
                />
                <div className={style.st4}>
                {
                     currentVideogames && currentVideogames.map (e => {
                        return (
                            <Link to = {`/home/${e.id}`}>
                            <Card name = {e.name} image = {e.image} genre = {e.genres}/>
                            </Link>
                        )
                     }
                  )
                }
                </div>
            </div>
        </div>
    )
}
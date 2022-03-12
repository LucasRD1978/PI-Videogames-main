import React, {useState, useEffect} from "react";
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {postVideogame, getGenres, getPlatforms} from '../actions/index';
import style from './CreateVg.module.css';

function validate (input){
    let errors = {};
    if(!input.name){
        errors.name = "A name is required"
    };
    
    if(!input.rating || input.rating<0 || input.rating >5){
        errors.rating = "A rating is required and must be a nummber between 0-5"
    };
    
    if(input.genre.length === 0 ){
        errors.genre = "A genre is required"
    };

    if(input.platform.length === 0){
        errors.platform = "A platform is required"
    };

    return errors
};

export function CreateVg(){
    const dispacht = useDispatch();
    const navigate = useNavigate();
    const genres = useSelector((state) => state.genres);
    const platforms = useSelector((state) => state.platforms);
    const [errors, setErrors] = useState({});
    const [input, setinput] = useState({
        name: "",
        description: "",
        release_date: "",
        rating: "",
        image: "",
        platform: [],
        genre: []
    });

    function handleChange(e){
        setinput({
            ...input,
            [e.target.name] : e.target.value
           });
        setErrors(validate({
            ...input,
            [e.target.value]: e.target.value
        }));
        
    };

    function handleSelect(e){
        setinput({
            ...input,
            genre: [...input.genre, e.target.value]
        })
    };

    function handleSelect2(e){
        setinput({
            ...input,
            platform:[...input.platform, e.target.value]
        })
    };

    function handleSubmit(e){
        e.preventDefault();
        dispacht(postVideogame(input));
        alert("Videogame successfully created");
        setinput({
            image: "",
            name: "",
            description: "",
            release_date: "",
            rating: "",
            platform: [],
            genre: []
        });
        navigate('/home')
    }

    useEffect(() => {
        dispacht(getGenres())
    }, [dispacht]);

    useEffect(() =>{
        dispacht(getPlatforms())
    }, [dispacht]);

    return (
        <div className={style.container}>
            <Link to ="/home"><button className={style.button2}>Back to Home</button></Link>
            <h1>Create Videogame</h1>
            <form className={style.area} onSubmit={(e) => handleSubmit(e)}>
                <div className={style.detailsarea}>
                <div>
                <div>
                    <label>Name: </label>
                    <input  type="text" value= {input.name}  name = "name" onChange={(e) => handleChange(e)} />
                     {errors.name && (<p className="error">{errors.name}</p>)}
                </div>
                <div>
                    <label>Description: </label>
                    <input type="text" value= {input.description} name = "description"  onChange={(e) => handleChange(e)}/>
                </div>
                <div>
                    <label>Release Date: </label>
                    <input type="text" value= {input.release_date} name = "release_date" placeholder="DD-MM-YYYY" onChange={(e) => handleChange(e)}/>
                </div>
                <div>
                    <label>Rating: </label>
                    <input type="text" value= {input.rating} name = "rating"  onChange={(e) => handleChange(e)}/>
                    {errors.rating && (<p className="error">{errors.rating}</p>)}
                </div>
                <div>
                    <label>Image: </label>
                    <input type= "text" value= {input.image} name = "image"  onChange={(e) => handleChange(e)}/>
                </div>
                <div>
                    <label>Platforms: </label>
                    <select onChange = {(e) => handleSelect2(e)}>
                        {platforms.map((e) => (
                            <option value={e.name}>{e.name}</option>
                        ))}
                    </select>
                    <ul>
                        <li>
                            {input.platform.map(e => e + ',')}
                        </li>
                    </ul>
                    {errors.platform && (<p className="error">{errors.platform}</p>)}
                </div>
                <div>
                    <label>Genres: </label>
                    <select onChange = {(e) => handleSelect(e)}>
                        {genres.map((e) => (
                            <option value={e.name}>{e.name}</option>
                        ))}
                    </select>
                   <ul>
                       <li>
                           {input.genre.map(e => e + ',')}
                       </li>
                   </ul>                
                    {errors.genre && (<p className="error">{errors.genre}</p>)}
                </div>
                </div>
                <button className={style.button} type="submit">Create Videgame</button>
                </div>
            </form>
        </div>
    )
}
import React, {useState, useEffect} from "react";
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {postVideogame, getGenres, getPlatforms} from '../actions/index';

export function CreateVg(){
    const dispacht = useDispatch();
    const navigate = useNavigate();
    const genres = useSelector((state) => state.genres);
    const platforms = useSelector((state) => state.platforms);
    const [errors, setErrors] = useState({});

    function validate (formInput){
        let errors = {};
        if(!formInput.name){
            errors.name = "A name is required"
        };
        if(!formInput.description){
            errors.description = "A description is required"
        };
        if(!formInput.release_date){
            errors.release_date = "A release date is required"
        };
        if(!formInput.rating){
            errors.rating = "A rating is required"
        };
        if(!formInput.image){
            errors.image = "A image is required"
        };
        if(!formInput.genre){
            errors.genre = "A genre is required"
        };
    };

    const [formInput, setformInput] = useState({
        name: "",
        description: "",
        release_date: "",
        rating: "",
        image: "",
        platform: [],
        genre: []
    });

    function handleChange(e){
        setformInput({
            ...formInput,
            [e.target.name] : e.target.value
           });
        setErrors(validate({
            ...formInput,
            [e.target.value]: e.target.value
        }));
        console.log(formInput)
    };

    function handleSelect(e){
        setformInput({
            ...formInput,
            genre: [...formInput.genre, e.target.value]
        })
    };

    function handleSelect2(e){
        setformInput({
            ...formInput,
            platform:[...formInput.platform, e.target.value]
        })
    };

    function handleSubmit(e){
        e.preventDefault();
        dispacht(postVideogame(formInput));
        alert("Videogame successfully created");
        setformInput({
            name: "",
            description: "",
            release_date: "",
            rating: "",
            image: "",
            platform: [],
            genre: []
        });
        navigate.push('/home')
    }

    useEffect(() => {
        dispacht(getGenres())
    }, []);

    useEffect(() =>{
        dispacht(getPlatforms())
    }, []);

    return (
        <div>
            <Link to ="/home"><button>Back to Home</button></Link>
            <h1>Create Videogame</h1>
            <form onChange={(e) => handleSubmit(e)}>
                <div>
                    <label>Name: </label>
                    <input type="text" value= {formInput.name} name = "name"  onChange={(e) => handleChange(e)}/>
                    {errors.name && (<p className="error">{errors.name}</p>)}
                </div>
                <div>
                    <label>Description: </label>
                    <input type="text" value= {formInput.description} name = "description"  onChange={(e) => handleChange(e)}/>
                    {errors.description && (<p className="error">{errors.description}</p>)}
                </div>
                <div>
                    <label>Release Date: </label>
                    <input type="text" value= {formInput.release_date} name = "release date"  onChange={(e) => handleChange(e)}/>
                    {errors.release_date && (<p className="error">{errors.release_date}</p>)}
                </div>
                <div>
                    <label>Rating: </label>
                    <input type="text" value= {formInput.rating} name = "rating"  onChange={(e) => handleChange(e)}/>
                    {errors.rating && (<p className="error">{errors.rating}</p>)}
                </div>
                <div>
                    <label>Image: </label>
                    <input type= "text" value= {formInput.image} name = "image"  onChange={(e) => handleChange(e)}/>
                    {errors.image && (<p className="error">{errors.image}</p>)}
                </div>
                <div>
                    <label>Platforms: </label>
                    <select onChange = {(e) => handleSelect2(e)}>
                        {platforms.map((e) => (
                            <option value={e.name}>{e.name}</option>
                        ))}
                    </select>
                    {errors.platform && (<p className="error">{errors.platform}</p>)}
                    <ul>
                        <li>
                            {formInput.platform.map(e => e + ',')}
                        </li>
                    </ul>
                </div>
                <div>
                    <labe>Genres: </labe>
                    <select onChange = {(e) => handleSelect(e)}>
                        {genres.map((e) => (
                            <option value={e.name}>{e.name}</option>
                        ))}
                    </select>
                    {errors.genre && (<p className="error">{errors.genre}</p>)}
                   <ul>
                       <li>
                           {formInput.genre.map(e => e + ',')}
                       </li>
                   </ul>
                </div>
                <button type="submit">Create Videgame</button>
            </form>
        </div>
    )
}
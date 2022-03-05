import axios from 'axios';
import {GET_VIDEOGAMES, FILTER_BY_CREATE, ORDER_BY, FILTER_BY_NAME, FILTER_BY_GENRE, GET_DETAIL} from './constants';

export function getVideogames (){
    return async function (dispacht){
        var json = await axios.get('http://localhost:3001/videogames',{});
        return dispacht({
            type: GET_VIDEOGAMES,
            payload: json.data
        })
    }
};

export function getCreated (payload){
    return {
        type: FILTER_BY_CREATE,
        payload
    }
};

export function orderBy (payload){
    return {
        type: ORDER_BY,
        payload
    }
};

export function getVideogamesByName (payload) {
    return async function (dispacht) {
        try {
            var json2 = await axios.get(`http://localhost:3001/videogames?name=${payload}`,{});
            return dispacht ({
                type: FILTER_BY_NAME,
                payload: json2.data
            })
        } catch (error) {
            console.log(error)
        }
    }
};

export function getVideogamesByGenre (payload){
    return async function(dispacht){
        try {
            var json3 = await axios.get(`http://localhost:3001/videogames`,{});
            var json4 = json3.data.filter(e => e.genres.toLowerCase().includes(payload.toLowerCase()));
            console.log(json4);
            return dispacht({
                type: FILTER_BY_GENRE,
                payload:json4
            })
        } catch (error) {
            console.log(error)
        }
    }
};

export function getDetail (id){
    return async function(dispacht){
        try {
            var json5 = await axios.get(`http://localhost:3001/videogames/${id}`,{});
            return dispacht({
                type: GET_DETAIL,
                payload: json5.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

import {GET_VIDEOGAMES, FILTER_BY_CREATE, ORDER_BY, FILTER_BY_NAME, FILTER_BY_GENRE, GET_DETAIL} from '../actions/constants';
import { orderByNameAsc, orderByNameDesc, orderByRatingAsc, orderByRatingDesc } from "./OrderBy";

const initialSate = {
    videogames : [],
    allVideogames : [],
    genres: [],
    detail: []
}

function rootReducer(state = initialSate, action){
    switch(action.type){

    case GET_VIDEOGAMES:
        return {
        ...state,
        videogames: action.payload,
        allVideogames: action.payload
        };

    case FILTER_BY_CREATE:
        const allVideogames2 = state.allVideogames;
        const createFilter = action.payload === "Created" ? allVideogames2.filter(e => e.createInDb) : allVideogames2.filter(e => !e.createInDb);
        return {
            ...state,
            videogames: action.payload === 'All' ? state.allVideogames : createFilter
    };

    case ORDER_BY:
        let orderArr = action.payload;
        if(orderArr === 'asc-alp'){
            return orderByNameAsc(state.videogames)
        };
        if(orderArr === 'desc-alp'){
            return orderByNameDesc(state.videogames)
        };
        if(orderArr === 'asc-rat'){
            return orderByRatingAsc(state.videogames)
        };
        if(orderArr === 'dec-rat'){
            return orderByRatingDesc(state.videogames)
        };
        
    return{
        state,
    videogames: orderArr
    };

    case FILTER_BY_NAME:
        return {
            ...state,
            videogames: action.payload
        };

    case FILTER_BY_GENRE:
        return {
            ...state,
            videogames: action.payload
        };

    case GET_DETAIL:
        return {
            ...state,
            detail: action.payload
        }


    default:
            return state;
    }
};

export default rootReducer;
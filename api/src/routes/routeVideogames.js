const { Router } = require('express');
const router = Router();
const axios = require('axios');
const {Videogame, Genre} = require('../db');
const {API_KEY} = process.env;

//Ruta que trae todos los videos juegos o los busca por query
router.get('', async (req, res) => {
    const name = req.query.name;
    const genre = req.query.genre;
    //Buscar en la API
    try {
        if(name){
            let name2 = name.toLowerCase();
            const urlInfo = await axios.get(`https://api.rawg.io/api/games?search=${name2}&key=${API_KEY}&page_size=100`);
            var apiInfo = urlInfo.data.results; 
        } 
        else {
            const searchApi = async () =>{
                try {
                    const promise1 = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=1&page_size=50`);
                    const promise2 = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2&page_size=50`);
                    const promise3 = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3&page_size=50`);
                    await Promise.all([promise1, promise2, promise3])
                    .then(function(values){
                        apiInfo = values[0].data.results.concat(values[1].data.results).concat(values[2].data.results)
                    })
                } catch (error) {
                    console.log(error)
                }
            }
            await searchApi();
        }
        if(apiInfo.length > 0){
            var apiVgames = apiInfo.map(e =>{
                let v = [];
                for (i = 0; i < e.genres.length; i++){
                    v.push(e.genres[i].name)
                }
            return {
                id: e.id,
                name: e.name,
                image: e.background_image,
                genres: v.toString(),
                rating: e.rating,
                origin: 'API'
            }
            })
            if(name){
                apiVgames = apiVgames.filter(e => e.name.toLowerCase().includes(name.toLocaleLowerCase()))
            }
        } else var apiVgames = []

        //Buscar en la BD
        var dbVgames = [];
        dbVgames = await Videogame.findAll({
            include:{
                model: Genre,
                attributes: ['name'],
                through: {attributes: []}
            }
        })
        if(name){
            dbVgames = dbVgames.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
        }
        var dbVgames = dbVgames.map(e => {
            let v = [];
            for (i = 0; i < e.genres.length; i++){
                v.push(e.genres[i].name)
            }
            return {
                id: e.id,
                name: e.name,
                image: e.image,
                genres: v.toString(),
                rating: e.rating,
                origin: 'DB'
            }
        })
        //Unir resultados
        const allVideogames = dbVgames.concat(apiVgames);
        res.json(allVideogames.length ? allVideogames : 'Not found games'); 
    } catch (error) {
        console.log(error)
    }
})

//Ruta que busca por id
router.get('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        if(!isNaN(id)){
            //Buscar en la api
            var idKey = parseInt(id);
            var infoUrl = await axios.get(`https://api.rawg.io/api/games/${idKey}?key=${API_KEY}`);
            if(infoUrl.data.id) {
                let genreStr = [];
                for (i = 0; i < infoUrl.data.genres.length; i++){
                    genreStr.push(infoUrl.data.genres[i].name)
                };
                let platformStr = [];
                for(i = 0; i < infoUrl.data.platforms.length; i++){
                    platformStr.push(infoUrl.data.platforms[i].platform.name)
                }
                const apiVgames = {
                    name: infoUrl.data.name,
                    platform: platformStr.toString(),
                    release_date: infoUrl.data.released,
                    image: infoUrl.data.background_image,
                    description: infoUrl.data.description.replace(/<[^>]+>/g, ''),
                    rating: infoUrl.data.rating,
                    genres: genreStr.toString(),
                    }
                return res.status(200).json(apiVgames)
            }
        }
        //Buscar en la BD
        var dbVigames = await Videogame.findByPk(id, {
            include: [{
                model: Genre,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }]
        });

        if(dbVigames){
            let genreStr = [];
            for(i = 0; i < dbVigames.genres.length; i++){
                genreStr.push(dbVigames.genres[i].name)
            }
            const dbGame = {
                name: dbVigames.name,
                platforms: dbVigames.plataform,
                release_date: dbVigames.release_date,
                image: dbVigames.image,
                description: dbVigames.description,
                rating: dbVigames.rating,
                genres: genreStr.toString(),
                
                }
            return res.status(200).json(dbVigames)
        }
        return res.status(404).send('Videgame not found')

    } catch (error) {
        console.log(error)
    }
});




module.exports = router;
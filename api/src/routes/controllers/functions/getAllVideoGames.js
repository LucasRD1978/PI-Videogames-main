const axios = require ('axios');
const {Videogame, Genre} = require('../../../db.js');
const {API_KEY} = process.env;


const getApiInfo = async () => {
    try {
        const apiUrl = await axios.get(`https://api.rawg.io/api/games?page=1&key=ce951e4a85544044bff31a97fc7d863d&page_size=10`);
        const apiUrl2 = await apiUrl.data.results;
        const apiInfo = await apiUrl2.map(e => {
            return {
                Id: e.id,
                image: e.background_image,
                name: e.name,
                genre: e.genres.map(e => e.name),
                release_date: e.released,
                platform: e.platforms.map(e => e.platform.name),
            }
        });        
        return apiInfo;
        } catch (error) {
        console.log(error)
    }
};

const getDbInfo = async () => {
    try {
        const dbInfo = await Videogame.findAll(
            {
                include:{
                    model: Genre,
                    atributtes: ['name'],
                    through: {
                        atributtes:[]
                    },
                },
            }
        )
        return dbInfo;
        
    } catch (error) {
        console.log(error)
    }
};

const getAllVideogames = async () => {
    try{
        const apiInfo = await getApiInfo();
        const dbInfo = await getDbInfo();
        const totalInfo = apiInfo.concat(dbInfo);
        return totalInfo;
    }
    catch(error){
        console.log(error)
    }
};

module.exports = getAllVideogames()

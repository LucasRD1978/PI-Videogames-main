const axios = require ('axios');
const {Videogame, Genre} = require('../../../db.js');
const {API_KEY} = process.env;

const getSearchApi = async (name) => {
    try {
        const apiUrl = await axios.get(` https://api.rawg.io/api/games?search=${name}&${API_KEY}`);
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
        })
        return apiInfo;
        
    } catch (error) {
        console.log(error)
    }
};

const getSearchDb = async (name) => {
    try {
        const dbInfo = await Videogame.findAll(
            {
                where:{
                    atributtes: ['name'],
                    include:{
                        name
                    }
                },
                include:{
                    model: Genre,
                    atributtes: ['name'],
                    through: {
                        atributtes:[]
                    },
                }

        }
        )
    } catch (error) {
        
    }
};

const getAllSearch = async (name) => {
    try {
        const apiInfo = getSearchApi(name);
        const dbInfo = getSearchDb(name);
        const totalInfo = apiInfo.concat(dbInfo);
        return totalInfo;
    } 
    catch (error) {
        
    }

}

module.exports = getAllSearch();
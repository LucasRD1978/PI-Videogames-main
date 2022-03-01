const getAllVideoGames = require('./functions/getAllVideoGames');
//const getSearchVideoGame = require('./functions/getSearchVideGame.js');

const contorllerRouteVideogames = async (req, res) => {
    const totalInfo = await getAllVideoGames;
    try {
       res.status(200).json(totalInfo)
    } catch (error) {
        console.log(error)
    }
};

module.exports = {contorllerRouteVideogames}
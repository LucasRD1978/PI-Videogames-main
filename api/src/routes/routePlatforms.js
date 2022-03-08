const { Router } = require('express');
const router = Router();
const axios = require('axios');
const {Platforms} = require('../db');
const {API_KEY} = process.env;

router.get('', async function(req, res){
    try {
        const apiPlatforms = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
        const apiPlatforms2 = await apiPlatforms.data.results.map(e => e.platforms.map(e=> e.platform.name));
        const apiPlatforms3 = apiPlatforms2.map(e => {
            for( i in e) return e[i]
        });
        apiPlatforms3.forEach(e => {
            Platforms.findOrCreate({
                where: {name: e}
            })
        });
        const dbPlatform = await Platforms.findAll();
        return res.status(200).json(dbPlatform)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router
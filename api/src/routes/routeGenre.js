const { Router } = require('express');
const router = Router();
const axios = require('axios');
const {Genre} = require('../db');
const {API_KEY} = process.env;


router.get('', async function (req, res) {
    try {
        const apiGenre = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
        apiGenre.data.results.forEach(e => {
            Genre.findOrCreate({
                where: {name: e.name}
            })
        });
        const dbGenre = await Genre.findAll();
        return res.status(200).json(dbGenre)
    } catch (error) {
        console.log(error)
    }
})



module.exports = router;
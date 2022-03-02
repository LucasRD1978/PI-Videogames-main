const { Router } = require('express');
const {Videogame, Genre} = require('../db')
const router = Router();

router.post('', async (req, res) => {
    try {
        let {
            image,
            name,
            description,
            release_date,
            rating,
            platform,
            createInDb,
            genre,
        } = req.body;
    
       platform = platform.toString();
    
        let videogameCreate = await Videogame.create({
            image,
            name,
            description,
            release_date,
            rating,
            platform,
            createInDb,
        })

        const dbGenre = await Genre.findAll({
            where:{name: genre}
        });

        videogameCreate.addGenre(dbGenre);

        res.send('Videogame created successfully')
        
    } catch (error) {
        console.log(error)
    }
})


module.exports = router
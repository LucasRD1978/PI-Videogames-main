const { Router } = require('express');
const {Videogame, Genre, Platforms} = require('../db')
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
            where : {name: genre}
        });

        videogameCreate.addGenre(dbGenre);

        // const dbPlatform = await Platforms.findAll({
        //     where:{name: platform}
        // });

        // videogameCreate.addPlatforms(dbPlatform);

        res.send('Videogame created successfully')
        
    } catch (error) {
        console.log(error)
    }
})


module.exports = router
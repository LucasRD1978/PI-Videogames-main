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
            genres,
        } = req.body;
    
        let strPlatfomr = platform.join(',');
    
        let videogameCreate = await Videogame.create({
            image,
            name,
            description,
            release_date,
            rating,
            platform: strPlatfomr,
            createInDb,
        })

        genres.forEach(async (e) => {
          try {
            let genreDb = await Genre.findOne({where: {name: e}})
            await videogameCreate.addGenre(genreDb)
          } catch (error) {
              console.log(error)
          }   
        })
        res.send('Videogame created successfully')
        
    } catch (error) {
        console.log(error)
    }
})


module.exports = router
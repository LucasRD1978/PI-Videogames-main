const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const routeVideoGames = require('./routeVideogames.js');
const routeGenre = require('./routeGenre.js');
const routePost = require('./routePost.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/videogames', routeVideoGames);

router.use('./genre', routeGenre);

router.use('./videogame', routePost);

module.exports = router;

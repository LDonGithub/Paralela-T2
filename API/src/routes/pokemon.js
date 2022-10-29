const {Router} = require('express');
const router = Router();
const fetch = require('node-fetch');

//ruta creada para verificar la API
router.get('/', (req, res) => {
    res.json({"Tittle":"Hello World"});
});

//ruta creada para paginar los datos de la API
router.get('/dex/', (req, res) =>{
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=905`)
    .then((res) => res.json())
    .then((data) => res.json(data.results))
    //.then((data) => console.log(data));
});

//ruta creada para buscar PKMN por ID
router.get('/id/:num', (req, res) =>{
    let num = req.params.num;
    fetch(`https://pokeapi.co/api/v2/pokemon/${num}/`)
    .then((res) => res.json())
    .then((data) => res.json(data))
})

module.exports = router;
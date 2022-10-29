const {Router} = require('express');
const router = Router();
const fetch = require('node-fetch');

router.get('/', (req, res) => {
    res.json({"Tittle":"Hello World"});
});

router.get('/dex/', (req, res) =>{
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=905`)
    .then((res) => res.json())
    .then((data) => res.json(data.results))
    //.then((data) => console.log(data));
});

router.get('/id/:num', (req, res) =>{
    let num = req.params.num;
    fetch(`https://pokeapi.co/api/v2/pokemon/${num}/`)
    .then((res) => res.json())
    .then((data) => res.json(data))
})

module.exports = router;
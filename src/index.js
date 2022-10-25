const express = require('express');
const app = express();
const morgan = require('morgan');
const fetch = require('node-fetch');

//prueba fetch
/*
let poke;
fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=10')
    .then(res => res.json())
    .then(data => poke = data);
*/
app.get('/pokemon/:id', (req, res) => {
    let Tag = req.params.id;
    fetch(`https://pokeapi.co/api/v2/pokemon/${Tag}`)
    .then(res => res.json())
    .then(data => poke = data);
    res.json(poke);
});

//settings
app.set('port', process.env.PORT || 8080);
app.set('json spaces', 2);

//middlewares
app.use(morgan('dev'));
app.use(express.json());

//routes
app.use(require('./routes/pokemon'));

//starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
});
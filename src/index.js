const express = require('express');
const app = express();
const morgan = require('morgan');

/*prueba fetch
const fetch = require('node-fetch');
let poke;
fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=10')
    .then(res => res.json())
    .then(data => poke = data);

app.get('/pokemon/', (req, res) => {
    res.json(poke);
});*/

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
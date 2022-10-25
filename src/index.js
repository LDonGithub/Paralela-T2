const express = require('express');
const app = express();
const morgan = require('morgan');
const fetch = require('node-fetch');


//constructor
function pokemon(id, nombre, altura, peso, tipo, formas, habilidades, ubicacion, imagen) {
    this.id = id;
    this.nombre = nombre;
    this.altura = altura;
    this.peso = peso;
    this.tipo = tipo;
    this.formas = formas;
    this.habilidades = habilidades;
    this.ubicacion = ubicacion;
    this.imagen = imagen;
}

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
   .then((response) => response.json())
   .then((data) =>{
    pokemonID = new pokemon(Tag,data.name,data.height,data.weight,data.types,data.forms,data.abilities,data.location_area_encounters,data.sprites.front_default);
    console.log(pokemonID);
    res.json(pokemonID);
   });  
});


//pendiete
app.get('/paginate/:ids', (req, res) => {
    let Tag = req.params.ids.split("-");
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=[${Tag[0]}]&limit=[${Tag[1]}]`)
    .then(res => res.json())
    .then(data => res.json(data));
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
const contenendor = document.querySelector("#resultados");

//constructor del objeto PKMN
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

//Funcion que recibe la ruta de busqueda de la API 
//Expone resultados en el HTML
function busqueda() {
  let id = (document.getElementById("tag").value) - 1;
  fetch(`http://localhost:8080/dex/`)
    .then((response) => response.json())
    .then((data) => {
      fetch(data[id].url)
        .then((res) => res.json())
        .then((info) => {
          CrearPokemon(info)
        })
    })
};

//Funcion que organiza y muestra los datos de PKMN en el HMTL
async function CrearPokemon(data) {

  pokemonID = new pokemon(data.id, data.name, data.height, data.weight, data.types, data.forms, data.abilities, data.location_area_encounters, data.sprites.front_default);
  //creacion elementos HMTL
  var card = document.createElement("div");
  card.setAttribute("class", "card mb-5 m-1");
  card.setAttribute("style", "max-width: 540px;");

  var ima = document.createElement("img");
  ima.setAttribute("class", "img-fluid rounded-start");
  ima.setAttribute("src", pokemonID.imagen);
  ima.setAttribute("alt", "Responsive image");

  var cardbody = document.createElement("div");
  cardbody.setAttribute("class", "card-body");

  var nombre = document.createElement("h5");
  nombre.setAttribute("class", "card-title text-capitalize");
  nombre.innerHTML = pokemonID.nombre;

  var caras = document.createElement("p");
  caras.setAttribute("class", "card-text text-capitalize");
  caras.innerHTML += `ID: ${pokemonID.id} <br>`;
  caras.innerHTML += `Altura: ${pokemonID.altura/10} m <br>`;
  caras.innerHTML += `Peso: ${pokemonID.peso/10} Kg <br>`;
  caras.innerHTML += `Tipo: `;

  if (pokemonID.tipo.length > 1) {
    caras.innerHTML += `${pokemonID.tipo[0].type.name} & ${pokemonID.tipo[1].type.name} <br>`;
  } else {
    caras.innerHTML += `${pokemonID.tipo[0].type.name} <br>`;
  }
  caras.innerHTML += `Habilidades: <br>`;
  pokemonID.habilidades.forEach(element => {
    console.log(element.ability.name)
    caras.innerHTML += `${element.ability.name} <br>`;
  });



  var div1 = document.createElement("div");
  div1.setAttribute("class", "row g-0");

  var div2 = document.createElement("div");
  div2.setAttribute("class", "col-md-4");

  var div3 = document.createElement("div");
  div3.setAttribute("class", "col-md-8");

  //Organiza los elementos y muestra en el HTML
  card.appendChild(div1);
  div1.appendChild(div2);
  div1.appendChild(div3);
  div2.appendChild(ima);
  div3.appendChild(cardbody);
  cardbody.appendChild(nombre);
  cardbody.appendChild(caras);
  contenendor.innerHTML = card.outerHTML;
}

//Variable para mostrar PKMN paginados
let pokemonsList = document.getElementById("pokemons-list");
let links = document.getElementById("links");

//Contador OFFSET de la paginacion
cont = 1;

//Funcion que recibe la API y controla la paginacion 
async function paginacion(url) {
  pokemonsList.innerHTML = "";
  if (url) {
    for (i = cont; i < cont + 10; i++) {
      await fetch(url + `${i}`)
        .then(info => info.json())
        .then(prom => {
          
          let tipo = "";
          let habilidades = "";
          prom.abilities.forEach(element => {
            habilidades += `${element.ability.name} <br>`;
          });

          if (prom.types.length > 1) {
            tipo = `${prom.types[0].type.name} & ${prom.types[1].type.name}`;
          } else {
            tipo = `${prom.types[0].type.name}`
          }

          //Funcion que crea HTML y organiza la paginacion
          pokemonsList.innerHTML += `
          <div class="card mb-3 col-6 " style="max-width: 540px;">
            <div class="row g-0 p-2">
              <div class="col-md-4">
                <img src="${prom.sprites.front_default}" class="img-fluid rounded-start" alt="">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title text-capitalize">${prom.name}</h5>
                  <p class="text-capitalize">ID: ${prom.id}<br> Altura: ${(prom.height)/10} m <br>Peso: ${(prom.weight)/10} Kg <br>Tipo: ${tipo}<br>Habilidades: <br> ${habilidades} </p>
                </div>
              </div>
            </div>
          </div>
          `;

        })
    }
    document.createElement
   
  }
}

paginacion(`http://localhost:8080/id/`);

//Funciones que controla los botones de la paginacion
function siguiente() {
  cont = cont + 10;
  paginacion(`http://localhost:8080/id/`);
  document.getElementById('anterior').removeAttribute('disabled', 'false');
}

function anterior() {
  if (cont > 10) {
    cont = cont - 10;
    paginacion(`http://localhost:8080/id/`);
  }
  if (cont == 1) {
    document.getElementById('anterior').setAttribute('disabled', 'true');
  }
}

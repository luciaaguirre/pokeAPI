const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");

let pokeapi_URL = "https://pokeapi.co/api/v2/pokemon/";

for (let i = 1; i <= 151; i++) {
    fetch(pokeapi_URL + i)
        .then((response) => response.json())
        .then(data => mostrarPokemon(data));
}

function mostrarPokemon(poke) {
    let tipos = poke.types.map((type) => 
        `<p class = "${type.type.name} tipo"> ${type.type.name}</p>`
    );
    tipos = tipos.join('');

    let pokeId = poke.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
        <p class="pokemon-id-back">#${pokeId}</p>
        <p class="pokemon-imagen"> <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.id}"></p>
        <div class="pokemon-info"></div>
        <div class="nombre-contenedor">
            <p class="pokemon-id">${pokeId}</p>
            <h2 class="pokemon nombre">${poke.name}</h2>
        </div>
        <div class="pokemon-tipos">
            ${tipos}
        </div>
    `;
    listaPokemon.append(div);
}

botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;
    listaPokemon.innerHTML = ""; // Limpiar la lista antes de mostrar nuevos Pokémon
    
    for (let i = 1; i <= 151; i++) {
        fetch(pokeapi_URL + i)
            .then((response) => response.json())
            .then(data => {
                const tipos = data.types.map(type => type.type.name);
                // Mostrar solo los Pokémon que tienen el tipo seleccionado
                if (tipos.some(tipo => tipo.includes(botonId))) {
                    mostrarPokemon(data);
                }
            });
    }
}));
const MAX_POKEMON = 151;
//variables storing references to various HTML elements in the document.
const listWrapper = document.querySelector(".list-wrapper");
const searchInput = document.querySelector("#search-input");
const numberFilter = document.querySelector("#number");
const nameFilter = document.querySelector("#name");
const notFoundMessage = document.querySelector("#not-found-message");

//Empty Array that stores all the pokemon when they are retrieved
let allPokemons = [];

//Promise Handling:.then() is used twice to handle the response asynchronously: The first converts the response to JSON. The second receives the JSON data and assigns the results property to the allPokemons array.

fetch(`https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON}`)
.then((response) => response.json())
.then((data) => {
    allPokemons = data.results;
    //retrieves 
    displayPokemons(allPokemons);
});

//async - run code and then delay until we retreive the data we want
async function fetchPokemonDataBeforeRedirect(id) {
    //destructoring - creating several consts in one go by putting them in arrays
    try {
        //Promise you will receive some data 
        const [pokemon, pokemonSpecies] = await Promise.all([fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) =>
            res.json()
        ), 
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then((res) =>
            res.json()
        ),    
    ])
    return true
    } catch (error) {
        console.error("Failed to fetch Pokemon data before redirect");
    }
}

function displayPokemons(pokemon) {
    listWrapper.innerHTML = " ";

    pokemon.forEach((pokemon) => {
        const pokemonId = pokemon.url.split("/")[6];
        const listItem = document.createElement("div");
        listItem.className = "list-item";
        listItem.innerHTML = `
    <div class="number-wrap">
        <p class="caption-fonts">${pokemonId}</p>
    </div>
    <div class="image-wrap">
        <img src="https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg" alt="${pokemon.name}" />
    </div>
    <div class="name-wrap">
        <p class="body3-fonts">${pokemon.name}</p>
    </div>
`;

listItem.addEventListener("click", async () => {
    const success = await fetchPokemonDataBeforeRedirect(pokemonId);
    if (success) {
        window.location.href = `./detail.html?id=${pokemonId}`
    }
});

listWrapper.appendChild(listItem);
    });
}

searchInput.addEventListener("keyup", handleSearch)

function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase(); // Access the value of the input field directly

    let filteredPokemons;

    if (numberFilter.checked) {
        filteredPokemons = allPokemons.filter((pokemon) => {
            const pokemonId = pokemon.url.split("/")[6];
            return pokemonId.startsWith(searchTerm);
        });
    } else if (nameFilter.checked) {
        filteredPokemons = allPokemons.filter((pokemon) => {
            return pokemon.name.toLowerCase().startsWith(searchTerm);
        });
    } else {
        filteredPokemons = allPokemons;
    }

    displayPokemons(filteredPokemons);

    if (filteredPokemons.length === 0) {
        notFoundMessage.style.display = "block";
    } else {
        notFoundMessage.style.display = "none";
    }
}

const MAX_POKEMON = 151;
//variables storing references to various HTML elements in the document.
const listWrapper = document.querySelector(".list-wrapper");
const searchInput = document.querySelector("#search.input");
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
});

console.log(allPokemons);
//@36:24

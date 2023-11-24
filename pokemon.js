// Variables storing references to various HTML elements in the document
const listWrapper = document.querySelector(".list-wrapper");
const searchInput = document.querySelector("#search-input"); // Selects the search input by its ID
const numberFilter = document.querySelector("#number");
const nameFilter = document.querySelector("#name");
const notFoundMessage = document.querySelector("#not-found-message");

// Empty Array that stores all the Pokemon when they are retrieved
let allPokemons = [];

// Fetching data from the Pokemon API
fetch(`https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON}`)
  .then((response) => response.json()) // Convert the response to JSON
  .then((data) => {
    allPokemons = data.results; // Store fetched Pokemon data
    displayPokemons(allPokemons); // Display the fetched Pokemon
  });

// Async function - fetches additional data for a specific Pokemon ID
async function fetchPokemonDataBeforeRedirect(id) {
  try {
    // Destructuring - fetch data for a specific Pokemon and its species
    const [pokemon, pokemonSpecies] = await Promise.all([
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => res.json()),
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then((res) => res.json()),
    ]);
    return true; // Data fetched successfully
  } catch (error) {
    console.error("Failed to fetch Pokemon data before redirect");
  }
}

// Function to display fetched Pokemon data
function displayPokemons(pokemons) {
  listWrapper.innerHTML = ""; // Clear previous content

  pokemons.forEach((pokemon) => {
    const pokemonId = pokemon.url.split("/")[6]; // Extract Pokemon ID from URL
    const listItem = document.createElement("div"); // Create a new list item element
    listItem.className = "list-item"; // Assign CSS class to the list item

    // Populate the list item with Pokemon information
    listItem.innerHTML = `
      <div class="number-wrap">
        <p class="caption-fonts">${pokemonId}</p>
      </div>
      <div class="image-wrap">
        <img src="https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg" alt="${pokemon.name}" />
      </div>
      <div class="name-wrap">
        <p class="body3-fonts">${pokemon.name}</p>
      </div>`;

    // Add a click event listener to each Pokemon list item
    listItem.addEventListener("click", async () => {
      const success = await fetchPokemonDataBeforeRedirect(pokemonId); // Fetch additional data
      if (success) {
        window.location.href = `./detail.html?id=${pokemonId}`; // Redirect to Pokemon detail page
      }
    });

    listWrapper.appendChild(listItem); // Append the list item to the list wrapper
  });
}



//@48:02 I need to fix some things 
const pokemonList = document.getElementById("pokemon-list");
const searchInput = document.getElementById("search");

async function fetchAllPokemon() {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100");
        if (!response.ok) {
            throw new Error("Failed to fetch Pokémon data");
        }

        const data = await response.json();
        const pokemonDetails = await Promise.all(
            data.results.map(async (pokemon) => {
                const res = await fetch(pokemon.url);
                return res.json();
            })
        );

        displayPokemon(pokemonDetails);
    } catch (error) {
        console.error(error);
    }
}

function displayPokemon(pokemonArray) {
    pokemonList.innerHTML = "";
    pokemonArray.forEach((pokemon) => {
        const pokemonCard = document.createElement("div");
        pokemonCard.classList.add("pokemon-card");

        pokemonCard.innerHTML = `
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <h2>${pokemon.name}</h2>
            <p>Type: ${pokemon.types.map((type) => type.type.name).join(", ")}</p>
        `;

        pokemonList.appendChild(pokemonCard);
    });
}

function searchPokemon() {
    const searchValue = searchInput.value.toLowerCase();
    const pokemonCards = document.querySelectorAll(".pokemon-card");

    pokemonCards.forEach((card) => {
        const pokemonName = card.querySelector("h2").innerText.toLowerCase();
        if (pokemonName.includes(searchValue)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

searchInput.addEventListener("input", searchPokemon);

fetchAllPokemon();

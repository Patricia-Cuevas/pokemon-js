//Ejercicio de DOM-API-FETCH con una pokedex

const BASE_URL = 'https://pokeapi.co/api/v2/';

const fetchPokemon = async (pokemon) => {
  try {
      const response = await fetch(`${BASE_URL}pokemon/${pokemon}`);
      const parsedResponse = await response.json();
      return parsedResponse;
  } catch (err) { renderNotFound() }
}

document.getElementById('tupokemon-btn')
  .addEventListener('click', async () => {
      const text = document.getElementById('poke-name').value.toLowerCase();
      try {
          const pokemon = await fetchPokemon(text);
          localStorage.setItem('PokeId', pokemon.id);
          console.log(pokemon.name);
          createCard(pokemon);
      } catch (error) {
          console.error(error);
      }
  });

document.addEventListener('DOMContentLoaded', async () => {
  const storedId = localStorage.getItem('PokeId');
  const initialId = storedId ? parseInt(storedId) : 1;
  try {
      const pokemon = await fetchPokemon(initialId);
      console.log(pokemon.name);
      createCard(pokemon);
  } catch (error) {
      console.error(error);
  }
});

document.getElementById('anterior-btn')
  .addEventListener('click', async () => {
      try {
          let newId = parseInt(localStorage.getItem('PokeId')) - 1;
          newId = Math.max(1, newId); 
          localStorage.setItem('PokeId', newId);
          const pokemon = await fetchPokemon(newId);
          console.log(pokemon.name);
          createCard(pokemon);
      } catch (error) {
          console.error(error);
      }
  });

document.getElementById('siguiente-btn')
  .addEventListener('click', async () => {
      try {
          let newId = parseInt(localStorage.getItem('PokeId')) + 1;
          localStorage.setItem('PokeId', newId);
          const pokemon = await fetchPokemon(newId);
          console.log(pokemon.name);
          createCard(pokemon);
      } catch (error) {
          console.error(error);
      }
  });

  function mostrarPokemon(poke) {
    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
      <p class="pokemon-id-back">#${poke.id}</p>
      <div class="pokemon-imagen">
        <img src="${poke.sprites.other["official-artwork"].front_default}">
      </div>
      <div class="pokemon info">
        <div class="nombre-contenedor">
          <p class="pokemon-id">${poke.id}</p>
          <h2 class="pokemon-nombre">${poke.name}</h2>
        </div>
        <div class="pokemon-stats">
         <p class="stat">${poke.height}</p>
          <p class="stat">${poke.weight} grms</p>
        </div>
   `
   listaPokemon.append(div)
  }

const createCard = (pokemon) => {
  const cardContainer = document.getElementById('card-container');
  const card = document.createElement('div');
  const id = document.createElement('p');
  const imagen = document.createElement('img');
  const nombre = document.createElement('p');
  const altura = document.createElement('p');
  const peso = document.createElement('p');
  
  imagen.src = pokemon.sprites.other["official-artwork"].front_default;
  id.textContent = `El ID de tu pokemon es: ${pokemon.id}`;
  nombre.textContent = `Tu pokemon se llama: ${pokemon.name}`;
  peso.textContent = `Tu pokemon pesa: ${pokemon.weight} grms`;
  altura.textContent = `La altura de tu pokemon es: ${pokemon.height} cm`;
  
  
  


  card.classList.add('pokemon-card');
  id.classList.add('pokemon-id');
  imagen.classList.add('pokemon-imagen');
  nombre.classList.add('pokemon-nombre');
  peso.classList.add('pokemon-peso');
  altura.classList.add('pokemon-altura');

  card.appendChild(imagen);
  card.appendChild(id);
  card.appendChild(nombre);
  card.appendChild(peso);
  card.appendChild(altura);
  
  

  cardContainer.innerHTML = ''; 
  cardContainer.appendChild(card);
}

const renderNotFound = () => {
  pokeName.textContent = 'No encontrado';
}


import {API_CONFIGURATION} from "../utils/constants";

//fetching Initial Data list of Pokemons for Home Screen
export async function fetchIitialData({signal, offset=0, page_size=20}) {
  const response = await fetch(`${API_CONFIGURATION.initial_list}?offset=${offset}&limit=${page_size}`, {signal: signal});

  if(!response.ok) {
    return {isError: true, message: "Something went wrong while fetching pokemon List!"}
  } else {
    const res = await response.json()
    return res
  }
}

//Fetching pokemon result based on search query on home screen
export async function fetchSearchQueryResult({signal, searchBy}) {
  if(searchBy && searchBy.length > 0){
  const response = await fetch(`${API_CONFIGURATION.initial_list}${searchBy}`, {signal: signal});

  if(!response.ok) {
    return {isError: true, message: `Something went wrong while fetching Search result for query value ${searchBy} List!`}
  } else {
    const res = await response.json()
    return res
  }
  }
}

//fetching detailed information for selected pokemon
export async function fetchPokemonDetail(url, id) {
  const response = await fetch(url);

  if(!response.ok) {
    return {isError: true, message: "Something went wrong while fetching pokemon Detail!"}
  } else {
    const res = await response.json();
    let image = await res.sprites.other.dream_world.front_default;
    if(image === null) {
      image = await res.sprites.other["official-artwork"].front_default;
    }
     return await {id: id, url: image, type: res.types.map(type => type.type.name), stats: res.stats.map(obj => {return {[obj.stat.name]: obj.base_stat}})};
  }
}

// fetching MaleList femaleList and genderless pokemon list
export async function fetchGenderbasedPokemonList({signal, type}) {
  let url = API_CONFIGURATION.genderless_api;
  if(type === "male") {
    url = API_CONFIGURATION.male_api;
  } else if(type === "female") {
    url = API_CONFIGURATION.female_api;
  }
  const response = await fetch(url);
  if(!response.ok) {
    return {isError: true, message: "Something went wrong while fetching gender based pokemon List!"}
  } else {
    const res = await response.json()
    return res
  }
}

//fetching types data based in selected Type ID
export async function fetchTypesData(id) {
  let url = `${API_CONFIGURATION.types}${id}`;
  const response = await fetch(url);
  if(!response.ok) {
    return {isError: true, message: `Something went wrong while fetching Types data for id: ${id}!`}
  } else {
    const res = await response.json()
    return res
  }
}
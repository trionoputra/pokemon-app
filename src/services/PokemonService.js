import {CONSTANT} from '../helper';

export const PokemonService = {
    fetchPokemonList,fetchPokemonDetail
}

function fetchPokemonList(next) { 
        let url = CONSTANT.BASE_URL + 'pokemon';
        if(next !== "")
            url = next;

        let config = {
            method:'GET',
    };
    return fetch(url,config)
        .then(response => response.json());
}

function fetchPokemonDetail(id) { 
    const url = CONSTANT.BASE_URL + 'pokemon/' + id;
    let config = {
        method:'GET',
    };
    return fetch(url,config)
        .then(response => response.json());
}
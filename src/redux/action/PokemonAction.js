import {CONSTANT} from '../../helper';
import {loader} from './LoaderAction';
import { PokemonService } from '../../services/PokemonService';

export const PokemonAction = {
    fetchPokemonList,fetchPokemonDetail,fetchMyPokemonList,saveMyPokemonList,releaseMyPokemon
};

function fetchPokemonList(next){
    return dispatch => {
        dispatch(loader(true));
        PokemonService.fetchPokemonList(next)
        .then(res => {
            dispatch(loader(false));
            dispatch(setPokemonList(res,next));
        });
    }   
};

function fetchMyPokemonList(){
    return dispatch => {
        let data = localStorage.getItem(CONSTANT.KEY_GET_MYPOKEMON_LIST);
        let mylist = data === null ? [] : JSON.parse(data);
        
        dispatch(setMyPokemonList(mylist))
       
    }   
};

function saveMyPokemonList(data,onSuccess){
    let local = localStorage.getItem(CONSTANT.KEY_GET_MYPOKEMON_LIST);
    let mylist = local === null ? [] : JSON.parse(local);
    let save = mylist.concat(data);
  
    localStorage.setItem(CONSTANT.KEY_GET_MYPOKEMON_LIST,JSON.stringify(save));

    return dispatch => {
        dispatch(setMyPokemonList(save));
        if(onSuccess !== null)
            onSuccess();
    }  
};

function releaseMyPokemon(id,onSuccess){
    let local = localStorage.getItem(CONSTANT.KEY_GET_MYPOKEMON_LIST);
    let mylist = local === null ? [] : JSON.parse(local);
    let remove = -1;


    mylist.map((dt,i) => {
        if(dt.id === id)
            remove = i;
    });

    mylist.splice(remove,1);

    localStorage.setItem(CONSTANT.KEY_GET_MYPOKEMON_LIST,JSON.stringify(mylist));

    return dispatch => {
        dispatch(setMyPokemonList(mylist));
        if(onSuccess !== null)
            onSuccess();
    }  
};

function fetchPokemonDetail(id){
    return dispatch => {
        dispatch(loader(true));
        PokemonService.fetchPokemonDetail(id)
        .then(res => {
            dispatch(loader(false));
            dispatch(setPokemonDetail(res));
        });
    }   
};

function setPokemonList(data,next)
{
    return {
        type: CONSTANT.KEY_GET_POKEMON_LIST,
        pokemonlist:data,
        next:next
    };
}

function setMyPokemonList(data)
{
    return {
        type: CONSTANT.KEY_GET_MYPOKEMON_LIST,
        mypokemonlist:data,
    };
}

function setPokemonDetail(data)
{
    return {
        type: CONSTANT.KEY_GET_POKEMON_DETAIL,
        pokemondetail:data
    };
}
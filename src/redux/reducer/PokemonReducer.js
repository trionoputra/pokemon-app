import {CONSTANT} from '../../helper';
 
const defaultState = {
    PokemonList:{results:[],count:0,next:"",previous:""},
    MyPokemonList:[],
    PokemonDetail:{name:"",weight:"",height:"",base_experience:"",moves:[],types:[],sprites:{}},
    imgPreview:""
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        
        case CONSTANT.KEY_GET_POKEMON_LIST:

            let results = state;
            if(action.next === "")
                results = action.pokemonlist;
            else
            {
                let res = state.PokemonList.results.concat(action.pokemonlist.results);
                let count = action.pokemonlist.count;
                let next = action.pokemonlist.next;
                results = {results:res,count:count,next:next};

            }

            return Object.assign({}, state, { 
                PokemonList: results
            });
        case CONSTANT.KEY_GET_MYPOKEMON_LIST: 
            return Object.assign({}, state, { 
                MyPokemonList:action.mypokemonlist,
            });
        case CONSTANT.KEY_GET_POKEMON_DETAIL: 
            return Object.assign({}, state, { 
                PokemonDetail:action.pokemondetail,
                imgPreview:action.pokemondetail.sprites.front_default
            });
        default:
            return state;
    }
}
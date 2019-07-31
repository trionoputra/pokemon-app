import { combineReducers } from 'redux';
import loader from './LoaderReducer';
import pokemon from './PokemonReducer';
const rootReducer = combineReducers({
    loader,pokemon
});
 
export default rootReducer;
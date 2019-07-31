import React from 'react';
import PokemonDetail from './pages/PokemonDetail';
import { create } from "react-test-renderer";
import { Provider } from 'react-redux';
import {store} from './redux';

describe(" component", () => {
  it("shows pokemon detail", async () => {

    const match = {params : {id : 1} // detail param
     }

    const component = create(<Provider store={store}>
                              <PokemonDetail match={match} />
                            </Provider>);
    const instance = component.getInstance();

    await instance.componentDidMount();
    
  });
});

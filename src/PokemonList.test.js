import React from 'react';
import PokemonList from './pages/PokemonList';
import { create } from "react-test-renderer";
import { Provider } from 'react-redux';
import {store} from './redux';
import { connect } from 'react-redux';
describe("PokemonList component", () => {
  it("shows pokemon list", async () => {
    const component = create(<Provider store={store}>
                              <PokemonList />
                            </Provider>);


    const instance = component.getInstance();
   await instance.componentDidMount();

    console.log(instance.state);   
  });
});


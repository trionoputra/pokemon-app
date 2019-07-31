import React from 'react';
import MyPokemonList from './pages/MyPokemon'; 
import { create } from "react-test-renderer";
import { Provider } from 'react-redux';
import {store} from './redux';
import { connect } from 'react-redux';
describe("MyPokemonList component", () => {
  it("shows my pokemon list", async () => {
    const component = create(<Provider store={store}>
                              <MyPokemonList />
                            </Provider>);


    const instance = component.getInstance();
   await instance.componentDidMount(); 
  });
});


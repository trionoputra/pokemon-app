import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../assets/css/bootstrap.min.css';
import '../../assets/css/App.css';

import Header from './Header';

import MyPokemon from '../MyPokemon';
import PokemonList from '../PokemonList';
import PokemonDetail from '../PokemonDetail';

import NoMatch from '../Page404';

import {Switch, Route  } from 'react-router-dom';

class Layout extends Component {
    
    render() {
      return (
        <div>
          <Header path={this.props.location.pathname} />
          <div className='container content'>
          <Switch>
            <Route exact path={"/"} component={PokemonList} />
            <Route exact path={"/mypokemon"} component={MyPokemon} />
            <Route exact path={"/pokemon-detail/:id"} component={PokemonDetail} />
            <Route  component={NoMatch}/>
          </Switch>
          </div>
        </div>
      );
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
        
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
       
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Layout);
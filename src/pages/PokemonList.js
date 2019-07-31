import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CONSTANT } from '../helper';
import history from '../history';


import {PokemonAction} from '../redux/action/PokemonAction';

class PokemonList extends Component {
  constructor(props) {
    super(props)
    this.state = { unittestdata: {}};

  }
  fetchPokemonList(next) {
    this.props.dispatch(PokemonAction.fetchPokemonList(next));
  }

  componentDidMount() {
    this.fetchPokemonList("");
  }

  componentWillReceiveProps(props)
  {
    this.setState({unittestdata:props.PokemonDetail});
  }

  render() {
    return (
        <div>
          <h3>Show {this.props.PokemonList.results.length} of {this.props.PokemonList.count} Pokemons</h3>
          <table className="table table-striped table-pokemondetail">
              <tbody>
                {
                  this.props.PokemonList.results.map((data)  =>
                  {
                     let split = data.url.split("/");
                     let id = split[split.length - 2];
                      let imgUrl = CONSTANT.IMAGE_URL + id + ".png";
                      return (<tr onClick={()=>{ history.push("/pokemon-detail/" + data.name) }}  >
                        <td className="middle" width="20"><a className="td_id">#{id}</a></td>
                        <td className="middle" width="40"><img height="45" src={imgUrl} /></td>
                        <td className="middle" >{data.name}</td>
                      </tr> )
                  })
                }
              </tbody>
          </table>
          <div className="loadmore" style={{display:this.props.PokemonList.results.length < this.props.PokemonList.count ? "block" : "none"}} onClick={()=>{
            if(this.props.PokemonList.results.length < this.props.PokemonList.count)
               this.fetchPokemonList(this.props.PokemonList.next);
          }} >Load more..</div>
        </div>
      );
    }
  }

  const mapStateToProps = (state, ownProps) => {
      return {
        PokemonList:state.pokemon.PokemonList,
      };
  }

export default connect(mapStateToProps)(PokemonList);
  
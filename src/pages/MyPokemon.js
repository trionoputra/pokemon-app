import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from '../history';
import { Modal,Button } from 'react-bootstrap';
import {PokemonAction} from '../redux/action/PokemonAction';

class MyPokemon extends Component {
  constructor(props) {
    super(props)

    this.state = {
        modalReleaseShow:false
    }

    
    this.handleReleaseShow = this.handleReleaseShow.bind(this);
    this.handleReleaseHide = this.handleReleaseHide.bind(this);
    this.releaseMyPokemon = this.releaseMyPokemon.bind(this);
    
  }

  handleReleaseHide()
  {
    this.setState({modalReleaseShow:false});
  }

  handleReleaseShow(e)
  {
    e.stopPropagation();
    this.setState({modalReleaseShow:true,imgRelease:e.target.attributes['data-image'].value,idRelease:e.target.attributes['data-id'].value});
  }

  releaseMyPokemon()
  {
    
    this.props.dispatch(PokemonAction.releaseMyPokemon(parseInt(this.state.idRelease),() => {
        this.setState({imgRelease:"",idRelease:-1});
        this.handleReleaseHide()
    }));
  }


  fetchMyPokemonList() {
    this.props.dispatch(PokemonAction.fetchMyPokemonList());
  }

  componentDidMount() {
    this.fetchMyPokemonList();
  }

  render() {
    return (
        <div>
          <h3>{this.props.MyPokemonList.length} My Pokemon(s)</h3>
          <table className="table table-striped table-pokemondetail">
              <tbody>
                {
                  this.props.MyPokemonList.map((data)  =>
                  {
                    
                      return (<tr onClick={()=>{ history.push("/pokemon-detail/" + data.name) }}  >
                        <td className="middle" width="20"><a class="td_id">#{data.id}</a></td>
                        <td className="middle" width="40"><img height="45" src={data.image} /></td>
                        <td className="middle" >
                        <div className="name-label-list">{data.name}</div>
                        <div className="nickname-label-list">{data.nickname}</div>
                        </td>
                        <td width="90" >
                        <button className="btn-release-list btn btn-danger" data-image={data.image} data-id={data.id} onClick={this.handleReleaseShow} >RELEASE</button>
                        </td>
                      </tr> )
                  })
                }
              </tbody>
          </table>

          <Modal show={this.state.modalReleaseShow}  animation={false}>
        <Modal.Header>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
          <Modal.Body>
              <img className="img-catch-preview" src={this.state.imgRelease}  width="30%" />
              <p>You will lose your pokemon!!!</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleReleaseHide}>Cancel</Button>
            <Button variant="danger" onClick={this.releaseMyPokemon}>Release</Button>
          </Modal.Footer>
        </Modal>
        </div>
      );
    }
  }


  const mapStateToProps = (state, ownProps) => {
      return {
        MyPokemonList:state.pokemon.MyPokemonList,
      };
  }

export default connect(mapStateToProps)(MyPokemon);
  
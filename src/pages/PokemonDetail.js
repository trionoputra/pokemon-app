import React, { Component } from 'react';
import { connect } from 'react-redux';
import placeholder from '../assets/images/placeholder.jpg';
import pokethrow from '../assets/images/pokethrow.gif';
import pokecatch from '../assets/images/pokecatch.gif';
import pokecatchstop from '../assets/images/pokecatch_stop.jpg';
import {PokemonAction} from '../redux/action/PokemonAction';

import { Modal,Button } from 'react-bootstrap';

class PokemonDetail extends Component {
  constructor(props) {
    super(props)

    this.state = {
        imgPreview:"",
        modalShow:false,
        modalNameShow:false,
        modalReleaseShow:false,
        pokeAnim:pokethrow,
        isCatch:false,
        nickname:"",
        isOwned:false,
        myData:{}
    }

    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);

    this.handleNameShow = this.handleNameShow.bind(this);
    this.handleReleaseShow = this.handleReleaseShow.bind(this);
    this.handleReleaseHide = this.handleReleaseHide.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.saveMyPokemon = this.saveMyPokemon.bind(this);
    this.checkOwnedPokemon = this.checkOwnedPokemon.bind(this);
    this.releaseMyPokemon = this.releaseMyPokemon.bind(this);
    
  }

  handleClose()
  {
    this.setState({modalShow:false, pokeAnim:pokethrow});
  }

  handleChange(event) {
    this.setState({nickname: event.target.value});
  }

  checkOwnedPokemon()
  {
    this.props.MyPokemonList.map((data)=>{
        if(data.name === this.props.match.params.id)
        {
          this.setState({isOwned:true,myData:data})
        }
    });
  }

  handleShow()
  {
    this.setState({modalShow:true,isCatch:false});
    setTimeout(()=> {
      this.setState({pokeAnim:pokecatch},()=> {
        setTimeout(()=> {
            this.setState({pokeAnim:pokecatchstop,isCatch:Math.random() < 0.5},()=>{
                setTimeout(()=>{
                    this.handleClose();
                    if(this.state.isCatch)
                      this.handleNameShow()

                },2000);
            });
          },4000);
      });
    },1600);
  }

  handleNameShow()
  {
    this.setState({modalNameShow:true,nickname:this.props.match.params.id});
  }

  handleReleaseHide()
  {
    this.setState({modalReleaseShow:false});
  }

  handleReleaseShow()
  {
    this.setState({modalReleaseShow:true});
  }

  fetchPokemonDetail() {
    this.props.dispatch(PokemonAction.fetchPokemonDetail(this.props.match.params.id));
  }

  fetchMyPokemonList() {
    this.props.dispatch(PokemonAction.fetchMyPokemonList());
  }

  saveMyPokemon()
  {
    let data = {
       id:this.props.PokemonDetail.id,
       name:this.props.PokemonDetail.name,
       nickname:this.state.nickname,
       image:this.props.PokemonDetail.sprites.front_default
      };

    this.props.dispatch(PokemonAction.saveMyPokemonList(data,()=>{
         this.setState({modalNameShow:false,isOwned:true});
    }));

  }

  releaseMyPokemon()
  {
    this.props.dispatch(PokemonAction.releaseMyPokemon(this.props.PokemonDetail.id,() => {
        this.setState({isOwned:false,myData:{}});
        this.handleReleaseHide()
    }));
  }

  changeImageThumbnail(img) {
    this.setState({imgPreview:img});
  }

  componentDidMount() {
    this.fetchMyPokemonList();
    this.fetchPokemonDetail();
  }

  componentWillReceiveProps(props)
  {
    this.setState({imgPreview:props.PokemonDetail.sprites.front_default,nickname:this.props.PokemonDetail.name});
    setTimeout(this.checkOwnedPokemon,10);
  }

    render() {
      return (
        <div>
          <h3>Pokemon Detail</h3>
          <div className="row">
            
            <div className="col-md-4">
              <div className="col-md-12" style={{paddingLeft:"0",paddingRight:"0"}}>
                  <div className="box-img">
                      <img width="99%" src={ this.state.imgPreview !== "" ? this.state.imgPreview : placeholder} />
                  </div>
              </div>
                <div className="col-md-3 col-sm-3 img-thumnail" onClick={()=>{this.changeImageThumbnail( this.props.PokemonDetail.sprites.front_default )}}>
                  <img width="100%" src={this.props.PokemonDetail.sprites ? this.props.PokemonDetail.sprites.front_default : placeholder} />
                </div>
                <div className="col-md-3 col-sm-3 img-thumnail" onClick={()=>{this.changeImageThumbnail( this.props.PokemonDetail.sprites.back_shiny )}} >
                  <img width="100%" src={this.props.PokemonDetail.sprites ? this.props.PokemonDetail.sprites.back_shiny : placeholder} />
                </div>
                <div className="col-md-3 col-sm-3 img-thumnail" onClick={()=>{this.changeImageThumbnail( this.props.PokemonDetail.sprites.back_default )}}>
                  <img width="100%" src={this.props.PokemonDetail.sprites ? this.props.PokemonDetail.sprites.back_default : placeholder} />
                </div>
                <div className="col-md-3  col-sm-3 img-thumnail" >
                  <img width="100%" onClick={()=>{this.changeImageThumbnail( this.props.PokemonDetail.sprites.front_shiny )}} src={this.props.PokemonDetail.sprites ? this.props.PokemonDetail.sprites.front_shiny : placeholder} />
                </div>
                <div style={{clear:"both"}}></div>
                <div className="col-md-12 form-group"  style={{paddingLeft:"0",paddingRight:"0"}}>
                  
                  <button style={{display:this.state.isOwned ? "none" : "block"}} className="btn-detail btn-catch btn btn-info" onClick={this.handleShow}>CATCH THIS</button>
                  <button style={{display:this.state.isOwned ? "block" : "none"}}className="btn-detail btn-owned btn btn-default" disabled={true} >OWNED</button>
                  <button style={{display:this.state.isOwned ? "block" : "none"}} className="btn-detail btn-release btn btn-danger" onClick={this.handleReleaseShow}>RELEASE</button>
                </div>
                
                
            </div>
             <div className="col-md-8">
                <div className="nickname-wrapper" style={{display:this.state.myData.nickname ? "block" : "none"}} >
                  <span className="nick-label">nickname</span>
                  <h3>{this.state.myData.nickname}</h3>
                </div>
                <div className="row">
                  <div class="col-md-6">
                    <div className="subtitle"><label>General Information</label></div>
                    <table className="table table-striped table-pokemondetail">
                      <tbody>
                          <tr><th width="90">Name</th><td>{this.props.PokemonDetail.name}</td></tr>
                          <tr><th width="90">Type</th>
                              <td>
                              {
                                this.props.PokemonDetail.types.map((data) => {
                                    return (<span key={data.type.name} className="label label-info label-types">{data.type.name}</span>)
                                })
                              }
                              </td></tr>
                          <tr><th width="90">Weight</th><td>{this.props.PokemonDetail.weight}</td></tr>
                          <tr><th width="90">Height</th><td>{this.props.PokemonDetail.height}</td></tr>
                          <tr><th width="90">Base Exp</th><td>{this.props.PokemonDetail.base_experience}</td></tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="col-md-6">
                      <div className="subtitle"><label>Moves</label></div>
                      <div className="table-move-wrapper">
                      <table className="table table-striped table-pokemondetail">
                        <tbody>
                              {
                                this.props.PokemonDetail.moves.map((data) => {
                                  return (<tr key={data.move.name} ><td>{data.move.name}</td></tr>)
                                })
                              }
                        </tbody>
                      </table>
                      </div>
                  </div>
                </div>
                
             </div>
          </div>

          <Modal backdrop={"static"} keyboard={false} show={this.state.modalShow} animation={false}>
          <Modal.Body>
              <img src={this.state.pokeAnim} width="100%" />
              <img className="img-catch" src={this.props.PokemonDetail.sprites.front_default} style={{display:(!this.state.isCatch && this.state.pokeAnim == pokecatchstop) ? "block" : "none"}} width="30%" />
              <div className="span-catch-wrapper">
              <span className={this.state.isCatch ? "span-catch success" : "span-catch fail"} style={{display:this.state.pokeAnim == pokecatchstop ? "block" : "none"}} >{this.state.isCatch ? "SUCCESS!!!" : "FAIL!!!"}</span>
              </div>
          </Modal.Body>
        </Modal>

        <Modal backdrop={"static"} keyboard={false} show={this.state.modalNameShow}  animation={false}>
          <Modal.Body>
              <img className="img-catch-preview" src={this.props.PokemonDetail.sprites.front_default}  width="30%" />
              <div className="form-group form-nickname">
                <label htmlFor="nickname">Enter Nickname</label>
                <input type="text" onChange={this.handleChange} value={this.state.nickname} className="form-control" placeholder="Enter Nickname" />
                  <span className="field-error" style={{display:this.state.nickname === "" ? "block" : "none"}}>nickname is required</span>
              </div>
              <div className="form-group form-nickname">
                 <button  disabled={ this.state.nickname === "" ? true : false} onClick={this.saveMyPokemon}className="btn btn-success btn-nickname">OK</button>
              </div>
          </Modal.Body>
        </Modal>


        <Modal show={this.state.modalReleaseShow}  animation={false}>
        <Modal.Header>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
          <Modal.Body>
              <img className="img-catch-preview" src={this.props.PokemonDetail.sprites.front_default}  width="30%" />
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
    console.log("list",state.pokemon.MyPokemonList);
     return {
       PokemonDetail:state.pokemon.PokemonDetail,
       imgPreview:state.pokemon.imgPreview,
       MyPokemonList:state.pokemon.MyPokemonList
     };
 }

export default connect(mapStateToProps)(PokemonDetail);
 
  
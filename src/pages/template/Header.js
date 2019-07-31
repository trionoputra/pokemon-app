import React, { Component } from 'react';
import logo from '../../assets/images/logo.png';
import history from './../../history';
import loader from '../../assets/images/loader.gif';
import { connect } from 'react-redux';

class Header extends Component {

    render() {
      return (
        <nav className="navbar navbar-inverse navbar-fixed-top">
            <div className="container">
                <div className="navbar-header">
                <a className="navbar-brand" href="#"><img height="40" src={logo}></img></a>
                </div>
                <div id="navbar" >
                <ul className="nav navbar-nav">
                    <li className={this.props.path === "/" || this.props.path === "" ? "active" :""} onClick={()=> {
                            history.push("/")
                            }}><a >Pokemon List</a></li>
                    <li className={this.props.path === "/mypokemon" ? "active" :""}><a  onClick={()=> {
                            history.push("/mypokemon");
                            }}>My Pokemon</a></li>
                </ul>
                            
                </div>
                <img id="loader" src={loader}   style={{display:(this.props.isLoaderShow ? 'block':'none')}} />
            </div>
        </nav>
      );
    }
  }

  const mapStateToProps = (state, ownProps) => {
    return {
        isLoaderShow: state.loader.isShow,
    };
}


export default connect(mapStateToProps)(Header);
  
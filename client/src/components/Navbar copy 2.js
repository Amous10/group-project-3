import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Route, Link } from 'react-router-dom';
// import logo from '../img/logo.svg';
import logo from '../img/pot.svg';

import '../App.css';

import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import LoginForm from './Login';

const modalStyle = makeStyles(theme => ({
  position: 'absolute',
  width: 400,
  backgroundColor: theme.palette.background.paper,
  border: '2px solid #000',
  boxShadow: theme.shadows[5],
  padding: theme.spacing(2, 4, 4),
  outline: 'none',
  top: `25%`,
  left: `50%`,
  transform: `translate(-25%, -50%)`
}));
// getModalStyle() {
//   const top = 25;
//   const left = 50;

//   return {
//     top: `${top}%`,
//     left: `${left}%`,
//     transform: `translate(-${top}%, -${left}%)`
//   };
// }

class Navbar extends Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
    this.state = {
      loginOpen: false,
      signupOpen: false
    };
  }

  logout(event) {
    event.preventDefault();
    console.log('logging out');
    axios
      .post('/user/logout')
      .then(response => {
        console.log(response.data);
        if (response.status === 200) {
          this.props.updateUser({
            loggedIn: false,
            username: null,
            userid: null
          });
        }
      })
      .catch(error => {
        console.log('Logout error');
      });
  }

  loginHandleOpen = e => {
    this.setState({ loginOpen: true });
  };

  loginHandleClose = e => {
    this.setState({ loginOpen: false });
  };
  signupHandleOpen = e => {
    this.setState({ signupOpen: true });
  };

  signupHandleClose = e => {
    this.setState({ signupOpen: false });
  };

  render() {
    const loggedIn = this.props.loggedIn;
    // console.log('navbar render, props: ');
    // console.log(this.props);

    return (
      <div>
        <header className="navbar App-header" id="nav-container">
          <div className="col-4">
            {loggedIn ? (
              <section className="navbar-section">
                <Link to={'/'} className="btn btn-link text-secondary">
                  <span className="text-secondary">New Search</span>
                </Link>
                <Link to={'/api/recipes'} className="btn btn-link text-secondary">
                  <span className="text-secondary">Saved Recipes</span>
                </Link>
                <Link to="#" className="btn btn-link text-secondary" onClick={this.logout}>
                  <span className="text-secondary">Logout</span>
                </Link>
                <button type="button" onClick={this.loginHandleOpen}>
                  Open Login Modal
                </button>
                <Modal aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description" onClose={this.loginHandleClose}>
                  <div style={modalStyle}>
                    {/* <div style={modalStyle} className={classes.paper}> */}
                    <h2 id="modal-title">Text in a modal</h2>
                    <p id="simple-modal-description">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
                    <LoginForm />
                  </div>
                </Modal>
              </section>
            ) : (
              <section className="navbar-section">
                <Link to="/" className="btn btn-link text-secondary">
                  <span className="text-secondary">Home</span>
                </Link>
                <Link to="/login" className="btn btn-link text-secondary">
                  <span className="text-secondary">Login</span>
                </Link>
                <Link to="/signup" className="btn btn-link">
                  <span className="text-secondary">Sign Up</span>
                </Link>
              </section>
            )}
          </div>
          <div className="col-4 col-mr-auto">
            <div id="top-filler" />
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Pantry Chef</h1>
          </div>
        </header>
      </div>
    );
  }
}

export default Navbar;

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from '../img/pot.svg';
import '../App.css';
import axios from 'axios';
import Modal from 'react-modal';
import LoginForm from './Login';
import Grid from '@material-ui/core/Grid';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

class Navbar extends Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
      modalIsOpen: false
    };
  }
  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
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

  render() {
    const loggedIn = this.props.loggedIn;
    // console.log('navbar render, props: ');
    // console.log(this.props);

    return (
      <header className="navbar App-header" id="nav-container">
        <Grid md="4">
          {loggedIn ? (
            <section className="navbar-section">
              <Link to={'/'} className="btn btn-link text-second">
                <span className="text-second">New Search</span>
              </Link>
              <Link to={'/api/recipes'} className="btn btn-link text-second">
                <span className="text-second">Saved Recipes</span>
              </Link>
              <Link
                to="#"
                className="btn btn-link text-second"
                onClick={this.logout}
              >
                <span className="text-second">Logout</span>
              </Link>
              <Link
                to="#"
                className="btn btn-link text-secondary"
                onClick={this.openModal}
              >
                <span className="text-secondary">Login</span>
              </Link>

              <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                closeModal={this.closeModal}
              >
                <h2 ref={subtitle => (this.subtitle = subtitle)}>Hello</h2>

                <LoginForm />
              </Modal>
            </section>
          ) : (
            <section className="navbar-section">
              <Link to="/" className="btn btn-link text-second">
                <span className="text-second">Home</span>
              </Link>
              <Link to="/login" className="btn btn-link text-second">
                <span className="text-second">Login</span>
              </Link>
              <Link to="/signup" className="btn btn-link">
                <span className="text-second">Sign Up</span>
              </Link>
            </section>
          )}
        </Grid>
        <Grid md="4" className="col-mr-auto">
          <div id="top-filler" />
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Pantry Chef</h1>
        </Grid>
      </header>
    );
  }
}

export default Navbar;

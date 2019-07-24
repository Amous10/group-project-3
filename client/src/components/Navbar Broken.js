import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Route, Link } from 'react-router-dom';
// import logo from '../img/logo.svg';
import logo from '../img/mustache.svg';
import LoginModal from './LoginModal';
import Modal from '@material-ui/core/Modal';
import '../App.css';
import axios from 'axios';

class Navbar extends Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
    // this.toggleModal = this.toggleModal.bind(this);
    this.state = {
      showModal: false
    };
  }
  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
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

    return (
      <div>
        <header className="navbar App-header" id="nav-container">
          <div className="col-4">
            {loggedIn ? (
              <section className="navbar-section">
                <Link to={'/'} className="btn btn-link text-secondary">
                  <span className="text-secondary">New Search</span>
                </Link>
                <Link
                  to={'/api/recipes'}
                  className="btn btn-link text-secondary"
                >
                  <span className="text-secondary">Saved Recipes</span>
                </Link>
                <Link
                  to="#"
                  className="btn btn-link text-secondary"
                  onClick={this.logout}
                >
                  <span className="text-secondary">Logout</span>
                </Link>
                <button onClick={this.handleOpenModal}>Trigger Modal</button>
                <LoginModal
                  isOpen={this.state.showModal}
                  contentLabel="onRequestClose Example"
                  onRequestClose={this.handleCloseModal}
                >
                  <p>Modal text!</p>
                  <button onClick={this.handleCloseModal}>Close Modal</button>
                </LoginModal>
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
                <Modal open={false}>
                  <LoginModal />
                </Modal>
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

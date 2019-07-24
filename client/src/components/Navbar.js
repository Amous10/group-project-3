import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Route, Link } from 'react-router-dom';
// import logo from '../img/logo.svg';
import logo from '../img/mustache.svg';

import '../App.css';
import axios from 'axios';

class Navbar extends Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
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
      <div>
        <header className="navbar App-header" id="nav-container">
          <div className="col-4">
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

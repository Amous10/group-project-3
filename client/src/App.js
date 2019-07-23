import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, withRouter, Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
// components
import Signup from './components/Signup.js';
import LoginForm from './components/Login.js';
import Navbar from './components/Navbar.js';

import Home from './components/pages/Home';
import Recipes from './components/pages/Recipes';
import NoMatch from './components/pages/NoMatch';
import RecipesD from './components/pages/RecipesD';
class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      username: null,
      userid: null
    };

    this.getUser = this.getUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    this.getUser();
  }

  updateUser(userObject) {
    this.setState(userObject);
  }

  getUser() {
    axios.get('/user/').then(response => {
      console.log('Get user response: ');
      console.log(response.data);
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ');
        console.log(response.data.user._id);

        this.setState({
          loggedIn: true,
          username: response.data.user.username,
          userid: response.data.user._id
        });
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null,
          userid: null
        });
      }
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
          {/* greet user if logged in: */}
          {this.state.loggedIn && (
            <p>
              Join the party, {this.state.username}! at {this.state.userid}
            </p>
          )}
          {/* Routes to different components */}
          {/* <Route exact path="/" component={Home} /> */}
          {/* <Route exact path="/" render={() => <Home userid={this.state.userid} />} />
           */}

          <Switch>
            {/* <Route exact path="/" component={Home} /> */}
            <Route exact path="/" render={() => <Home searchRecipe={this.searchRecipe} location={this.props.location} userid={this.state.userid} />} />

            <Route exact path="/login" render={() => <LoginForm updateUser={this.updateUser} />} />
            <Route exact path="/signup" render={() => <Signup />} />
            <Route exact path="/api/recipes" render={() => <Recipes userid={this.state.userid} />} />
            <Route exact path="/api/recipesdetail/:id" component={RecipesD} />
            <Route exact path="/homedetail/:id" component={RecipesD} />
            {/* <Route exact path="/api/recipes" render={() => <Recipes userid={this.state.userid} />} /> */}
            {/* <Route path="/recipes" exact component={Recipes} />
              <Route path="/recipes/:id" component={SingleRecipe} /> */}
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default withRouter(App);

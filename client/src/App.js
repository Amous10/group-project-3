import React, { Component } from 'react';
import axios from 'axios';
import API from './services/API';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
  Link
} from 'react-router-dom';
import { Redirect } from 'react-router-dom';

// components
import Signup from './components/Signup.js';
import LoginForm from './components/Login.js';
import Navbar from './components/Navbar.js';
import Intro from './components/pages/Intro';
import Home from './components/pages/Home';
import Recipes from './components/pages/Recipes';
import NoMatch from './components/pages/NoMatch';
import RecipesD from './components/pages/RecipesD';
import Searchbar from './components/Searchbar';
class App extends Component {
  getChildContext() {}
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      username: null,
      userid: null,
      error: '',
      edamamresult: [],
      searchfood: '',
      loading: false,
      tasks: []
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

  handleInputChangeFood = e => {
    const value = e.target.value;
    // const name = e.target.name;
    this.setState({
      searchfood: value
    });
  };
  handleFormSubmitFood = e => {
    e.preventDefault();
    // run google call with search parameter
    this.searchRecipes(this.state.searchfood);
    console.log('this.state.searchfood', this.state.searchfood);
    this.setState({
      searchfood: ''
    });
  };

  searchRecipes = query => {
    // start UI spinner
    this.setState({ loading: true, edamamresult: [] });

    // make a call to edamam api
    API.callEdamam(query)
      .then(recipes => {
        console.log('recipes: ', recipes);
        if (recipes.data.length > 0) {
          // stop the UI spinner
          this.setState({ loading: false });
          console.log('recipes data: ', recipes.data);

          // make a call to database and retrieve all recipes stored
          API.getRecipes({}).then(dbFoods => {
            // empty array to hold all of the recipes

            const dbFoodsIds = [];
            // iterate over stored recipes and push recipe ids to empty array
            dbFoods.data.forEach(recipe => {
              dbFoodsIds.push(recipe.recipeId);
            });
            // filter all of the stored recipes and return recipes where stored recipe id doesn't match id coming from recipe2fork api call
            const filteredFoods = recipes.data.filter(
              recipe => !dbFoodsIds.includes(recipe.recipe.uri)
            );
            console.log('filteredFoods: ', filteredFoods);

            //  set new state for result
            this.setState({
              edamamresult: filteredFoods
            });
          });
        } else {
          this.setState({
            edamamresult: []
          });
        }
      })
      .catch(err => {
        console.log('ERROR:', err.response.data.message);
        this.setState({
          error: err.response.data.message,
          loading: false
        });
      });
  };

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
          <Searchbar
            value={this.state.searchfood}
            handleInputChangeFood={this.handleInputChangeFood}
            handleFormSubmitFood={this.handleFormSubmitFood}
          />
          {/* greet user if logged in: */}
          {this.state.loggedIn && (
            <p>
              Join the party, {this.state.username}! at {this.state.userid}
            </p>
          )}

          <Switch>
            {/* <Route exact path="/" component={Intro} /> */}

            <Route
              exact
              path="/"
              render={props => (
                <Home
                  {...props}
                  searchRecipes={this.searchRecipes}
                  location={this.props.location}
                  userid={this.state.userid}
                  edamamresult={this.state.edamamresult}
                />
              )}
            />

            <Route
              exact
              path="/login"
              render={props => (
                <LoginForm {...props} updateUser={this.updateUser} />
              )}
            />
            <Route exact path="/signup" render={() => <Signup />} />
            <Route
              exact
              path="/api/recipes"
              render={props => (
                <Recipes {...props} userid={this.state.userid} />
              )}
            />
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

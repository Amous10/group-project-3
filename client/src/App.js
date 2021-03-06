import React, { Component } from 'react';
import axios from 'axios';
import API from './services/API';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from 'react-router-dom';

// components
import Signup from './components/Signup.js';
import SignUpPortal from './components/SignUpPortal.js';
import LoginForm from './components/Login.js';
import LoginPortal from './components/LoginPortal.js';
import Navbar from './components/Navbar.js';
import Intro from './components/pages/Intro';
import Home from './components/pages/Home';
import SavedRecipes from './components/pages/SavedRecipes';
import NoMatch from './components/pages/NoMatch';
import RecipeDetails from './components/pages/RecipeDetails';

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
      pantryItems: [],
      groceryItems: []
      // isHidden: true
    };

    this.getUser = this.getUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    this.getUser();
    this.searchRecipes('chocolate');
  }

  updateUser(userObject) {
    this.setState(userObject);
  }

  setPantryState = pantry => {
    const newPantryItem = [...this.state.pantryItems, pantry];
    this.setState({ pantryItems: newPantryItem });
  };
  toggleDeletePantryState = pantry => {
    this.UpdatePantry(pantry, this.state.userid);
    this.setState({ pantryItems: this.state.pantryItems, pantry: '' });
  };
  setGroceryState = grocery => {
    const newGroceryItem = [...this.state.groceryItems, grocery];
    this.setState({ groceryItems: newGroceryItem });
  };
  toggleDeleteGroceryState = grocery => {
    this.UpdateGrocery(grocery, this.state.userid);
    this.setState({ groceryItems: this.state.groceryItems, grocery: '' });
  };

  handleInputChangeFood = e => {
    const value = e.target.value;

    this.setState({
      searchfood: value
    });
  };
  handleFormSubmitFood = e => {
    e.preventDefault();
    // run google call with search parameter
    this.searchRecipes(this.state.searchfood);
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
        if (recipes.data.length > 0) {
          // stop the UI spinner
          this.setState({ loading: false });

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
        this.setState({
          error: err.response.data.message,
          loading: false
        });
      });
  };

  getPantry(user) {
    API.getPantry(user)
      .then(res => {
        const { pantryItems } = res.data[0];
        this.setState({ pantryItems: pantryItems });
      })
      .catch(err => console.log(err));
  }

  getGrocery(user) {
    API.getGrocery(user)
      .then(res => {
        const { groceryItems } = res.data[0];
        this.setState({ groceryItems: groceryItems });
      })
      .catch(err => console.log(err));
  }

  UpdatePantry(item, user) {
    API.updatePantry(item, user)
      .then(res => {
        console.log('updated the pantry with api', item);
      })
      .catch(err => console.log(err));
  }

  UpdateGrocery(item, user) {
    API.updateGrocery(item, user)
      .then(res => {
        console.log('updated the grocery with api', item);
      })
      .catch(err => console.log(err));
  }

  getUser() {
    axios.get('/user/').then(response => {
      if (response.data.user) {
        this.getPantry(response.data.user._id);
        this.getGrocery(response.data.user._id);

        this.setState({
          loggedIn: true,
          username: response.data.user.username,
          userid: response.data.user._id
        });
      } else {
        this.setState({
          loggedIn: false,
          username: null,
          userid: null
        });
      }
    });
  }

  // toggleHidden() {
  //   this.setState({
  //     isHidden: !this.state.isHidden
  //   });
  // }

  render() {
    console.log('APP STATE', this.state);
    return (
      <Router>
        <div className="App">
          <Navbar
            updateUser={this.updateUser}
            loggedIn={this.state.loggedIn}
            savedLength={this.state.edamamresult.length}
            userName={this.state.username}
            searchRecipes={this.searchRecipes}
          />

          <Switch>
            {/* <Route exact path="/" component={Intro} /> */}
            <Route
              exact
              path="/"
              render={props => (
                <Intro
                  userName={this.state.username}
                  loggedIn={this.state.loggedIn}
                />
              )}
            />
            <Route
              exact
              path="/search"
              render={props => (
                <Home
                  {...props}
                  searchRecipes={this.searchRecipes}
                  location={this.props.location}
                  loading={this.state.loading}
                  userid={this.state.userid}
                  edamamresult={this.state.edamamresult}
                  pantryItems={this.state.pantryItems}
                  setPantryState={this.setPantryState}
                  toggleDeletePantryState={this.toggleDeletePantryState}
                  // displayPantry={!this.state.isHidden}
                />
              )}
            />

            <Route
              exact
              path="/login"
              render={props => (
                // <LoginForm
                <LoginPortal
                  {...props}
                  updateUser={this.updateUser}
                  getPantry={this.getPantry}
                  getGrocery={this.getGrocery}
                />
              )}
            />
            <Route
              exact
              path="/login2"
              render={props => (
                <LoginForm
                  // <LoginPortal
                  {...props}
                  updateUser={this.updateUser}
                  getPantry={this.getPantry}
                />
              )}
            />

            <Route exact path="/signup" render={() => <SignUpPortal />} />
            <Route exact path="/signup2" render={() => <Signup />} />
            <Route
              exact
              path="/saved"
              render={props => (
                <SavedRecipes
                  {...props}
                  userid={this.state.userid}
                  groceryItems={this.state.groceryItems}
                  setGroceryState={this.setGroceryState}
                  toggleDeleteGroceryState={this.toggleDeleteGroceryState}
                />
              )}
            />
            <Route
              exact
              path="/api/recipesdetail/:id"
              component={RecipeDetails}
            />
            <Route exact path="/homedetail/:id" component={RecipeDetails} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default withRouter(App);

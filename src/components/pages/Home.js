import React, { Component } from 'react';
import API from '../../services/API';
import Image from '../Image';
import Container from '../Container';
import Row from '../Row';
import Jumbotron from '../Jumbotron';
import Col from '../Col';
import Searchbar from '../Searchbar';
import SearchFood from '../SearchFood';
import RecipeCard from '../RecipeCard';
import RecipeCardWrapper from '../RecipeCardWrapper';
import { Modal, Button } from 'react-materialize';
import Alert from '../Alert';
// import ToDo from '../ToDo/ToDo';
import TodoList from '../TodoList/TodoList';
import Grid from '@material-ui/core/Grid';
import SpacingGrid from '../Grid';

class Home extends Component {
  state = {
    result: [],
    edamamresult: [],
    searchfood: '',
    loading: false
  };

  searchRecipes = query => {
    // start UI spinner
    this.setState({ loading: true, edamamresult: [] });

    // make a call to edamam api
    API.callEdamam(query).then(recipes => {
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
            recipe => !dbFoodsIds.includes(recipe.id)
          );
          // console.log('filteredFoods: ', filteredFoods);
          //  set new state for result
          this.setState({
            edamamresult: filteredFoods
          });
        });
        // .catch(err => {
        //     console.log(err)
        // })
      } else {
        this.setState({
          recipes: []
        });
      }
    });
  };

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
    console.log(this.state.searchfood);
    this.setState({
      searchfood: ''
    });
  };

  saveRecipe = e => {
    // get the id of the book when 'save' is clicked
    const thisCardsId = e.target.getAttribute('data-id');
    console.log('recipe card id: ', thisCardsId);

    const newSavedRecipe = this.state.result;
    // filter this.state.result to return recipes where the id is the same as the recipe clicked
    newSavedRecipe
      .filter(result => result.id === thisCardsId)
      // then map over recipe and create a new object to send to the database
      .map(recipe => {
        const newRecipe = {
          userid: this.props.userid,
          recipeId: recipe.id,
          label: recipe.recipe.label,
          uri: recipe.recipe.uri
        };
        console.log('newRecipe: ', newRecipe);
        // save recipe then remove from the result state
        API.saveRecipe(newRecipe).then(() => {
          console.log('this.props.userid: ', this.props.userid);
          this.setState(state => {
            // find which recipe to remove from state by finding the recipe in the result array that matches the clicked recipe
            const recipeToRemove = state.result.find(
              recipe => recipe.id === newRecipe.recipeId
            );
            // find the index of that recipe in the result array
            const indexofRecipeToRemove = state.result.indexOf(recipeToRemove);
            // then delete that one item
            state.result.splice(indexofRecipeToRemove, 1);
            // update the state
            return {
              result: state.result
            };
          });
        });
      });
    // perform modal dialogue
    {
      window.$('#foo').modal('open');
    }
  };

  render() {
    if (this.state.loading) {
      return (
        <div>
          {/* <Navbar /> */}
          <Image />
          <Jumbotron>
            <Searchbar />
          </Jumbotron>
          <div className="row">
            <div className="col l12 center align">
              <div className="preloader-wrapper big active">
                <div className="spinner-layer spinner-blue-only">
                  <div className="circle-clipper left">
                    <div className="circle" />
                  </div>
                  <div className="gap-patch">
                    <div className="circle" />
                  </div>
                  <div className="circle-clipper right">
                    <div className="circle" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    // else
    return (
      <div>
        {/* <Navbar /> */}
        <Image />

        <Jumbotron>
          <SearchFood
            value={this.state.searchfood}
            handleInputChangeFood={this.handleInputChangeFood}
            handleFormSubmitFood={this.handleFormSubmitFood}
          />
        </Jumbotron>
        {/* <TodoList /> */}

        <Container>
          <Row>
            <Col>
              <SpacingGrid />
              <RecipeCardWrapper
                count={this.state.edamamresult.length}
                title={'Results'}
                message={
                  this.state.edamamresult === 0
                    ? 'Enter your ingredients to search for recipes'
                    : null
                }
              >
                {this.state.edamamresult.map(edamamresult => (
                  <RecipeCard
                    key={edamamresult.recipe.uri}
                    imgurl={
                      edamamresult.recipe.image
                        ? edamamresult.recipe.image
                        : 'https://via.placeholder.com/128x193.png/000000/FFFFFF?text=No+Picture!'
                    }
                    label={edamamresult.recipe.label}
                    uri={edamamresult.recipe.uri}
                    shareurl={edamamresult.recipe.url}
                    source={edamamresult.recipe.source}
                    yield={edamamresult.recipe.yield}
                    calories={edamamresult.recipe.calories}
                    handleRecipeSave={this.saveRecipe}
                    leftButton={'View'}
                    rightButton={'Save'}
                  />
                ))}
              </RecipeCardWrapper>
              <Alert modalMessage={'Recipe added to saved page!'} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;

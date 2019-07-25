import React, { Component } from 'react';
import API from '../../services/API';
import Row from '../Row';
import Col from '../Col';
import Container from '../Container';
// import Searchbar from '../Searchbar';
import RecipeCardHome from '../RecipeCardHome';
import RecipeCardWrapper from '../RecipeCardWrapper';
import Alert from '../Alert';
import TodoComponent from '../PantryTodo/TodoComponent';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';

import Grid from '@material-ui/core/Grid';


const pantryTheme = createMuiTheme({
  palette: {
    primary: green,
    type: 'light' // Switching the dark mode on is a single property value change.
  }
});
class Home extends Component {
  state = {
    error: '',
    // edamamresult: [],
    loading: false,
    redirect: false,
    resultcard: [],
    tasks: []
  };

  setTasks = tasks => {
    this.setState({ tasks: tasks });
    console.log('this.TASKS: ', tasks);
  };

  saveRecipe = e => {
    // get the id of the book when 'save' is clicked
    const thisCardsId = e.currentTarget.getAttribute('data-id');
    const newSavedRecipe = this.props.edamamresult;
    // console.log('this.props.edamamresult: ', this.props.edamamresult);
    // filter this.state.result to return recipes where the id is the same as the recipe clicked
    newSavedRecipe
      .filter(result => result.recipe.uri === thisCardsId)
      // then map over recipe and create a new object to send to the database
      .map(recipe => {
        let Uri = recipe.recipe.uri;
        Uri = Uri.split('recipe_');
        Uri = Uri[1] + this.props.userid;
        const newRecipe = {
          userId: this.props.userid,
          uri: Uri,
          label: recipe.recipe.label,
          source: recipe.recipe.source,
          url: recipe.recipe.url,
          yield: recipe.recipe.yield,
          dietLabels: recipe.recipe.dietLabels,
          healthLabels: recipe.recipe.healthLabels,
          ingredientLines: recipe.recipe.ingredientLines,
          calories: recipe.recipe.calories,
          image: recipe.recipe.image
        };
        // save recipe then remove from the result state
        API.saveRecipe(newRecipe).then(() => {
          this.setState(state => {
            // find which recipe to remove from state by finding the recipe in the result array that matches the clicked recipe
            const recipeToRemove = this.props.edamamresult.find(recipe => {
              return recipe.recipe.image === newRecipe.image;
            });
            console.log('recipeToRemove', recipeToRemove);
            console.log('newRecipe', newRecipe);
            console.log('id of recipe', this.props.edamamresult);
            // find the index of that recipe in the result array
            const indexofRecipeToRemove = this.props.edamamresult.indexOf(
              recipeToRemove
            );
            console.log('indext to remove', indexofRecipeToRemove);
            // then delete that one item
            this.props.edamamresult.splice(indexofRecipeToRemove, 1);
            // update the state
            //TODO Unnecessary?
            // return {
            //   edamamresult: this.props.edamamresult
            // };
          });
        });
      });
    // perform modal dialogue
    {
      window.$('#foo').modal('open');
    }
  };
  render() {
    if (this.state.error) {
      return <div>{this.state.error}</div>;
    }
    if (this.state.loading) {
      return (
        <div>
          {/* <Navbar /> */}
          {/* <Searchbar /> */}
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
        <MuiThemeProvider theme={pantryTheme}>
          <TodoComponent
            searchRecipes={this.props.searchRecipes}
            setTasks={this.setTasks}
            tasks={this.state.tasks}
          />
        </MuiThemeProvider>
        <Container>
          <Row>
            <Col>
              <RecipeCardWrapper
                count={this.props.edamamresult.length}
                title={'Results'}
                message={
                  this.props.edamamresult === 0
                    ? 'Enter your ingredients to search for recipes'
                    : null
                }
              >
                {this.props.edamamresult.map(edamamresult => {
                  console.log('AAAAAAA', edamamresult);
                  return (
                    <RecipeCardHome
                      key={edamamresult.recipe.uri}
                      edamamresult={edamamresult}
                      goBackText="Go back to home"
                      recipe={edamamresult.recipe}
                      history={this.props.history}
                      redirectTo="/homedetail/2"
                      handleRecipeSave={this.saveRecipe}
                      leftButton={'View'}
                      rightButton={'Save'}
                    />
                  );
                })}
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

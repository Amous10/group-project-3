import React, { Component } from 'react';
import API from '../../services/API';
import { Redirect } from 'react-router-dom';
import Image from '../Image';
import Container from '../Container';
import Row from '../Row';
import Jumbotron from '../Jumbotron';
import Col from '../Col';
// import Searchbar from '../Searchbar';
import RecipeCardHome from '../RecipeCardHome';
import RecipeCard from '../RecipeCard';
import RecipeCardWrapper from '../RecipeCardWrapper';
import Alert from '../Alert';

import TodoComponent from '../PantryTodo/TodoComponent';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';

const pantryTheme = createMuiTheme({
  palette: {
    primary: green,
    type: 'light' // Switching the dark mode on is a single property value change.
  }
});

class Home extends Component {
  state = {
    error: '',
    edamamresult: [],
    loading: false,
    redirect: false,
    resultcard: [],
    tasks: []
  };

  componentDidMount() {
    try {
      // this.setState({ edamamresult: this.props.edamamresult });
      // console.log('HOME this.props.edamamresult: ', this.props.edamamresult);
      // console.log('HOME this.edamamresult: ', this.props.edamamresult);
    } catch (e) {
      console.log('error');
      //const {result} = this.props.location.state;
      //console.log("result ", result);
      //{  this.setState({edamamresult: this.props.location.props.edamamresult });   }
    }
  }

  setTasks = tasks => {
    this.setState({ tasks: tasks });
    console.log('this.TASKS: ', tasks);
  };

  RecordClick = name => {
    console.log('get click', name);
    // preventDefault();
    // filter to get the card record that was clicked to redirect to RecipeD

    const selectedCard = this.props.edamamresult;
    const resultCard = selectedCard.filter(
      result => result.recipe.uri === name
    );
    if (resultCard.length === 0) {
      this.setState({ redirect: false });
    }
    console.log('selected Card', resultCard[0]);

    const ChosenRecipe = {
      userId: 0,
      uri: 0,
      label: resultCard[0].recipe.label,
      source: resultCard[0].recipe.source,
      url: resultCard[0].recipe.url,
      yield: resultCard[0].recipe.yield,
      dietLabels: resultCard[0].recipe.dietLabels,
      healthLabels: resultCard[0].recipe.healthLabels,
      ingredientLines: resultCard[0].recipe.ingredientLines,
      calories: resultCard[0].recipe.calories,
      image: resultCard[0].recipe.image
    };

    this.setState({ redirect: true, resultcard: ChosenRecipe });

    return;
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
    if (this.state.redirect)
      return (
        <Redirect
          push
          to={{
            pathname: '/homedetail/2',
            state: {
              result: this.state.resultcard,
              edamamresult: this.props.edamamresult,
              redirect: false
            }
          }}
        />
      );

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
                  return (
                    <RecipeCardHome
                      RecordClick={this.RecordClick}
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

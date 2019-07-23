<<<<<<< HEAD:client/src/components/pages/Home.js
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
// import { Modal, Button } from 'react-materialize';
import Alert from '../Alert';

import TodoComponent from '../PantryTodo/TodoComponent';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';

// import ToDo from '../ToDo/ToDo';
// import PantryItems from '../PantryItems';
// import PantryMain from '../PantryList/PantryMain';
// import TodoList from '../TodoList/TodoList';
// import Grid from '@material-ui/core/Grid';
// import SpacingGrid from '../Grid';

const pantryTheme = createMuiTheme({
  palette: {
    primary: green,
    type: 'light' // Switching the dark mode on is a single property value change.
  }
});
=======
import React, { Component } from "react";
import{ Redirect}  from "react-router-dom";
import API from "../../services/API";
import { Link } from "react-router-dom";
import Image from "../Image";
import Container from "../Container";
import Row from "../Row";
import Jumbotron from "../Jumbotron";
import Col from "../Col";
import Searchbar from "../Searchbar";
import SearchFood from "../SearchFood";
import RecipeCardHome from "../RecipeCardHome";
import RecipeCardWrapper from "../RecipeCardWrapper";
import { Modal, Button } from "react-materialize";
import Alert from "../Alert";
// import ToDo from '../ToDo/ToDo';
import TodoList from "../TodoList/TodoList";
import Grid from "@material-ui/core/Grid";
import SpacingGrid from "../Grid";
>>>>>>> b816dfccab6b130a16d08790e4c8eb789753c504:src/components/pages/Home.js

class Home extends Component {
  state = {
    error: "",
    edamamresult: [],
    searchfood: "",
    loading: false,
    redirect:false,
    resultcard:[]
  };

  componentDidMount() {
   
    try{

      this.setState({edamamresult: this.props.location.state.edamamresult });
    }
    catch(e){

    console.log('error');
  //const {result} = this.props.location.state;
   //console.log("result ", result);
   //{  this.setState({edamamresult: this.props.location.state.edamamresult });   }
     
  
  }
  }

  // componentDidUpdate() {
  //   this.setState({edamamresult: this.props.location.state.edamamresult });
  // }
  searchRecipes = query => {
    // start UI spinner
    this.setState({ loading: true, edamamresult: [] });

    // make a call to edamam api
    API.callEdamam(query)
      .then(recipes => {
        console.log("recipes: ", recipes);
        if (recipes.data.length > 0) {
          // stop the UI spinner
          this.setState({ loading: false });
          console.log("recipes data: ", recipes.data);

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
<<<<<<< HEAD:client/src/components/pages/Home.js
            console.log('filtderedFoods: ', filteredFoods);
=======
            console.log("filtderedFoods: ", filteredFoods);
>>>>>>> b816dfccab6b130a16d08790e4c8eb789753c504:src/components/pages/Home.js

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
        console.log("ERROR:", err.response.data.message);
        this.setState({
          error: err.response.data.message,
          loading: false
        });
      });
  };



RecordClick = name => {
 
 console.log("get click", name );
 // preventDefault();
// filter to get the card record that was clicked to redirect to RecipeD

    const selectedCard = this.state.edamamresult;
   
     const resultCard = selectedCard.filter(result => result.recipe.uri === name)
      if (resultCard.length===0) {this.setState({redirect:false});}
      console.log("selected Card",resultCard[0]);
      
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
      
      
      this.setState({redirect:true, resultcard: ChosenRecipe});
      
      return   
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
    console.log("this.state.searchfood", this.state.searchfood);
    // this.setState({
    //   searchfood: ""
    // });
  };

  saveRecipe = e => {
    // get the id of the book when 'save' is clicked
    const thisCardsId = e.currentTarget.getAttribute("data-id");

    const newSavedRecipe = this.state.edamamresult;
    // console.log('this.state.edamamresult: ', this.state.edamamresult);
    // filter this.state.result to return recipes where the id is the same as the recipe clicked
    newSavedRecipe
      .filter(result => result.recipe.uri === thisCardsId)
      // then map over recipe and create a new object to send to the database
      .map(recipe => {
        let Uri = recipe.recipe.uri;
        Uri = Uri.split("recipe_");
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
            const recipeToRemove = state.edamamresult.find(recipe => {
              return recipe.recipe.image === newRecipe.image;
            });

<<<<<<< HEAD:client/src/components/pages/Home.js
            console.log('recipeToRemove', recipeToRemove);
            console.log('newRecipe', newRecipe);
            console.log('id of recipe', state.edamamresult);
=======
            console.log("recipeToRemove", recipeToRemove);
            console.log("newRecipe", newRecipe);
            console.log("id of recipe", state.edamamresult);
>>>>>>> b816dfccab6b130a16d08790e4c8eb789753c504:src/components/pages/Home.js
            // find the index of that recipe in the result array
            const indexofRecipeToRemove = state.edamamresult.indexOf(
              recipeToRemove
            );
<<<<<<< HEAD:client/src/components/pages/Home.js
            console.log('indext to remove', indexofRecipeToRemove);
=======
            console.log("indext to remove", indexofRecipeToRemove);
>>>>>>> b816dfccab6b130a16d08790e4c8eb789753c504:src/components/pages/Home.js
            // then delete that one item
            state.edamamresult.splice(indexofRecipeToRemove, 1);

            // update the state
            return {
              edamamresult: state.edamamresult
            };
          });
        });
      });
    // perform modal dialogue
    {
      window.$("#foo").modal("open");
    }
  };

  render() {
    
    if (this.state.redirect)
       return  (<Redirect push to={{
        pathname: "/homedetail/2",
        state: { result: this.state.resultcard , 
          edamamresult:this.state.edamamresult,
          redirect:false }
      }}
    />) 
    
    if (this.state.error) {
      return <div>{this.state.error}</div>;
    }
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
        {/* <PantryItems />
        <PantryMain /> */}

        <MuiThemeProvider theme={pantryTheme}>
          <TodoComponent />
        </MuiThemeProvider>

        <Container>
          <Row>
            <Col>
              <RecipeCardWrapper
                count={this.state.edamamresult.length}
<<<<<<< HEAD:client/src/components/pages/Home.js
                title={'Results'}
                message={
                  this.state.edamamresult === 0
                    ? 'Enter your ingredients to search for recipes'
=======
                title={"Results"}
                message={
                  this.state.edamamresult === 0
                    ? "Enter your ingredients to search for recipes"
>>>>>>> b816dfccab6b130a16d08790e4c8eb789753c504:src/components/pages/Home.js
                    : null
                }
              >
                {this.state.edamamresult.map(edamamresult => {
<<<<<<< HEAD:client/src/components/pages/Home.js
                  return (
                    <RecipeCard
                      key={edamamresult.recipe.uri}
                      imgurl={
                        edamamresult.recipe.image
                          ? edamamresult.recipe.image
                          : 'https://via.placeholder.com/128x193.png/000000/FFFFFF?text=No+Picture!'
=======
                 
                  return (
                    <RecipeCardHome
                    
                    
                      RecordClick={this.RecordClick}
                     key={edamamresult.recipe.uri}
                      
                      imgurl={
                        edamamresult.recipe.image
                          ? edamamresult.recipe.image
                          : "https://via.placeholder.com/128x193.png/000000/FFFFFF?text=No+Picture!"
>>>>>>> b816dfccab6b130a16d08790e4c8eb789753c504:src/components/pages/Home.js
                      }
                      label={edamamresult.recipe.label}
                      uri={edamamresult.recipe.uri}
                      shareurl={edamamresult.recipe.url}
                      source={edamamresult.recipe.source}
                      yield={edamamresult.recipe.yield}
                      calories={edamamresult.recipe.calories}
                      handleRecipeSave={this.saveRecipe}
                      leftButton={"View"}
                      rightButton={"Save"}
                    />
                  );
                })}
              </RecipeCardWrapper>
              <Alert modalMessage={"Recipe added to saved page!"} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;

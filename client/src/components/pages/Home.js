import React, { Component } from 'react';
import API from '../../services/API';
import RecipeCard from '../RecipeCard';
import RecipeCardWrapper from '../RecipeCardWrapper';
import PantryList from '../PantryList';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CircularIndeterminate from '../CircularIndeterminate';
import Grid from '@material-ui/core/Grid';
import backgroundImage from '../../img/bg6.jpg';
import Hidden from '@material-ui/core/Hidden';

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#a6c844'
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#b4b2ae',
      main: '#8b8e91',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#f3aa4e'
    }
    // error: will use the default color
  }
});

const styles = {
  bgimage: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: `rgba(255,255,255, 0.5)`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  },
  grid: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
  // grid: {
  //   // display: 'none',
  //   // [theme.breakpoints.down('xs')]: {
  //   //   display: 'none'
  //   // }
  // }
};

class Home extends Component {
  componentDidMount() {
    const user = {
      userId: this.props.userid
    };
  }

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
            return {
              edamamresult: this.props.edamamresult
            };
          });
        });
        return true; //eslint return warning for arrow fn
      });
  };
  render() {
    if (this.props.loading) {
      return <CircularIndeterminate />;
    }
    // else
    return (
      <div style={styles.bgimage}>
        {/* <div> */}
        {/* <CircularIndeterminate /> */}
        <Grid className={styles.grid} container item xs={12} justify="center">
          <Grid item xs={3} justify="center">
            <Hidden xsDown>
              <MuiThemeProvider theme={theme}>
                <PantryList
                  searchRecipes={this.props.searchRecipes}
                  pantryItems={this.props.pantryItems}
                  setPantryState={this.props.setPantryState}
                  toggleDeletePantryState={this.props.toggleDeletePantryState}
                  userid={this.props.userid}
                />
              </MuiThemeProvider>
            </Hidden>
          </Grid>
          <Grid item xs={8} className="grid">
            <Grid item xs={12}>
              {' '}
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
                    <RecipeCard
                      key={edamamresult.recipe.uri}
                      edamamresult={edamamresult}
                      goBackText="Back to recipes"
                      recipe={edamamresult.recipe}
                      history={this.props.history}
                      redirectTo="/homedetail/2"
                      handleRecipeSave={this.saveRecipe}
                      leftButton={'View'}
                      rightButton={'Save'}
                      onMouseOver={this.onToggleOpen}
                      onMouseOut={this.onToggleOpen}
                    />
                  );
                })}
              </RecipeCardWrapper>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default Home;

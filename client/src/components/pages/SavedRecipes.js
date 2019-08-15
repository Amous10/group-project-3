import React, { Component } from 'react';
import API from '../../services/API';
import RecipeCardWrapper from '../RecipeCardWrapper';
import RecipeCard from '../RecipeCard';
import SavedRecipesHero from '../SavedRecipesHero';
import Grid from '@material-ui/core/Grid';
import ShoppingList from '../ShoppingList';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import backgroundImage from '../../img/cherries.jpg';
import '../List.css';
// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       // light: will be calculated from palette.primary.main,
//       main: '#a6c844'
//       // dark: will be calculated from palette.primary.main,
//       // contrastText: will be calculated to contrast with palette.primary.main
//     },
//     secondary: {
//       light: '#b4b2ae',
//       main: '#8b8e91',
//       // dark: will be calculated from palette.secondary.main,
//       contrastText: '#f3aa4e'
//     }
//     // error: will use the default color
//   }
// });

const styles = {
  bgimage: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: `rgba(255,255,255, 0.5)`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  }
};

class SavedRecipes extends Component {
  state = {
    result: []
  };
  componentDidMount() {
    const user = {
      userId: this.props.userid
    };

    API.getRecipes(user.userId)
      .then(res => this.setState({ result: res.data }))
      .catch(err => console.log(err));
  }
  componentDidUpdate() {
    console.log(this.state.result);
  }
  deleteRecipe = e => {
    // get the id of the recipe when 'delete' is clicked
    const thisCardsId = e.currentTarget.getAttribute('data-id');

    // delete recipe with the given id
    API.deleteRecipe(thisCardsId).then(() => {
      console.log('recipe deleted');
      this.setState(state => {
        // find which recipe to remove from state by finding the recipe in the result array that matches the clicked recipe's id

        const recipeToRemove = state.result.find(recipe => {
          return recipe.uri === thisCardsId;
        });

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
  };
  render() {
    return (
      <div style={styles.bgimage}>
        <React.Fragment>
          <SavedRecipesHero title={'Your Faves!'} />
          <Grid
            className="home-recipes"
            container
            item
            xs={12}
            // justify="center"
          >
            <Grid item xs={9} className="left-grid" style={{ maxWidth: '69%' }}>
              <RecipeCardWrapper
                style={{ maxWidth: '69%' }}
                count={this.state.result.length}
                key={this.state.result._id}
                message={this.state.result === 0 ? 'No saved recipes!' : null}
              >
                {this.state.result.map(result => {
                  return (
                    <RecipeCard
                      key={result._id}
                      recipe={result}
                      history={this.props.history}
                      redirectTo={`/api/recipesdetail/${result._id}`}
                      goBackText="Back to your recipes"
                      link="/api/recipesdetail/"
                      home="/saved"
                      handleRecipeDelete={this.deleteRecipe}
                      leftButton={'View'}
                      rightButton={'Delete'}
                    />
                  );
                })}
              </RecipeCardWrapper>
            </Grid>
            <Grid item xs={3}>
              <ShoppingList
                groceryItems={this.props.groceryItems}
                setGroceryState={this.props.setGroceryState}
                toggleDeleteGroceryState={this.props.toggleDeleteGroceryState}
                userid={this.props.userid}
              />
            </Grid>
          </Grid>
        </React.Fragment>
      </div>
    );
  }
}

export default SavedRecipes;

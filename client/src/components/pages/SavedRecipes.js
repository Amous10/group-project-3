import React, { Component } from 'react';
import API from '../../services/API';
import Container from '../Container';
import Row from '../Row';
import Col from '../Col';
import Alert from '../Alert';
import RecipeCardWrapper from '../RecipeCardWrapper';
import RecipeCardHome from '../RecipeCard';
class Recipes extends Component {
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
    {
      window.$('#foo').modal('open');
    }
  };
  render() {
    return (
      <div>
        {/* <Navbar /> */}
        {/* <Jumbotron /> */}
        <Container>
          <Row>
            <Col>
              <RecipeCardWrapper
                count={this.state.result.length}
                key={this.state.result._id}
                title={'Saved Recipes'}
                message={this.state.result === 0 ? 'No saved recipes!' : null}
              >
                {this.state.result.map(result => {
                  return (
                    <RecipeCardHome
                      key={result._id}
                      recipe={result}
                      history={this.props.history}
                      redirectTo={`/api/recipesdetail/${result._id}`}
                      goBackText="Back to your recipes"
                      link="/api/recipesdetail/"
                      home="/api/recipes"
                      handleRecipeDelete={this.deleteRecipe}
                      leftButton={'View'}
                      rightButton={'Delete'}
                    />
                  );
                })}
              </RecipeCardWrapper>
              <Alert modalMessage={'Recipe deleted!'} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Recipes;

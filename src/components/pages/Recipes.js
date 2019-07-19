import React, { Component } from 'react';
import API from '../../services/API';
import Container from '../Container';
import Row from '../Row';
import Col from '../Col';
import Alert from '../Alert';
import Jumbotron from '../Jumbotron';

import RecipeCardWrapper from '../RecipeCardWrapper';
import RecipeCard from '../RecipeCard';

class Recipes extends Component {
  state = {
    result: []
  };

  componentDidMount() {
    API.getRecipes()
      .then(res => this.setState({ result: res.data }))
      .catch(err => console.log(err));
  }

  componentDidUpdate() {
    console.log(this.state.result);
  }

  deleteRecipe = e => {
    // get the id of the book when 'delete' is clicked
    const thisCardsId = e.target.getAttribute('data-id');
    console.log(thisCardsId);

    // delete book with the given id
    API.deleteRecipe(thisCardsId).then(() => {
      console.log('book deleted');
      this.setState(state => {
        // find which book to remove from state by finding the book in the result array that matches the clicked book's id
        const bookToRemove = state.result.find(book => book.id === thisCardsId);
        // find the index of that book in the result array
        const indexofRecipeToRemove = state.result.indexOf(bookToRemove);
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
        <Jumbotron />
        <Container>
          <Row>
            <Col>
              <RecipeCardWrapper count={this.state.result.length} title={'Saved Recipes'} message={this.state.result === 0 ? 'No saved books!' : null}>
                {this.state.result.map(result => (
                  <RecipeCard
                    key={result.recipe.uri}
                    imgurl={result.recipe.image ? result.recipe.image : 'https://via.placeholder.com/128x193.png/000000/FFFFFF?text=No+Picture!'}
                    label={result.recipe.label}
                    uri={result.recipe.uri}
                    shareurl={result.recipe.url}
                    source={result.recipe.source}
                    yield={result.recipe.yield}
                    calories={result.recipe.calories}
                    handleRecipeSave={this.saveRecipe}
                    leftButton={'View'}
                    rightButton={'Delete'}
                  />
                ))}
              </RecipeCardWrapper>
              <Alert modalMessage={'Recipe Removed From Your Profile!'} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Recipes;

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import API from '../../services/API';
import Container from '../Container';
import { Link } from 'react-router-dom';
import Row from '../Row';
import Col from '../Col';
import Jumbotron from '../Jumbotron';
import RecipeCardWrapper from '../RecipeCardWrapper';
import RecipeCardDetails from '../RecipeCardDetail';

class RecipesD extends Component {
  state = {
    result: [],
    home: '',
    hometext: '',
    redirect: false,
    edamamresult: []
  };

  componentDidUpdate() {
    console.log(this.state.result);
  }

  deleteRecipe = e => {
    // get the id of the recipe when 'delete' is clicked
    const thisCardsId = e.currentTarget.getAttribute('data-id');
    console.log('this card', thisCardsId);
    // delete recipe with the given id

    {
      window.$('#foo').modal('open');
    }
  };
  render() {
    console.log('props', this.props);
    const { result: recipe, goBackText } = this.props.location.state;

    return (
      <div>
        {/* <Navbar /> */}

        <Jumbotron />

        <h2 onClick={() => this.props.history.goBack()}>← {goBackText}</h2>

        <Container>
          <Row>
            <Col>
              <RecipeCardDetails
                key={recipe.uri}
                recipe={recipe}
                leftButton={'View'}
                rightButton={'Delete'}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default RecipesD;

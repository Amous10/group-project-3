import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
// import API from '../../services/API';
import Container from '../Container';
// import { Link } from 'react-router-dom';
import Row from '../Row';
import Col from '../Col';
import Jumbotron from '../Jumbotron';
// import RecipeCardWrapper from '../RecipeCardWrapper';
import RecipeCardDetails from '../RecipeCardDetails';
import Grid from '@material-ui/core/Grid';

class RecipeDetails extends Component {
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

    // {
    //   window.$('#foo').modal('open');
    // }
  };
  render() {
    console.log('props', this.props);
    const { result: recipe, goBackText } = this.props.location.state;

    return (
      <div>
        {/* <Navbar /> */}

        <h5
          style={{ color: '#389636', textAlign: 'left', marginLeft: 10 }}
          onClick={() => this.props.history.goBack()}
        >
          ← {goBackText}
        </h5>

        <Grid container item xs={12} justify="center">
          <RecipeCardDetails
            key={recipe.uri}
            recipe={recipe}
            leftButton={'View'}
            rightButton={'Delete'}
          />
        </Grid>
      </div>
    );
  }
}

export default RecipeDetails;

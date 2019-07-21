import React, { Component } from "react";
import API from "../../services/API";
import Container from "../Container";
import { Link } from "react-router-dom";
import Row from "../Row";
import Col from "../Col";
import Jumbotron from "../Jumbotron";
import RecipeCardWrapper from "../RecipeCardWrapper";
import RecipeCardDetails from "../RecipeCardDetail";
class RecipesD extends Component {
  state = {
    result: [],
    home:"",
    hometext:""
  };
  componentDidMount() {
    console.log("RecipeD is here");
    if (this.props.match.params.id ==2){
    this.setState({result: this.props.location.state.result });
   
    let home ="/";
    let hometext = "Back to Search ";
    this.setState({home: home, hometext: hometext});
  }
    const user = {
      userId: this.props.userid
    };
    console.log("inside recipesd", this.props.match.params.id);
    console.log("inside recipesdPropState", this.props.location.state);
   
    let passId = this.props.match.params.id;
    console.log("Mystate", this.state.result) ;
    if(passId !=2) {
      API.getRecipesD(this.props.match.params.id)
        .then(res =>{ this.setState({ result: res.data })
           let home ="/api/recipes";
           let hometext = "Back to Saved Recipes";
          
          this.setState({home: home, hometext: hometext});
           return console.log("setting state",this.state.result )
      })
       
       
        .catch(err => console.log(err));}

        
  }

  componentDidUpdate() {
    console.log(this.state.result);
  }
  deleteRecipe = e => {
    // get the id of the recipe when 'delete' is clicked
    const thisCardsId = e.currentTarget.getAttribute("data-id");
    console.log("this card", thisCardsId);
    // delete recipe with the given id

    {
      window.$("#foo").modal("open");
    }
  };
  render() {
    return (
      <div>
        {/* <Navbar /> */}
        
        <Jumbotron />
        <Link to={this.state.home}>
          <h2>← {this.state.hometext}</h2>
        </Link>
        <Container>
          <Row>
            <Col>
              <RecipeCardDetails
                key={this.state.result._id}
                imgurl={this.state.result.image ? this.state.result.image : 'https://via.placeholder.com/128x193.png/000000/FFFFFF?text=No+Picture!'}
                label={this.state.result.label}
                uri={this.state.result.uri}
                shareurl={this.state.result.url}
                source={this.state.result.source}
                yield={this.state.result.yield}
                calories={this.state.result.calories}
                healthLabels={this.state.result.healthLabels}
                dietLabels={this.state.result.dietLabels}
                ingredientLines={this.state.result.ingredientLines}
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

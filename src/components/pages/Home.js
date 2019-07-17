import React, { Component } from 'react';
import API from '../../services/API';
import Image from '../Image';
// import Navbar from '../Nav';
import Container from '../Container';
import Row from '../Row';
import Jumbotron from '../Jumbotron';
import Col from '../Col';
import Searchbar from '../Searchbar';
import SearchFood from '../SearchFood';
import Card from '../Card';
import CardWrapper from '../CardWrapper';
import RecipeCard from '../RecipeCard';
import RecipeCardWrapper from '../RecipeCardWrapper';
import { Modal, Button } from 'react-materialize';
import Alert from '../Alert';
// import ToDo from '../ToDo/ToDo';
import TodoList from '../TodoList/TodoList';

class Home extends Component {
  state = {
    result: [],
    edamomresult: [],
    search: '',
    searchfood: '',
    loading: false
  };

  searchBooks = query => {
    // start UI spinner
    this.setState({ loading: true, result: [] });

    // make a call to google books api
    API.callGoogle(query).then(books => {
      // if the response is > 0
      if (books.data.length > 0) {
        // stop the UI spinner
        this.setState({ loading: false });
        console.log(books.data);

        // make a call to my database and retrieve all books stored
        API.getBooks({}).then(dbBooks => {
          // empty array to hold all of the books
          const dbBooksIds = [];
          // iterate over stored books and push book ids to empty array
          dbBooks.data.forEach(book => {
            dbBooksIds.push(book.bookId);
          });
          // filter all of the stored books and return books where stored book id doesn't match id coming from google api call
          const filteredBooks = books.data.filter(
            book => !dbBooksIds.includes(book.id)
          );

          //  set new state for result
          this.setState({
            result: filteredBooks
          });
        });
        // .catch(err => {
        //     console.log(err)
        // })
      } else {
        this.setState({
          books: []
        });
      }
    });
  };

  searchRecipes = query => {
    // start UI spinner
    this.setState({ loading: true, edamomresult: [] });

    // make a call to food2fork api
    API.callFood2Fork(query).then(recipes => {
      if (recipes.data.length > 0) {
        // stop the UI spinner
        this.setState({ loading: false });
        console.log('recipes data: ', recipes.data);

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
            recipe => !dbFoodsIds.includes(recipe.id)
          );
          // console.log('filteredFoods: ', filteredFoods);
          //  set new state for result
          this.setState({
            edamomresult: filteredFoods
          });
        });
        // .catch(err => {
        //     console.log(err)
        // })
      } else {
        this.setState({
          recipes: []
        });
      }
    });
  };

  handleInputChange = e => {
    const value = e.target.value;
    // const name = e.target.name;
    this.setState({
      search: value
    });
  };
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
    console.log(this.state.search);
    this.setState({
      searchfood: ''
    });
  };

  // When the form is submitted, search the API for the value of `this.state.search`
  handleFormSubmit = e => {
    e.preventDefault();
    // run google call with search parameter
    this.searchBooks(this.state.search);
    console.log(this.state.search);
    this.setState({
      search: ''
    });
  };

  saveBook = e => {
    // get the id of the book when 'save' is clicked
    const thisCardsId = e.target.getAttribute('data-id');
    console.log('bookdata', this.saveBook);
    console.log(thisCardsId);

    const newSavedBook = this.state.result;
    // filter this.state.result to return books where the id is the same as the book clicked
    newSavedBook
      .filter(result => result.id === thisCardsId)
      // then map over book and create a new object to send to the database
      .map(book => {
        const newBook = {
          userid: this.props.userid,
          bookId: book.id,
          title: book.volumeInfo.title,
          authors: book.volumeInfo.authors,
          description: book.volumeInfo.description,
          image: book.volumeInfo.imageLinks
            ? book.volumeInfo.imageLinks.smallThumbnail
            : null,
          link: book.volumeInfo.infoLink
        };
        // save book then remove from the result state
        API.saveBook(newBook).then(() => {
          console.log('this.props.userid: ', this.props.userid);
          this.setState(state => {
            // find which book to remove from state by finding the book in the result array that matches the clicked book
            const bookToRemove = state.result.find(
              book => book.id === newBook.bookId
            );
            // find the index of that book in the result array
            const indexofBookToRemove = state.result.indexOf(bookToRemove);
            // then delete that one item
            state.result.splice(indexofBookToRemove, 1);
            // update the state
            return {
              result: state.result
            };
          });
        });
      });
    // perform modal dialogue
    {
      window.$('#foo').modal('open');
    }
  };

  saveRecipe = e => {
    // get the id of the book when 'save' is clicked
    const thisCardsId = e.target.getAttribute('data-id');
    console.log('recipe card id: ', thisCardsId);

    const newSavedRecipe = this.state.result;
    // filter this.state.result to return recipes where the id is the same as the recipe clicked
    newSavedRecipe
      .filter(result => result.id === thisCardsId)
      // then map over recipe and create a new object to send to the database
      .map(recipe => {
        const newRecipe = {
          userid: this.props.userid,
          recipeId: recipe.id,
          label: recipe.recipe.label,
          uri: recipe.recipe.uri
        };
        console.log('newRecipe: ', newRecipe);
        // save recipe then remove from the result state
        API.saveRecipe(newRecipe).then(() => {
          console.log('this.props.userid: ', this.props.userid);
          this.setState(state => {
            // find which recipe to remove from state by finding the recipe in the result array that matches the clicked recipe
            const recipeToRemove = state.result.find(
              recipe => recipe.id === newRecipe.recipeId
            );
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
      });
    // perform modal dialogue
    {
      window.$('#foo').modal('open');
    }
  };

  render() {
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
          <Searchbar
            value={this.state.search}
            handleInputChange={this.handleInputChange}
            handleFormSubmit={this.handleFormSubmit}
          />
        </Jumbotron>
        <Jumbotron>
          <SearchFood
            value={this.state.searchfood}
            handleInputChangeFood={this.handleInputChangeFood}
            handleFormSubmitFood={this.handleFormSubmitFood}
          />
        </Jumbotron>
        <TodoList />

        <Container>
          <Row>
            <Col>
              <CardWrapper
                count={this.state.result.length}
                title={'Results'}
                message={
                  this.state.result === 0
                    ? 'Enter your ingredients to search for recipes'
                    : null
                }
              >
                {this.state.result.map(result => (
                  <Card
                    key={result.id}
                    url={
                      result.volumeInfo.imageLinks
                        ? result.volumeInfo.imageLinks.smallThumbnail
                        : 'https://via.placeholder.com/128x193.png/000000/FFFFFF?text=No+Picture!'
                    }
                    name={result.volumeInfo.title}
                    author={result.volumeInfo.authors}
                    infoLink={result.volumeInfo.infoLink}
                    desc={
                      result.volumeInfo.description
                        ? result.volumeInfo.description
                        : 'No description'
                    }
                    handleBookSave={this.saveBook}
                    id={result.id}
                    leftButton={'View'}
                    rightButton={'Save'}
                  />
                ))}
              </CardWrapper>
              <Alert modalMessage={'Book added to saved page!'} />
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col>
              <RecipeCardWrapper
                count={this.state.edamomresult.length}
                title={'Results'}
                message={
                  this.state.edamomresult === 0
                    ? 'Enter your ingredients to search for recipes'
                    : null
                }
              >
                {this.state.edamomresult.map(edamomresult => (
                  <RecipeCard
                    key={edamomresult.recipe.uri}
                    imgurl={
                      edamomresult.recipe.image
                        ? edamomresult.recipe.image
                        : 'https://via.placeholder.com/128x193.png/000000/FFFFFF?text=No+Picture!'
                    }
                    label={edamomresult.recipe.label}
                    uri={edamomresult.recipe.uri}
                    shareurl={edamomresult.recipe.url}
                    source={edamomresult.recipe.source}
                    yield={edamomresult.recipe.yield}
                    calories={edamomresult.recipe.calories}
                    handleRecipeSave={this.saveRecipe}
                    leftButton={'View'}
                    rightButton={'Save'}
                  />
                ))}
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

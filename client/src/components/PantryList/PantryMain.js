// external dependencies
import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';
import ListIcon from 'material-ui/svg-icons/action/list';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import uuid from 'uuid';
import { grey700 } from 'material-ui/styles/colors';

//internal dependecies
import AddFood from './AddFood';
import PantryList from './PantryList';

injectTapEventPlugin();

class PantryMain extends Component {
  constructor() {
    super();
    this.state = {
      foods: [],
      open: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }
  handleClick(food) {
    console.log(this.state);
    this.setState({
      foods: [
        ...this.state.foods,
        {
          id: uuid(),
          task: food,
          checked: false
        }
      ]
    });
  }

  handleRemove(id) {
    const finalFoods = this.state.foods.filter(food => {
      if (food.id != id) return food;
    });
    this.setState({
      foods: finalFoods,
      open: true
    });
  }

  handleCheck(id) {
    const finalFoods = this.state.foods.map(food => {
      if (food.id === id) {
        food.checked = !food.checked;
      }
      return food;
    });
    this.setState({
      foods: finalFoods
    });
  }

  handleRequestClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    return (
      <MuiThemeProvider>
        <Paper
          style={{
            paddingBottom: '20px',
            marginTop: 100,
            marginBottom: 100,
            marginRight: 20,
            marginLeft: 40
          }}
        >
          <div
            style={{
              display: 'flex'
            }}
          >
            <div style={{ marginLeft: '44%' }}>
              <h1 style={{ textAlign: 'center', color: grey700 }}>
                Pantry List
              </h1>
            </div>
            <div style={{ marginRight: '10%', marginTop: 13 }}>
              <IconButton>
                <ListIcon />
              </IconButton>
            </div>
          </div>

          <PantryList
            foods={this.state.foods}
            handleRemove={this.handleRemove}
            handleCheck={this.handleCheck}
          />
          <br />
          <div style={{ marginLeft: '5%' }}>
            <AddFood handleClick={this.handleClick} />
          </div>
          <Snackbar
            open={this.state.open}
            message="Food Item deleted"
            autoHideDuration={2000}
            onRequestClose={this.handleRequestClose}
          />
        </Paper>
      </MuiThemeProvider>
    );
  }
}

export default PantryMain;

// external dependencies
import React, { Component, PropTypes } from 'react';
import List from 'material-ui/List';
// internal dependecies
import FoodItem from './FoodItem';

class PantryList extends Component {
  static propTypes = {
    handleRemove: PropTypes.func,
    handleCheck: PropTypes.func,
    foods: PropTypes.array
  };

  constructor(props) {
    super(props);
  }
  render() {
    const { handleRemove, handleCheck, foods } = this.props;

    var foodNode = foods.map(food => {
      return (
        <FoodItem
          key={food.id}
          food={food.task}
          id={food.id}
          checked={food.checked}
          handleRemove={handleRemove}
          handleCheck={handleCheck}
        />
      );
    });
    return (
      <List style={{ marginLeft: '5%' }}>
        <ul>{foodNode}</ul>
      </List>
    );
  }
}

export default PantryList;

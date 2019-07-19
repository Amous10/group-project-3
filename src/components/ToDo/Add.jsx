import React, { Component } from 'react';
import uniqid from 'uniqid';

class Add extends Component {
  constructor() {
    super();
    this.state = { newAdd: {} };
  }

  submitHandler = e => {
    if (this.refs.task.value === '') {
      alert('Please select items');
      return;
    }
    this.setState(
      { newAdd: { text: this.refs.task.value, done: false } },
      function() {
        this.props.addHandler(this.state.newAdd);
      }
    );
    this.refs.task.value = '';
    e.preventDefault();
  };

  render() {
    return (
      <form className="col s12">
        <div className="input-field center-align col s6">
          <label id="inputLabel" htmlFor="PANTRY ITEMS">
            ENTER INGREDIENTS
          </label>
          <input
            id="food-item"
            name="task"
            type="text"
            ref="task"
            //   className="teal-text accent-2"
            onSubmit={this.props.addHandler.bind(this)}
          />{' '}
          <a
            className="waves-effect waves-light btn-small teal lighten-2"
            onClick={this.submitHandler.bind(this)}
          >
            SEARCH RECIPES
          </a>
        </div>
      </form>
    );
  }
}

export default Add;

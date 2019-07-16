import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class AddTodo extends Component {
  state = {
    title: ''
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.addTodo(this.state.title);
    this.setState({ title: '' });
  };

  onChange = e => this.setState({ title: e.target.value });

  render() {
    return (
      <form
        onSubmit={this.onSubmit}
        style={{ display: 'flex', marginBottom: '.5rem' }}
      >
        <input
          type="text"
          name="title"
          style={{ flex: '6', padding: '0px', margin: '0px 5px 0px 5px' }}
          placeholder="Add Ingredient..."
          value={this.state.title}
          onChange={this.onChange}
        />
        <input
          type="submit"
          value="Submit"
          className="SubmitBtn"
          style={{ flex: '1' }}
        />
      </form>
    );
  }
}

// PropTypes
AddTodo.propTypes = {
  addTodo: PropTypes.func.isRequired
};

export default AddTodo;

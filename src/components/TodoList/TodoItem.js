import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { styles } from './style';
// import Materialize from 'react-materialize';

const Checkbox = {
  position: 'relative',
  opacity: '10px',
  background: '#69696e',
  borderRadius: 'none'
};

const DeleteBtn = {
  background: '#85868d',
  padding: '.25rem',
  margin: '0',
  float: 'right',
  height: '1rem',
  borderRadius: '0px',
  borderColor: '#69696e'
};

export class TodoItem extends Component {
  getStyleSelected = () => {
    return {
      background: '#F4F4F4',
      padding: '10px',
      margin: '3px',
      borderBottom: '1px #ccc dotted',
      color: this.props.todo.completed ? 'green' : 'none'
    };
  };

  render() {
    const { id, title, completed } = this.props.todo;
    return (
      <div style={this.getStyleSelected()}>
        <p>
          <input
            type="checkbox"
            style={Checkbox}
            onChange={this.props.markComplete.bind(this, id)}
            checked={completed ? 'checked' : ''}
          />{' '}
          {title}
          <button
            onClick={this.props.delTodo.bind(this, id)}
            style={DeleteBtn}
            // text={'x'}
          >
            <i class="fa fa-trash" aria-hidden="true" />
          </button>
        </p>
      </div>
    );
  }
}

// PropTypes
TodoItem.PropTypes = {
  todos: PropTypes.object.isRequired,
  markComplete: PropTypes.func.isRequired,
  delTodo: PropTypes.func.isRequired
};

export default TodoItem;

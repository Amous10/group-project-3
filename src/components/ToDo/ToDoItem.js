import React, { Component } from 'react';

class ToDoItem extends Component {
  render() {
    return (
      <label id="todoList">
        <input
          type="checkbox"
          ref="status"
          onClick={() => {
            this.props.statChange(this.props.task);
          }}
        />
        <span>{this.props.task}</span>
        <br />
      </label>
    );
  }
}

export default ToDoItem;

// import React from 'react';

// function ToDoItem(props) {
//   return (
//     <div className="todo-item">
//       <input
//         type="checkbox"
//         style={{ opacity: '10px' }}
//         checked={props.item.completed}
//         onChange={() => props.handleChange(props.item.id)}
//       />
//       <p>{props.item.text}</p>
//     </div>
//   );
// }

// export default ToDoItem;

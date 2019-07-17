import React, { Component } from 'react';
import ToDoItem from './ToDoItem';

class List extends Component {
  render() {
    let listJSX;
    if (this.props.toDoList.length <= 0) {
      listJSX = <h3>Loading...</h3>;
    } else {
      listJSX = this.props.toDoList.map(element => {
        return (
          <div>
            <ToDoItem
              key={element.text}
              task={element.text}
              status={element.done}
              statChange={this.props.statChange}
            />
            {/* <a
              className="waves-effect waves-light btn-small teal lighten-2"
              onClick={this.submitHandler.bind(this)}
            >
              SEARCH RECIPES
            </a> */}
          </div>
        );
      });
    }
    return <div>{listJSX}</div>;
  }
}

export default List;

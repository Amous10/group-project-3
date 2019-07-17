import React, { Component } from 'react';
import axios from 'axios';
import './index.css';
import List from './List';
import Add from './Add';

class ToDo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toDoList: [],
      checked: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5050/').then(response => {
      this.setState({
        toDoList: response.data
      });
    });
  }

  addHandler = task => {
    axios
      .post('http://localhost:5050/', task)
      .then(response => {
        let tempTodo = {
          text: response.data.text,
          done: response.data.done
        };
        let tempArray = this.state.toDoList;
        tempArray.push(tempTodo);
        this.setState({
          toDoList: tempArray
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  statChange = id => {
    let completed = this.state.toDoList;
    completed.forEach(task => {
      if (task) {
        console.log(task);
      }
    });
  };

  // statChange = id => {
  //   this.setState({
  //     todos: this.state.todos.filter(todo => {
  //       if (todo.id === id) todo.completed = !todo.completed;
  //       return todo;
  //     })
  //   });
  // };

  deleteAll = () => {
    //to debug...
    if (!this.state.status === false) {
      this.setState({ toDoList: [] });
    }
    return;
  };

  render() {
    return (
      <div className="flex-container">
        <div className="toDoApp">
          <h1> FOOD ITEMS ON HAND</h1>
          <Add addHandler={this.addHandler} />
          <List
            toDoList={this.state.toDoList}
            status={this.state.status}
            statChange={this.statChange}
          />
          <a
            onClick={this.deleteAll}
            id="trash"
            className="btn-floating btn-small waves-effect waves-light teal lighten-2"
          >
            <i className="material-icons trash">delete_forever</i>
          </a>
        </div>
      </div>
    );
  }
}

export default ToDo;

// import React from 'react';
// import ToDoItem from './ToDoItem';
// import todosData from './todosData';
// import './style.css';

// class ToDo extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       todos: todosData
//     };
//     this.handleChange = this.handleChange.bind(this);
//   }

//   handleChange(id) {
//     this.setState(prevState => {
//       const updatedTodos = prevState.todos.map(todo => {
//         if (todo.id === id) {
//           todo.completed = !todo.completed;
//         }
//         return todo;
//       });
//       return {
//         todos: updatedTodos
//       };
//     });
//   }

//   render() {
//     const todoItems = this.state.todos.map(item => (
//       <ToDoItem key={item.id} item={item} handleChange={this.handleChange} />
//     ));

//     return <div className="todo-list">{todoItems}</div>;
//   }
// }
// export default ToDo;

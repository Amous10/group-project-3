// Importing Components
import React, { Component } from 'react';
import Todos from './Todos';
import AddTodo from './AddTodo';
import axios from 'axios';
import Checkbox from './Checkbox';

const Form = {
  width: '50%',
  padding: '0px'
};

class TodoList extends Component {
  state = {
    todos: []
  };

  componentDidMount() {
    axios
      .get('https://jsonplaceholder.typicode.com/todos?_limit=10') //change to user food-item collection from db
      .then(res => this.setState({ todos: res.data }));
  }
  // Toggle Complete
  markComplete = id => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) todo.completed = !todo.completed;
        return todo;
      })
    });
  };

  // Delete Todo
  delTodo = id => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`).then(res =>
      this.setState({
        todos: [...this.state.todos.filter(todo => todo.id !== id)]
      })
    );
  };

  addTodo = title => {
    // const newTodo = {
    //   id: uuid.v4(),
    //   title: title,
    //   completed: false
    // }
    // this.setState({ todos: [...this.state.todos, newTodo]})

    axios
      .post('https://jsonplaceholder.typicode.com/todos', {
        title: title,
        completed: false
      })
      .then(res =>
        this.setState({
          todos: [...this.state.todos, res.data]
        })
      );
  };

  render() {
    return (
      <form style={Form}>
        <React.Fragment>
          <AddTodo addTodo={this.addTodo} />
          <Checkbox />
          <Todos
            todos={this.state.todos}
            markComplete={this.markComplete}
            delTodo={this.delTodo}
          />
        </React.Fragment>
      </form>
    );
  }
}

export default TodoList;

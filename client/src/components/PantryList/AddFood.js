import React, { Component, PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class AddFood extends Component {
//   static propTypes = {
//     handleClick: PropTypes.func
//   };

//   constructor() {
//     super();
//     this.onClick = this.onClick.bind(this);
    state = {
      inputValue: ''
    };
  }

  onClick(event) {
    event.preventDefault();
    var food = this.state.inputValue;
    if (food == '') return;
    else {
      var form = document.getElementById('myForm');
      form.reset();
      this.props.handleClick(food);
      this.state.inputValue = '';
    }
  }

  render() {
    const { handleClick } = this.props;
    return (
      <MuiThemeProvider>
        <div>
          <form id="myForm">
            <Paper style={{ width: '90%', leftMargin: '15px' }} zDepth={1}>
              <div style={{ marginLeft: '10px' }}>
                <TextField
                  hintText="What needs to be done?"
                  className="AddText"
                  fullWidth={true}
                  onChange={e => this.setState({ inputValue: e.target.value })}
                />
              </div>
            </Paper>
            <br />
            <RaisedButton
              type="submit"
              label="Add food"
              primary={true}
              onClick={this.onClick}
            />
          </form>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default AddFood;

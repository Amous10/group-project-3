import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';

const styles = {
  done: {
    color: '#94d162',
    display: 'flex',
    width: '100%'
  },
  mute: {
    opacity: '.5',
    display: 'flex',
    width: '100%'
  },
  header: {
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '10px'
  },
  main: {
    margin: 30,
    width: '100%',
    minHeight: '700px',
    maxWidth: '340px',
    // backgroundColor: '#deebdd',
    backgroundColor: 'whitesmoke',
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderColor: '#c9cac8',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0
  },
  card: {
    padding: '10px',
    margin: '10px 10px'
  },
  todo: {
    position: 'relative',
    display: 'flex',
    flexFow: 'row',
    alignContent: 'space-between'
  },
  label: {
    display: 'flex',
    width: '80%'
  },
  divider: {
    position: 'absolute',
    width: '100%',
    top: 0
  },
  title: {
    fontFamily: 'Satisfy',
    marginBottom: '15px',
    fontSize: '35px'
  }
};

class TodoComponent extends React.Component {
  state = {
    tasks: [],
    newTask: '',
    queryString: []
  };

  componentDidMount() {
    try {
      if (this.props.tasks) {
        this.setState({ tasks: this.props.tasks });
      }
      // console.log('this.props.tasks on Update: ', this.props.tasks);
    } catch (e) {
      console.log('error');
    }
  }
  onTextUpdate = e => {
    if (e.target.value.match('^[a-zA-Z ]*$') != null) {
      this.setState({ newTask: e.target.value });
    }
  };

  addTask = () => {
    let { tasks, newTask } = this.state;
    tasks.push({ text: newTask, done: true });
    this.setState({ tasks: tasks, newTask: '' });
  };

  keyPress = e => {
    if (e.key === 'Enter') {
      this.addTask();
    }
  };
  selectedFoods = () => {
    // let { tasks, queryString } = this.state;
    let { tasks } = this.state;
    let query = tasks
      .filter(items => items.done)
      .map(item => item.text)
      .toString();

    // console.log('String to Query', query);
    this.props.setTasks(tasks);

    this.props.searchRecipes(query);
    // this.setState({ queryString: '' });
  };

  deleteTask = task => {
    let { tasks } = this.state;
    tasks.splice(tasks.indexOf(task), 1);
    this.setState({ tasks: tasks, newTask: '' });
  };

  toggle = task => {
    let { tasks } = this.state;

    tasks[tasks.indexOf(task)].done = !tasks[tasks.indexOf(task)].done;
    this.setState({ tasks: tasks, newTask: '' });
  };

  render() {
    const { tasks, newTask } = this.state;

    return (
      <div id="main" style={styles.main}>
        <Typography variant="h5" style={styles.title}>
          Your Pantry
        </Typography>
        <header style={styles.header}>
          <TextField
            label="ADD FOOD ITEM"
            value={newTask}
            onChange={this.onTextUpdate}
            onKeyPress={this.keyPress}
          />
          <Button
            variant="raised"
            color="primary"
            disabled={!newTask}
            onClick={this.addTask}
          >
            Add
          </Button>
        </header>
        {tasks.length > 0 && (
          <Card style={styles.card}>
            <FormGroup>
              {tasks.map((task, index) => (
                <div key={index} style={styles.todo}>
                  {index > 0 ? <Divider style={styles.divider} /> : ''}
                  <FormControlLabel
                    control={
                      <Switch
                        color="primary"
                        checked={task.done}
                        onChange={() => this.toggle(task)}
                      />
                    }
                    label={task.text}
                    style={task.done ? styles.done : styles.mute}
                  />
                  <Tooltip title="Delete food" placement="top">
                    <IconButton
                      aria-label="delete"
                      onClick={() => this.deleteTask(task)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              ))}
            </FormGroup>
          </Card>
        )}
        <Button onClick={this.selectedFoods}>Search</Button>
      </div>
    );
  }
}

export default TodoComponent;

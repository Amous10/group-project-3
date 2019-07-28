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
import API from '../services/API';
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
    width: '100%',
    minHeight: '700px',
    maxWidth: '340px',
    margin: '10px 10px',
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
    newPantryItem: ''
  };

  savePantry = obj => {
    const newSavedPantry = {
      userId: this.props.userid,
      pantryItems: obj
    };

    console.log('newSavedPantry', newSavedPantry);
    // save recipe then remove from the result state
    API.savePantry(newSavedPantry).then(response => {
      this.setState({ newPantryItem: '' });
      console.log('response.data after API Save Pantry: ', response.data);
    });
  };

  onTextUpdate = e => {
    if (e.target.value.match('^[a-zA-Z ]*$') != null) {
      this.setState({ newPantryItem: e.target.value });
    }
  };

  addItem = () => {
    let { newPantryItem } = this.state;
    // this.props.setPantryState(newPantryItem);
    let itemObj = { text: newPantryItem, done: true };
    this.props.setPantryState(itemObj);
    this.savePantry(itemObj);
  };

  keyPress = e => {
    if (e.key === 'Enter') {
      this.addItem();
    }
  };
  selectedFoods = () => {
    let { pantryItems } = this.props;

    let query = pantryItems
      .filter(items => items.done)
      .map(item => item.text)
      .toString();

    this.props.searchRecipes(query);
  };

  deleteItem = item => {
    let { pantryItems } = this.props;
    pantryItems.splice(pantryItems.indexOf(item), 1);
    this.setState({ newPantryItem: '' });
    this.props.toggleDeletePantryState(pantryItems);
  };

  toggle = item => {
    let { pantryItems } = this.props;
    pantryItems[pantryItems.indexOf(item)].done = !pantryItems[
      pantryItems.indexOf(item)
    ].done;
    this.setState({ newPantryItem: '' });
    this.props.toggleDeletePantryState(pantryItems);
  };

  render() {
    const { newPantryItem } = this.state;
    const { pantryItems } = this.props;

    return (
      <div id="main" style={styles.main}>
        <Typography variant="h5" style={styles.title}>
          Your Pantry
        </Typography>
        <header style={styles.header}>
          <TextField
            label="ADD FOOD ITEM"
            value={newPantryItem}
            onChange={this.onTextUpdate}
            onKeyPress={this.keyPress}
          />
          <Button
            variant="raised"
            color="primary"
            disabled={!newPantryItem}
            onClick={this.addItem}
          >
            Add
          </Button>
        </header>
        {pantryItems.length > 0 && (
          <Card style={styles.card}>
            <FormGroup>
              {pantryItems.map((item, index) => (
                <div key={index} style={styles.todo}>
                  {index > 0 ? <Divider style={styles.divider} /> : ''}
                  <FormControlLabel
                    control={
                      <Switch
                        color="primary"
                        checked={item.done}
                        onChange={() => this.toggle(item)}
                      />
                    }
                    label={item.text}
                    style={item.done ? styles.done : styles.mute}
                  />
                  <Tooltip title="Delete food" placement="top">
                    <IconButton
                      aria-label="delete"
                      onClick={() => this.deleteItem(item)}
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

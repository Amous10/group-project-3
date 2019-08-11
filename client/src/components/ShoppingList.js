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
import './List.css';
import API from '../services/API';
const styles = {
  done: {
    color: '#3f51b5',
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
  mainShopping: {
    // position: 'absolute',
    marginTop: '50px',
    // marginLeft: 'auto',
    // width: '100%',
    minHeight: '700px',
    maxWidth: '340px',
    backgroundColor: '#fcf8c7',
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
    fontSize: '35px',
    color: '#3f51b5'
  }
};

class ShoppingList extends React.Component {
  state = {
    newGroceryItem: ''
  };

  saveGrocery = obj => {
    const newSavedGrocery = {
      userId: this.props.userid,
      groceryItems: obj
    };

    // save recipe then remove from the result state
    if (this.props.userid != null) {
      API.saveGrocery(newSavedGrocery).then(response => {
        this.setState({ newGroceryItem: '' });
        console.log('response.data after API Save Grocery: ', response.data);
      });
    }
  };

  onTextUpdate = e => {
    if (e.target.value.match('^[a-zA-Z ]*$') != null) {
      this.setState({ newGroceryItem: e.target.value });
    }
  };

  addItem = () => {
    let { newGroceryItem } = this.state;
    if (newGroceryItem !== '') {
      let itemObj = { text: newGroceryItem, done: true };
      this.props.setGroceryState(itemObj);
      this.saveGrocery(itemObj);
    }
  };

  keyPress = e => {
    if (e.key === 'Enter') {
      this.addItem();
    }
  };

  deleteItem = item => {
    let { groceryItems } = this.props;
    groceryItems.splice(groceryItems.indexOf(item), 1);
    this.setState({ newGroceryItem: '' });
    this.props.toggleDeleteGroceryState(groceryItems);
  };

  toggle = item => {
    let { groceryItems } = this.props;
    groceryItems[groceryItems.indexOf(item)].done = !groceryItems[
      groceryItems.indexOf(item)
    ].done;
    this.setState({ newGroceryItem: '' });
    this.props.toggleDeleteGroceryState(groceryItems);
  };

  render() {
    const { newGroceryItem } = this.state;
    const { groceryItems } = this.props;

    return (
      <div id="mainShopping" style={styles.mainShopping}>
        <Typography variant="h5" style={styles.title}>
          Shopping List
        </Typography>
        <header style={styles.header}>
          <TextField
            label="ADD ITEM"
            value={newGroceryItem}
            onChange={this.onTextUpdate}
            onKeyPress={this.keyPress}
          />
          <Button
            variant="raised"
            color="primary"
            disabled={!newGroceryItem}
            onClick={this.addItem}
          >
            Add
          </Button>
        </header>
        {groceryItems.length > 0 && (
          <Card style={styles.card}>
            <FormGroup>
              {groceryItems.map((item, index) => (
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
      </div>
    );
  }
}

export default ShoppingList;

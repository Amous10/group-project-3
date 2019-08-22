import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    margin: '30px 0 0 0',
    [theme.breakpoints.down('xs')]: {
      // marginLeft: '100px'
      minWidth: 333
    }
  },
  item: {
    [theme.breakpoints.down('xs')]: {
      marginLeft: 110,
      minWidth: 333
      // backgroundColor: 'red'
    }
  }
}));

// const RecipeCardWrapper = props => {
const RecipeCardWrapper = props => {
  const classes = useStyles();
  console.log('props.children', props.children);

  return (
    <Grid container className={classes.root} spacing={2}>
      {props.message}
      {props.children.map((value, i) => (
        <Grid
          className={classes.item}
          // justifyContent="center"
          xs={12}
          sm={4}
          md={4}
          lg={3}
          key={value.key}
          item
        >
          {value}
        </Grid>
      ))}
    </Grid>
  );
};

export default RecipeCardWrapper;

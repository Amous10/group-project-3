import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    // border: '2px solid #69cc02'
    width: '70%',
    marginLeft: 420,
    marginRight: 20
  },

  control: {
    padding: theme.spacing(2)
  }
}));

// const RecipeCardWrapper = props => {
const RecipeCardWrapper = props => {
  const [spacing] = React.useState(2);
  const classes = useStyles();
  console.log('props.children', props.children);

  return (
    <Grid container className={classes.root} justify="center" spacing={2}>
      {/* <Grid item xs={12}> */}
      {/* <Grid container justify="center" spacing={spacing}> */}
      {props.children.map((value, i) => (
        <Grid xs={3} key={value.key} item>
          {value}
        </Grid>
      ))}
    </Grid>
    // </Grid>
    // </Grid>
  );
};

export default RecipeCardWrapper;

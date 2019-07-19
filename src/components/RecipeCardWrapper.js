import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    // display: 'flex !important',
    // flexWrap: 'nowrap !important',
    flexGrow: 1,
    border: '3px solid green'
  },
  paper: {
    height: 300,
    width: 300
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
    <Grid container className={classes.root} spacing={2}>
      {/* <Grid item xs={12}> */}
      {/* <Grid container justify="center" spacing={spacing}> */}
      {/* {[props.children].map(value => ( */}
      {props.children.map((value, i) => (
        <Grid xs={4} key={value.key} item>
          {console.log('value: ', value)}
          {/* <Paper className={classes.paper}> */}
          {/* <div className={classes.paper}>{props.children}</div> */}
          {value}
          {/* </Paper> */}
        </Grid>
      ))}
      {/* </Grid> */}
      {/* </Grid> */}
    </Grid>
  );
};

export default RecipeCardWrapper;

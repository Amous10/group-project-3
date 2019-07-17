import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    // display: 'flex',
    // flexWrap: 'nowrap',
    // flexGrow: 1,
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

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={4}>
        <Grid container justify="center" spacing={spacing}>
          {[props.children].map(value => (
            <Grid key={value} item>
              {/* <Paper className={classes.paper}> */}
              {/* <div className={classes.paper}>{props.children}</div> */}
              {props.children}
              {/* </Paper> */}
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
    // <div className={classes.root}>
    //   <div className="col l12 m6">
    //     <div className="card">
    //       <div className="card-content black-text">
    //         <span className="card-title">
    //           {props.count} {props.title}
    //         </span>
    //         <h5 className="center-align">{props.message}</h5>
    //         <div className="row">{props.children}</div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default RecipeCardWrapper;

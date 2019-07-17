import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: 140,
    width: 100
  },
  control: {
    padding: theme.spacing(2)
  }
}));

export default function RecipeCardWrapper(props) {
  const [spacing] = React.useState(2);
  const classes = useStyles();
  console.log('props.title: ', props.title);
  console.log('props.count: ', props.count);
  console.log('props.message: ', props.message);
  console.log('props.children: ', props.children);

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={spacing}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(value => (
            <Grid key={value} item>
              <Paper className={classes.paper} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
    // <div className="row">
    //   <div className="col l12 m6">
    //     <div className="card">
    //       RecipeCard Wrapper
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
}

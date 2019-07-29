import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, fade } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import StepOneImage from '../img/fridge.svg';
import StepTwoImage from '../img/foods.svg';
import StepThreeImage from '../img/serve.svg';

const styles = theme => ({
  root: {
    display: 'flex',
    backgroundColor: 'white',
    // backgroundColor: theme.palette.secondary.light,
    overflow: 'hidden'
  },
  container: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(15),
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 5)
  },
  title: {
    marginBottom: theme.spacing(14)
  },
  number: {
    fontSize: 24,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.secondary.main,
    fontWeight: theme.typography.fontWeightMedium
  },
  image: {
    height: 55,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4)
  },
  button: {
    minWidth: 200,
    // color: '#fcfcfc',
    // backgroundColor: fade(theme.palette.common.black, 0.15),
    // '&:hover': {
    //   backgroundColor: fade(theme.palette.common.black, 0.05)
    // },
    marginTop: theme.spacing(8)
    // backgroundColor: '#f3aa4e',
    // contrastText: '#ffffff'
  }
});

function IntroHowItWorks(props) {
  const { classes } = props;

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <Typography
          variant="h4"
          marked="center"
          className={classes.title}
          component="h2"
        >
          How it works
        </Typography>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <div className={classes.number}>1.</div>
                <img
                  src={StepOneImage}
                  alt="pantry"
                  className={classes.image}
                />
                <Typography variant="h5" align="center">
                  Take a quick inventory of food items in your kitchen. Enter
                  them into your Virtual Pantry List.
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <div className={classes.number}>2.</div>
                <img src={StepTwoImage} alt="foods" className={classes.image} />
                <Typography variant="h5" align="center">
                  Select the ingredients out of your Pantry List that sound
                  appetizing.
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <div className={classes.number}>3.</div>
                <img
                  src={StepThreeImage}
                  alt="favorites"
                  className={classes.image}
                />
                <Typography variant="h5" align="center">
                  Hit Search to let our Pantry Chef offer you some tasty recipes
                  that just might hit the spot!
                  {/* {'New offers every week. New experiences, new surprises. '}
                  {'Your Sundays will no longer be alike.'} */}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>
        <Button
          color="#f3aa4e"
          size="medium"
          variant="contained"
          className={classes.button}
          component="a"
          href="/search"
        >
          Fill Your Pantry
        </Button>
      </Container>
    </section>
  );
}

IntroHowItWorks.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(IntroHowItWorks);

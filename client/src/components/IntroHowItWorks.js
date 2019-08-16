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
    overflow: 'hidden'
  },
  container: {
    marginTop: theme.spacing(25),
    marginBottom: theme.spacing(20),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('lg')]: {
      marginTop: theme.spacing(22),
      marginBottom: theme.spacing(20)
      // backgroundColor: 'pink'
    },
    [theme.breakpoints.down('1441')]: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(15)
      // backgroundColor: 'green'
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(15)
    }
    // [theme.breakpoints.down('380')]: {
    //   marginTop: theme.spacing(6)
    // }
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 2),
    [theme.breakpoints.down('sm')]: {
      marginTop: 20,
      padding: theme.spacing(0, 1)
    },
    [theme.breakpoints.down('380')]: {
      marginTop: 2
      // padding: theme.spacing(0, 0)
    }
  },
  title: {
    marginBottom: theme.spacing(8),
    [theme.breakpoints.down('sm')]: {
      fontSize: 35,
      marginTop: theme.spacing(1),
      padding: theme.spacing(1, 1),
      marginBottom: theme.spacing(0)
    },
    [theme.breakpoints.down('380')]: {
      fontSize: 30,
      marginTop: theme.spacing(1),
      padding: theme.spacing(4)
    }
  },
  p: {
    [theme.breakpoints.down('sm')]: {
      fontSize: 20
    },
    [theme.breakpoints.down('380')]: {
      fontSize: 18
    }
  },
  number: {
    fontSize: 24,
    marginTop: theme.spacing(4),
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.secondary.main,
    fontWeight: theme.typography.fontWeightMedium
  },
  image: {
    height: 55,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      height: 0,
      marginTop: theme.spacing(0),
      marginBottom: theme.spacing(0)
    }
  },
  button: {
    minWidth: 200,
    marginTop: theme.spacing(13),
    [theme.breakpoints.down('sm')]: {
      width: '40%',
      fontSize: 18,
      marginTop: theme.spacing(10)
    }
  }
});

const IntroHowItWorks = React.forwardRef((props, ref) => {
  const { classes } = props;

  return (
    <section ref={ref} className={classes.root}>
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
                <Typography className={classes.p} variant="h5" align="center">
                  Take a quick inventory of food items in your kitchen. Enter
                  them into your Virtual Pantry List.
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <div className={classes.number}>2.</div>
                <img src={StepTwoImage} alt="foods" className={classes.image} />
                <Typography className={classes.p} variant="h5" align="center">
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
                <Typography className={classes.p} variant="h5" align="center">
                  Hit Search to let our Pantry Chef offer you some tasty recipes
                  that just might hit the spot!
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>
        <Button
          id="buttonToPantry"
          color="primary"
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
});

IntroHowItWorks.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(IntroHowItWorks);

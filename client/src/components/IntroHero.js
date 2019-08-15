import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, fade } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IntroHeroLayout from './IntroHeroLayout';
import backgroundImage from '../img/theone.jpg';

const styles = theme => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: '#fcfcfc', // Average color of the background image.
    backgroundPosition: 'center'
  },
  button: {
    minWidth: 200,
    marginTop: theme.spacing(4)
    // color: '#fcfcfc',
    // backgroundColor: fade(theme.palette.common.white, 0.85),
    // '&:hover': {
    //   backgroundColor: fade(theme.palette.common.white, 0.45)
    // }
    // backgroundColor: '#f3aa4e',
    // contrastText: '#ffffff'
  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(10)
    }
  },
  more: {
    marginTop: theme.spacing(2)
  },
  welcome: {
    color: '#f3aa4e',
    fontSize: 20
  }
});

function IntroHero(props) {
  const { classes, scrollToContent } = props;

  return (
    <IntroHeroLayout
      scrollToContent={scrollToContent}
      backgroundClassName={classes.background}
    >
      {/* Increase the network loading priority of the background image. */}
      <img style={{ display: 'none' }} src={backgroundImage} alt="" />
      <Typography color="inherit" align="center" variant="h4" marked="center">
        Time to Eat Again? Not sure what to Make?
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        className={classes.h5}
      >
        Let Pantry Chef help you whip something up!
      </Typography>
      {!props.loggedIn ? (
        <Button
          color="primary"
          size="medium"
          variant="contained"
          className={classes.button}
          component="a"
          href="/signup"
        >
          Sign Up
        </Button>
      ) : (
        <div className={classes.welcome}>Welcome Back, {props.userName}!</div>
      )}
      <Typography variant="body1" color="#fffff" className={classes.more}>
        Discover the experience...
      </Typography>
    </IntroHeroLayout>
  );
}

IntroHero.propTypes = {
  classes: PropTypes.object.isRequired,
  scrollToContent: PropTypes.func.isRequired
};

export default withStyles(styles)(IntroHero);

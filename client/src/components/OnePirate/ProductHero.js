import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '../OnePirate/Button';
import Typography from '../OnePirate/Typography';
import ProductHeroLayout from './ProductHeroLayout';
// import { url } from 'inspector';
import { backgroundImage } from '../../img/theone.jpg';

// const backgroundImage =
// 'https://images.unsplash.com/photo-1534854638093-bada1813ca19?auto=format&fit=crop&w=1400&q=80';
//   `url{'../../img/theone.jpg'}`;

const styles = theme => ({
  background: {
    // backgroundImage: `url(../../../../img/theone.jpg)`,
    // backgroundImage: `url(${backgroundImage})`,
    backgroundColor: '#fcfcfc', // Average color of the background image.
    backgroundPosition: 'center'
  },
  button: {
    minWidth: 200,
    color: 'white'
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
  }
});

function ProductHero(props) {
  const { classes } = props;

  return (
    <ProductHeroLayout backgroundClassName={classes.background}>
      {/* Increase the network loading priority of the background image. */}
      <img src={backgroundImage} className="App-logo" alt="logo" />
      {/* <img style={{ display: 'none' }} src={backgroundImage} alt="" /> */}
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
      <Button
        color="primary"
        variant="contained"
        size="small"
        className={classes.button}
        component="a"
        href="/premium-themes/onepirate/sign-up/"
      >
        Sign In
      </Button>
      <Typography variant="body2" color="#fffff" className={classes.more}>
        Discover the experience
      </Typography>
    </ProductHeroLayout>
  );
}

ProductHero.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProductHero);

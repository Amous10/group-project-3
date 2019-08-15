import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import ArrowDown from '../img/downArrow.png';

const styles = theme => ({
  root: {
    color: theme.palette.common.white,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      height: '91vh',
      minHeight: 500,
      maxHeight: 1300
    }
  },
  container: {
    // marginTop: theme.spacing(5),
    // marginBottom: theme.spacing(10),
    // position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    //960 === 'sm'
    [theme.breakpoints.down('960')]: {
      marginTop: theme.spacing(0),
      marginBottom: theme.spacing(0)
    },
    [theme.breakpoints.down('501')]: {
      marginTop: theme.spacing(0),
      marginBottom: theme.spacing(8)
    }
  },
  backdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.5,
    zIndex: -1
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    zIndex: -2
  },
  button: {
    width: '100%',
    [theme.breakpoints.down('501')]: {
      width: '70%'
    }
  },
  arrowDown: {
    marginTop: 100,
    [theme.breakpoints.down('380')]: {
      marginTop: 80,
      marginBottom: 40
    }
  }
});

function IntroHeroLayout(props) {
  const { backgroundClassName, children, classes, scrollToContent } = props;

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        {children}
        <div className={classes.backdrop} />
        <div className={clsx(classes.background, backgroundClassName)} />
        <div className={classes.arrowDown}>
          <Button className={classes.button} onClick={scrollToContent}>
            {/* <ArrowIcon className={} href="" /> */}
            <img src={ArrowDown} style={{ width: '20%' }} />
          </Button>
        </div>
      </Container>
    </section>
  );
}

IntroHeroLayout.propTypes = {
  backgroundClassName: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(IntroHeroLayout);

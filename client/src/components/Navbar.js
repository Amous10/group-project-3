import React from 'react';
// import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from '../img/logo.png';
import '../App.css';
import axios from 'axios';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import SavedIcon from '@material-ui/icons/Favorite';
import NewSearchIcon from '@material-ui/icons/FindReplace';
import LoginIcon from '@material-ui/icons/Fingerprint';
import SignupIcon from '@material-ui/icons/AssignmentInd';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles(theme => ({
  appBar: {
    // backgroundColor: `#aeaeae`,
    // backgroundColor: `#a7c93f`,
    backgroundColor: '#a7c93f'
    // borderTop: 'solid 2px  #F69F04'
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    // fontFamily: `'Satisfy', cursive`,
    fontSize: '1.25em',
    color: 'white',
    textShadow: '1px 1px #c1ceb3',
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '1.75em'
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '2.25em'
    }
  },
  navbar: {
    // marginBottom: '50px;'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(10),
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchButton: {
    // pointerEvents: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.35),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.65)
    },
    marginRight: theme.spacing(1),
    marginLeft: 0,
    position: 'relative'
    // margin: '6px'
  },
  logo: {
    height: '10%',
    pointerEvents: 'none'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 250,
      '&:focus': {
        width: 350
      }
    }
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  }
}));

export default function Navbar({ ...props }) {
  const logout = event => {
    event.preventDefault();
    console.log('logging out');
    axios
      .post('/user/logout')
      .then(response => {
        console.log(response.data);
        if (response.status === 200) {
          props.updateUser({
            loggedIn: false,
            username: null,
            userid: null
          });
        }
      })
      .catch(error => {
        console.log('Logout error');
      });
  };

  const loggedIn = props.loggedIn;
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMobileMenuClose() {
    setMobileMoreAnchorEl(null);
  }

  function handleMenuClose() {
    setAnchorEl(null);
    handleMobileMenuClose();
  }

  function handleMobileMenuOpen(event) {
    setMobileMoreAnchorEl(event.currentTarget);
  }

  function handleOnKeyPress(event) {
    if (event.key === 'Enter') {
      if (event.target.value.match('^[a-zA-Z ]*$') != null) {
        props.searchRecipes(event.target.value);
        event.target.value = '';
        // redirect to home search
        // props.history.push({
        //   pathname: '/search'
        // });
      } else {
        event.target.value = 'Apple Fritters';
      }
    }
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {loggedIn ? (
        <div>
          <MenuItem onClick={handleMenuClose}>
            <Link to="#" className="btn btn-link text-second" onClick={logout}>
              <span className="text-primary">Logout, {props.userName}.</span>
            </Link>
          </MenuItem>
        </div>
      ) : (
        <div>
          <MenuItem onClick={handleMenuClose}>
            <IconButton aria-label="login" color="inherit">
              <LoginIcon />
            </IconButton>
            <Link to={'/login'} className="btn btn-link text-primary">
              <span className="text-primary">Login</span>
            </Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <IconButton aria-label="signup" color="inherit">
              <SignupIcon />
            </IconButton>
            <Link to={'/signup'} className="btn btn-link text-primary">
              <span className="text-primary">Sign Up</span>
            </Link>
          </MenuItem>
        </div>
      )}
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {loggedIn ? (
        <div>
          <MenuItem onClick={handleMenuClose}>
            <IconButton aria-label="new recipe search" color="inherit">
              <NewSearchIcon />
            </IconButton>
            <Link to={'/search/'} className="btn btn-link text-primary">
              <span className="text-primary">New Search</span>
            </Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <IconButton aria-label="new recipe search" color="inherit">
              <Badge
                badgeContent={props.savedLength ? props.savedLength : 0}
                color="secondary"
              >
                <SavedIcon />
              </Badge>
            </IconButton>
            <Link to={'/api/recipes'} className="btn btn-link text-primary">
              <span className="texct-primary">Saved Recipes</span>
            </Link>
          </MenuItem>
          <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <span className="btn btn-link text-primary">Profile</span>
          </MenuItem>
        </div>
      ) : (
        <div>
          <MenuItem onClick={handleMenuClose}>
            <IconButton aria-label="new recipe search" color="inherit">
              <NewSearchIcon />
            </IconButton>
            <Link to={'/search/'} className="btn btn-link text-primary">
              <span className="text-primary">New Search</span>
            </Link>
          </MenuItem>
          <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <span className="btn btn-link text-primary">Profile</span>
          </MenuItem>
        </div>
      )}
    </Menu>
  );

  return (
    <div className={(classes.grow, classes.navbar)}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            href="/"
          >
            <img src={logo} className="App-logo" alt="logo" />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            {/* <Typography
            className={`${classes.title} ${classes.grow}`}
            href="/"
            variant="h6"
            noWrap
          > */}
            Pantry Chef
          </Typography>

          {/* <div className={classes.search} onKeyPress={handleOnKeyPress}> */}
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              onKeyPress={handleOnKeyPress}
              placeholder="Search Recipes…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ 'aria-label': 'search' }}
              // onChange={props.handleInputChangeFood}
            />
          </div>
          {/* <Button
            className={classes.searchButton}
            onClick={handleSearchFoodsSubmit}
          >
            Search
          </Button> */}
          <div className={classes.grow} />
          {loggedIn ? (
            <div className={classes.sectionDesktop}>
              <Link to={'/search/'} className="btn btn-link text-second">
                <Button>
                  <span className="text-second">New Search</span>
                </Button>
              </Link>
              <Link to={'/api/recipes'} className="btn btn-link text-second">
                <Button>
                  <span className="text-second">Saved Recipes</span>
                </Button>
              </Link>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
          ) : (
            <div className={classes.sectionDesktop}>
              <Link to={'/search/'} className="btn btn-link text-second">
                <Button>
                  <span className="text-second">New Search</span>
                </Button>
              </Link>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
          )}
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

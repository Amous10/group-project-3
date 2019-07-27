import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ShareIcon from '@material-ui/icons/Share';

const useStyles = makeStyles(theme => ({
  card: {
    fontSize: '15px',
    maxWidth: 280,
    maxHeight: 400,
    marginTop: 10,
    marginBottom: 10,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  media: {
    height: 10,
    paddingTop: '60.25%', // 16:9
    pointerEvents: 'auto',
    cursor: 'pointer',
    hover: {
      transition: 0.2,
      scale: '110%'
    }
  },

  // avatar: {
  //   backgroundColor: '#69cc02'
  // },
  cardheader: {
    fontSize: '15px',
    height: '30%',
    // maxHeight: '80px',
    backgroundColor: '#deebdd',
    backgroundImage:
      'linear-gradient(2deg, rgba(222,235,221,0.50) 0%, rgba(187,219,190,0.50) 45%)',
    backgroundBlendMode: 'lighten'
  },
  cardfooter: {
    backgroundImage:
      'linear-gradient(180deg, rgba(230,233,240,0.50) 100%, rgba(238,241,245,1.0) 100%)',
    height: '15%'
  },
  iconheart: {
    color: '#ff78dc'
  },
  icontrash: {
    color: '#ff0000'
  },
  sourcelink: {
    color: '#a6c844',
    fontWeight: 'bold',
    marginLeft: 12,
    fontSize: '1rem'
  }
}));

export default function RecipeCard({ recipe, ...props }) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        style={{ fontSize: '1rem' }}
        className={classes.cardheader}
        title={recipe.label}
        avatar={
          <Avatar aria-label="Recipe" className={classes.avatar}>
            {recipe.source.charAt(0)}
          </Avatar>
        }
      />

      <CardMedia
        onClick={() =>
          props.history.push({
            pathname: props.redirectTo,
            state: {
              result: recipe,
              edamamresult: props.edamamresult,
              goBackText: props.goBackText
            }
          })
        }
        className={classes.media}
        image={
          recipe.image
            ? recipe.image
            : 'https://via.placeholder.com/128x193.png/000000/FFFFFF?text=No+Picture!'
        }
        title={recipe.name}
      />

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Serves: {recipe.yield} | Calories:{' '}
          {Number(recipe.calories).toFixed(0)}
        </Typography>
      </CardContent>

      <CardActions disableSpacing className={classes.cardfooter}>
        <IconButton
          data-id={recipe.uri}
          onClick={props.handleRecipeSave || props.handleRecipeDelete}
          aria-label="Add to Favorites"
        >
          {props.handleRecipeSave ? (
            <FavoriteIcon className={classes.iconheart} />
          ) : (
            <DeleteForeverIcon className={classes.icontrash} />
          )}
        </IconButton>
        {/* <IconButton aria-label="Share">
          <ShareIcon className={classes.iconshare} />
        </IconButton> */}
        <a href={recipe.url} className={classes.sourcelink} target="_blank">
          {'@'}
          {recipe.source}
        </a>
      </CardActions>
    </Card>
  );
}

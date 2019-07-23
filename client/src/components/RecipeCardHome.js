import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red, deepPurple } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ShareIcon from '@material-ui/icons/Share';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
    marginTop: 10,
    marginBottom: 10
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  avatar: {
    backgroundColor: '#69cc02'
  },
  cardheader: {
    backgroundColor: '#deebdd',
    backgroundImage: 'linear-gradient(2deg, rgba(222,235,221,0.50) 0%, rgba(187,219,190,0.50) 45%)',
    backgroundBlendMode: 'lighten'
  },
  cardfooter: {
    backgroundImage: 'linear-gradient(180deg, rgba(230,233,240,0.50) 100%, rgba(238,241,245,1.0) 100%)'
  },
  iconheart: {
    color: '#ff78dc'
  },
  icontrash: {
    color: '#ff0000'
  },
  iconshare: {
    color: '#69cc02'
  }
}));

export default function RecipeCardHome(props) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.cardheader}
        avatar={
          <Avatar aria-label="Recipe" className={classes.avatar}>
            {props.source.charAt(0)}
          </Avatar>
        }
        title={props.label}
        subheader={props.source}
      />

      <CardMedia onClick={() => props.RecordClick(props.uri)} className={classes.media} image={props.imgurl} title={props.name} />

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Recipe Yields: {props.yield}
        </Typography>

        <Typography variant="body2" color="textSecondary" component="p">
          Calories: {Number(props.calories).toFixed(0)}
        </Typography>
      </CardContent>

      <CardActions disableSpacing className={classes.cardfooter}>
        <IconButton data-id={props.uri} onClick={props.handleRecipeSave || props.handleRecipeDelete} aria-label="Add to Favorites">
          {props.handleRecipeSave ? <FavoriteIcon className={classes.iconheart} /> : <DeleteForeverIcon className={classes.icontrash} />}
        </IconButton>
        <IconButton aria-label="Share">
          <a href={props.shareurl} target="_blank">
            <ShareIcon className={classes.iconshare} />
          </a>
        </IconButton>
      </CardActions>
    </Card>
  );
}

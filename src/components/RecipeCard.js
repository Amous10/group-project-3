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
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
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
    backgroundColor: red[500]
  }
}));

export default function RecipeCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="Recipe" className={classes.avatar}>
            {props.source.charAt(0)}
          </Avatar>
        }
        title={props.label}
        subheader={props.source}
      />
      <CardMedia className={classes.media} image={props.imgurl} title={props.name} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Recipe Yields: {props.yield}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Calories: {Number(props.calories).toFixed(0)}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton data-id={props.uri} onClick={props.handleRecipeSave || props.handleRecipeDelete} aria-label="Add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="Share">
          <a href={props.shareurl} target="_blank">
            <ShareIcon />
          </a>
        </IconButton>
      </CardActions>
    </Card>
  );
}

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
    maxWidth: 800,
    marginTop: 10,
    marginBottom: 10
  },
  media: {
    height: 0,
    paddingTop: '76.25%' // 16:9
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

export default function RecipeCardDetail({ recipe }) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        /*  avatar={
          <Avatar aria-label="Recipe" className={classes.avatar}>
            {props.source.charAt(0)}
          </Avatar>
        }  */
        title={recipe.label}
        subheader={recipe.source}
      />
      <CardMedia
        className={classes.media}
        image={recipe.imgurl}
        title={recipe.name}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Recipe Yields: {recipe.yield}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Calories: {Number(recipe.calories).toFixed(0)}
        </Typography>

        <Typography variant="body2" color="textSecondary" component="p">
          Diet Labels:{recipe.dietLabels}
        </Typography>

        <Typography variant="body2" color="textSecondary" component="p">
          Health Labels: {recipe.healthLabels}
        </Typography>

        <Typography variant="body2" color="textSecondary" component="p">
          Ingredients: {recipe.ingredientLines}
        </Typography>

        <Typography variant="body2" color="textSecondary" component="p">
          Labels: {recipe.labels}
        </Typography>

        <Typography variant="body2" color="textSecondary" component="p">
          Source: {recipe.source}
        </Typography>
      </CardContent>
    </Card>
  );
}

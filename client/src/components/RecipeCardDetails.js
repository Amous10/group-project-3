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
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 550,
    marginTop: 10,
    marginBottom: 10
  },
  media: {
    height: 0,
    paddingTop: '50.25%' // 16:9
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
        image={recipe.image}
        title={recipe.name}
      />
      <CardContent>
        <Typography style={{ margin: 5 }}>{recipe.yield} Servings</Typography>
        <Typography
          m={2}
          variant="body2"
          style={{ color: '#389636' }}
          component="p"
        >
          Calories: {Number(recipe.calories).toFixed(0)}
        </Typography>
        <Card>
          <Typography variant="body2" color="textSecondary" component="p">
            {recipe.dietLabels}
          </Typography>
        </Card>

        <Typography
          style={{ margin: 5 }}
          variant="body2"
          color="textSecondary"
          component="p"
        >
          {recipe.healthLabels.join('/')}
        </Typography>

        <div
          classname={classes.ingredientBox}
          style={{ textAlign: 'left', marginTop: 20 }}
        >
          <h4 style={{ textAlign: 'center' }}>Ingredients</h4>
          <ul>
            {recipe.ingredientLines.map((el, i) => (
              <li key={i}>{el}</li>
            ))}
          </ul>
        </div>
        <Typography variant="body2" color="textSecondary" component="p">
          {recipe.labels}
        </Typography>

        <Typography
          variant="body2"
          style={{ fontStyle: 'italic' }}
          component="p"
        >
          Full recipe at: <a href={recipe.url}>{recipe.source}</a>
        </Typography>
      </CardContent>
    </Card>
  );
}

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import backgroundImage from '../img/platefruitveg.jpg';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Tooltip from '@material-ui/core/Tooltip';
import CardActions from '@material-ui/core/CardActions';

const useStyles = makeStyles(theme => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: '#fcfcfc', // Average color of the background image.
    backgroundPosition: 'center'
  },
  card: {
    maxWidth: 500,
    maxHeight: 803,
    marginTop: 10,
    marginBottom: 10
  },
  header: {
    backgroundColor: '#f3f7e8'
  },

  media: {
    height: 0,
    paddingTop: '50.25%' // 16:9
  },
  avatar: {
    backgroundColor: red[500]
  },
  iconheart: {
    color: '#ff78dc',
    textAlign: 'left',
    marginRight: 50,
    cursor: 'pointer'
  },
  sourcelink: {
    color: '#a6c844',
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: '1rem',
    fontStyle: 'italic'
  }
}));

export default function RecipeCardDetails({ recipe, ...props }) {
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
        className={classes.header}
        // subheader={recipe.source}
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
          style={{ color: '#a6c844' }}
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
          className={classes.ingredientBox}
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
        <CardActions disableSpacing className={classes.cardfooter}>
          <Tooltip title="Add Favorite!" placement="top">
            <FavoriteIcon
              className={classes.iconheart}
              data-id={recipe.uri}
              onClick={props.handleRecipeSave}
              aria-label="Add to Favorites"
            />
          </Tooltip>
          <Tooltip title="Link to Recipe!" placement="top">
            <Typography
              variant="body2"
              component="p"
              className={classes.sourcelink}
            >
              Full recipe at:
              <a
                href={recipe.url}
                target="_blank"
                className={classes.sourcelink}
              >
                {recipe.source}
              </a>
            </Typography>
          </Tooltip>
        </CardActions>
      </CardContent>
    </Card>
  );
}

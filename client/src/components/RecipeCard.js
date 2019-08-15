// import React from 'react';
// import { makeStyles, fade } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardHeader from '@material-ui/core/CardHeader';
// import Button from '@material-ui/core/Button';
// import CardMedia from '@material-ui/core/CardMedia';
// import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
// import Avatar from '@material-ui/core/Avatar';
// import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
// import Tooltip from '@material-ui/core/Tooltip';

// const useStyles = makeStyles(theme => ({
//   card: {
//     fontSize: '15px',
//     maxWidth: 270,
//     maxHeight: 400,
//     marginTop: 10,
//     marginBottom: 10,
//     height: '100%',
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'space-between'
//   },
//   media: {
//     height: 10,
//     paddingTop: '60.25%', // 16:9
//     pointerEvents: 'auto',
//     cursor: 'pointer',
//     '&:hover': {
//       // transition: 0.2,
//       // scale: '110%'
//       transform: 'scale(1.1)'
//     }
//   },

//   avatar: {
//     backgroundColor: '#a6c844'
//   },
//   cardheader: {
//     fontSize: '15px',
//     height: '30%',
//     // maxHeight: '80px',
//     backgroundColor: '#e1e2e1',
//     // backgroundImage:
//     // 'linear-gradient(2deg, rgba(222,235,221,0.50) 0%, rgba(183,219,190,0.50) 45%)',
//     // 'linear-gradient(2deg, rgba(222,235,221,0.50) 0%, rgba(192,207,149,0.50) 65%)',
//     backgroundBlendMode: 'lighten'
//   },
//   cardfooter: {
//     backgroundColor: '#f5f5f5',
//     // backgroundImage:
//     //   'linear-gradient(180deg, rgba(230,233,240,0.50) 100%, rgba(238,241,245,1.0) 100%)',
//     height: '15%'
//   },
//   iconheart: {
//     color: '#ff78dc'
//   },
//   icontrash: {
//     color: '#ff0000'
//   },
//   button: {
//     // backgroundColor: fade(theme.palette.common.white, 0.85),
//     '&:hover': {
//       color: '#4a4a4a',
//       backgroundColor: fade(theme.palette.common.white, 0.45)
//     },
//     '&:visited': {
//       color: '#A6C844'
//     }
//   },
//   sourcelink: {
//     color: '#a6c844',
//     fontWeight: 'bold',
//     marginLeft: 12,
//     fontSize: '.75rem'
//   }
// }));

// export default function RecipeCard({ recipe, ...props }) {
//   const classes = useStyles();

//   return (
//     <Card className={classes.card}>
//       <CardHeader
//         style={{ fontSize: '1rem' }}
//         className={classes.cardheader}
//         title={recipe.label}
//         avatar={
//           <Avatar aria-label="Recipe" className={classes.avatar}>
//             {recipe.source.charAt(0)}
//           </Avatar>
//         }
//       />
//       <Tooltip title="View Recipe" placement="top">
//         <CardMedia
//           onMouseOver={props.onToggleOpen}
//           onMouseOut={props.onToggleOpen}
//           onClick={() =>
//             props.history.push({
//               pathname: props.redirectTo,
//               state: {
//                 result: recipe,
//                 edamamresult: props.edamamresult,
//                 goBackText: props.goBackText
//               }
//             })
//           }
//           className={classes.media}
//           image={
//             recipe.image
//               ? recipe.image
//               : 'https://via.placeholder.com/128x193.png/000000/FFFFFF?text=No+Picture!'
//           }
//           title={recipe.name}
//         />
//       </Tooltip>

//       <CardContent>
//         <Typography variant="body2" color="textSecondary" component="p">
//           Serves: {recipe.yield} | Calories:{' '}
//           {Number(recipe.calories).toFixed(0)}
//         </Typography>
//       </CardContent>

//       <CardActions disableSpacing className={classes.cardfooter}>
//         <IconButton
//           data-id={recipe.uri}
//           onClick={props.handleRecipeSave || props.handleRecipeDelete}
//           aria-label="Add to Favorites"
//         >
//           {props.handleRecipeSave ? (
//             <Tooltip title="Add Favorite!" placement="top">
//               <FavoriteIcon className={classes.iconheart} />
//             </Tooltip>
//           ) : (
//             <Tooltip title="Remove me?" placement="top">
//               <DeleteForeverIcon className={classes.icontrash} />
//             </Tooltip>
//           )}
//         </IconButton>

//         {/* <IconButton aria-label="Share">
//           <ShareIcon className={classes.iconshare} />
//         </IconButton> */}
//         <Button
//           // color="primary"
//           // variant="contained"
//           size="small"
//           className={`${classes.button} ${classes.sourcelink}`}
//           component="a"
//           href={recipe.url}
//           target="_blank"
//         >
//           {recipe.source}
//         </Button>
//         {/* <a href={recipe.url} className={classes.sourcelink} target="_blank">
//           {recipe.source}
//         </a> */}
//       </CardActions>
//     </Card>
//   );
// }

import React from 'react';
import { makeStyles, fade } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(theme => ({
  root: {
    fontSize: '.8rem'
  },
  card: {
    fontSize: '.8rem',
    maxWidth: 270,
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
    '&:hover': {
      transform: 'scale(1.1)'
    }
  },

  avatar: {
    backgroundColor: '#a6c844'
  },
  cardheader: {
    // fontSize: '.8rem',
    height: '33%',
    // lineHeight: '1.2rem',
    // maxHeight: '80px',
    backgroundColor: '#e1e2e1',
    // backgroundImage:
    // 'linear-gradient(2deg, rgba(222,235,221,0.50) 0%, rgba(183,219,190,0.50) 45%)',
    // 'linear-gradient(2deg, rgba(222,235,221,0.50) 0%, rgba(192,207,149,0.50) 65%)',
    backgroundBlendMode: 'lighten'
  },
  cardfooter: {
    backgroundColor: '#f5f5f5',
    height: '15%'
  },
  iconheart: {
    color: '#ff78dc'
  },
  icontrash: {
    color: '#ff0000'
  },
  button: {
    // backgroundColor: fade(theme.palette.common.white, 0.85),
    '&:hover': {
      color: '#4a4a4a',
      backgroundColor: fade(theme.palette.common.white, 0.45)
    },
    '&:visited': {
      color: '#A6C844'
    }
  },
  sourcelink: {
    color: '#a6c844',
    fontWeight: 'bold',
    marginLeft: 12,
    fontSize: '.75rem'
  }
}));

export default function RecipeCard({ recipe, ...props }) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        variant="caption"
        className={classes.cardheader}
        title={recipe.label}
        avatar={
          <Avatar aria-label="Recipe" className={classes.avatar}>
            {recipe.source.charAt(0)}
          </Avatar>
        }
      />
      <Tooltip title="View Recipe" placement="top">
        <CardMedia
          onMouseOver={props.onToggleOpen}
          onMouseOut={props.onToggleOpen}
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
      </Tooltip>

      <CardContent>
        <Typography variant="caption" color="textSecondary" component="p">
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
            <Tooltip title="Add Favorite!" placement="top">
              <FavoriteIcon className={classes.iconheart} />
            </Tooltip>
          ) : (
            <Tooltip title="Remove me?" placement="top">
              <DeleteForeverIcon className={classes.icontrash} />
            </Tooltip>
          )}
        </IconButton>

        {/* <IconButton aria-label="Share">
          <ShareIcon className={classes.iconshare} />
        </IconButton> */}
        <Button
          // color="primary"
          // variant="contained"
          size="small"
          className={`${classes.button} ${classes.sourcelink}`}
          component="a"
          href={recipe.url}
          target="_blank"
        >
          {recipe.source}
        </Button>
        {/* <a href={recipe.url} className={classes.sourcelink} target="_blank">
          {recipe.source}
        </a> */}
      </CardActions>
    </Card>
  );
}

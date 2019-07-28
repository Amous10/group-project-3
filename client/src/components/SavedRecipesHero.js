import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
const useStyles = makeStyles(theme => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper
    // padding: theme.spacing(8, 0, 6)
  }
}));

export default function Hero() {
  const classes = useStyles();

  return (
    <React.Fragment>
      {/* Hero unit */}
      <div className={classes.heroContent}>
        <Card style={{ margin: 40 }}>
          <Typography
            component="h1"
            variant="h3"
            align="center"
            color="textPrimary"
            gutterBottom
            borderColor="textPrimary"
            border="solid"
            padding={0}
            textDecoration="underline"
            fontFamily="Satisfy"
            fontStyle="italic"
          >
            Your Faves!
          </Typography>
        </Card>
      </div>
    </React.Fragment>
  );
}

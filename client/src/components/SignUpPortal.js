import React from 'react';
import axios from 'axios';
import { makeStyles, fade } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { Field, Form, FormSpy } from 'react-final-form';
import Typography from '@material-ui/core/Typography';
import { FormControl, Button } from '@material-ui/core';
import { email, required } from './form/validation';
import RFTextField from './form/RFTextField';
import FormFeedback from './form/FormFeedback';

const useStyles = makeStyles(theme => ({
  main: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(6)
  },
  form: {
    marginTop: theme.spacing(6)
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    backgroundColor: '#a7c93f',
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.25)
      // color: '#a7c93f'
    },
    color: '#ffffff'
  },
  feedback: {
    marginTop: theme.spacing(2)
  }
}));

function SignUpPortal({ ...props }) {
  const classes = useStyles();
  const [sent, setSent] = React.useState(false);
  let banner = 'Sign Up';
  const validate = values => {
    const errors = required(['email', 'password'], values);

    if (!errors.email) {
      const emailError = email(values.email, values);
      if (emailError) {
        errors.email = email(values.email, values);
      }
    }

    return errors;
  };

  const handleSubmit = values => {
    const { email, password } = values;

    //request to server to add a new username/password
    axios
      .post('/user/', {
        username: email,
        password: password
      })
      .then(response => {
        console.log(response);
        if (!response.data.errmsg) {
          console.log('successful signup');
          if (response.status === 200) {
            // redirect to home search
            props.history.push({
              pathname: '/login/'
            });
          }
        } else {
          console.log('username already taken');
        }
      })
      .catch(error => {
        console.log('signup error: ');
        console.log(error);
      });
    setSent(true);
  };

  return (
    <React.Fragment>
      <FormControl className={classes.main}>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            {banner}
          </Typography>
          <Typography variant="body2" align="center">
            <Link href="/login/" underline="always">
              Already have an account?
            </Link>
          </Typography>
        </React.Fragment>
        <Form
          onSubmit={handleSubmit}
          subscription={{ submitting: true }}
          validate={validate}
        >
          {({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit} className={classes.form} noValidate>
              <Grid container spacing={2} />
              <Field
                autoComplete="email"
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                required
              />
              <Field
                fullWidth
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="password"
                autoComplete="current-password"
                label="Password"
                type="password"
                margin="normal"
              />
              <FormSpy subscription={{ submitError: true }}>
                {({ submitError }) =>
                  submitError ? (
                    <FormFeedback className={classes.feedback} error>
                      {submitError}
                    </FormFeedback>
                  ) : null
                }
              </FormSpy>
              <Button
                className={classes.button}
                onClick={handleSubmit}
                disabled={submitting || sent}
                color="secondary"
                fullWidth
              >
                {submitting || sent ? 'In progress…' : 'Sign Up'}
              </Button>
            </form>
          )}
        </Form>
      </FormControl>
    </React.Fragment>
  );
}

export default SignUpPortal;

import { Redirect } from 'react-router-dom';
import axios from 'axios';

// --- Post bootstrap -----
import React from 'react';
import { Field, Form, FormSpy } from 'react-final-form';
import { makeStyles, fade } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
// import AppForm from '@material-ui/core/Form';
import { FormControl, Button } from '@material-ui/core';
import { email, required } from './form/validation';
import RFTextField from './form/RFTextField';
import FormFeedback from './form/FormFeedback';
import SelectInput from '@material-ui/core/Select/SelectInput';

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

function LoginPortal({ ...props }) {
  const formEmail = '';
  const formPassword = '';
  const redirectTo = null;

  const classes = useStyles();
  const [sent, setSent] = React.useState(false);

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
  const handleSubmitOld = () => {
    setSent(true);
  };
  const handleSubmit = values => {
    console.log('values: ', values);
    setSent(true);
  };

  const handleChange = () => {
    // setSent(true);
  };

  return (
    <React.Fragment>
      <FormControl className={classes.main}>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Sign In
          </Typography>
          <Typography variant="body2" align="center">
            {'Not a member yet? '}
            <Link href="/signup/" align="center" underline="always">
              Sign Up here
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
              <Field
                autoComplete="email"
                autoFocus
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                required
                size="large"
              />
              <Field
                fullWidth
                size="large"
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
                size="large"
                color="secondary"
                fullWidth
              >
                {submitting || sent ? 'In progress…' : 'Sign In'}
              </Button>
            </form>
          )}
        </Form>
      </FormControl>
    </React.Fragment>
  );
}

export default LoginPortal;

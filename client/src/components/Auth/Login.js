import React, { useContext } from 'react';
import { GraphQLClient } from 'graphql-request';
import { BASE_URL } from '../../client';
import { GoogleLogin } from 'react-google-login';
import { withStyles } from '@material-ui/core/styles';
import Context from '../../context';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { ME_QUERY } from '../../graphql/queries';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';

const Login = ({ classes }) => {
  const { dispatch } = useContext(Context);

  const onSuccess = async (googleUser) => {
    try {
      const idToken = googleUser.getAuthResponse().id_token;
      const client = new GraphQLClient(BASE_URL, {
        headers: {
          authorization: idToken
        }
      });

      const { me } = await client.request(ME_QUERY);

      dispatch({
        type: 'LOGIN_USER',
        payload: me
      });
      dispatch({
        type: 'IS_LOGGED_IN',
        payload: googleUser.isSignedIn()
      });
    } catch (err) {
      onFailure(err);
    }
  };

  const onFailure = (err) => {
    console.error('Error logging in', err);
    dispatch({
      type: 'IS_LOGGED_IN',
      payload: false
    });
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.login}>
        <PersonPinCircleIcon className={classes.icon} color='primary' />
        <Typography
          component='h1'
          variant='h5'
          gutterBottom
          align='center'
          noWrap
        >
          Welcome to <br /> GeoPlot
        </Typography>

        <GoogleLogin
          clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}
          onSuccess={onSuccess}
          onFailure={onFailure}
          isSignedIn={true}
          theme='dark'
          buttonText='Log In with Google'
          className={classes.loginButton}
        />
      </Paper>
    </div>
  );
};

const styles = {
  root: {
    background: '#f5f5f5',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  },
  login: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    minWidth: '300px',
    maxWidth: '280px'
  },
  loginButton: {
    marginTop: '30px'
  },
  icon: {
    color: 'primary',
    fontSize: 50
  }
};

export default withStyles(styles)(Login);

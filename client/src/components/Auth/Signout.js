import React, { useContext } from 'react';
import Context from '../../context';
import { GoogleLogout } from 'react-google-login';
import { withStyles } from '@material-ui/core/styles';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Typography from '@material-ui/core/Typography';
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';

const Signout = ({ classes }) => {
  const mobileSize = useMediaQuery('(max-width: 650px)');
  const { dispatch } = useContext(Context);

  const onSignout = () => {
    dispatch({ type: 'SIGNOUT_USER' });
    console.log('Signed out user!');
  };

  return (
    <GoogleLogout
      onLogoutSuccess={onSignout}
      render={({ onClick }) => (
        <span className={classes.root} onClick={onClick}>
          <Typography
            className={classes.buttonText}
            variant='body1'
            style={{ display: mobileSize ? 'none' : 'block' }}
          >
            Sign out
          </Typography>
          <ExitToApp className={classes.buttonIcon} />
        </span>
      )}
    />
  );
};

const styles = {
  root: {
    cursor: 'pointer',
    display: 'flex'
  },
  buttonText: {
    color: 'white'
  },
  buttonIcon: {
    marginLeft: '5px',
    color: 'white'
  }
};

export default withStyles(styles)(Signout);

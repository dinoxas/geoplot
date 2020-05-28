import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ExploreIcon from '@material-ui/icons/Explore';
import Typography from '@material-ui/core/Typography';

const NoContent = ({ classes }) => (
  <div className={classes.root}>
    <ExploreIcon className={classes.icon} color='primary' />
    <Typography
      component='p'
      align='center'
      variant='subtitle1'
      color='textPrimary'
      gutterBottom
      noWrap
    >
      Click on the map to add a pin
    </Typography>
  </div>
);

const styles = (theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: '48px'
  }
});

export default withStyles(styles)(NoContent);

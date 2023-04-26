import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

//MUI components
import Grid from '@material-ui/core/Grid';

//Made components
import CowOptions from '../components/CowOptions';
import CowSelector from '../components/CowSelector';
import FilterSelector from '../components/FilterSelector';

const styles = theme => {

  return {

  UserInputContainerCont:{
      width: `12%`,
      height: `calc(100% - 55px)`,
      padding: 5,
      paddingTop: 10,
      background: '#F8F8F8',
      borderRight: `1px solid ${theme.palette.primary.main}`
  }
}};

function UserInputContainer(props){
  const { classes } = props;
  return (
      <Grid container alignItems="center" direction="row" justify="space-evenly" className={classes.UserInputContainerCont}>
        <FilterSelector/>
        <CowOptions />
        <CowSelector/>
      </Grid>
  );
}

UserInputContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserInputContainer);

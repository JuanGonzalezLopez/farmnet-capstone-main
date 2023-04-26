import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

//MUI components
import Grid from '@material-ui/core/Grid';

// made components
import SortOptions from './SortOptions'
import CycleOptions from './CycleOptions'
import BreedOptions from './BreedOptions'

const styles = theme => ({
  CowOptionsCont:{
      height: `30%`,
      width: `100%`,
  },
  formControl: {
    margin: 0,
    width: `94%`,
    marginLeft: `3%`,
    height: `33%`
  }
});

function CowOptions(props){

    const { classes } = props;
    return (
      <Grid item className={classes.CowOptionsCont}>
        <BreedOptions style={classes.formControl} />
        <CycleOptions style={classes.formControl} />
        <SortOptions style={classes.formControl} />
      </Grid>
    );
}

CowOptions.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CowOptions);

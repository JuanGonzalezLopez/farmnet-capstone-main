import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

//MUI components
import Grid from '@material-ui/core/Grid';

// made components
import ViewOptions from './ViewOptions'
import TimeOptions from './TimeOptions'

const styles = function(theme) {return{
    outputOptionsCont:{
        width: `85%`,
        height: '7.5%',
    },
    optionsCont: {
      background: '#F8F8F8',
      borderRadius: 5,
      boxShadow: theme.shadows[3],
      height: '100%',
      width: `45%`,
    }
}};

function OutputOptions(props){
      const { classes } = props;
      return (
          <Grid container alignItems="center" direction="row" justify="space-evenly" spacing={0} className={classes.outputOptionsCont}>
              <ViewOptions style={classes.optionsCont} />
              <TimeOptions style={classes.optionsCont} />
          </Grid>
      );
}

OutputOptions.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutputOptions);

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

//MUI components
import Grid from '@material-ui/core/Grid';

// made components
import Delete from './Delete'
import Edit from './Edit'

const styles = function(theme) {return{
    configureButtonsCont:{
        width: `15%`,
        height: '5%',
    },
    buttons: {
      background: '#F8F8F8',
      color: 'white',
      borderRadius: 5,
      boxShadow: theme.shadows[3],
      height: '100%',
      maxWidth: `48%`,
    }
}};

function OutputOptions(props){
      const { classes } = props;
      return (
          <Grid container alignItems="center" direction="row" justify="space-evenly" spacing={0} className={classes.configureButtonsCont}>
              <Edit style={classes.buttons} />
              <Delete style={classes.buttons} />
          </Grid>
      );
}

OutputOptions.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutputOptions);

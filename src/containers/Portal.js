import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

//MUI components
import Grid from '@material-ui/core/Grid';

//Made components
import Nav from './NavBar';
import UserInput from './UserInputContainer';
import OutputUI from './OutputUI';

const styles = function(theme) {return{
    portalCont:{
        height: '100%',
        width: "100%",
        background: theme.palette.primary.main
    },
}};

function Portal(props){

        const { classes } = props;

        return (
          <Grid container alignItems="center" direction="row" justify="center" className={classes.portalCont}>
            <Nav />
            <UserInput />
            <OutputUI />
          </Grid>
        );
}
Portal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Portal);

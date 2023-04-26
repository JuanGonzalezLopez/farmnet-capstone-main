import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

//MUI components
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Error from '@material-ui/icons/Error';

//Made components
import OutputData from './OutputData';

const styles = theme => ({
  OutputUICont: {
    width: `88%;`,
    height: `calc(100% - 55px)`,
    background: theme.palette.secondary.light,
    padding: "8px 0px"
  },
  paper: {
    width: `100%`,
    height: `100%`
  },
  progress: {
    margin: 16
  }
});

class OutputUI extends React.Component {

  render() {
    const {
      classes,
      cowSelected,
      loading,
      error
    } = this.props;

    return (
      <Grid
        container
        alignItems="center"
        direction="row"
        justify="space-evenly"
        className={classes.OutputUICont}
      >
        {error && (
          <Typography variant="h1" color="error">
            <Error style={{ fontSize: 38, marginRight: 5 }}/>
            {error.message}
          </Typography>
        )}
        {loading && error === null && (
          <Typography variant="h1" color="primary" style={{"-webkit-text-stroke": "1px white"}}>
            Loading cows...
          </Typography>
        )}
        {!loading && error === null && cowSelected === null && (
          <Typography variant="h1" color="primary" style={{"-webkit-text-stroke": "1px white"}}>
            Please select a cow
          </Typography>
        )}
        {cowSelected !== null && !loading  && <OutputData />}
      </Grid>
    );
  }
}

OutputUI.propTypes = {
  classes: PropTypes.object.isRequired,
  cowSelected: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  return {
    cowSelected: state.data.selected,
    loading: state.loading,
    error: state.data.error,
  };
};

const mapActionsToProps = {
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(OutputUI));

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";

//MUI components
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

//made components
import Label from "./Label";

// constants
import { BREEDS } from "../../constants";

//utils
import { getTempUnitString } from "../../utils";

const styles = theme => ({
  messageCont: {
    height: "15%",
    width: "98%"
  },
  characteristics: {
    boxShadow: theme.shadows[3],
    width: "100%",
    maxHeight: "100%",
    borderRadius: 8,
    padding: "5px 0",
    "&#cowInfo": {
      backgroundColor: theme.palette.primary.light
    },
    "&#cowData": {
      backgroundColor: theme.palette.primary.main
    },
    "&#cowLabels": {
      backgroundColor: theme.palette.primary.dark
    }
  }
});

function CowProfile(props) {
  const { classes, cow, data, tempUnit } = props;
  const { breed, age, cycle, id, labels = [] } = cow;

  let duration = "-";
  let currentTemp = "-";
  let lastEntry = "-";
  if (data && data.length > 0) {
    let current = moment();
    let last = moment(data[0].timestamp);
    let first = moment(data[data.length - 1].timestamp);

    duration = Math.round(moment.duration(last.diff(first)).asDays());
    lastEntry = last.fromNow();

    if (Math.round(moment.duration(current.diff(last)).asMinutes()) <= 5) {
      // CHANGE WHEN DB RESET
      currentTemp = data[0].temp || data[0].temperature;
      currentTemp += getTempUnitString(tempUnit);
    }
  }

  // CHANGE WHEN DB RESET
  const breedText = BREEDS.find(({ id }) => id === breed);

  const cowInfo = [
    {
      title: "ID:",
      value: id
    },
    {
      title: "Breed:",
      // CHANGE WHEN DB RESET
      value: breedText ? breedText.text : breed
    },
    {
      title: "Age:",
      value: age
    },
    {
      title: "Cycle:",
      value: cycle
    }
  ];

  const cowData = [
    {
      title: "Steps Today:",
      value: "22"
    },
    {
      title: "Current Temp:",
      value: currentTemp
    },
    {
      title: "Current PH:",
      value: "10"
    },
    {
      title: "Last Update:",
      value: lastEntry
    },
    {
      title: "Days Recorded:",
      value: duration
    }
  ];

  const cowLabels = [];
  for (let i = 0; i < 4; i += 1) {
    let text = "-";
    if (labels[i]) {
      text = labels[i];
    }
    cowLabels.push({ title: text });
  }

  return (
    <Grid
      container
      alignItems="center"
      direction="row"
      justify="space-evenly"
      id="cowProfile"
      className={classes.messageCont}
    >
      {cowData.map((text, index) => (
        <Grid
          key={`labelGrid-${index}`}
          container
          alignItems="center"
          direction="row"
          justify="space-evenly"
          style={{ maxWidth: "18%", height: "30%" }}
        >
          <Label
            classNameStyle={"cowData"}
            text={text}
            style={classes.characteristics}
          />
        </Grid>
      ))}
      {cowInfo.map((text, index) => (
        <Grid
          key={`labelGrid-${index}`}
          container
          alignItems="center"
          direction="row"
          justify="space-evenly"
          style={{ maxWidth: "21%", height: "30%" }}
        >
          <Label
            classNameStyle={"cowInfo"}
            text={text}
            style={classes.characteristics}
          />
        </Grid>
      ))}
      {cowLabels.map((text, index) => (
        <Grid
          key={`labelGrid-${index}`}
          container
          alignItems="center"
          direction="row"
          justify="space-evenly"
          style={{ maxWidth: "21%", height: "30%" }}
        >
          <Label
            classNameStyle={"cowLabels"}
            text={text}
            style={classes.characteristics}
          />
        </Grid>
      ))}
    </Grid>
  );
}

CowProfile.propTypes = {
  cow: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  tempUnit: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    cow: state.data.selected,
    data: state.data.selectedData,
    tempUnit: state.outputSetting.tempUnit
  };
};

const mapActionsToProps = {};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(CowProfile));

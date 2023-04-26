import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// actions
import { getSelectedData } from "../actions/dataActions";

//MUI components
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

//Made components
import LineGraph from "../components/OutputView/LineGraph.js";
import TableOutput from "../components/OutputView/TableOutput.js";
import OutputOptions from "../components/OutputOptions";
import CowProfile from "../components/CowProfile";
import ConfigureButtons from "../components/ConfigureButtons";

//utils
import {
  getStartEnd,
  getFormattedTime,
  convertToCelcius,
  convertToFarenheit,
  isCelcius
} from "../utils";

class OutputData extends React.Component {
  componentDidMount() {
    const { cowSelected } = this.props;
    this.props.getSelectedData(cowSelected.id);
  }

  componentDidUpdate(prevProps) {
    this.handleChange(prevProps);
  }

  handleChange = prevProps => {
    const { cowSelected } = this.props;
    if (this.props.cowSelected !== prevProps.cowSelected) {
      this.props.getSelectedData(cowSelected.id);
    }
  };

  calculateOutput = () => {
    const { timeFormat, data, tempUnit } = this.props;

    if (data && data.length > 0) {
      const { data: outputData, end } = getStartEnd(
        data[0].timestamp,
        timeFormat
      );

      for (var i = 0; i < data.length && data[i].timestamp > end; i++) {
        const currentText = getFormattedTime(data[i].timestamp, timeFormat);
        const period = outputData.find(period => period.text === currentText);

        if (period) {
          period.numberOfTempTimestamps++;
          // CHANGE WHEN DB RESET
          let currentTemp = data[i].temp;
          if (data[i].temperature) {
            let currentTemp = data[i].temperature;

            if (isCelcius(tempUnit)) {
              currentTemp = convertToCelcius(currentTemp);
            } else {
              currentTemp = convertToFarenheit(currentTemp);
            }
          }

          period.totalTemp += currentTemp;
        }
      }

      outputData.forEach(period => {
        period.y =
          Math.round(period.totalTemp / period.numberOfTempTimestamps) || 0;
        period.x = period.text;

        delete period.text;
        delete period.totalTemp;
        delete period.numberOfTempTimestamps;
      });

      return outputData.reverse();
    }

    return null;
  };

  render() {
    const {
      timeFormat,
      viewFormat,
      loading,
      data: rawData,
      tempUnit
    } = this.props;

    let data;
    let output;

    switch (true) {
      case rawData && rawData.length === 0:
        output = (
          <Typography
            variant="h2"
            color="primary"
            style={{ "-webkit-text-stroke": "1px white" }}
          >
            No data to output.
          </Typography>
        );
        break;

      case viewFormat === "Graph":
        data = this.calculateOutput();
        output = <LineGraph output={data} tempUnit={tempUnit} />;
        break;

      case viewFormat === "Table":
        data = this.calculateOutput();
        output = <TableOutput output={data} timeFormat={timeFormat} tempUnit={tempUnit} />;
        break;

      default:
    }

    return (
      <>
        <OutputOptions />
        <ConfigureButtons />
        {loading && (
          <CircularProgress size={250} thickness={1} color="primary" />
        )}
        {rawData && (
          <>
            {output}
            <CowProfile />
          </>
        )}
      </>
    );
  }
}

OutputData.propTypes = {
  cowSelected: PropTypes.object,
  data: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  timeFormat: PropTypes.string.isRequired,
  tempUnit: PropTypes.string.isRequired,
  viewFormat: PropTypes.string.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    cowSelected: state.data.selected,
    timeFormat: state.outputSetting.timeFormat,
    viewFormat: state.outputSetting.viewFormat,
    tempUnit: state.outputSetting.tempUnit,
    loading: state.data.selectedLoading,
    data: state.data.selectedData
  };
};

const mapActionsToProps = {
  getSelectedData: getSelectedData
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(OutputData);

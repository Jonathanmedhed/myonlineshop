import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// PrimeReact Component
import { Message } from "primereact/message";

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <Message severity={alert.alertType} text={alert.msg} />
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alerts,
});

export default connect(mapStateToProps)(Alert);

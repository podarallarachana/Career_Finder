import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => (
    <div className="container h-100">
      <div className="row h-100  justify-content-center">
        <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-6">
          <div
            key={alert.id}
            className={`alert alert-${alert.alertType} system-alerts`}
          >
            {alert.msg}
          </div>
        </div>
      </div>
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);

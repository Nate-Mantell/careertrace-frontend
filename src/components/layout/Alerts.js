import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, alert, message } = this.props;

    if (error !== prevProps.error) {
      if (error.msg.name) {
        alert.error(`Resource Name: ${error.msg.name.join()}`);
      }
      if (error.msg.link) {
        alert.error(`Link: ${error.msg.link}`);
      }
      if (error.msg.description) {
        alert.error(`Description: ${error.msg.description.join()}`);
      }
      if (error.msg.non_field_errors) {
        alert.error(error.msg.non_field_errors.join());
      }
      if (error.msg.email) {
        alert.error(error.msg.email.join());
      }
      //if (
      //  !(
      //    error.msg.name ||
      //    error.msg.link ||
      //    error.msg.description ||
      //    error.msg.non_field_errors
      //  )
      //) {
      //  alert.error("There is an error");
      //}
    }

    if (message !== prevProps.message) {
      if (message.resourceAdded) {
        alert.success(message.resourceAdded);
      }
      if (message.careerAdded) {
        alert.success(message.careerAdded);
      }
      if (message.careerGoalAdded) {
        alert.success(message.careerGoalAdded);
      }
      if (message.passwordsNotMatch) {
        alert.error(message.passwordsNotMatch);
      }
      if (message.studyPathIsGenerating) {
        alert.success(message.studyPathIsGenerating);
      }
      if (message.studyPathAlreadyUpToDate) {
        alert.success(message.studyPathAlreadyUpToDate);
      }
      if (message.retreivingStudyPath) {
        alert.success(message.retreivingStudyPath);
      }
      if (message.noStudyPathExistsForUser) {
        alert.success(message.noStudyPathExistsForUser);
      }
    }
  }

  render() {
    return <Fragment />;
  }
}

const mapStateToProps = state => ({
  error: state.errorReducer,
  message: state.messageReducer
});

export default connect(mapStateToProps)(withAlert()(Alerts));

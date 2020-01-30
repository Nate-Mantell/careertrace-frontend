import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getStudypaths } from "../../actions/studypath";
import CareerGoalsForm from "../forms/CareerGoalsForm";
import Studypaths from "../studypaths/Studypaths";

export class StudyPathDashboard extends Component {
  static proptypes = {
    studypath_pending_retreival: PropTypes.bool.isRequired,
    studypath_is_generating: PropTypes.bool.isRequired,
    studypath_retreived: PropTypes.bool.isRequired,
    getStudypaths: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getStudypaths();
  }

  render() {
    if (this.props.studypath_pending_retreival) {
      this.props.getStudypaths();
      return <CareerGoalsForm />;
    } else {
      return (
        <Fragment>
          {this.props.studypath_retreived ? (
            <Studypaths />
          ) : (
            <CareerGoalsForm />
          )}
        </Fragment>
      );
    }
  }
}

const mapStateToProps = state => ({
  studypath_is_generating: state.studypathReducer.studypath_is_generating,
  studypath_retreived: state.studypathReducer.studypath_retreived,
  studypath_pending_retreival:
    state.studypathReducer.studypath_pending_retreival
});

export default connect(mapStateToProps, {
  getStudypaths
})(StudyPathDashboard);

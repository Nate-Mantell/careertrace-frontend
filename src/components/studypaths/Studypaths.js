import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getStudypaths } from "../../actions/studypath";
import { getResources } from "../../actions/resources";
import { getResourceTypes } from "../../actions/resourcetypes";
import { getCareers } from "../../actions/careers";
import { StudypathNodeGroup } from "./StudypathNodeGroup";
import { Career } from "./Career";

export class Studypaths extends Component {
  state = {
    selected_studypath: 0
  };

  static proptypes = {
    studypath_pending_retreival: PropTypes.bool.isRequired,
    studypaths: PropTypes.array.isRequired,
    getStudypaths: PropTypes.func.isRequired,
    resources: PropTypes.array.isRequired,
    resource_types: PropTypes.array.isRequired,
    careers: PropTypes.array.isRequired,
    getResources: PropTypes.func.isRequired,
    getResourceTypes: PropTypes.func.isRequired,
    getCareers: PropTypes.func.isRequired
  };

  getResourceTypeByID(id) {
    let resource_type = this.props.resource_types.filter(rt => rt.id == id);

    if (resource_type[0] !== undefined) {
      resource_type = resource_type[0];
      if (
        resource_type.name !== undefined &&
        resource_type.description !== undefined
      ) {
        return resource_type;
      }
    }

    resource_type = {
      name: "",
      description: ""
    };

    return resource_type;
  }

  getResourceByID(id) {
    let resource = this.props.resources.filter(r => r.id == id);

    if (resource[0] !== undefined) {
      resource = resource[0];
      if (resource.name !== undefined && resource.description !== undefined) {
        return {
          ...resource,
          resource_type: this.getResourceTypeByID(resource.resource_type)
        };
      }
    }

    resource = {
      id: "",
      name: "",
      link: "",
      description: "",
      level: "",
      resource_type: "",
      creator: ""
    };

    return resource;
  }

  getCareerByID(id) {
    let career = this.props.careers.filter(c => c.id == id);

    if (career[0] !== undefined) {
      return career[0];
    }

    career = {
      id: "",
      name: "",
      avg_salary: "",
      remote_ok: "",
      description: "",
      keywords: [],
      creator: ""
    };

    return career;
  }

  componentDidMount() {
    if (this.props.studypath_pending_retreival) {
      this.props.getStudypaths();
    }
    this.props.getResources();
    this.props.getResourceTypes();
    this.props.getCareers();
  }

  group_studypath_nodes(studypath) {
    //TODO: sort items to the top that have the most accounts of relevance
    //if there is a contest between multiple items with the same relevance
    if (studypath.studypath_nodes.length > 0) {
      studypath.studypath_nodes.sort((a, b) => a.level - b.level);
      var grouped_studypath_nodes = [];
      var studypath_nodes_group = [];
      var current_level = studypath.studypath_nodes[0].level;
      studypath.studypath_nodes.forEach(studypath_node => {
        if (studypath_node.level == current_level) {
          studypath_nodes_group = [
            ...studypath_nodes_group,
            {
              ...studypath_node,
              resource: this.getResourceByID(studypath_node.resource)
            }
          ];
        } else {
          grouped_studypath_nodes = [
            ...grouped_studypath_nodes,
            {
              level: current_level,
              nodes: studypath_nodes_group
            }
          ];
          studypath_nodes_group = [
            {
              ...studypath_node,
              resource: this.getResourceByID(studypath_node.resource)
            }
          ];
        }
        current_level = studypath_node.level;
      });
      return grouped_studypath_nodes;
    }
  }

  render() {
    return (
      <Fragment>
        {this.props.studypaths.map(studypath => {
          return (
            <div className="col-sm-6" key={"StudyPathColumn" + studypath.id}>
              {this.group_studypath_nodes(studypath).map(
                studypath_node_group => (
                  <StudypathNodeGroup
                    key={
                      "StudyPathNodeGroup" +
                      studypath.id +
                      "_" +
                      studypath_node_group.level
                    }
                    id={
                      "StudyPathNodeGroup" +
                      studypath.id +
                      "_" +
                      studypath_node_group.level
                    }
                    studypath_nodes={studypath_node_group}
                  />
                )
              )}
              <Career
                key={"StudyPathCareerGoal" + studypath.id}
                id={"StudyPathCareerGoal" + studypath.id}
                career={this.getCareerByID(studypath.desired_career)}
              />
            </div>
          );
        })}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  studypaths: state.studypathReducer.studypaths,
  resources: state.resourcesReducer.resources,
  resource_types: state.resourceTypesReducer.resource_types,
  careers: state.careersReducer.careers,
  studypath_pending_retreival:
    state.studypathReducer.studypath_pending_retreival
});

export default connect(mapStateToProps, {
  getStudypaths,
  getResources,
  getResourceTypes,
  getCareers
})(Studypaths);

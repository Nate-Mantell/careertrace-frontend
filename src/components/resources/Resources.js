import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getResources } from "../../actions/resources";
import { getResourceTypes } from "../../actions/resourcetypes";

export class Resources extends Component {
  static propTypes = {
    resources: PropTypes.array.isRequired,
    resource_types: PropTypes.array.isRequired,
    getResources: PropTypes.func.isRequired,
    getResourceTypes: PropTypes.func.isRequired
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

  componentDidMount() {
    this.props.getResources();
    this.props.getResourceTypes();
  }

  render() {
    return (
      <div className="col-sm-6">
        {this.props.resources.map(resource => (
          <div className="card my-4" key={"resourceCard" + resource.id}>
            <div className="card-header card-title text-center">
              <h5>{resource.name || ""}</h5>
            </div>
            <div className="card-body">
              <p className="card-text">
                <b>Type:</b>{" "}
                {this.getResourceTypeByID(resource.resource_type).name || ""}
              </p>
              <p className="card-text">
                {resource.description.length < 200
                  ? resource.description
                  : resource.description.substring(0, 200) + "..."}
              </p>
              <button className="btn btn-primary mr-2">View Details</button>
              <a
                href={resource.link}
                target="_blank"
                className="btn btn-primary mx-2"
              >
                Visit Resource
                <span className="fa fa-external-link ml-2"> </span>
              </a>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  resources: state.resourcesReducer.resources,
  resource_types: state.resourceTypesReducer.resource_types
});

export default connect(mapStateToProps, { getResources, getResourceTypes })(
  Resources
);

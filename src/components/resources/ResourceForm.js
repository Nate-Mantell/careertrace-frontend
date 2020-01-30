import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getResourceTypes } from "../../actions/resourcetypes";
import { addResource } from "../../actions/resources";

export class ResourceForm extends Component {
  state = {
    name: "",
    resource_type: 1,
    link: "",
    description: ""
  };

  static propTypes = {
    resource_types: PropTypes.array.isRequired,
    getResourceTypes: PropTypes.func.isRequired
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const { name, resource_type, link, description } = this.state;
    const resource = { name, resource_type, link, description };
    this.props.addResource(resource);
    this.setState({
      name: "",
      resource_type: 1,
      link: "",
      description: ""
    });
  };

  componentDidMount() {
    this.props.getResourceTypes();
  }

  render() {
    const { name, resource_type, link, description } = this.state;
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Add Resource</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Resource Name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              onChange={this.onChange}
              value={name}
            />
          </div>
          <div className="form-group">
            <label>Resource Type</label>
            <select
              className="form-control"
              name="resource_type"
              onChange={this.onChange}
              defaultValue={resource_type}
            >
              {this.props.resource_types.map(resource_type_option => (
                <option
                  key={resource_type_option.id}
                  value={resource_type_option.id}
                >
                  {resource_type_option.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Link</label>
            <input
              className="form-control"
              type="text"
              name="link"
              onChange={this.onChange}
              value={link}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              type="text"
              name="description"
              onChange={this.onChange}
              value={description}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  resource_types: state.resourceTypesReducer.resource_types
});

export default connect(mapStateToProps, { getResourceTypes, addResource })(
  ResourceForm
);

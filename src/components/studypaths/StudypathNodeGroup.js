import React, { Component } from "react";

export class StudypathNodeGroup extends Component {
  state = {
    selected_node_id: 0
  };

  //componentDidMount() {
  //  this.setState({
  //    selected_node_id: this.props.studypath_nodes.nodes[0].id
  //  });
  //}

  incrementSelectedNode() {
    this.setState({
      selected_node_id:
        //(this.props.studypath_nodes.nodes.indexOf(this.state.selected_node_id) +
        //  1) %
        //this.props.studypath_nodes.nodes.length
        (this.state.selected_node_id + 1) %
        this.props.studypath_nodes.nodes.length
    });
  }

  decrementSelectedNode() {
    this.setState({
      selected_node_id:
        //(this.props.studypath_nodes.nodes.indexOf(this.state.selected_node_id) +
        //  1) %
        //this.props.studypath_nodes.nodes.length
        this.state.selected_node_id - 1 < 0
          ? this.props.studypath_nodes.nodes.length - 1
          : (this.state.selected_node_id - 1) %
            this.props.studypath_nodes.nodes.length
    });
  }

  selectNodeByID(studypath_nodes, selected_node_id) {
    //return  studypath_nodes.nodes.find(node => node.id == selected_node_id) !==
    //  undefined
    //    ? studypath_nodes.nodes.find(node => node.id == selected_node_id)
    //    : {
    //        relevance: "",
    //        resource: {
    //          name: "",
    //          resource_type: {
    //            name: ""
    //          },
    //          description: "",
    //          link: ""
    //        }
    //      };
  }

  selectNodeByIndex(studypath_nodes, selected_node_id) {
    return studypath_nodes.nodes[selected_node_id] !== undefined
      ? studypath_nodes.nodes[selected_node_id]
      : {
          relevance: "",
          resource: {
            name: "",
            resource_type: {
              name: ""
            },
            description: "",
            link: ""
          }
        };
  }

  render() {
    const { id, studypath_nodes } = this.props;
    const { selected_node_id } = this.state;
    const selected_node = this.selectNodeByIndex(
      studypath_nodes,
      selected_node_id
    );
    return (
      <div
        className="card my-4"
        key={id + "_StudypathNodeCard" + selected_node_id}
      >
        <div className="card-header card-title text-center StudyPath_StudyPathNode_card_header">
          <h5>{selected_node.resource.name || ""}</h5>
        </div>
        <div className="card-body">
          <p className="card-text">
            <span className="mr-2">
              <b>Type:</b> {selected_node.resource.resource_type.name || ""}
            </span>
            <span className="ml-2">
              <b>Relevance:</b> {selected_node.relevance + "%" || ""}
            </span>
          </p>
          <p className="card-text">
            {selected_node.resource.description.length < 200
              ? selected_node.resource.description
              : selected_node.resource.description.substring(0, 200) + "..."}
          </p>
          {studypath_nodes.nodes.length > 1 ? (
            <a onClick={() => this.incrementSelectedNode()} className="mr-2">
              <img
                src="http://mantellsolutions.com/careerpath/img/LeftArrowIcon-1.png"
                width="30em"
                height="30em"
              />
            </a>
          ) : (
            ""
          )}
          <a href="#" className="btn btn-primary mr-2">
            View Details
          </a>
          <a
            href={selected_node.resource.link}
            target="_blank"
            className="btn btn-primary mx-2"
          >
            Visit Resource
            <span className="fa fa-external-link ml-2"> </span>
          </a>
          {studypath_nodes.nodes.length > 1 ? (
            <a onClick={() => this.decrementSelectedNode()} className="ml-2">
              <img
                src="http://mantellsolutions.com/careerpath/img/RightArrowIcon-1.png"
                width="30em"
                height="30em"
              />
            </a>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default StudypathNodeGroup;

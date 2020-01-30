import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCareers } from "../../actions/careers";
import { getCareerKeywords } from "../../actions/careerkeywords";
import { addCareerGoal } from "../../actions/careergoals";

//CSS Styling
const InputIcon = {
  position: "relative"
};

const InputIcon_i = {
  position: "absolute",
  display: "block",
  transform: "translate(0px, -50%)",
  top: "50%",
  pointerEvents: "none",
  width: "25px",
  textAlign: "center",
  fontStyle: "normal",
  color: "gray"
};

const InputIcon_input = {
  paddingLeft: "25px",
  paddingRight: "0px"
};

const AutoCompleteText = {
  width: "100%",
  border: "1px solid #ced4da"
  //boxShadow: "0 0 0 1px rgba(0,0,0,.1), 0 2px 4px 1px rgba(0,0,0,.18)"
};

const AutoCompleteText_input = {
  width: "100%",
  border: "none",
  padding: "0.375rem 0.75rem",
  boxSizing: "border-box"
};

const AutoCompleteText_ul = {
  listStyleType: "none",
  textAlign: "left",
  margin: "0",
  padding: "0"
};

const AutoCompleteText_li = {
  padding: "0.375rem 0.75rem"
};

//CareerGoalsForm class
export class CareerGoalsForm extends Component {
  state = {
    desired_salary: "",
    desired_remote: false,
    desired_field: "",
    desired_career: 0,
    field_suggestions: [],
    desired_field_text: ""
  };

  static propTypes = {
    careers: PropTypes.array.isRequired,
    career_keywords: PropTypes.array.isRequired,
    addCareerGoal: PropTypes.func.isRequired,
    getCareers: PropTypes.func.isRequired
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onDesiredFieldChange = e => {
    const value = e.target.value;
    let field_suggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      field_suggestions = this.career_keywords
        .sort()
        .filter(v => regex.test(v));
    }
    this.setState(() => ({ field_suggestions, desired_field: value }));
  };

  renderFieldSuggestions() {
    const { field_suggestions } = this.state;
    if (field_suggestions.length === 0) {
      return null;
    }
    return (
      <ul style={AutoCompleteText_ul}>
        {field_suggestions.map(item => (
          <li
            style={AutoCompleteText_li}
            onClick={() => this.fieldSuggestionSelected(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    );
  }

  fieldSuggestionSelected(value) {
    this.setState(() => ({
      desired_field: value,
      field_suggestions: []
    }));
  }

  onSubmit = e => {
    e.preventDefault();
    const {
      desired_salary,
      desired_remote,
      desired_field,
      desired_career
    } = this.state;
    const careeGoal = {
      desired_salary,
      desired_remote,
      desired_field,
      desired_career
    };
    this.props.addCareerGoal(careeGoal);
    //this.setState({
    //    desired_salary: "",
    //    desired_remote: false,
    //    desired_field: "",
    //    desired_career: 0
    //});
  };

  componentDidMount() {
    this.props.getCareers();
    this.props.getCareerKeywords();
  }

  componentDidUpdate(nextProps) {
    //if (nextProps.requestRefresh === true) {
    this.career_keywords = nextProps.career_keywords.map(function(o) {
      return o.name;
    });
    //}
  }

  render() {
    const {
      desired_salary,
      desired_remote,
      desired_field,
      desired_career
    } = this.state;
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Define your Goals</h2>
        <h5>These will be used to generate a Study Path</h5>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Specify your desired yearly salary</label>
            <div style={InputIcon}>
              <input
                className="form-control"
                style={InputIcon_input}
                type="number"
                min="0"
                name="desired_salary"
                onChange={this.onChange}
                value={desired_salary}
              />
              <i style={InputIcon_i}>$</i>
            </div>
          </div>
          <div className="form-group">
            <label>Do you prefer to work remote?</label>
            <select
              className="form-control"
              name="desired_remote"
              onChange={this.onChange}
              defaultValue={desired_remote}
            >
              <option key="remoteNo" value={false}>
                No
              </option>
              <option key="remoteYes" value={true}>
                Yes
              </option>
            </select>
          </div>
          <div className="form-group">
            <label>Specify your desired field</label>
            <div style={AutoCompleteText}>
              <input
                className="form-control"
                style={AutoCompleteText_input}
                type="text"
                name="desired_field"
                onChange={this.onDesiredFieldChange}
                value={desired_field}
              />
              {this.renderFieldSuggestions()}
            </div>
          </div>
          <div className="form-group">
            <label>Specify your desired career</label>
            <select
              className="form-control"
              name="desired_career"
              onChange={this.onChange}
              defaultValue={desired_career}
            >
              <option key="careerUnsure" value={0}>
                Unsure
              </option>
              {this.props.careers.map(career => (
                <option key={career.id} value={career.id}>
                  {career.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <textarea
              className="form-control"
              type="text"
              readOnly
              name="career_description"
              value={
                desired_career >= 0
                  ? this.props.careers.filter(
                      career => career.id == desired_career
                    ).length > 0
                    ? typeof this.props.careers.filter(
                        career => career.id == desired_career
                      )[0].description != "undefined"
                      ? this.props.careers.filter(
                          career => career.id == desired_career
                        )[0].description
                      : ""
                    : ""
                  : ""
              }
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Generate Study Path
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  careers: state.careersReducer.careers,
  career_keywords: state.careerKeywordsReducer.career_keywords
});

export default connect(mapStateToProps, {
  getCareers,
  addCareerGoal,
  getCareerKeywords
})(CareerGoalsForm);

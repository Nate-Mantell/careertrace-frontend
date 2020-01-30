import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

export class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <span className="navbar-text mr-4">
          <strong>{user ? "Welcome" : ""}</strong>
        </span>
        <li className="nav-item">
          <Link className="nav-link" to="/study_path" replace>
            My Study Path
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/career_goals" replace>
            Career Goals
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/add_resources" replace>
            Add Resources
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/browse_resources" replace>
            Browse Resources
          </Link>
        </li>
        <li className="nav-item">
          <a className="nav-link" onClick={this.props.logout}>
            Logout
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <li className="nav-item">
          <Link className="nav-link" to="/register" replace>
            Register
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login" replace>
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link
              className="navbar-brand"
              to={isAuthenticated ? "/" : "#"}
              replace
            >
              Careertrace
            </Link>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.authReducer
});

export default connect(mapStateToProps, { logout })(Header);

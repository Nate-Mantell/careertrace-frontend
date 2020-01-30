import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import Header from "./layout/Header";

import Dashboard from "./layout/Dashboard";
import StudyPathDashboard from "./layout/StudyPathDashboard";
import CareerGoalsDashboard from "./layout/CareerGoalsDashboard";
import AddResourcesDashboard from "./layout/AddResourcesDashboard";
import BrowseResourcesDashboard from "./layout/BrowseResourcesDashboard";

import Alerts from "./layout/Alerts";
import Login from "./accounts/Login";
import Register from "./accounts/Register";
import PrivateRoute from "./common/PrivateRoute";

import { Provider } from "react-redux";
import store from "../store";
import { loadUser } from "../actions/auth";

//Alert Options
const alertOptions = {
  timeout: 3000,
  position: "top center",
  containerStyle: {
    textAlign: "center"
  }
};

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Fragment>
              <Header />
              <Alerts />
              <Switch>
                <PrivateRoute exact path="/" component={Dashboard} />
                <PrivateRoute
                  exact
                  path="/study_path"
                  component={StudyPathDashboard}
                />
                <PrivateRoute
                  exact
                  path="/career_goals"
                  component={CareerGoalsDashboard}
                />
                <PrivateRoute
                  exact
                  path="/add_resources"
                  component={AddResourcesDashboard}
                />
                <PrivateRoute
                  exact
                  path="/browse_resources"
                  component={BrowseResourcesDashboard}
                />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
              </Switch>
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));

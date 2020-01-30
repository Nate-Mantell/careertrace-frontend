import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <Fragment>
      <div className="row">
        <div className="col-sm-6">
          <Link to="/study_path">
            <div className="card my-4" key="plaque_GenerateStudyPath">
              <div className="card-header card-title text-center">
                <h2>Generate Your Career Study Path</h2>
              </div>
              <div className="card-body">
                <p className="card-text">
                  Get started by generating your Study Path. We will walk you
                  through a series of steps to generate a list of resources for
                  you to study on your way to career success!
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-sm-6">
          <Link to="/browse_resources">
            <div className="card my-4" key="plaque_BrowseResources">
              <div className="card-header card-title text-center">
                <h2>Browse Through Useful Resources</h2>
              </div>
              <div className="card-body">
                <p className="card-text">
                  Explore through resources that other users found useful to
                  achieve their career goals.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6">
          <Link to="/career_goals">
            <div className="card my-4" key="plaque_CareerGoals">
              <div className="card-header card-title text-center">
                <h2>Enter Your Career Goals</h2>
                <h3>Discover career opportunities</h3>
              </div>
              <div className="card-body">
                <p className="card-text">
                  Add your different career goals, compare the most beneficial
                  study paths to acheive these goals and optimize your study
                  paths to get a taylored advantage in acheiving each and every
                  one of your goals. Discover related careers and explore
                  occupations to find the best ones for you!
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-sm-6">
          <Link to="/add_resources">
            <div className="card my-4" key="plaque_AddResources">
              <div className="card-header card-title text-center">
                <h2>Add Resources for Credibility</h2>
                <h3>Improve your portfolio of achievements</h3>
              </div>
              <div className="card-body">
                <p className="card-text">
                  Add books, apps, websites, videos and other resources that
                  helped you in your career thus far. Generate a portfolio of
                  acheivements you can share to increase your credibility within
                  your professional network and in the eyes of potential
                  employers.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </Fragment>
  );
}

import React from "react";

export const Career = props => {
  const { career } = props;
  return (
    <div className="card rounded my-4" key={"careerCard" + career.id}>
      <div className="card-header card-title text-center StudyPath_Career_card_header">
        <h5>{career.name}</h5>
      </div>
      <div className="card-body">
        <p className="card-text">
          <b>Average Salary:</b> ${career.avg_salary}
        </p>
        <p className="card-text">
          <b>Remote {career.remote_ok ? " OK" : " not ok"}</b>
        </p>
        <p className="card-text">
          {career.description.length < 200
            ? career.description
            : career.description.substring(0, 200) + "..."}
        </p>
        <button className="btn btn-primary mr-2">View Details</button>
      </div>
    </div>
  );
};

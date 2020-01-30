import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import {
  ADD_CAREER_GOAL,
  BEGIN_GENERATING_STUDY_PATH,
  FINISH_GENERATING_STUDY_PATH,
  ABORT_GENERATING_STUDY_PATH
} from "./types";

//ADD CAREER GOAL
export const addCareerGoal = careerGoal => (dispatch, getState) => {
  dispatch({
    type: BEGIN_GENERATING_STUDY_PATH
  });
  dispatch(
    createMessage({
      careerGoalAdded:
        "Thank you for your submission. We will now generate your study path"
    })
  );
  axios
    .post("api/career_goals/", careerGoal, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: ADD_CAREER_GOAL,
        payload: res.data
      });
      dispatch({
        type: FINISH_GENERATING_STUDY_PATH
      });
    })
    .catch(err => {
      dispatch({
        type: ABORT_GENERATING_STUDY_PATH
      });
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

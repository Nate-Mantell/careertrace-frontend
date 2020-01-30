import axios from "../axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import { GET_STUDYPATHS } from "./types";

//GET STUDYPATH

export const getStudypaths = () => (dispatch, getState) => {
  if (getState().studypathReducer.studypath_is_generating) {
    if (getState().studypathReducer.studypath_pending_retreival) {
      fetchStudypaths(dispatch, getState);
    } else {
      dispatch(
        createMessage({
          studyPathIsGenerating:
            "We are generating a new Study Path, please wait..."
        })
      );
    }
  } else {
    if (getState().studypathReducer.studypath_pending_retreival) {
      if (getState().studypathReducer.studypath_retreived) {
        dispatch(
          createMessage({
            studyPathAlreadyUpToDate: "Your Study Path is up to date"
          })
        );
      } else {
        fetchStudypaths(dispatch, getState);
      }
    } else {
      if (getState().studypathReducer.studypath_retreived) {
        dispatch(
          createMessage({
            studyPathAlreadyUpToDate: "Your Study Path is up to date"
          })
        );
      } else {
        fetchStudypaths(dispatch, getState);
      }
    }
  }
};

const fetchStudypaths = (dispatch, getState) => {
  axios
    .get("api/study_paths/", tokenConfig(getState))
    .then(res => {
      if (res.data.length == 0) {
        dispatch(
          createMessage({
            noStudyPathExistsForUser:
              "You don't have a Study Path yet Define some Career Goals to generate one!"
          })
        );
      } else {
        dispatch({
          type: GET_STUDYPATHS,
          payload: res.data
        });
      }
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

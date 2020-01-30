import axios from "../axios";
import { createMessage, returnErrors } from "./messages";

import { GET_CAREERS, ADD_CAREER } from "./types";

//GET CAREERS
export const getCareers = () => dispatch => {
  axios
    .get("api/careers/")
    .then(res => {
      dispatch({
        type: GET_CAREERS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

//ADD CAREER
export const addCareer = career => dispatch => {
  axios
    .post("api/careers/", career)
    .then(res => {
      dispatch(createMessage({ careerAdded: "Career Added" }));
      dispatch({
        type: ADD_CAREER,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

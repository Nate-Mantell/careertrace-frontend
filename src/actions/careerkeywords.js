import axios from "../axios";
import { returnErrors } from "./messages";

import { GET_CAREERKEYWORDS } from "./types";

//GET CAREERS
export const getCareerKeywords = () => dispatch => {
  axios
    .get("api/career_keywords/")
    .then(res => {
      dispatch({
        type: GET_CAREERKEYWORDS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

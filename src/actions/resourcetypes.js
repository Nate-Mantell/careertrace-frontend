import axios from "../axios";

import { GET_RESOURCE_TYPES } from "./types";

//GET RESOURCE TYPES
export const getResourceTypes = () => dispatch => {
  axios
    .get("api/resource_types/")
    .then(res => {
      dispatch({
        type: GET_RESOURCE_TYPES,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

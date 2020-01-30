import axios from "../axios";
import { createMessage, returnErrors } from "./messages";

import { GET_RESOURCES, ADD_RESOURCE } from "./types";

//GET RESOURCES
export const getResources = () => dispatch => {
  axios
    .get("api/resources/")
    .then(res => {
      dispatch({
        type: GET_RESOURCES,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

//ADD RESOURCE
export const addResource = resource => dispatch => {
  axios
    .post("api/resources/", resource)
    .then(res => {
      dispatch(createMessage({ resourceAdded: "Resource Added" }));
      dispatch({
        type: ADD_RESOURCE,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

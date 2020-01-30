import { GET_RESOURCE_TYPES } from "../actions/types.js";

const initialState = {
  resource_types: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_RESOURCE_TYPES:
      return {
        ...state,
        resource_types: action.payload
      };
    default:
      return state;
  }
}

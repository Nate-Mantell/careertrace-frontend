import { GET_RESOURCES, ADD_RESOURCE } from "../actions/types.js";

const initialState = {
  resources: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_RESOURCES:
      return {
        ...state,
        resources: action.payload
      };
    case ADD_RESOURCE:
      return {
        ...state,
        resources: [...state.resources, action.payload]
      };
    default:
      return state;
  }
}

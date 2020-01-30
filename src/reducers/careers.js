import { GET_CAREERS, ADD_CAREER } from "../actions/types.js";

const initialState = {
  careers: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CAREERS:
      return {
        ...state,
        careers: action.payload
      };
    case ADD_CAREER:
      return {
        ...state,
        careers: [...state.careers, action.payload]
      };
    default:
      return state;
  }
}

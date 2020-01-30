import { GET_CAREERKEYWORDS } from "../actions/types.js";

const initialState = {
  career_keywords: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CAREERKEYWORDS:
      return {
        ...state,
        career_keywords: action.payload
      };
    default:
      return state;
  }
}

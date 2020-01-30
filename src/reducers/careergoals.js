import { ADD_CAREER_GOAL } from "../actions/types.js";

const initialState = {
  career_goal_specified: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_CAREER_GOAL:
      return {
        ...state,
        career_goal_specified: true
      };
    default:
      return state;
  }
}

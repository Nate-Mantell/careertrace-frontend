import {
  GET_STUDYPATHS,
  BEGIN_GENERATING_STUDY_PATH,
  FINISH_GENERATING_STUDY_PATH,
  ABORT_GENERATING_STUDY_PATH
} from "../actions/types.js";

const initialState = {
  previous_studypaths: [],
  studypaths: [],
  studypath_is_generating: false,
  studypath_pending_retreival: false,
  studypath_retreived: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_STUDYPATHS:
      return {
        ...state,
        previous_studypaths: state.studypaths,
        studypath_retreived: action.payload.length > 0,
        studypath_pending_retreival: false,
        //  action.payload.length > 0 ? false : state.studypath_pending_retreival,
        studypaths: action.payload
      };
    case BEGIN_GENERATING_STUDY_PATH:
      return {
        ...state,
        studypath_is_generating: true
      };
    case FINISH_GENERATING_STUDY_PATH:
      return {
        ...state,
        studypath_retreived: false,
        studypath_is_generating: false,
        studypath_pending_retreival: true
      };
    case ABORT_GENERATING_STUDY_PATH:
      return {
        ...state,
        studypath_is_generating: false
      };
    default:
      return state;
  }
}

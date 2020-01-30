import { combineReducers } from "redux";
import studypath from "./studypath";
import resources from "./resources";
import resourceTypes from "./resourcetypes";
import careers from "./careers";
import careerKeywords from "./careerkeywords";
import careerGoals from "./careergoals";
import errors from "./errors";
import messages from "./messages";
import auth from "./auth";

export default combineReducers({
  studypathReducer: studypath,
  resourcesReducer: resources,
  resourceTypesReducer: resourceTypes,
  errorReducer: errors,
  messageReducer: messages,
  authReducer: auth,
  careersReducer: careers,
  careerGoalsReducer: careerGoals,
  careerKeywordsReducer: careerKeywords
});

import { applyMiddleware, combineReducers, createStore } from "redux";
import { logger } from "redux-logger";
import thunk from "redux-thunk";

import { authReducer } from "./auth/authReducer";

const rootReducer = combineReducers({
  authReducer: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;

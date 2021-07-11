import { applyMiddleware, combineReducers, createStore } from "redux";
import { logger } from "redux-logger";
import thunk from "redux-thunk";

import { authReducer } from "./auth/authReducer";
import { homeReducer } from "./home/homeReducer";

const rootReducer = combineReducers({
  authReducer: authReducer,
  homeReducer: homeReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;

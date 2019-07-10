import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import listReducer from "./redux/reducers";
import thunk from "redux-thunk";

/* eslint-disable no-underscore-dangle */

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  app: listReducer
});
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

/* eslint-enable */

export default store;

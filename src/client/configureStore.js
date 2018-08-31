import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import monitorReducerEnhancer from "./enhancers/monitorReducer";
import rootReducer from "./reducers";

const loggerMilddleware = createLogger();

export default function configureStore(preloadedState) {
  const middlewares = [thunkMiddleware, loggerMilddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer, monitorReducerEnhancer];
  const composedEnhancers = compose(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);
  return store;
}

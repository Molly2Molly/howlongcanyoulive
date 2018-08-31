import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import monitorReducerEnhancer from "./enhancers/monitorReducer";
import rootReducer from "./reducers";

const loggerMilddleware = createLogger();

export default function configureStore(preloadedState) {
  const middlewares = [];
  middlewares.push(thunkMiddleware);
  if (process.env.NODE_ENV === "development") {
    middlewares.push(loggerMilddleware);
  }
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  if (process.env.NODE_ENV === "development") {
    enhancers.push(monitorReducerEnhancer);
  }
  const composedEnhancers = compose(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);
  return store;
}

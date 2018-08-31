import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import monitorReducerEnhancer from "./enhancers/monitorReducer";
import rootReducer from "./reducers";

const loggerMilddleware = createLogger();

// const store = createStore(
//   rootReducer,
//   applyMiddleware(
//     thunkMiddleware, // lets us dispatch() functions
//     loggerMilddleware // neat middleware that logs actions
//   )
// );

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
  let composedEnhancers = composeWithDevTools(...enhancers);
  if (process.env.NODE_ENV === "production") {
    composedEnhancers = compose(...enhancers);
  }

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  // reducer hot reloading
  if (process.env.NODE_ENV !== "production" && module.hot) {
    module.hot.accept("./reducers", () => store.replaceReducer(rootReducer));
  }

  return store;
}

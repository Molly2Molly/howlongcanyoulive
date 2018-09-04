import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./configureStore";
import "./css/index.less";
import "./css/app.css";
import App from "./App.js";

window.Promise = Promise;

// grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;
// Allow the passed state to be garbage=collected
delete window.__PRELOADED_STATE__;

const store = configureStore(preloadedState);

const renderApp = () => {
  if (!preloadedState) {
    ReactDOM.render(
      <Provider store={store}>
        <App store={store} />
      </Provider>,
      document.getElementById("root")
    );
  } else {
    // data-react-id attributes from the server-rendered HTML
    ReactDOM.hydrate(
      <Provider store={store}>
        <App store={store} />
      </Provider>,
      document.getElementById("root")
    );
  }
};

// component hot reloading
if (process.env.NODE_ENV !== "production" && module.hot) {
  module.hot.accept("./App", () => {
    renderApp();
  });
}

// if (module.hot) {
//     module.hot.accept('./app.js', function() {
//         console.log('Accepting the updated printMe module!');
//         document.body.removeChild(element);
//         element = component(); // Re-render the "component" to update the click handler
//         document.body.appendChild(element);
//     })
// }
// if (process.env.NODE_ENV !== 'production') {
//   console.log('Looks like we are in development mode!');
// }

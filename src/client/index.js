import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./configureStore";
import "typeface-roboto";
import "./css/index.less";
import App from "./App.js";
import { GlobalContext, globalContextObject } from "./Context";

window.Promise = Promise;

let preloadedState;
let renderFunc;

if (window.__PRELOADED_STATE__) {
  // SERVER SIDE RENDER
  // grab the state from a global variable injected into the server-generated HTML
  preloadedState = window.__PRELOADED_STATE__;
  // Allow the passed state to be garbage=collected
  delete window.__PRELOADED_STATE__;
  // data-react-id attributes from the server-rendered HTML
  renderFunc = ReactDOM.hydrate;
} else {
  // NOT SERVER SIDE RENDER
  renderFunc = ReactDOM.render;
}

const store = configureStore(preloadedState);

const renderApp = () => {
  renderFunc(
    <Provider store={store}>
      <GlobalContext.Provider value={globalContextObject}>
        <App store={store} />
      </GlobalContext.Provider>
    </Provider>,
    document.getElementById("root")
  );
};

renderApp();

// component hot reloading
if (process.env.NODE_ENV !== "production" && module.hot) {
  module.hot.accept(["./App"], () => {
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

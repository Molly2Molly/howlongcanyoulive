import React from "react";
import ReactDOM from "react-dom";
import './css/index.less';
import './css/app.css';

import App from './App.js';

window.Promise = Promise;

ReactDOM.render(<App />, document.getElementById('root'));

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
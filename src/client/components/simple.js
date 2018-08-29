import React from 'react';
export default function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// export default class Welcome extends React.Component {
//     render() {
//       return <h1>Hello, {this.props.name}</h1>;
//     }
// }
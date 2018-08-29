import React from 'react';

// short syntax
// class Columns extends React.Component {
//     render() {
//       return (
//         <>
//           <td>Hello</td>
//           <td>World</td>
//         </>
//       );
//     }
// }

class Columns extends React.Component {
    render() {
      return (
        <React.Fragment>
          <td>Hello</td>
          <td>World</td>
        </React.Fragment>
      );
    }
}

export default class Table extends React.Component {
    render() {
      return (
        <table>
          <tbody>
            <tr>
                <Columns />
            </tr>
          </tbody>
        </table>
      );
    }
}
  
function Glossary(props) {
    return (
      <dl>
        {props.items.map(item => (
          // Without the `key`, React will fire a key warning
          <React.Fragment key={item.id}>
            <dt>{item.term}</dt>
            <dd>{item.description}</dd>
          </React.Fragment>
        ))}
      </dl>
    );
}
import React from 'react';

// Fundamentally, JSX just provides syntactic sugar for the React.createElement(component, props, ...children) function. 

// <MyButton color="blue" shadowSize={2}>
//   Click Me
// </MyButton>

// React.createElement(
//     MyButton,
//     {color: 'blue', shadowSize: 2},
//     'Click Me'
// )

// <div className="sidebar" />

// React.createElement(
//     'div',
//     {className: 'sidebar'},
//     null
// )

// import { PhotoStory, VideoStory } from './stories';
// const components = {
//   photo: PhotoStory,
//   video: VideoStory
// };
// function Story(props) {
//     // // Wrong! JSX type can't be an expression.
//     // return <components[props.storyType] story={props.story} />;
//     // Correct! JSX type can be a capitalized variable.
//     const SpecificStory = components[props.storyType];
//     return <SpecificStory story={props.story} />;
// }

// function NumberDescriber(props) {
//     let description;
//     if (props.number % 2 == 0) {
//       description = <strong>even</strong>;
//     } else {
//       description = <i>odd</i>;
//     }
//     return <div>{props.number} is an {description} number</div>;
// }
  
// const Button = props => {
//     const { kind, ...other } = props;
//     const className = kind === "primary" ? "PrimaryButton" : "SecondaryButton";
//     return <button className={className} {...other} />;
//   };
  
//   const App = () => {
//     return (
//       <div>
//         <Button kind="primary" onClick={() => console.log("clicked!")}>
//           Hello World!
//         </Button>
//       </div>
//     );
// };

// render() {
//     // No need to wrap list items in an extra element!
//     return [
//       // Don't forget the keys :)
//       <li key="A">First item</li>,
//       <li key="B">Second item</li>,
//       <li key="C">Third item</li>,
//     ];
// }

// // Calls the children callback numTimes to produce a repeated component
// function Repeat(props) {
//     let items = [];
//     for (let i = 0; i < props.numTimes; i++) {
//       items.push(props.children(i));
//     }
//     return <div>{items}</div>;
// }
// function ListOfTenThings() {
//     return (
//       <Repeat numTimes={10}>
//         {(index) => <div key={index}>This is item {index} in the list</div>}
//       </Repeat>
//     );
// }

// Booleans, Null, and Undefined Are Ignored
// <div>
//   {showHeader && <Header />}
//   <Content />
// </div>


// class CounterButton extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {count: 1};
//     }
  
//     shouldComponentUpdate(nextProps, nextState) {
//       if (this.props.color !== nextProps.color) {
//         return true;
//       }
//       if (this.state.count !== nextState.count) {
//         return true;
//       }
//       return false;
//     }
  
//     render() {
//       return (
//         <button
//           color={this.props.color}
//           onClick={() => this.setState(state => ({count: state.count + 1}))}>
//           Count: {this.state.count}
//         </button>
//       );
//     }
// }


// class CounterButton extends React.PureComponent {
//     constructor(props) {
//       super(props);
//       this.state = {count: 1};
//     }
  
//     render() {
//       return (
//         <button
//           color={this.props.color}
//           onClick={() => this.setState(state => ({count: state.count + 1}))}>
//           Count: {this.state.count}
//         </button>
//       );
//     }
// }


class ListOfWords extends React.PureComponent {
    render() {
      return <div>{this.props.words.join(',')}</div>;
    }
}
  
export default class WordAdder extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        words: ['marklar']
      };
      this.handleClick = this.handleClick.bind(this);
    }
  
    handleClick() {
    //   // This section is bad style and causes a bug
    //   const words = this.state.words;
    //   words.push('marklar');
    //   this.setState({words: words});
    
    //   this.setState(prevState => ({
    //     words: prevState.words.concat(['marklar'])
    //   }));
      this.setState(prevState => ({
        words: [...prevState.words, 'marklar'],
      }));
    }
  
    render() {
      return (
        <div>
          <button onClick={this.handleClick} >Click to Add</button>
          <ListOfWords words={this.state.words} />
        </div>
      );
    }
}
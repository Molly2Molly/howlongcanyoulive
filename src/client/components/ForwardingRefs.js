import React from 'react';

// const FancyButton = React.forwardRef((props, ref) => (
//   <button ref={ref} className="FancyButton">
//     {props.children}
//   </button>
// ));

// You can now get a ref directly to the DOM button:
// const ref = React.createRef();
// <FancyButton ref={ref}>Click me!</FancyButton>;

// When the ref is attached, ref.current will point to the <button> DOM node.

// When you start using forwardRef in a component library, you should treat it as a breaking change and release a new major version of your library. 

// Ref forwarding is an opt-in feature that lets some components take a ref they receive, and pass it further down (in other words, “forward” it) to a child.

function logProps(Component) {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('old props:', prevProps);
      console.log('new props:', this.props);
    }

    render() {
      const { forwardedRef, ...rest } = this.props;

      // Assign the custom prop "forwardedRef" as a ref
      return <Component ref={forwardedRef} {...rest} />;
    }
  }

  function forwardRef(props, ref) {
    return <LogProps {...props} forwardedRef={ref} />;
  }

  // Give this component a more helpful display name in DevTools.
  // e.g. "ForwardRef(logProps(MyComponent))"
  const name = Component.displayName || Component.name;
  forwardRef.displayName = `logProps(${name})`;

  return React.forwardRef(forwardRef);
}

class FancyButton extends React.Component {
  render() {
    return (
      <button className="FancyButton">
        {this.props.children}
      </button>
    );
  }
}

export default logProps(FancyButton);
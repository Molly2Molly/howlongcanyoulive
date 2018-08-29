import React from 'react';

// Concretely, a higher-order component is a function that takes a component and returns a new component.

class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      // "DataSource" is some global data source
      comments: DataSource.getComments()
    };
  }

  componentDidMount() {
    // Subscribe to changes
    DataSource.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    // Clean up listener
    DataSource.removeChangeListener(this.handleChange);
  }

  handleChange() {
    // Update component state whenever the data source changes
    this.setState({
      comments: DataSource.getComments()
    });
  }

  render() {
    return (
      <div>
        {this.state.comments.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </div>
    );
  }
}

class BlogPost extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      blogPost: DataSource.getBlogPost(props.id)
    };
  }

  componentDidMount() {
    DataSource.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    DataSource.removeChangeListener(this.handleChange);
  }

  handleChange() {
    this.setState({
      blogPost: DataSource.getBlogPost(this.props.id)
    });
  }

  render() {
    return <TextBlock text={this.state.blogPost} />;
  }
}

// This function takes a component...
function withSubscription(WrappedComponent, selectData) {
  // ...and returns another component...
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        data: selectData(DataSource, props)
      };
    }

    componentDidMount() {
      // ... that takes care of the subscription...
      DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
      DataSource.removeChangeListener(this.handleChange);
    }

    handleChange() {
      this.setState({
        data: selectData(DataSource, this.props)
      });
    }

    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };
}

const CommentListWithSubscription = withSubscription(
  CommentList,
  (DataSource) => DataSource.getComments()
);

const BlogPostWithSubscription = withSubscription(
  BlogPost,
  (DataSource, props) => DataSource.getBlogPost(props.id)
);


// Convention: Wrap the Display Name for Easy Debugging

function withSubscription(WrappedComponent) {
  class WithSubscription extends React.Component {/* ... */}
  WithSubscription.displayName = `WithSubscription(${getDisplayName(WrappedComponent)})`;
  return WithSubscription;
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

// HOCs Caveats
// 1.Don’t Use HOCs Inside the render Method

// render() {
//   // A new version of EnhancedComponent is created on every render
//   // EnhancedComponent1 !== EnhancedComponent2
//   const EnhancedComponent = enhance(MyComponent);
//   // That causes the entire subtree to unmount/remount each time!
//   return <EnhancedComponent />;
// }

// 2.Static Methods must be Copied Over

// // Define a static method
// WrappedComponent.staticMethod = function() {/*...*/}
// // Now apply a HOC
// const EnhancedComponent = enhance(WrappedComponent);
// // The enhanced component has no static method
// typeof EnhancedComponent.staticMethod === 'undefined' // true

// function enhance(WrappedComponent) {
//   class Enhance extends React.Component {/*...*/}
//   // Must know exactly which method(s) to copy :(
//   Enhance.staticMethod = WrappedComponent.staticMethod;
//   return Enhance;
// }

// import hoistNonReactStatic from 'hoist-non-react-statics';
// function enhance(WrappedComponent) {
//   class Enhance extends React.Component {/*...*/}
//   hoistNonReactStatic(Enhance, WrappedComponent);
//   return Enhance;
// }

// // Instead of...
// MyComponent.someFunction = someFunction;
// export default MyComponent;
// // ...export the method separately...
// export { someFunction };
// // ...and in the consuming module, import both
// import MyComponent, { someFunction } from './MyComponent.js';
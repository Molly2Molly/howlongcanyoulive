import React from 'react';

// class SomePlugin extends React.Component {
//   componentDidMount() {
//     this.$el = $(this.el);
//     this.$el.somePlugin();
//   }

//   componentWillUnmount() {
//     this.$el.somePlugin('destroy');
//   }

//   render() {
//     return <div ref={el => this.el = el} />;
//   }
// }

function Example() {
  return (
    <Chosen onChange={value => console.log(value)}>
      <option>vanilla</option>
      <option>chocolate</option>
      <option>strawberry</option>
    </Chosen>
  );
}

class Chosen extends React.Component {
  componentDidMount() {
    this.$el = $(this.el);
    this.$el.chosen();
  }
  
  componentWillUnmount() {
    this.$el.chosen('destroy');
  }
  
  render() {
    return (
      <div>
        <select className="Chosen-select" ref={el => this.el = el}>
          {this.props.children}
        </select>
      </div>
    );
  }
}
import React from 'react';

// Context lets us pass a value deep into the component tree
// without explicitly threading it through every component.
// Create a context for the current theme (with "light" as the default).
// const {Provider, Consumer} = React.createContext(defaultValue);
const ThemeContext = React.createContext('light');

export default function Context() {
    // Use a Provider to pass the current theme to the tree below.
    // Any component can read it, no matter how deep it is.
    // In this example, we're passing "dark" as the current value.
    return (
        <ThemeContext.Provider value="dark">
          <Toolbar />
        </ThemeContext.Provider>
    );
}

// A component in the middle doesn't have to
// pass the theme down explicitly anymore.
function Toolbar(props) {
    return (
      <div>
        <ThemedButton />
      </div>
    );
}
  
function ThemedButton(props) {
    // Use a Consumer to read the current theme context.
    // React will find the closest theme Provider above and use its value.
    // In this example, the current theme is "dark".
    return (
      <ThemeContext.Consumer>
        {theme => <Button {...props} theme={theme} />}
      </ThemeContext.Consumer>
    );
}
  
function Button(props) {
    return (
      <div className="button ">{props.theme}</div>
    );
}
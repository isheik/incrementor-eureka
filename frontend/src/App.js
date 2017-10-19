import React from 'react';
// import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { render } from "react-dom";
import SideMenu from "./SideMenu";
import Main from "./Main";

// const NotFound = () => (<div><span>NOT FOUND</span></div>);

class App extends React.Component {
  render() {
    return (
      <div>
        <SideMenu />
        <Main />
      </div>
    );
  }
}

export default App;

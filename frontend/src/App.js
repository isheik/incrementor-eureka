import React from 'react';
// import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { render } from "react-dom";
import Header from "./Header";
import Main from "./Main";
import './App.css';

// const NotFound = () => (<div><span>NOT FOUND</span></div>);

class App extends React.Component {
  render() {
    return (
      <div>
        <div className='header-wrapper'>
          <Header/>
        </div>
        <div className='main-wrapper'>
          <Main />
        </div>
      </div>
    );
  }
}

export default App;

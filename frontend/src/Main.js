import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import Home from "./Home";
import Test from "./Test";
import Login from "./Login";

const Main = () => (
    <main>
        <Switch>
            {window.location.pathname.includes('index.html') && <Redirect to="/" />}
            <Route exact path='/' component={Home}/>
            <Route path='/test' component={Test}/>
            <Route path='/login' component={Login}/>
        </Switch>
    </main>
);

export default Main;
import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import Home from "./Home";
import Test from "./Test";
import Login from "./Login";
import Register from "./Register";
import Manipulate from "./Manipulate";

const Main = () => (
    <main>
        <Switch>
            {window.location.pathname.includes('index.html') && <Redirect to="/" />}
            <Route exact path='/' component={Home}/>
            <Route path='/test' component={Test}/>
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
            <Route path='/manipulate' component={Manipulate}/>
        </Switch>
    </main>
);

export default Main;
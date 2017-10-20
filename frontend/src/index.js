import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import registerServiceWorker from './registerServiceWorker';

/**
 * root of the web app.
 */
ReactDOM.render((
    <BrowserRouter>
        <App />
    </BrowserRouter>),
     document.getElementById('root'));
registerServiceWorker();

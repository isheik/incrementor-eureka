import React from "react";
import { Link } from "react-router-dom";
import logo from './logo.jpg';

class Header extends React.Component {
    render(){
        return (
        <header className='app-header'>
            <img id="logo" src={logo} className="app-logo" alt="logo" />
            <h1 id="title">incrementor eureka</h1>
            
            <nav className='app-global-nav'>
                <ul className='app-nav-menu'>
                    <li id="home" className='app-nav-items'>
                        <Link to='/'>Home</Link>
                    </li>
                    <li id="login" className='app-nav-items'>
                        <Link to='/Login'>Login</Link>
                    </li>
                    <li id="register" className='app-nav-items'>
                        <Link to='/Register'>Register</Link>
                    </li>
                    <li id="identifier" className='app-nav-items'>
                        <Link to='/Manipulate'>Set or Get identifier</Link>
                    </li>
                </ul>
            </nav>
        </header>
        )
    }
};

export default Header;
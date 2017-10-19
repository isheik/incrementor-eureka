import React from "react";
import { Link } from "react-router-dom";

const SideMenu = () => (
    <header>
        <nav>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/test'>Test</Link>
                </li>
            </ul>
        </nav>
    </header>
);

export default SideMenu;
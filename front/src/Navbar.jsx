import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

class Navbar extends React.Component {
    render() {
        return (
            <nav className="navbar">
                <ul>
                    <li>
                        <Link to="/">Main</Link>
                    </li>
                    <li>
                        <Link to="/entries">Latest entries</Link>
                    </li>
                    <li>
                        <Link to="/team">The team</Link>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Navbar;

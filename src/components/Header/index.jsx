import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Header = () => {
    return (
        <header className="header">
            <div className="logo-container">
                <Link to="/">
                    <img src="/assets/images/futurama-logo.png" alt="Futurama Logo" className="logo" />
                </Link>
            </div>
            <nav className="navigation">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/episodes">Episodes</Link></li>
                    <li><Link to="/characters">Characters</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
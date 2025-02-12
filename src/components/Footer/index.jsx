// filepath: /anime-website/anime-website/src/components/Footer/index.jsx

import React from 'react';
import './styles.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} Wannabe Futurama Website. All rights reserved.</p>
                <nav>

                </nav>
            </div>
        </footer>
    );
};

export default Footer;
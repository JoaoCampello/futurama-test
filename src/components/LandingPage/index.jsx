import React from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';
const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-page">
            <video
                className="video-background"
                autoPlay
                loop
                muted
                playsInline
                onError={(e) => {
                    console.error('Video Error:', e);
                }}
            >
                <source src="/assets/videos/background-vid.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <header className="landing-header">
                <h1>Welcome to Futurama World</h1>
                <p>Your one-stop destination for all things Futurama!</p>
            </header>
            <section className="main-content">
                <img 
                    src="/assets/images/futurama-landing.png" 
                    alt="Futurama Logo" 
                    className="center-image"
                />
                <div className="button-container">
                    <button onClick={() => navigate('/episodes')}>Episodes</button>
                    <button onClick={() => navigate('/characters')}>Characters</button>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
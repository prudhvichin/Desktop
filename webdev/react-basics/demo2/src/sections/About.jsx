import React from 'react';
import SectionTitle from '../components/SectionTitle';
import useScrollAnimation from '../hooks/useScrollAnimation';
import './About.css';

const About = () => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section id="about" className="container">
      <SectionTitle title="About Me" subtitle="My developer journey and passions." />
      
      <div 
        ref={ref} 
        className={`about-content ${isVisible ? 'animate-fade-in-up' : ''}`}
        style={{ opacity: 0 }}
      >
        <div className="about-text">
          <p>
            Hello! I'm a passionate software developer who loves building things that live on the internet.
            My journey into programming started when I decided to build custom tools for my favorite games,
            which eventually led me down the rabbit hole of C++ and system architecture.
          </p>
          <p>
            Fast-forward to today, and I've had the privilege of working across the stack — from 
            crafting responsive, beautiful React frontends to designing robust Python/Flask backends 
            and managing PostgreSQL databases.
          </p>
          <p>
            I care deeply about <strong>clean code</strong>, <strong>user experience</strong>, and 
            <strong>performance</strong>. Whether I'm configuring a Linux server or pushing pixels 
            in CSS, my goal is always to deliver high-quality, scalable solutions.
          </p>
          
          <div className="highlights">
            <div className="highlight-item">
              <span className="highlight-icon">🚀</span>
              <span>Fast & Scalable Apps</span>
            </div>
            <div className="highlight-item">
              <span className="highlight-icon">🎨</span>
              <span>Premium UI/UX</span>
            </div>
            <div className="highlight-item">
              <span className="highlight-icon">⚙️</span>
              <span>Systems Programming</span>
            </div>
          </div>
        </div>
        
        <div className="about-image-wrapper">
          <div className="image-container animate-float">
            <div className="image-backdrop"></div>
            <img 
              src="https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?auto=format&fit=crop&w=600&q=80" 
              alt="Developer workspace" 
              className="about-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

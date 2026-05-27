import React from 'react';
import ParticleBackground from '../components/ParticleBackground';
import Button from '../components/Button';
import useTypewriter from '../hooks/useTypewriter';
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload } from 'react-icons/fa';
import { Link } from 'react-scroll';
import './Hero.css';

const Hero = () => {
  const roles = [
    "Full Stack Developer",
    "Systems Programmer",
    "UI/UX Enthusiast",
    "Problem Solver"
  ];
  
  const currentRole = useTypewriter(roles);

  return (
    <section id="home" className="hero-section">
      <ParticleBackground />
      
      <div className="container hero-content">
        <p className="greeting animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Hi, my name is
        </p>
        
        <h1 className="name animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          Dev Name.
        </h1>
        
        <h2 className="role animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          I'm a <span className="typewriter">{currentRole}</span>
          <span className="cursor"></span>
        </h2>
        
        <p className="description animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          I build exceptional digital experiences from frontend to backend. 
          Specializing in React, Python, and C++, I love turning complex problems 
          into elegant, performant solutions.
        </p>
        
        <div className="cta-group animate-fade-in-up" style={{ animationDelay: '1s' }}>
          <Button href="/resume.pdf" download="Resume.pdf">
            <FaDownload /> Download Resume
          </Button>
          <Button href="https://github.com" variant="outline">
            <FaGithub size={20} />
          </Button>
          <Button href="https://linkedin.com" variant="outline">
            <FaLinkedin size={20} />
          </Button>
          <Button href="mailto:contact@example.com" variant="outline">
            <FaEnvelope size={20} />
          </Button>
        </div>
      </div>
      
      <div className="scroll-indicator animate-fade-in" style={{ animationDelay: '1.5s' }}>
        <Link to="about" smooth={true} duration={500}>
          <div className="mouse">
            <div className="wheel"></div>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Hero;

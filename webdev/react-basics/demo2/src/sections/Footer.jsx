import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer glass-panel">
      <div className="container footer-container">
        <div className="footer-socials">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link">
            <FaGithub size={20} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
            <FaLinkedin size={20} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
            <FaTwitter size={20} />
          </a>
        </div>
        
        <div className="footer-text">
          <p>Designed & Built by Dev Name</p>
          <p className="copyright">© {currentYear} All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

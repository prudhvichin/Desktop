import React, { useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { FaPaperPlane } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const [ref, isVisible] = useScrollAnimation();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => setSuccess(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="container">
      <SectionTitle title="Get In Touch" subtitle="Let's build something amazing together." />
      
      <div 
        ref={ref} 
        className={`contact-container ${isVisible ? 'animate-fade-in-up' : ''}`}
        style={{ opacity: 0 }}
      >
        <div className="contact-info">
          <h3 className="contact-heading">Let's Connect</h3>
          <p className="contact-text">
            I'm currently looking for new opportunities. Whether you have a question, 
            a project idea, or just want to say hi, I'll try my best to get back to you!
          </p>
          <div className="contact-email">
            <a href="mailto:contact@example.com" className="email-link">
              contact@example.com
            </a>
          </div>
        </div>

        <form className="contact-form glass-panel" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
              placeholder="John Doe"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              placeholder="john@example.com"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea 
              id="message" 
              name="message" 
              value={formData.message} 
              onChange={handleChange} 
              required 
              rows="5"
              placeholder="Hello..."
            ></textarea>
          </div>
          
          <Button type="submit" variant="primary" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : <><FaPaperPlane /> Send Message</>}
          </Button>
          
          {success && (
            <p className="success-message animate-fade-in">Message sent successfully!</p>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;

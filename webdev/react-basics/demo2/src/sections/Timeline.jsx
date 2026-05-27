import React from 'react';
import SectionTitle from '../components/SectionTitle';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { timeline } from '../data/timeline';
import './Timeline.css';

const Timeline = () => {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.05 });

  return (
    <section id="timeline" className="container">
      <SectionTitle title="Experience & Journey" subtitle="My path so far." />
      
      <div 
        ref={ref} 
        className={`timeline-container ${isVisible ? 'animate-fade-in-up' : ''}`}
        style={{ opacity: 0 }}
      >
        <div className="timeline-line"></div>
        
        {timeline.map((item, index) => (
          <div key={item.id} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
            <div className="timeline-dot animate-glow">
              {item.icon}
            </div>
            
            <div className="timeline-content glass-panel card-hover">
              <span className="timeline-year">{item.year}</span>
              <h3 className="timeline-title">{item.title}</h3>
              <p className="timeline-desc">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Timeline;

import React from 'react';
import SectionTitle from '../components/SectionTitle';
import Card from '../components/Card';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { skills } from '../data/skills';
import './Skills.css';

const Skills = () => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section id="skills" className="container">
      <SectionTitle title="Technical Skills" subtitle="Tools and technologies I work with." />
      
      <div 
        ref={ref} 
        className={`skills-grid ${isVisible ? 'animate-fade-in-up' : ''}`}
        style={{ opacity: 0 }}
      >
        {Object.entries(skills).map(([category, items], index) => (
          <Card key={category} className="skill-category-card" hover={false}>
            <h3 className="category-title">{category}</h3>
            <div className="skills-list">
              {items.map((skill) => (
                <div key={skill.name} className="skill-item">
                  <div className="skill-icon">
                    {skill.icon}
                  </div>
                  <span className="skill-name">{skill.name}</span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Skills;

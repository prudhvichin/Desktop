import React from 'react';
import SectionTitle from '../components/SectionTitle';
import Card from '../components/Card';
import Button from '../components/Button';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { projects } from '../data/projects';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import './Projects.css';

const Projects = () => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section id="projects" className="container">
      <SectionTitle title="Featured Projects" subtitle="Some things I've built." />
      
      <div 
        ref={ref} 
        className={`projects-grid ${isVisible ? 'animate-fade-in-up' : ''}`}
        style={{ opacity: 0 }}
      >
        {projects.map((project) => (
          <Card key={project.id} className="project-card">
            <div className="project-image-container">
              <img src={project.image} alt={project.title} className="project-image" />
              <div className="project-overlay">
                <div className="project-links">
                  {project.github !== '#' && (
                    <Button href={project.github} variant="ghost">
                      <FaGithub size={24} />
                    </Button>
                  )}
                  {project.demo !== '#' && (
                    <Button href={project.demo} variant="ghost">
                      <FaExternalLinkAlt size={22} />
                    </Button>
                  )}
                </div>
              </div>
            </div>
            
            <div className="project-info">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.description}</p>
              
              <div className="project-tech">
                {project.tech.map((tech, i) => (
                  <span key={i} className="tech-badge">{tech}</span>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Projects;

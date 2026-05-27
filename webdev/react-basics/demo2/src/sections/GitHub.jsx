import React from 'react';
import SectionTitle from '../components/SectionTitle';
import Card from '../components/Card';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { GitHubCalendar } from 'react-github-calendar';
import './GitHub.css';

const GitHub = () => {
  const [ref, isVisible] = useScrollAnimation();
  const username = "yourusername"; // Placeholder

  const selectLastHalfYear = contributions => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const shownMonths = 6;
    
    return contributions.filter(activity => {
      const date = new Date(activity.date);
      const monthOfDay = date.getMonth();
      
      return (
        date.getFullYear() === currentYear &&
        monthOfDay > currentMonth - shownMonths &&
        monthOfDay <= currentMonth
      );
    });
  };

  return (
    <section id="github" className="container">
      <SectionTitle title="Contributions" subtitle="Days I code." />
      
      <div 
        ref={ref} 
        className={`github-container ${isVisible ? 'animate-fade-in-up' : ''}`}
        style={{ opacity: 0 }}
      >
        <Card className="github-card" hover={false}>
          <div className="calendar-wrapper">
            <GitHubCalendar 
              username={username} 
              colorScheme="light"
              blockSize={14}
              blockMargin={6}
              fontSize={14}
              transformData={selectLastHalfYear}
              style={{
                color: 'var(--text-primary)'
              }}
            />
          </div>
        </Card>
      </div>
    </section>
  );
};

export default GitHub;

import React from 'react';
import { 
  FaHtml5, FaCss3Alt, FaJs, FaReact, 
  FaPython, FaNodeJs, FaDatabase, FaLinux, 
  FaGitAlt, FaGithub 
} from 'react-icons/fa';
import { SiFlask, SiDjango, SiPostgresql, SiCplusplus, SiGnubash } from 'react-icons/si';

export const skills = {
  Frontend: [
    { name: "HTML", icon: <FaHtml5 color="#E34F26" /> },
    { name: "CSS", icon: <FaCss3Alt color="#1572B6" /> },
    { name: "JavaScript", icon: <FaJs color="#F7DF1E" /> },
    { name: "React", icon: <FaReact color="#61DAFB" /> }
  ],
  Backend: [
    { name: "Python", icon: <FaPython color="#3776AB" /> },
    { name: "Flask", icon: <SiFlask color="#ffffff" /> },
    { name: "Django", icon: <SiDjango color="#092E20" /> }
  ],
  Database: [
    { name: "PostgreSQL", icon: <SiPostgresql color="#336791" /> },
    { name: "SQL", icon: <FaDatabase color="#f29111" /> }
  ],
  Other: [
    { name: "Linux", icon: <FaLinux color="#FCC624" /> },
    { name: "Git", icon: <FaGitAlt color="#F05032" /> },
    { name: "GitHub", icon: <FaGithub color="#ffffff" /> },
    { name: "C++", icon: <SiCplusplus color="#00599C" /> },
    { name: "Bash", icon: <SiGnubash color="#4EAA25" /> }
  ]
};

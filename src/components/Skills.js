import React, { useEffect, useRef } from 'react';
import { FaCode, FaDatabase, FaCloud, FaChartBar, FaChartLine } from 'react-icons/fa';
import './Skills.css';

function Skills() {
    const skillCardsRef = useRef([]);

    useEffect(() => {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');

                        const progressCircle = entry.target.querySelector('.progress-circle-fill');
                        const progressText = entry.target.querySelector('.progress-text');
                        const percentage = parseInt(progressText.textContent);

                        const circumference = 2 * Math.PI * 45;
                        const offset = circumference - (percentage / 100) * circumference;

                        setTimeout(() => {
                            progressCircle.style.strokeDashoffset = offset;
                        }, 200);
                    }, index * 150);

                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        skillCardsRef.current.forEach(card => {
            if (card) skillsObserver.observe(card);
        });

        return () => {
            skillsObserver.disconnect();
        };
    }, []);

    const skills = [
        {
            icon: FaCode,
            title: 'Languages',
            tags: ['Python', 'SQL', 'C++', 'JavaScript'],
            percentage: 95,
            gradientId: 'gradient1',
            gradientColors: ['#667eea', '#764ba2']
        },
        {
            icon: FaDatabase,
            title: 'Databases',
            tags: ['PostgreSQL', 'MySQL', 'MongoDB', 'ETL', 'Data Warehousing'],
            percentage: 90,
            gradientId: 'gradient2',
            gradientColors: ['#4facfe', '#00f2fe']
        },
        {
            icon: FaCloud,
            title: 'Cloud & Tools',
            tags: ['AWS RDS', 'EC2', 'Lambda', 'Selenium', 'API Integration'],
            percentage: 85,
            gradientId: 'gradient3',
            gradientColors: ['#f093fb', '#f5576c']
        },
        {
            icon: FaChartBar,
            title: 'Visualization',
            tags: ['Power BI', 'Tableau', 'Looker Studio'],
            percentage: 92,
            gradientId: 'gradient4',
            gradientColors: ['#667eea', '#00f2fe']
        },
        {
            icon: FaChartLine,
            title: 'Analytics',
            tags: ['Statistical Analysis', 'Machine Learning', 'Predictive Modeling', 'A/B Testing', 'Time-series'],
            percentage: 88,
            gradientId: 'gradient5',
            gradientColors: ['#764ba2', '#f093fb']
        }
    ];

    return (
        <section id="skills">
            <div className="container">
                <div className="section-title">
                    <h2>Technical Skills</h2>
                </div>

                <div className="skills-grid">
                    {skills.map((skill, index) => (
                        <div
                            key={index}
                            className="skill-card glass-card"
                            ref={el => skillCardsRef.current[index] = el}
                        >
                            <div className="skill-icon">
                                {React.createElement(skill.icon)}
                            </div>
                            <h3>{skill.title}</h3>
                            <div className="skill-tags">
                                {skill.tags.map((tag, tagIndex) => (
                                    <span key={tagIndex} className="skill-tag">{tag}</span>
                                ))}
                            </div>
                            <div className="progress-circle">
                                <svg width="100" height="100">
                                    <defs>
                                        <linearGradient id={skill.gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" style={{ stopColor: skill.gradientColors[0], stopOpacity: 1 }} />
                                            <stop offset="100%" style={{ stopColor: skill.gradientColors[1], stopOpacity: 1 }} />
                                        </linearGradient>
                                    </defs>
                                    <circle className="progress-circle-bg" cx="50" cy="50" r="45"></circle>
                                    <circle
                                        className="progress-circle-fill"
                                        cx="50"
                                        cy="50"
                                        r="45"
                                        stroke={`url(#${skill.gradientId})`}
                                    ></circle>
                                </svg>
                                <div className="progress-text">{skill.percentage}%</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Skills;

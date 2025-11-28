import React, { useEffect, useRef, useState } from 'react';
import './Experience.css';

function Experience() {
    const timelineItemsRef = useRef([]);
    const [expandedItems, setExpandedItems] = useState({});

    useEffect(() => {
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    timelineObserver.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        timelineItemsRef.current.forEach(item => {
            if (item) timelineObserver.observe(item);
        });

        return () => {
            timelineObserver.disconnect();
        };
    }, []);

    const toggleExpand = (index) => {
        setExpandedItems(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const experiences = [
        {
            company: 'Hack2Skill',
            position: 'Data Analyst',
            location: 'Noida, India',
            period: 'Dec 2024 – Present',
            current: true,
            achievements: [
                'Architected Universal Tracking System (UTS) integrating Google Sheets, PostgreSQL, EspoCRM centralizing 700K+ records with 80% reduction in manual processing',
                'Built AI-powered data cleaning workflows using Python, Vertex AI & LLMs standardizing 300K+ student records',
                'Engineered custom EspoCRM entities with MongoDB → PostgreSQL sync pipelines for multi-platform user management',
                'Developed AI evaluation system using Vertex AI improving inference speed by 60%',
                'Designed command center architecture for Agentic AI Day with 2K+ participants across 4 zones, created real-time Looker Studio dashboards',
                'Processed & cleaned SIH 2024 hackathon data for PMO reporting with 200K+ AIC participant records'
            ],
            techStack: ['Python', 'PostgreSQL', 'Vertex AI', 'EspoCRM', 'MongoDB', 'Looker Studio', 'Google Sheets']
        },
        {
            company: 'The Palindromic & Unified Mentor',
            position: 'Data Analyst Intern',
            location: 'Remote, India',
            period: 'Feb 2024 – Aug 2024',
            current: false,
            achievements: [
                'Processed 1.2M+ records using advanced SQL (CTEs, window functions, joins), improving data quality by 25%',
                'Built automated ETL pipelines with Python reducing processing time by 40%; developed ML models with 85%+ accuracy',
                'Designed interactive Power BI & Tableau dashboards with email outreach systems'
            ],
            techStack: ['SQL', 'Python', 'ETL', 'Power BI', 'Tableau', 'Machine Learning']
        }
    ];

    return (
        <section id="experience">
            <div className="container">
                <div className="section-title">
                    <h2>Work Experience</h2>
                </div>

                <div className="timeline">
                    {experiences.map((exp, index) => (
                        <div
                            key={index}
                            className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
                            ref={el => timelineItemsRef.current[index] = el}
                        >
                            <div className="timeline-dot">
                                {exp.current && <span className="pulse"></span>}
                            </div>

                            <div className="timeline-card glass-card">
                                <div className="timeline-header">
                                    <div className="company-info">
                                        <h3>{exp.company}</h3>
                                        {exp.current && <span className="current-badge">Current</span>}
                                    </div>
                                    <div className="position-info">
                                        <h4>{exp.position}</h4>
                                        <div className="meta-info">
                                            <span className="location">📍 {exp.location}</span>
                                            <span className="period">📅 {exp.period}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className={`timeline-content ${expandedItems[index] ? 'expanded' : ''}`}>
                                    <ul className="achievements-list">
                                        {exp.achievements.map((achievement, achIndex) => (
                                            <li key={achIndex}>{achievement}</li>
                                        ))}
                                    </ul>
                                </div>

                                <button
                                    className="expand-btn"
                                    onClick={() => toggleExpand(index)}
                                    aria-label={expandedItems[index] ? 'Show less' : 'Show more'}
                                >
                                    {expandedItems[index] ? 'Show Less ▲' : 'Show More ▼'}
                                </button>

                                <div className="tech-stack">
                                    {exp.techStack.map((tech, techIndex) => (
                                        <span key={techIndex} className="tech-badge">{tech}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Experience;

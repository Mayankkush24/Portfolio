import React, { useState, useEffect, useRef } from 'react';
import './Projects.css';

function Projects() {
    const [activeFilter, setActiveFilter] = useState('All');
    const [filteredProjects, setFilteredProjects] = useState([]);
    const projectCardsRef = useRef([]);

    const projects = [
        {
            id: 1,
            title: 'AWS AI for Bharat Event Tracking System',
            year: '2024',
            techStack: ['AWS', 'PostgreSQL', 'Selenium', 'Python', 'Power BI'],
            description: 'Designed end-to-end database & automated data pipeline for AWS AI event with real-time analytics for 50K+ participants',
            highlights: [
                'Implemented Selenium-based automated AWS Builder Center blog verification system validating 10K+ entries (90% time reduction)',
                'Deployed scalable ETL pipeline with AWS infrastructure ensuring 99.9% uptime during live event'
            ],
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        },
        {
            id: 2,
            title: 'Hackathon Analytics Platform',
            year: '2024',
            techStack: ['Power BI', 'SQL', 'Python'],
            description: 'Built analytics platform processing 1M+ entries for MetLife & SIH 2024 with live dashboards',
            highlights: [
                'Optimized queries reducing load time by 60%',
                'Real-time dashboard updates for live event monitoring'
            ],
            gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
        },
        {
            id: 3,
            title: 'Universal Tracking System (UTS)',
            year: '2024',
            techStack: ['PostgreSQL', 'Python', 'Google Apps Script', 'ETL', 'EspoCRM'],
            description: 'Architected unified relational database centralizing 700K+ fragmented records from multiple sources',
            highlights: [
                'Built real-time sync engine reducing manual work by 90% with fault-tolerant retries',
                'Engineered AI-powered data standardization using Vertex AI & fuzzy matching'
            ],
            gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
        },
        {
            id: 4,
            title: 'FIFA Player Analytics',
            year: 'Mar 2024',
            techStack: ['Python', 'Tableau'],
            description: 'Analyzed 20K+ player records with clustering algorithms building scouting dashboard',
            highlights: [
                'Improved acquisition efficiency by 25%',
                'K-means clustering for player similarity analysis'
            ],
            gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
        },
        {
            id: 5,
            title: 'Amazon Sales Dashboard',
            year: 'Feb 2024',
            techStack: ['Power BI', 'SQL', 'DAX'],
            description: 'Built dashboard analyzing 500K+ transactions with time-series forecasting & cohort analysis',
            highlights: [
                'Increased revenue potential by 10%',
                'Advanced DAX measures for complex KPI calculations'
            ],
            gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
        }
    ];

    const filters = ['All', 'Power BI', 'Python', 'AWS', 'SQL'];

    useEffect(() => {
        if (activeFilter === 'All') {
            setFilteredProjects(projects);
        } else {
            setFilteredProjects(
                projects.filter(project =>
                    project.techStack.includes(activeFilter)
                )
            );
        }
    }, [activeFilter]);

    useEffect(() => {
        const projectsObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 100);
                    projectsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        projectCardsRef.current.forEach(card => {
            if (card) projectsObserver.observe(card);
        });

        return () => {
            projectsObserver.disconnect();
        };
    }, [filteredProjects]);

    return (
        <section id="projects">
            <div className="container">
                <div className="section-title">
                    <h2>Featured Projects</h2>
                </div>

                <div className="filter-buttons">
                    {filters.map((filter, index) => (
                        <button
                            key={index}
                            className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                            onClick={() => setActiveFilter(filter)}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                <div className="projects-grid">
                    {filteredProjects.map((project, index) => (
                        <div
                            key={project.id}
                            className="project-card-wrapper"
                            ref={el => projectCardsRef.current[index] = el}
                        >
                            <div className="project-card">
                                {/* Front of card */}
                                <div className="project-card-front">
                                    <div
                                        className="project-image"
                                        style={{ background: project.gradient }}
                                    >
                                        <div className="project-year">{project.year}</div>
                                    </div>
                                    <div className="project-content">
                                        <h3>{project.title}</h3>
                                        <p className="project-description">{project.description}</p>
                                        <div className="tech-stack">
                                            {project.techStack.map((tech, techIndex) => (
                                                <span key={techIndex} className="tech-badge">{tech}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="hover-overlay">
                                        <span className="view-details">View Details →</span>
                                    </div>
                                </div>

                                {/* Back of card */}
                                <div className="project-card-back">
                                    <div className="back-content">
                                        <h3>{project.title}</h3>
                                        <div className="highlights">
                                            <h4>Key Highlights:</h4>
                                            <ul>
                                                {project.highlights.map((highlight, hIndex) => (
                                                    <li key={hIndex}>{highlight}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="tech-stack">
                                            {project.techStack.map((tech, techIndex) => (
                                                <span key={techIndex} className="tech-badge">{tech}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredProjects.length === 0 && (
                    <div className="no-projects">
                        <p>No projects found for this filter.</p>
                    </div>
                )}
            </div>
        </section>
    );
}

export default Projects;

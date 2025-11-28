import React, { useEffect, useRef, useState } from 'react';
import './Achievements.css';

function Achievements() {
    const [counters, setCounters] = useState({
        participants: 0,
        records: 0,
        dashboards: 0
    });
    const [hasAnimated, setHasAnimated] = useState(false);
    const achievementsRef = useRef(null);
    const cardsRef = useRef([]);

    // Animated counter effect with easing
    const animateCounter = (target, key, duration = 2000) => {
        const startTime = performance.now();
        const start = 0;
        
        const easeOutCubic = (t) => {
            return 1 - Math.pow(1 - t, 3);
        };

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutCubic(progress);
            const current = Math.floor(start + (target - start) * easedProgress);
            
            setCounters(prev => ({ ...prev, [key]: current }));
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setCounters(prev => ({ ...prev, [key]: target }));
            }
        };
        
        requestAnimationFrame(animate);
    };

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    // Animate counters with slight delay for smoother feel
                    setTimeout(() => {
                        animateCounter(2000, 'participants', 2000);
                        animateCounter(2000000, 'records', 2500);
                        animateCounter(10, 'dashboards', 1800);
                    }, 200);
                }
            });
        }, { 
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });

        if (achievementsRef.current) {
            observer.observe(achievementsRef.current);
        }

        return () => observer.disconnect();
    }, [hasAnimated]);

    useEffect(() => {
        const cardsObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 100);
                    cardsObserver.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.15,
            rootMargin: '0px 0px -30px 0px'
        });

        cardsRef.current.forEach(card => {
            if (card) cardsObserver.observe(card);
        });

        return () => cardsObserver.disconnect();
    }, []);

    const formatNumber = (num) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M+';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(0) + 'K+';
        }
        return num + '+';
    };

    const achievements = [
        {
            icon: '📜',
            title: 'Google Data Analytics Professional Certificate',
            platform: 'Coursera',
            description: 'Comprehensive certification covering data cleaning, visualization, SQL, R, and Tableau',
            skills: ['Data Cleaning', 'Visualization', 'SQL', 'R', 'Tableau']
        },
        {
            icon: '💼',
            title: 'Executive Impact',
            description: 'Delivered 10+ dashboards to PMO Office & government stakeholders',
            stats: [
                { label: 'Dashboards', value: counters.dashboards },
                { label: 'Records Processed', value: formatNumber(counters.records) }
            ]
        },
        {
            icon: '🎓',
            title: 'B.Tech in Computer Science & Engineering',
            institution: 'Vaish College of Engineering, Rohtak, Haryana',
            period: 'Oct 2020 – Jun 2024',
            score: '70.4%'
        }
    ];

    return (
        <section id="achievements" ref={achievementsRef}>
            <div className="container">
                <div className="section-title">
                    <h2>Achievements & Recognition</h2>
                </div>

                {/* Featured Guinness World Record */}
                <div className="featured-achievement" ref={el => cardsRef.current[0] = el}>
                    <div className="glow-border"></div>
                    <div className="featured-content">
                        <div className="trophy-icon">🏆</div>
                        <div className="badge">Guinness World Record</div>
                        <h3>Organized Google Agentic AI Day</h3>
                        <p className="featured-description">
                            Largest AI workshop with <span className="highlight">{formatNumber(counters.participants)}</span> participants
                        </p>
                        <div className="achievement-stats">
                            <div className="stat-item">
                                <div className="stat-number">{formatNumber(counters.participants)}</div>
                                <div className="stat-label">Participants</div>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                                <div className="stat-number">World Record</div>
                                <div className="stat-label">Achievement</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Achievement Cards Grid */}
                <div className="achievements-grid">
                    {achievements.map((achievement, index) => (
                        <div
                            key={index}
                            className="achievement-card glass-card"
                            ref={el => cardsRef.current[index + 1] = el}
                        >
                            <div className="achievement-icon">{achievement.icon}</div>
                            <h3>{achievement.title}</h3>

                            {achievement.platform && (
                                <p className="platform">📍 {achievement.platform}</p>
                            )}

                            {achievement.institution && (
                                <p className="institution">{achievement.institution}</p>
                            )}

                            {achievement.period && (
                                <p className="period">📅 {achievement.period}</p>
                            )}

                            {achievement.score && (
                                <p className="score">Score: {achievement.score}</p>
                            )}

                            {achievement.description && (
                                <p className="description">{achievement.description}</p>
                            )}

                            {achievement.skills && (
                                <div className="skills-tags">
                                    {achievement.skills.map((skill, skillIndex) => (
                                        <span key={skillIndex} className="skill-tag">{skill}</span>
                                    ))}
                                </div>
                            )}

                            {achievement.stats && (
                                <div className="card-stats">
                                    {achievement.stats.map((stat, statIndex) => (
                                        <div key={statIndex} className="card-stat">
                                            <div className="card-stat-value">{stat.value}</div>
                                            <div className="card-stat-label">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Achievements;

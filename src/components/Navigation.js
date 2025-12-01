import React, { useState, useEffect } from 'react';
import './Navigation.css';

function Navigation() {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 100);

            // Update active section
            const sections = document.querySelectorAll('section');
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            if (current) {
                setActiveSection(current);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (e, targetId) => {
        e.preventDefault();
        const targetSection = document.querySelector(targetId);
        const navHeight = document.getElementById('navbar').offsetHeight;

        window.scrollTo({
            top: targetSection.offsetTop - navHeight,
            behavior: 'smooth'
        });

        setMobileMenuOpen(false);
    };

    return (
        <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
            <div className="nav-container">
                <div className="logo">MK</div>
                <div
                    className="menu-toggle"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
                    <li>
                        <a
                            href="#hero"
                            className={`nav-link ${activeSection === 'hero' ? 'active' : ''}`}
                            onClick={(e) => handleNavClick(e, '#hero')}
                        >
                            Home
                        </a>
                    </li>
                    <li>
                        <a
                            href="#skills"
                            className={`nav-link ${activeSection === 'skills' ? 'active' : ''}`}
                            onClick={(e) => handleNavClick(e, '#skills')}
                        >
                            Skills
                        </a>
                    </li>
                    <li>
                        <a
                            href="#experience"
                            className={`nav-link ${activeSection === 'experience' ? 'active' : ''}`}
                            onClick={(e) => handleNavClick(e, '#experience')}
                        >
                            Experience
                        </a>
                    </li>
                    <li>
                        <a
                            href="#achievements"
                            className={`nav-link ${activeSection === 'achievements' ? 'active' : ''}`}
                            onClick={(e) => handleNavClick(e, '#achievements')}
                        >
                            Achievements
                        </a>
                    </li>
                    <li>
                        <a
                            href="#projects"
                            className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}
                            onClick={(e) => handleNavClick(e, '#projects')}
                        >
                            Projects
                        </a>
                    </li>
                    <li>
                        <a
                            href="#data-demo"
                            className={`nav-link ${activeSection === 'data-demo' ? 'active' : ''}`}
                            onClick={(e) => handleNavClick(e, '#data-demo')}
                        >
                            Data Demo
                        </a>
                    </li>
                    <li>
                        <a
                            href="#contact"
                            className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
                            onClick={(e) => handleNavClick(e, '#contact')}
                        >
                            Contact
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navigation;

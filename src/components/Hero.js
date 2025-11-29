import React, { useEffect, useState, useRef } from 'react';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';
import { FaLinkedin, FaUserTie } from 'react-icons/fa';
import './Hero.css';

function Hero() {
    const [typingText, setTypingText] = useState('');
    const canvasRef = useRef(null);

    const phrases = [
        'Guinness World Record Holder',
        '2M+ Data Points Processed',
        'Business Intelligence Expert',
        'Data Visualization Specialist'
    ];

    // Typing animation effect
    useEffect(() => {
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        const typeEffect = () => {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                setTypingText(currentPhrase.substring(0, charIndex - 1));
                charIndex--;
                typingSpeed = 50;
            } else {
                setTypingText(currentPhrase.substring(0, charIndex + 1));
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                typingSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingSpeed = 500;
            }

            setTimeout(typeEffect, typingSpeed);
        };

        const timer = setTimeout(typeEffect, 1000);
        return () => clearTimeout(timer);
    }, []);

    // Particles animation effect
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 1 - 0.5;
                this.opacity = Math.random() * 0.5 + 0.2;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }

            draw() {
                ctx.fillStyle = `rgba(102, 126, 234, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const particlesArray = [];
        const numberOfParticles = 80;

        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }

        let mouse = { x: null, y: null, radius: 150 };

        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });

        canvas.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        const animateParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();

                for (let j = i + 1; j < particlesArray.length; j++) {
                    const dx = particlesArray[i].x - particlesArray[j].x;
                    const dy = particlesArray[i].y - particlesArray[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.strokeStyle = `rgba(102, 126, 234, ${0.2 * (1 - distance / 100)})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                        ctx.stroke();
                    }
                }

                if (mouse.x != null && mouse.y != null) {
                    const dx = particlesArray[i].x - mouse.x;
                    const dy = particlesArray[i].y - mouse.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < mouse.radius) {
                        const force = (mouse.radius - distance) / mouse.radius;
                        const angle = Math.atan2(dy, dx);
                        particlesArray[i].x += Math.cos(angle) * force * 2;
                        particlesArray[i].y += Math.sin(angle) * force * 2;
                    }
                }
            }

            requestAnimationFrame(animateParticles);
        };

        animateParticles();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    const resumeLink = 'https://drive.google.com/file/d/1mfOUHhWFF_Sg6DwSwpDGy0TSfJCpqFPB/view?usp=sharing';

    return (
        <section id="hero">
            <canvas ref={canvasRef} id="particlesCanvas"></canvas>
            <div className="container">
                <div className="hero-content">
                    <div className="profile-image-container">
                        <div className="profile-image-border"></div>
                        <div className="profile-image-wrapper">
                            <FaUserTie className="profile-icon" />
                        </div>
                    </div>

                    <div className="hero-text-content">
                        <h1 className="hero-title">
                            Hi, I'm <span className="text-gradient">Mayank Kush</span>
                        </h1>
                        <p className="hero-role">Data Analyst & Business Intelligence Specialist</p>
                        <p className="hero-subtitle">
                            <span className="typing-text">{typingText}</span>
                        </p>
                        <p className="hero-location">
                            <HiLocationMarker className="location-icon" />
                            <span>Bahadurgarh, Haryana, India</span>
                        </p>

                        <div className="contact-icons">
                            <a href="mailto:ermayankkush2482@gmail.com" className="contact-icon" title="Email" aria-label="Email">
                                <HiMail />
                            </a>
                            <a href="https://linkedin.com/in/mayank-kush" target="_blank" rel="noopener noreferrer" className="contact-icon" title="LinkedIn" aria-label="LinkedIn">
                                <FaLinkedin />
                            </a>
                            <a href="tel:+918950261823" className="contact-icon" title="Phone" aria-label="Phone">
                                <HiPhone />
                            </a>
                        </div>

                        <div className="hero-cta">
                            <a href="#projects" className="btn btn-primary">View Projects</a>
                            <a href={resumeLink} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">Download Resume</a>
                        </div>
                    </div>
                </div>
                <div className="scroll-indicator"></div>
            </div>
        </section>
    );
}

export default Hero;

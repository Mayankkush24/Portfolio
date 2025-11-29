import React, { useState, useEffect } from 'react';
import { HiMail, HiPhone, HiLocationMarker, HiArrowUp } from 'react-icons/hi';
import { FaLinkedin, FaFileDownload } from 'react-icons/fa';
import { IoMdSend, IoMdCheckmark, IoMdClose } from 'react-icons/io';
import './Contact.css';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 500);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!formData.subject.trim()) {
            newErrors.subject = 'Subject is required';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Here you can integrate with Formspree or EmailJS
            console.log('Form submitted:', formData);
            setSubmitStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });

            setTimeout(() => {
                setSubmitStatus('');
            }, 5000);
        } else {
            setSubmitStatus('error');
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const scrollToSection = (sectionId) => {
        const section = document.querySelector(sectionId);
        const navHeight = document.getElementById('navbar')?.offsetHeight || 0;

        window.scrollTo({
            top: section.offsetTop - navHeight,
            behavior: 'smooth'
        });
    };

    return (
        <>
            <section id="contact">
                <div className="container">
                    <div className="section-title">
                        <h2>Get In Touch</h2>
                    </div>

                    <div className="contact-wrapper">
                        {/* Contact Info */}
                        <div className="contact-info glass-card">
                            <h3>Contact Information</h3>
                            <p className="contact-subtitle">Feel free to reach out for collaborations or just a friendly chat!</p>

                            <div className="contact-details">
                                <a href="mailto:ermayankkush2482@gmail.com" className="contact-item">
                                    <span className="contact-icon"><HiMail /></span>
                                    <div className="contact-text">
                                        <span className="contact-label">Email</span>
                                        <span className="contact-value">ermayankkush2482@gmail.com</span>
                                    </div>
                                </a>

                                <a href="tel:+918950261823" className="contact-item">
                                    <span className="contact-icon"><HiPhone /></span>
                                    <div className="contact-text">
                                        <span className="contact-label">Phone</span>
                                        <span className="contact-value">+91 8950261823</span>
                                    </div>
                                </a>

                                <a href="https://linkedin.com/in/mayank-kush" target="_blank" rel="noopener noreferrer" className="contact-item">
                                    <span className="contact-icon"><FaLinkedin /></span>
                                    <div className="contact-text">
                                        <span className="contact-label">LinkedIn</span>
                                        <span className="contact-value">linkedin.com/in/mayank-kush</span>
                                    </div>
                                </a>

                                <div className="contact-item">
                                    <span className="contact-icon"><HiLocationMarker /></span>
                                    <div className="contact-text">
                                        <span className="contact-label">Location</span>
                                        <span className="contact-value">Bahadurgarh, Haryana, India</span>
                                    </div>
                                </div>
                            </div>

                            <div className="social-links">
                                <a href="mailto:ermayankkush2482@gmail.com" className="social-btn" title="Email" aria-label="Email">
                                    <HiMail />
                                </a>
                                <a href="https://linkedin.com/in/mayank-kush" target="_blank" rel="noopener noreferrer" className="social-btn" title="LinkedIn" aria-label="LinkedIn">
                                    <FaLinkedin />
                                </a>
                                <a href="tel:+918950261823" className="social-btn" title="Phone" aria-label="Phone">
                                    <HiPhone />
                                </a>
                            </div>

                            <a 
                                href="https://drive.google.com/file/d/1mfOUHhWFF_Sg6DwSwpDGy0TSfJCpqFPB/view?usp=sharing" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="btn btn-primary download-resume"
                            >
                                <FaFileDownload /> Download Resume
                            </a>
                        </div>

                        {/* Contact Form */}
                        <div className="contact-form-wrapper glass-card">
                            <h3>Send a Message</h3>
                            <form onSubmit={handleSubmit} className="contact-form" noValidate>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Your Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={errors.name ? 'error' : ''}
                                    />
                                    {errors.name && <span className="error-message">{errors.name}</span>}
                                </div>

                                <div className="form-group">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Your Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={errors.email ? 'error' : ''}
                                    />
                                    {errors.email && <span className="error-message">{errors.email}</span>}
                                </div>

                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="subject"
                                        placeholder="Subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className={errors.subject ? 'error' : ''}
                                    />
                                    {errors.subject && <span className="error-message">{errors.subject}</span>}
                                </div>

                                <div className="form-group">
                                    <textarea
                                        name="message"
                                        placeholder="Your Message"
                                        rows="5"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className={errors.message ? 'error' : ''}
                                    ></textarea>
                                    {errors.message && <span className="error-message">{errors.message}</span>}
                                </div>

                                <button type="submit" className="btn btn-primary submit-btn">
                                    <IoMdSend /> Send Message
                                </button>

                                {submitStatus === 'success' && (
                                    <div className="submit-message success">
                                        <IoMdCheckmark /> Message sent successfully! I'll get back to you soon.
                                    </div>
                                )}
                                {submitStatus === 'error' && (
                                    <div className="submit-message error">
                                        <IoMdClose /> Please fix the errors above.
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-section">
                            <h4>Mayank Kush</h4>
                            <p className="footer-tagline">Crafted with passion for data</p>
                        </div>

                        <div className="footer-section">
                            <h4>Quick Links</h4>
                            <div className="footer-links">
                                <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection('#hero'); }}>Home</a>
                                <a href="#skills" onClick={(e) => { e.preventDefault(); scrollToSection('#skills'); }}>Skills</a>
                                <a href="#experience" onClick={(e) => { e.preventDefault(); scrollToSection('#experience'); }}>Experience</a>
                                <a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('#projects'); }}>Projects</a>
                                <a href="#achievements" onClick={(e) => { e.preventDefault(); scrollToSection('#achievements'); }}>Achievements</a>
                                <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('#contact'); }}>Contact</a>
                            </div>
                        </div>

                        <div className="footer-section">
                            <h4>Connect</h4>
                            <div className="footer-social">
                                <a href="mailto:ermayankkush2482@gmail.com" title="Email" aria-label="Email"><HiMail /></a>
                                <a href="https://linkedin.com/in/mayank-kush" target="_blank" rel="noopener noreferrer" title="LinkedIn" aria-label="LinkedIn"><FaLinkedin /></a>
                                <a href="tel:+918950261823" title="Phone" aria-label="Phone"><HiPhone /></a>
                            </div>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <p>© 2024 Mayank Kush. All rights reserved.</p>
                    </div>
                </div>
            </footer>

            {/* Back to Top Button */}
            <button
                className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
                onClick={scrollToTop}
                aria-label="Back to top"
            >
                <HiArrowUp />
            </button>
        </>
    );
}

export default Contact;

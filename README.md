# Mayank Kush - Data Analyst Portfolio (React)

A modern, responsive portfolio website built with React featuring glassmorphism design, animated particles, and interactive elements.

## 🚀 Features

- **Hero Section**: Animated gradient background with Canvas particles, typing animation, profile image with animated border
- **Skills Section**: Interactive skill cards with progress circles, scroll-triggered animations, and hover effects
- **Experience Timeline**: Vertical timeline with alternating layout, expandable achievements, and tech stack badges
- **Projects Gallery**: Interactive filtering, 3D flip cards, and masonry grid layout
- **Achievements**: Featured Guinness World Record card with animated counters and achievement cards
- **Contact Form**: Validation, glassmorphism design, and social links
- **Responsive Design**: Mobile-first approach with breakpoints for tablet and desktop
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support
- **SEO Optimized**: Meta tags, Open Graph, and semantic HTML

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## 🛠️ Installation & Setup

### Option 1: Using Batch File (Windows)

Double-click `start.bat` in the project root.

### Option 2: Using Command Prompt

```bash
cd d:\test\portfolio-react
npm install
npm start
```

### Option 3: Manual Steps

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm start
```

The application will automatically open at **http://localhost:3000**

## 📁 Project Structure

```
portfolio-react/
├── public/
│   └── index.html          # HTML template with SEO meta tags
├── src/
│   ├── components/
│   │   ├── Navigation.js   # Fixed navbar with scroll detection
│   │   ├── Navigation.css
│   │   ├── Hero.js         # Hero section with particles & typing
│   │   ├── Hero.css
│   │   ├── Skills.js       # Skills with progress circles
│   │   ├── Skills.css
│   │   ├── Experience.js   # Timeline with expandable cards
│   │   ├── Experience.css
│   │   ├── Projects.js     # Filterable project gallery
│   │   ├── Projects.css
│   │   ├── Achievements.js # Featured achievements & counters
│   │   ├── Achievements.css
│   │   ├── Contact.js      # Contact form & footer
│   │   └── Contact.css
│   ├── App.js              # Main app component
│   ├── App.css
│   ├── index.js            # React entry point
│   └── index.css           # Global styles & CSS variables
├── package.json
├── start.bat               # Windows batch file to run app
└── README.md
```

## 🎨 Components

### Navigation
- Fixed navigation bar with scroll detection
- Active section highlighting
- Responsive mobile menu
- Smooth scroll to sections

### Hero
- Canvas-based particle animation with mouse interaction
- Typing animation cycling through multiple phrases
- Profile image with animated gradient border
- Contact icons (Email, LinkedIn, Phone)
- CTA buttons for projects and resume download

### Skills
- 5 skill categories with icons
- Interactive skill tags with ripple hover effect
- Animated SVG progress circles
- Scroll-triggered staggered animations
- Responsive grid layout (4 cols → 2 cols → 1 col)

### Experience
- Vertical timeline with gradient connecting line
- Alternating left-right layout (zigzag on desktop)
- Expandable achievements with "Show More" button
- Tech stack badges
- Current position indicator with pulse animation

### Projects
- Interactive filtering by technology
- 3D flip cards (front: summary, back: details)
- Gradient backgrounds for each project
- Hover overlays with "View Details"
- Responsive masonry grid (3 → 2 → 1 columns)

### Achievements
- Featured Guinness World Record card with glowing border
- Animated counters (1K+, 2M+, etc.)
- Achievement cards with floating icons
- 3D hover tilt effects
- Responsive grid layout

### Contact & Footer
- Two-column layout (contact info + form)
- Form validation with real-time error messages
- Social media links
- Download resume button
- Footer with quick links and copyright
- Floating "Back to Top" button

## 🎯 Technologies Used

- **React 18.2.0**: Component-based UI library
- **React Hooks**: useState, useEffect, useRef for state and side effects
- **Canvas API**: For particle animation
- **Intersection Observer API**: For scroll-triggered animations
- **CSS3**: Custom properties, animations, glassmorphism effects
- **Responsive Design**: Mobile-first with CSS Grid and Flexbox

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (single column layouts)
- **Tablet**: 640px - 1024px (2 column grids)
- **Desktop**: > 1024px (3-4 column grids)

## ♿ Accessibility Features

- Semantic HTML5 elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus-visible styles
- Screen reader support
- Reduced motion support for users with motion sensitivity

## 🔍 SEO Features

- Comprehensive meta tags (title, description, keywords)
- Open Graph tags for social sharing
- Twitter Card meta tags
- Canonical URL
- Semantic HTML structure
- Proper heading hierarchy (H1, H2, H3)
- Alt text for images (emojis used as icons)

## 📝 Available Scripts

- `npm start`: Runs the app in development mode on port 3000
- `npm build`: Builds the app for production
- `npm test`: Runs the test suite
- `npm eject`: Ejects from Create React App (one-way operation)

## 🔧 Customization

### Update Personal Information

Edit the following files:

- **Hero Component** (`src/components/Hero.js`):
  - Name, title, location
  - Contact links (email, LinkedIn, phone)
  - Typing animation phrases

- **Skills Component** (`src/components/Skills.js`):
  - Skill categories, tags, and percentages
  - Icons and gradient colors

- **Experience Component** (`src/components/Experience.js`):
  - Job positions, companies, dates
  - Achievements and tech stack

- **Projects Component** (`src/components/Projects.js`):
  - Project details, tech stack, descriptions
  - Gradient backgrounds

- **Achievements Component** (`src/components/Achievements.js`):
  - Certifications, education, awards
  - Counter values

- **Contact Component** (`src/components/Contact.js`):
  - Email, phone, LinkedIn
  - Form submission endpoint (Formspree/EmailJS)

### Styling

All CSS variables are defined in `src/index.css`:
- Colors and gradients
- Spacing and typography
- Transitions and shadows
- Responsive breakpoints

## 🐛 Troubleshooting

### PowerShell Execution Policy Error

If you see "running scripts is disabled on this system":

1. Open PowerShell as Administrator
2. Run: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`
3. Type 'Y' to confirm
4. Close and reopen your terminal

### Port Already in Use

If port 3000 is already in use, you can change it in `package.json`:

```json
"start": "set PORT=3001 && react-scripts start"
```

### Form Submission

To enable actual form submission:

1. Sign up for [Formspree](https://formspree.io/) or [EmailJS](https://www.emailjs.com/)
2. Update the form action in `Contact.js`
3. Replace the console.log with actual submission logic

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This project is open source and available for personal use.

## 👤 Author

**Mayank Kush**
- Location: Bahadurgarh, Haryana, India
- Email: ermayankkush2482@gmail.com
- LinkedIn: [linkedin.com/in/mayank-kush](https://linkedin.com/in/mayank-kush)
- Phone: +91 8950261823

## 🎓 Achievements

- **Guinness World Record Holder**: Organized Google Agentic AI Day (1000+ participants)
- **Google Data Analytics Professional Certificate** (Coursera)
- **B.Tech in Computer Science & Engineering** - Vaish College of Engineering

## 💼 Professional Experience

- **Data Analyst** at Hack2Skill (Dec 2024 - Present)
- **Data Analyst Intern** at The Palindromic & Unified Mentor (Feb 2024 - Aug 2024)

---

**Crafted with passion for data** ❤️ | © 2024 Mayank Kush. All rights reserved.

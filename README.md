# Komil Parmar - Personal Portfolio

A modern, unique personal portfolio website built with vanilla HTML, CSS, and JavaScript. Inspired by minimalist design principles with an informal, authentic voice.

## 🎨 Design Philosophy

This portfolio breaks away from traditional developer portfolios by combining:
- **Clean, minimalist aesthetic** inspired by modern web design
- **Informal, authentic writing** that shares not just professional achievements but personal perspectives
- **Interactive learning elements** including a flashcard system for ML concepts
- **Smooth animations and transitions** for a polished user experience

## ✨ Features

### 1. **Hero Section**
- Dynamic greeting with rotating emoji animation
- Clear value proposition with informal tone
- Floating achievement cards with smooth animations
- Responsive call-to-action buttons

### 2. **About Section**
- Personal story told in an engaging, conversational way
- Journey from 3D modeling to ML
- Credentials and certifications showcase
- Technology stack with interactive tags

### 3. **POV/Blog Section**
- Thoughts and hot takes on ML and learning
- Announcements for webinars and competitions
- Featured articles with category filtering
- Informal, authentic voice throughout

### 4. **Projects Section**
- Showcase of GitHub repositories
- Clean card-based layout
- Direct links to source code
- Technology tags for each project

### 5. **Interactive Flashcard System** 🎓
- 20+ machine learning flashcards covering:
  - ML Basics (supervised/unsupervised learning, overfitting, etc.)
  - Deep Learning (backpropagation, CNNs, RNNs, etc.)
  - Meta-Learning (MAML, few-shot learning, etc.)
- Category filtering (All, ML Basics, Deep Learning, Meta-Learning)
- Flip animation for questions/answers
- Keyboard navigation support (Arrow keys, Space/Enter to flip)
- Card counter and navigation controls

### 6. **Contact Section**
- Multiple contact methods (Email, GitHub, LinkedIn)
- Glassmorphism design for contact cards
- Hover animations for better UX

### 7. **Easter Eggs** 🎉
- Console messages for curious developers
- Konami code activation (↑↑↓↓←→←→BA)
- Random ML tips in console
- Performance monitoring

## 🛠️ Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, animations, flexbox, grid
- **JavaScript (ES6+)** - Classes, modules, event handling
- **Google Fonts** - Inter & Space Grotesk
- **No frameworks** - Pure vanilla JavaScript for performance

## 🎯 Key Highlights

- ✅ Fully responsive (desktop, tablet, mobile)
- ✅ Smooth scroll navigation
- ✅ Intersection Observer for scroll animations
- ✅ Accessibility considerations
- ✅ Fast loading (no heavy frameworks)
- ✅ Clean, maintainable code
- ✅ Interactive flashcard learning system
- ✅ Modern CSS animations and transitions

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints at:
- Desktop: 1024px+
- Tablet: 768px - 1023px
- Mobile: < 768px

Features adaptive layouts, collapsible navigation, and optimized spacing for all screen sizes.

## 🚀 Quick Start

1. Clone the repository:
```bash
git clone https://github.com/Komil-parmar/personal-portfolio.git
```

2. Open `index.html` in your browser:
```bash
open index.html
```

That's it! No build process, no dependencies to install.

## 📂 File Structure

```
personal-portfolio/
├── index.html          # Main HTML file
├── styles.css          # All styles with CSS custom properties
├── script.js           # JavaScript for interactivity
└── README.md          # This file
```

## 🎨 Customization

### Colors
Edit CSS custom properties in `styles.css`:
```css
:root {
    --color-bg: #ffffff;
    --color-text: #1a1a1a;
    --color-accent: #000000;
    /* ... more variables */
}
```

### Flashcards
Add or modify flashcards in `script.js`:
```javascript
const flashcardsData = [
    {
        category: 'basics',
        question: 'Your question here',
        answer: 'Your answer here'
    },
    // ... add more
];
```

### Content
All content is in `index.html` and can be easily updated to match your profile.

## 🌟 Design Inspiration

Inspired by the minimalist, clean aesthetic of modern portfolio websites with:
- Generous whitespace
- Subtle animations
- Clear typography hierarchy
- Smooth transitions
- Scroll-based animations

## 🔍 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📈 Performance

- Minimal JavaScript footprint
- CSS animations (GPU accelerated)
- Optimized images and assets
- Fast initial load time
- No external dependencies

## 🎓 Flashcard Topics Covered

- **ML Basics**: Supervised/unsupervised learning, overfitting, bias-variance tradeoff, gradient descent, transfer learning, cross-validation
- **Deep Learning**: Backpropagation, activation functions, batch normalization, dropout, CNNs, RNNs
- **Meta-Learning**: What is meta-learning, few-shot learning, MAML, meta-training vs meta-testing, support/query sets

## 🤝 Contributing

This is a personal portfolio, but if you find bugs or have suggestions:
1. Open an issue
2. Describe the problem or suggestion
3. I'll review and respond

## 📧 Contact

- **Email**: komilparmar57@gmail.com
- **GitHub**: [@Komil-parmar](https://github.com/Komil-parmar)
- **LinkedIn**: [Komil Parmar](https://www.linkedin.com/in/komil-parmar-488967243/)

## 📝 License

MIT License - Feel free to use this as inspiration for your own portfolio!

---

Built with curiosity and lots of coffee ☕ by Komil Parmar

// ===========================
// Flashcard Data
// ===========================
const flashcardsData = [
    // ML Basics
    {
        category: 'basics',
        question: 'What is the difference between supervised and unsupervised learning?',
        answer: 'Supervised learning uses labeled data to train models (input-output pairs), while unsupervised learning finds patterns in unlabeled data. Think of supervised as learning with a teacher, unsupervised as exploring on your own.'
    },
    {
        category: 'basics',
        question: 'What is overfitting and how do you prevent it?',
        answer: 'Overfitting is when a model learns the training data too well, including noise, and performs poorly on new data. Prevent it with: regularization (L1/L2), dropout, early stopping, cross-validation, and more training data.'
    },
    {
        category: 'basics',
        question: 'What is the bias-variance tradeoff?',
        answer: 'Bias is error from oversimplifying (underfitting), variance is error from being too sensitive to training data (overfitting). You need to balance both—low bias + low variance = good generalization.'
    },
    {
        category: 'basics',
        question: 'What is gradient descent?',
        answer: 'An optimization algorithm that iteratively adjusts model parameters to minimize loss. It calculates the gradient (slope) of the loss function and moves in the opposite direction to find the minimum. Like walking downhill to reach the valley.'
    },

    // Deep Learning
    {
        category: 'deep-learning',
        question: 'What is backpropagation?',
        answer: 'The algorithm neural networks use to learn. It calculates gradients by propagating errors backward through the network, from output to input, using the chain rule. Each layer adjusts its weights based on how much it contributed to the error.'
    },
    {
        category: 'deep-learning',
        question: 'Why do we use activation functions?',
        answer: 'Activation functions introduce non-linearity, allowing neural networks to learn complex patterns. Without them, stacking layers would be pointless—multiple linear transformations just create another linear transformation. ReLU, sigmoid, and tanh are common choices.'
    },
    {
        category: 'deep-learning',
        question: 'What is batch normalization?',
        answer: 'A technique that normalizes inputs to each layer during training, making training faster and more stable. It reduces internal covariate shift and acts as a regularizer. Think of it as keeping each layer\'s inputs in a consistent range.'
    },
    {
        category: 'deep-learning',
        question: 'What is the vanishing gradient problem?',
        answer: 'When gradients become extremely small during backpropagation in deep networks, early layers barely learn. Happens with sigmoid/tanh activations. Solutions: ReLU activation, skip connections (ResNet), batch normalization, and careful initialization.'
    },
    {
        category: 'deep-learning',
        question: 'What is dropout and why use it?',
        answer: 'Regularization technique that randomly "drops" neurons during training (sets outputs to 0). Prevents co-adaptation of neurons and overfitting. Each training iteration uses a different "thinned" network, creating an ensemble effect.'
    },

    // Meta-Learning
    {
        category: 'meta-learning',
        question: 'What is meta-learning?',
        answer: 'Learning to learn! Instead of training models for one task, meta-learning trains models to quickly adapt to new tasks with minimal data. It\'s about learning good learning strategies and initial parameters that generalize across tasks.'
    },
    {
        category: 'meta-learning',
        question: 'What is few-shot learning?',
        answer: 'A meta-learning paradigm where models learn from very few examples (1-shot, 5-shot, etc.). Instead of thousands of samples, the model learns to classify new categories with just a handful of examples—like humans do.'
    },
    {
        category: 'meta-learning',
        question: 'What is MAML (Model-Agnostic Meta-Learning)?',
        answer: 'A meta-learning algorithm that finds good initial parameters for a model, so it can quickly adapt to new tasks with gradient descent. It\'s model-agnostic—works with any gradient-based model. Think of it as finding the best starting point for learning.'
    },
    {
        category: 'meta-learning',
        question: 'What is the difference between meta-training and meta-testing?',
        answer: 'Meta-training: Learning across many tasks to acquire meta-knowledge. Meta-testing: Applying learned meta-knowledge to completely new tasks. It\'s like practicing how to learn new languages (meta-training) vs. actually learning a new one (meta-testing).'
    },
    {
        category: 'meta-learning',
        question: 'Why is meta-learning important?',
        answer: 'It tackles data efficiency—most real-world problems don\'t have millions of labeled examples. Meta-learning enables rapid adaptation, better generalization, and human-like learning from limited data. Essential for robotics, personalization, and domains with scarce data.'
    },

    // Additional Mixed Topics
    {
        category: 'basics',
        question: 'What is transfer learning?',
        answer: 'Using knowledge from one task to help learn another. Like using a pre-trained ImageNet model for medical imaging. The model already learned useful features (edges, shapes), so you just fine-tune it for your specific task with less data.'
    },
    {
        category: 'deep-learning',
        question: 'What are convolutional neural networks (CNNs)?',
        answer: 'Neural networks specialized for processing grid-like data (images, video). They use convolutional layers that learn spatial hierarchies of features—edges, then shapes, then objects. More parameter-efficient than fully connected networks for vision tasks.'
    },
    {
        category: 'deep-learning',
        question: 'What are recurrent neural networks (RNNs)?',
        answer: 'Networks designed for sequential data (text, time series). They have loops that maintain a "memory" of previous inputs. LSTMs and GRUs are popular RNN variants that handle long-term dependencies better than vanilla RNNs.'
    },
    {
        category: 'basics',
        question: 'What is cross-validation?',
        answer: 'A technique to assess model performance by splitting data into k folds. Train on k-1 folds, validate on the remaining fold, repeat k times. Gives a more robust estimate of performance than a single train/test split.'
    },
    {
        category: 'basics',
        question: 'What is the learning rate and why does it matter?',
        answer: 'Controls how much to adjust weights during training. Too high → unstable training, overshooting minima. Too low → slow convergence, getting stuck. Finding the right learning rate is crucial. Techniques: learning rate schedules, adaptive optimizers (Adam).'
    },
    {
        category: 'meta-learning',
        question: 'What is the support set and query set in meta-learning?',
        answer: 'Support set: Few labeled examples given to adapt the model to a new task. Query set: Examples used to evaluate how well the model adapted. It\'s like showing flashcards (support) then testing recall (query).'
    }
];

// ===========================
// Flashcard System
// ===========================
class FlashcardSystem {
    constructor() {
        this.currentIndex = 0;
        this.currentCategory = 'all';
        this.flashcards = flashcardsData;
        this.filteredCards = [...flashcardsData];
        this.isFlipped = false;

        this.init();
    }

    init() {
        this.flashcardElement = document.getElementById('flashcard');
        this.questionText = document.getElementById('question-text');
        this.answerText = document.getElementById('answer-text');
        this.cardCounter = document.getElementById('card-counter');
        this.prevBtn = document.getElementById('prev-card');
        this.nextBtn = document.getElementById('next-card');
        this.categoryBtns = document.querySelectorAll('.category-btn');
        this.flipBtns = document.querySelectorAll('.flip-btn');

        this.attachEventListeners();
        this.loadCard();
        this.updateCounter();
    }

    attachEventListeners() {
        // Flip card
        this.flipBtns.forEach(btn => {
            btn.addEventListener('click', () => this.flipCard());
        });

        // Navigation
        this.prevBtn.addEventListener('click', () => this.previousCard());
        this.nextBtn.addEventListener('click', () => this.nextCard());

        // Category filtering
        this.categoryBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.filterByCategory(e.target.dataset.category));
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.previousCard();
            if (e.key === 'ArrowRight') this.nextCard();
            if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                this.flipCard();
            }
        });
    }

    loadCard() {
        const card = this.filteredCards[this.currentIndex];
        this.questionText.textContent = card.question;
        this.answerText.textContent = card.answer;

        // Reset flip state
        if (this.isFlipped) {
            this.flashcardElement.classList.remove('flipped');
            this.isFlipped = false;
        }
    }

    flipCard() {
        this.flashcardElement.classList.toggle('flipped');
        this.isFlipped = !this.isFlipped;
    }

    nextCard() {
        if (this.currentIndex < this.filteredCards.length - 1) {
            this.currentIndex++;
            this.loadCard();
            this.updateCounter();
        }
    }

    previousCard() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.loadCard();
            this.updateCounter();
        }
    }

    filterByCategory(category) {
        this.currentCategory = category;
        this.currentIndex = 0;

        // Update active button
        this.categoryBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.category === category) {
                btn.classList.add('active');
            }
        });

        // Filter cards
        if (category === 'all') {
            this.filteredCards = [...flashcardsData];
        } else {
            this.filteredCards = flashcardsData.filter(card => card.category === category);
        }

        this.loadCard();
        this.updateCounter();
    }

    updateCounter() {
        this.cardCounter.textContent = `${this.currentIndex + 1} / ${this.filteredCards.length}`;

        // Update button states
        this.prevBtn.disabled = this.currentIndex === 0;
        this.nextBtn.disabled = this.currentIndex === this.filteredCards.length - 1;
    }
}

// ===========================
// Navigation
// ===========================
class Navigation {
    constructor() {
        this.nav = document.querySelector('.nav');
        this.mobileToggle = document.querySelector('.mobile-menu-toggle');
        this.navLinks = document.querySelector('.nav-links');

        this.init();
    }

    init() {
        // Scroll effect
        window.addEventListener('scroll', () => this.handleScroll());

        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => this.smoothScroll(e));
        });

        // Mobile menu toggle
        if (this.mobileToggle) {
            this.mobileToggle.addEventListener('click', () => this.toggleMobileMenu());
        }
    }

    handleScroll() {
        if (window.scrollY > 100) {
            this.nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            this.nav.style.boxShadow = 'none';
        }
    }

    smoothScroll(e) {
        const href = e.currentTarget.getAttribute('href');

        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    }

    toggleMobileMenu() {
        this.navLinks.classList.toggle('active');
        this.mobileToggle.classList.toggle('active');
    }
}

// ===========================
// Animations on Scroll
// ===========================
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, this.observerOptions);

        // Observe elements
        const animateElements = document.querySelectorAll('.pov-card, .project-card, .cred-item');
        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
}

// ===========================
// Easter Eggs & Fun Interactions
// ===========================
class EasterEggs {
    constructor() {
        this.init();
    }

    init() {
        // Console message
        console.log('%c👋 Hey there!', 'font-size: 20px; font-weight: bold;');
        console.log('%cI see you\'re checking out the console. Nice! 🕵️', 'font-size: 14px;');
        console.log('%cIf you found any bugs or have suggestions, hit me up at komilparmar57@gmail.com', 'font-size: 12px; color: #666;');

        // Konami code easter egg
        this.konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        this.konamiIndex = 0;

        document.addEventListener('keydown', (e) => {
            if (e.key === this.konamiCode[this.konamiIndex]) {
                this.konamiIndex++;
                if (this.konamiIndex === this.konamiCode.length) {
                    this.activateKonami();
                    this.konamiIndex = 0;
                }
            } else {
                this.konamiIndex = 0;
            }
        });
    }

    activateKonami() {
        // Add some fun animation
        document.body.style.animation = 'rainbow 2s linear infinite';

        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);

        alert('🎉 You found the secret! You\'re officially a nerd like me. Here\'s a virtual high-five! ✋');

        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);
    }
}

// ===========================
// Typing Effect for Hero
// ===========================
class TypingEffect {
    constructor() {
        this.roles = [
            'ML Enthusiast',
            'TensorFlow Certified',
            'Kaggle Competitor',
            'Self-Taught Developer',
            'Meta-Learning Explorer',
            'AI Tinkerer'
        ];
        this.currentRole = 0;
        this.currentChar = 0;
        this.isDeleting = false;
        this.element = document.querySelector('.subtitle');

        if (this.element) {
            this.originalText = this.element.textContent;
            this.startTyping();
        }
    }

    startTyping() {
        const current = this.roles[this.currentRole];

        if (this.isDeleting) {
            this.element.textContent = current.substring(0, this.currentChar - 1);
            this.currentChar--;
        } else {
            this.element.textContent = current.substring(0, this.currentChar + 1);
            this.currentChar++;
        }

        let typeSpeed = this.isDeleting ? 50 : 100;

        if (!this.isDeleting && this.currentChar === current.length) {
            typeSpeed = 2000; // Pause at end
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentChar === 0) {
            this.isDeleting = false;
            this.currentRole = (this.currentRole + 1) % this.roles.length;
            typeSpeed = 500;
        }

        setTimeout(() => this.startTyping(), typeSpeed);
    }
}

// ===========================
// Random Tech Tip Generator
// ===========================
class TechTips {
    constructor() {
        this.tips = [
            'Pro tip: Always normalize your inputs! Your neural network will thank you.',
            'Remember: More data beats better algorithms (usually).',
            'Debugging ML models? Start by checking your data pipeline first.',
            'Random seed = reproducible results. Always set it for experiments!',
            'Overfit on a single batch first to make sure your model CAN learn.',
            'Learning rate too high? Your loss will bounce around like crazy.',
            'Don\'t trust validation accuracy alone. Check your confusion matrix!',
            'GPU out of memory? Try reducing batch size or using gradient accumulation.',
            'Meta-learning is basically teaching AI to be a fast learner.',
            'The best regularization? More (good quality) training data.'
        ];
    }

    getRandomTip() {
        return this.tips[Math.floor(Math.random() * this.tips.length)];
    }

    showTip() {
        console.log(`💡 ${this.getRandomTip()}`);
    }
}

// ===========================
// Initialize Everything
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    const flashcardSystem = new FlashcardSystem();
    const navigation = new Navigation();
    const scrollAnimations = new ScrollAnimations();
    const easterEggs = new EasterEggs();
    // const typingEffect = new TypingEffect(); // Uncomment if you want the typing effect
    const techTips = new TechTips();

    // Show a random tech tip
    techTips.showTip();

    // Add loading complete class
    document.body.classList.add('loaded');

    // Log welcome message
    console.log('%c🚀 Portfolio loaded successfully!', 'font-size: 16px; color: green; font-weight: bold;');
    console.log('%cBuilt with vanilla JS, CSS, and lots of coffee ☕', 'font-size: 12px; color: #666;');
});

// ===========================
// Performance Monitoring
// ===========================
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`⚡ Page loaded in ${(loadTime / 1000).toFixed(2)}s`);
});

// ===========================
// Mobile Navigation
// ===========================
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');
const navigation = document.getElementById('navigation');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// ===========================
// DataCurve Section Animations
// ===========================
(function () {
    var section = document.getElementById('current-role');
    if (!section) return;

    var counterEl = document.getElementById('dc-counter');
    var twEl = document.getElementById('dc-typewriter');
    var reveals = section.querySelectorAll('.dc-reveal');

    // Counter: ₹0 → ₹37,747.38
    function animateCounter(el, target, duration) {
        var start = 0;
        var step = target / (duration / 16);
        function tick() {
            start += step;
            if (start >= target) {
                el.textContent = '₹' + target.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                return;
            }
            el.textContent = '₹' + start.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    }

    // Neural network animation
    function runNeuralNet() {
        var svg = document.getElementById('nn-svg');
        var inputCard = document.getElementById('nn-input-card');
        var outputCard = document.getElementById('nn-output-card');
        if (!svg || !inputCard || !outputCard) return;

        var inNodes = svg.querySelectorAll('.nn-n-in');
        var hidNodes = svg.querySelectorAll('.nn-n-hid');
        var outNodes = svg.querySelectorAll('.nn-n-out');
        var linesIH = svg.querySelectorAll('.nn-ih');
        var linesHO = svg.querySelectorAll('.nn-ho');
        var linesCI = svg.querySelectorAll('.nn-ci');
        var linesOC = svg.querySelectorAll('.nn-oc');
        function clearAll() {
            inputCard.classList.remove('active');
            outputCard.classList.remove('active');
            inNodes.forEach(function (n) { n.classList.remove('active'); });
            hidNodes.forEach(function (n) { n.classList.remove('active'); });
            outNodes.forEach(function (n) { n.classList.remove('active'); });
            linesCI.forEach(function (l) { l.classList.remove('active'); });
            linesIH.forEach(function (l) { l.classList.remove('active'); });
            linesHO.forEach(function (l) { l.classList.remove('active'); });
            linesOC.forEach(function (l) { l.classList.remove('active'); });
        }

        function cycle() {
            clearAll();
            setTimeout(function () { inputCard.classList.add('active'); }, 100);
            setTimeout(function () { linesCI.forEach(function (l) { l.classList.add('active'); }); }, 300);
            setTimeout(function () { inNodes.forEach(function (n) { n.classList.add('active'); }); }, 600);
            setTimeout(function () { linesIH.forEach(function (l) { l.classList.add('active'); }); }, 900);
            setTimeout(function () { hidNodes.forEach(function (n) { n.classList.add('active'); }); }, 1500);
            setTimeout(function () { linesHO.forEach(function (l) { l.classList.add('active'); }); }, 1800);
            setTimeout(function () { outNodes.forEach(function (n) { n.classList.add('active'); }); }, 2400);
            setTimeout(function () { linesOC.forEach(function (l) { l.classList.add('active'); }); }, 2700);
            setTimeout(function () { outputCard.classList.add('active'); }, 3000);
            setTimeout(cycle, 5500);
        }

        cycle();
    }

    // Typewriter
    var lines = [
        'got_hired = "No application. Just online presence."',
        'selection = { method: "invite_only", pool: 50, selected: True }',
        'rank = 12  # quality × quantity. earned, not assigned.',
        'payout_week_1 = 37747.38  # during exams.',
    ];
    var lineIdx = 0, charIdx = 0;

    function typeNext() {
        if (!twEl) return;
        if (charIdx < lines[lineIdx].length) {
            twEl.textContent += lines[lineIdx][charIdx++];
            setTimeout(typeNext, 32);
        } else {
            setTimeout(function () {
                twEl.textContent = '';
                charIdx = 0;
                lineIdx = (lineIdx + 1) % lines.length;
                typeNext();
            }, 2800);
        }
    }

    // Trigger all on scroll
    var triggered = false;
    var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
            if (e.isIntersecting && !triggered) {
                triggered = true;
                reveals.forEach(function (el) { el.classList.add('visible'); });
                if (counterEl) animateCounter(counterEl, 37747.38, 1800);
                typeNext();
                runNeuralNet();
                io.disconnect();
            }
        });
    }, { threshold: 0.15 });
    io.observe(section);
})();

// Close mobile menu when clicking on a link
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    });
});

// Add scroll effect to navigation
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navigation.classList.add('scrolled');
    } else {
        navigation.classList.remove('scrolled');
    }
});

// ===========================
// Scroll Spy - highlight the nav link of the section currently in view
// ===========================
(function () {
    // All nav links (desktop + mobile) that point to an on-page section
    const allLinks = document.querySelectorAll('.nav-link[href^="#"], .mobile-link[href^="#"]');

    // Map: section id -> list of links pointing to it (desktop + mobile share an id)
    const linkMap = {};
    allLinks.forEach(link => {
        const id = link.getAttribute('href').slice(1);
        if (!id) return;
        (linkMap[id] = linkMap[id] || []).push(link);
    });

    // Sections in document order, taken from the desktop nav so the order is reliable
    const sections = [];
    document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
        const sec = document.getElementById(link.getAttribute('href').slice(1));
        if (sec) sections.push(sec);
    });
    if (!sections.length) return;

    const NAV_OFFSET = 120; // a line a little below the fixed navbar

    function setActive(id) {
        allLinks.forEach(l => l.classList.remove('active'));
        if (id && linkMap[id]) {
            linkMap[id].forEach(l => l.classList.add('active'));
        }
    }

    function updateActiveLink() {
        let currentId = null;

        // The current section is the LAST one whose top has scrolled past the offset line.
        // Sections without a nav link (hero, DataCurve, teaching) are simply skipped,
        // so e.g. while scrolling through "teaching", "Webinars" stays lit.
        for (let i = 0; i < sections.length; i++) {
            if (sections[i].getBoundingClientRect().top <= NAV_OFFSET) {
                currentId = sections[i].id;
            } else {
                break;
            }
        }

        // If we're at the very bottom of the page, force the last linked section
        // (Contact is short and may never cross the offset line on tall screens).
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
            currentId = sections[sections.length - 1].id;
        }

        setActive(currentId);
    }

    // Throttle scroll handling with requestAnimationFrame
    let ticking = false;
    function onScroll() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            updateActiveLink();
            ticking = false;
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateActiveLink);
    window.addEventListener('load', updateActiveLink);
    updateActiveLink();
})();

// ===========================
// Webinars Carousel
// ===========================
let currentSlide = 0;
const carouselContainer = document.getElementById('carousel-container');
const carouselPrev = document.getElementById('carousel-prev');
const carouselNext = document.getElementById('carousel-next');
const carouselDots = document.getElementById('carousel-dots');

function renderWebinars() {
    // Render slides
    carouselContainer.innerHTML = webinarsData.map((webinar, index) => `
        <div class="carousel-slide ${index === 0 ? 'active' : ''}" data-index="${index}">
            <div class="webinar-card">
                <div class="webinar-image" style="background-image: url('${webinar.image}')"></div>
                <div class="webinar-content">
                    <div class="webinar-meta">
                        <div class="webinar-meta-item">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                                <line x1="16" y1="2" x2="16" y2="6"/>
                                <line x1="8" y1="2" x2="8" y2="6"/>
                                <line x1="3" y1="10" x2="21" y2="10"/>
                            </svg>
                            ${webinar.date}
                        </div>
                        <div class="webinar-meta-item">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                                <circle cx="9" cy="7" r="4"/>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                            </svg>
                            ${webinar.attendees} attendees
                        </div>
                    </div>
                    <h3 class="webinar-title">${webinar.title}</h3>
                    <p class="webinar-description">${webinar.description}</p>
                    <a href="${webinar.linkedInUrl}" class="webinar-link" target="_blank" rel="noopener noreferrer">
                        View Post on LinkedIn →
                    </a>
                </div>
            </div>
        </div>
    `).join('');

    // Render dots
    carouselDots.innerHTML = webinarsData.map((_, index) => `
        <button class="carousel-dot ${index === 0 ? 'active' : ''}" data-index="${index}" aria-label="Go to slide ${index + 1}"></button>
    `).join('');

    // Add dot click handlers
    document.querySelectorAll('.carousel-dot').forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.dataset.index);
            goToSlide(index);
        });
    });
}

function goToSlide(index) {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    
    // Remove active class from all
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    
    currentSlide = index;
    
    // Update button states
    carouselPrev.disabled = currentSlide === 0;
    carouselNext.disabled = currentSlide === webinarsData.length - 1;
}

carouselPrev.addEventListener('click', () => {
    if (currentSlide > 0) {
        goToSlide(currentSlide - 1);
    }
});

carouselNext.addEventListener('click', () => {
    if (currentSlide < webinarsData.length - 1) {
        goToSlide(currentSlide + 1);
    }
});

// Initialize carousel
renderWebinars();

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        goToSlide(currentSlide);
    }, 250);
});

// ===========================
// Smooth Scrolling
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Account for fixed nav
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// Scroll Animations (Fade in on scroll)
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe sections for fade-in animation
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// ===========================
// Load animations on page load
// ===========================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===========================
// Cursor-follow spotlight (soft grayscale halo trailing the mouse)
// ===========================
(function () {
    const spot = document.getElementById('cursor-spotlight');
    if (!spot) return;

    // Only enable on devices with a real pointer, and respect reduced-motion
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!hasFinePointer || reduceMotion) return;

    // target = where the mouse is; cur = where the blob currently is (it eases toward target)
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let curX = targetX;
    let curY = targetY;
    let visible = false;

    window.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
        if (!visible) {
            visible = true;
            spot.classList.add('is-visible');
        }
    }, { passive: true });

    // Hide the blob when the cursor leaves the window
    document.addEventListener('mouseleave', () => {
        visible = false;
        spot.classList.remove('is-visible');
    });

    // Animation loop: lerp (ease) the blob toward the cursor for a smooth trailing feel
    function tick() {
        curX += (targetX - curX) * 0.12;
        curY += (targetY - curY) * 0.12;
        spot.style.transform = 'translate(' + curX + 'px, ' + curY + 'px)';
        requestAnimationFrame(tick);
    }
    tick();
})();

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
// Dot-field: each content section has a <canvas> behind its content.
// A uniform dot grid is revealed by slow Lissajous-orbiting points and by
// a cursor reveal-point. Dots are damped under text and images. One
// 30fps loop drives only the on-screen sections.
// ===========================
(function () {
    const SECTION_SELECTOR = '.about-section, .pov-section, .projects-section,' +
        ' .webinars-section, .teaching-section, .community-section,' +
        ' .kaggle-section, .contact-section';
    const sections = Array.prototype.slice.call(document.querySelectorAll(SECTION_SELECTOR));
    if (!sections.length) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    const GRID = 26;                            // dot spacing (css px)
    const DOT_R = 1.5;                          // dot radius (css px)
    const DPR = Math.min(window.devicePixelRatio || 1, 1.5);
    const FRAME_MS = 1000 / 30;                 // 30fps cap
    const TEXT_DAMP = 0.06;                     // opacity multiplier inside text/image
    const DAMP_EDGE = 14;                       // soft ramp around damp boxes (px)
    const BASE_R = 150;                         // base reveal radius

    function clamp01(t) { return t < 0 ? 0 : t > 1 ? 1 : t; }
    function smooth(t) { t = clamp01(t); return t * t * (3 - 2 * t); }

    // deterministic per-section RNG (mulberry32) so the layout is stable per load
    function makeRng(seed) {
        let s = seed >>> 0;
        return function () {
            s = s + 0x6D2B79F5 | 0;
            let t = Math.imul(s ^ s >>> 15, 1 | s);
            t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
            return ((t ^ t >>> 14) >>> 0) / 4294967296;
        };
    }

    // one state object per section (canvas created now, sized lazily)
    const items = sections.map(function (sec, idx) {
        const canvas = document.createElement('canvas');
        canvas.className = 'dot-canvas';
        canvas.setAttribute('aria-hidden', 'true');
        sec.insertBefore(canvas, sec.firstChild);
        return {
            sec: sec,
            canvas: canvas,
            ctx: canvas.getContext('2d'),
            dark: sec.classList.contains('contact-section'),
            w: 0, h: 0, cols: 0, rows: 0,
            acc: null, stamp: null,
            points: [],
            damp: [],
            seed: (idx + 1) * 1013904223
        };
    });

    // slow-orbiting reveal-points, kept clear of the section's top/bottom seam
    function buildPoints(it) {
        const rand = makeRng(it.seed);
        const count = Math.max(3, Math.min(9, Math.round(it.h / 280)));
        it.points = [];
        for (let i = 0; i < count; i++) {
            const r = BASE_R * (0.8 + rand() * 0.5);
            const margin = r + 8;                       // >= reveal radius: cluster never crosses the seam
            const ax = (26 + rand() * 52) * 4;          // x orbit radius (4x: clearly visible travel)
            let ay = (20 + rand() * 40) * 4;            // y orbit radius (4x)
            // clamp the y-orbit so the orbiting centre still can't reach the top/bottom seam
            const ayMax = Math.max(0, it.h / 2 - margin);
            if (ay > ayMax) ay = ayMax;
            let loY = margin + ay;
            let hiY = it.h - margin - ay;
            if (hiY < loY) { loY = hiY = it.h / 2; }
            it.points.push({
                hx: ax + rand() * Math.max(1, it.w - 2 * ax),
                hy: loY + rand() * (hiY - loY),
                ax: ax, ay: ay, r: r,
                peak: 0.78 + rand() * 0.22,
                wx: (2 * Math.PI) / (16 + rand() * 22),  // angular speed (slow loop)
                wy: (2 * Math.PI) / (19 + rand() * 26),
                phx: rand() * Math.PI * 2,
                phy: rand() * Math.PI * 2
            });
        }
    }

    // measure text + image boxes (section-local) so dots can be damped there
    function measureDamp(it) {
        it.damp = [];
        const secRect = it.sec.getBoundingClientRect();
        const els = it.sec.querySelectorAll(
            'h1,h2,h3,h4,h5,h6,p,li,img,' +
            '.competition-image,.webinar-image,.logo-image,' +
            '.kaggle-feature-shot,.kaggle-medal-shot,.award-icon-large');
        for (let i = 0; i < els.length; i++) {
            const r = els[i].getBoundingClientRect();
            if (r.width < 4 || r.height < 4) continue;
            // (elRect - secRect) is transform-invariant: correct even mid fade-in
            const x = r.left - secRect.left;
            const y = r.top - secRect.top;
            it.damp.push({ x: x, y: y, x2: x + r.width, y2: y + r.height });
        }
    }

    // size the canvas, allocate buffers, (re)build points + damp boxes
    function layout(it) {
        if (!it.ctx) return;
        const w = it.sec.offsetWidth;
        const h = it.sec.offsetHeight;
        if (!w || !h) return;
        it.w = w; it.h = h;
        it.canvas.width = Math.round(w * DPR);
        it.canvas.height = Math.round(h * DPR);
        it.canvas.style.width = w + 'px';
        it.canvas.style.height = h + 'px';
        it.ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
        it.cols = Math.floor(w / GRID) + 2;
        it.rows = Math.floor(h / GRID) + 2;
        it.acc = new Float32Array(it.cols * it.rows);
        it.stamp = new Int32Array(it.cols * it.rows);
        buildPoints(it);
        measureDamp(it);
    }

    // damping factor at a section-local point (1 = full, TEXT_DAMP = inside a box)
    function dampAt(it, x, y) {
        let f = 1;
        const d = it.damp;
        for (let i = 0; i < d.length; i++) {
            const b = d[i];
            const dx = x < b.x ? b.x - x : x > b.x2 ? x - b.x2 : 0;
            if (dx >= DAMP_EDGE) continue;
            const dy = y < b.y ? b.y - y : y > b.y2 ? y - b.y2 : 0;
            if (dy >= DAMP_EDGE) continue;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const local = TEXT_DAMP + (1 - TEXT_DAMP) * (dist / DAMP_EDGE);
            if (local < f) {
                f = local;
                if (f <= TEXT_DAMP + 0.002) return f;
            }
        }
        return f;
    }

    // cursor tracking (viewport coords)
    let curTX = -99999, curTY = -99999;   // raw target
    let curX = -99999, curY = -99999;     // eased
    let cursorWanted = 0;                  // 1 while the pointer is in the window
    let cursorStrength = 0;                // eased 0..1

    if (hasFinePointer && !reduceMotion) {
        window.addEventListener('mousemove', function (e) {
            curTX = e.clientX; curTY = e.clientY;
            cursorWanted = 1;
        }, { passive: true });
        document.addEventListener('mouseleave', function () { cursorWanted = 0; });
    }

    let frameId = 0;

    // draw a single section
    function draw(it, time) {
        if (!it.acc || !it.ctx) return;
        const ctx = it.ctx;
        ctx.clearRect(0, 0, it.w, it.h);

        // current positions of the orbiting reveal-points
        const pts = [];
        for (let i = 0; i < it.points.length; i++) {
            const p = it.points[i];
            pts.push({
                x: p.hx + p.ax * Math.sin(p.wx * time + p.phx),
                y: p.hy + p.ay * Math.sin(p.wy * time + p.phy),
                r: p.r, peak: p.peak
            });
        }
        // cursor reveal-point, if the pointer is over this section
        if (cursorStrength > 0.015) {
            const sr = it.sec.getBoundingClientRect();
            const cx = curX - sr.left, cy = curY - sr.top;
            if (cx > -BASE_R && cx < it.w + BASE_R && cy > -BASE_R && cy < it.h + BASE_R) {
                pts.push({ x: cx, y: cy, r: 152, peak: cursorStrength });
            }
        }
        if (!pts.length) return;

        frameId++;
        const acc = it.acc, stamp = it.stamp, cols = it.cols, rows = it.rows;
        const lit = [];

        // for each reveal-point, only walk its local grid window
        for (let pi = 0; pi < pts.length; pi++) {
            const p = pts[pi];
            const r = p.r, peak = p.peak;
            let ix0 = Math.floor((p.x - r) / GRID); if (ix0 < 0) ix0 = 0;
            let ix1 = Math.ceil((p.x + r) / GRID); if (ix1 > cols - 1) ix1 = cols - 1;
            let iy0 = Math.floor((p.y - r) / GRID); if (iy0 < 0) iy0 = 0;
            let iy1 = Math.ceil((p.y + r) / GRID); if (iy1 > rows - 1) iy1 = rows - 1;
            for (let ix = ix0; ix <= ix1; ix++) {
                const gx = ix * GRID;
                for (let iy = iy0; iy <= iy1; iy++) {
                    const gy = iy * GRID;
                    const dx = gx - p.x, dy = gy - p.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist >= r) continue;
                    const o = smooth(1 - dist / r) * peak;
                    const idx = iy * cols + ix;
                    if (stamp[idx] !== frameId) {
                        stamp[idx] = frameId;
                        acc[idx] = o;
                        lit.push(idx);
                    } else if (o > acc[idx]) {
                        acc[idx] = o;
                    }
                }
            }
        }

        // draw the lit dots, damped under text/images
        const rgb = it.dark ? '255,255,255' : '15,15,15';
        const cap = it.dark ? 0.55 : 1;
        for (let k = 0; k < lit.length; k++) {
            const idx = lit[k];
            let o = acc[idx];
            if (o < 0.04) continue;
            const ix = idx % cols;
            const iy = (idx - ix) / cols;
            const gx = ix * GRID, gy = iy * GRID;
            o *= dampAt(it, gx, gy);
            if (o < 0.03) continue;
            if (o > cap) o = cap;
            ctx.fillStyle = 'rgba(' + rgb + ',' + o.toFixed(3) + ')';
            ctx.beginPath();
            ctx.arc(gx, gy, DOT_R, 0, 6.283185307);
            ctx.fill();
        }
    }

    // main loop: 30fps, only the on-screen sections
    const visible = [];
    let running = false;
    let lastDraw = 0;

    function loop(now) {
        if (!visible.length || document.hidden) { running = false; return; }
        requestAnimationFrame(loop);
        if (now - lastDraw < FRAME_MS) return;
        lastDraw = now;

        if (curTX > -90000) {
            if (curX < -90000) { curX = curTX; curY = curTY; }
            curX += (curTX - curX) * 0.22;
            curY += (curTY - curY) * 0.22;
        }
        cursorStrength += (cursorWanted - cursorStrength) * 0.12;

        const time = now / 1000;
        for (let i = 0; i < visible.length; i++) draw(visible[i], time);
    }

    function ensureRunning() {
        if (!running && visible.length && !document.hidden && !reduceMotion) {
            running = true;
            lastDraw = 0;
            requestAnimationFrame(loop);
        }
    }

    // visibility gating: a section animates only while on (or near) screen
    const io = new IntersectionObserver(function (entries) {
        for (let i = 0; i < entries.length; i++) {
            const it = entries[i].target.__dot;
            if (!it) continue;
            const at = visible.indexOf(it);
            if (entries[i].isIntersecting) {
                if (!it.acc) layout(it);
                if (at === -1) visible.push(it);
            } else if (at !== -1) {
                visible.splice(at, 1);
            }
        }
        if (reduceMotion) {
            for (let i = 0; i < visible.length; i++) draw(visible[i], 0);
        } else {
            ensureRunning();
        }
    }, { rootMargin: '140px 0px 140px 0px' });

    document.addEventListener('visibilitychange', function () {
        if (!document.hidden) ensureRunning();
    });

    // re-measure laid-out sections (called after images / carousel settle, and on resize)
    function relayout() {
        for (let i = 0; i < items.length; i++) {
            if (items[i].acc) layout(items[i]);
        }
        if (reduceMotion) {
            for (let i = 0; i < visible.length; i++) draw(visible[i], 0);
        }
    }

    items.forEach(function (it) {
        it.sec.__dot = it;
        io.observe(it.sec);
    });

    let resizeTmr;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTmr);
        resizeTmr = setTimeout(relayout, 200);
    });
    window.addEventListener('load', function () {
        relayout();
        ensureRunning();
    });
})();

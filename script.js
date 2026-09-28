/* =========================================================
   Komil Parmar · Portfolio v3 · "Graphite Diffusion"
   Vanilla JS, no dependencies.
   ========================================================= */
(() => {
    'use strict';

    const $ = (s, r = document) => r.querySelector(s);
    const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
    const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    /* ---------- page load ---------- */
    requestAnimationFrame(() => document.body.classList.add('is-loaded'));

    /* ---------- nav: hide on scroll, active section, mobile menu ---------- */
    const nav = $('#nav');
    const bar = $('#scroll-progress-bar');
    const burger = $('#nav-burger');
    const mobileMenu = $('#mobile-menu');
    let lastY = window.scrollY;

    const onScroll = () => {
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
        const menuOpen = burger.getAttribute('aria-expanded') === 'true';
        if (!menuOpen) nav.classList.toggle('is-hidden', y > lastY && y > 400);
        lastY = y;
        updateClimb();
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const setMenu = (open) => {
        burger.setAttribute('aria-expanded', String(open));
        burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        mobileMenu.classList.toggle('is-open', open);
        mobileMenu.setAttribute('aria-hidden', String(!open));
        document.body.style.overflow = open ? 'hidden' : '';
    };
    burger.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));
    $$('#mobile-menu a').forEach(a => a.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

    const navLinks = $$('.nav-link');
    const sectionObs = new IntersectionObserver(entries => {
        entries.forEach(en => {
            if (!en.isIntersecting) return;
            navLinks.forEach(l => l.classList.toggle('is-active', l.getAttribute('href') === '#' + en.target.id));
        });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('main section[id]').forEach(s => sectionObs.observe(s));

    /* ---------- reveal + counters ---------- */
    const fmt = n => n.toLocaleString('en-IN');
    const countUp = (el) => {
        const target = parseFloat(el.dataset.count);
        if (reduceMotion || target <= 1) { el.textContent = fmt(target); return; }
        const dur = 1400 + Math.min(target, 1000) * 0.6;
        const t0 = performance.now();
        const tick = (now) => {
            const p = clamp((now - t0) / dur, 0, 1);
            const e = 1 - Math.pow(1 - p, 4);
            el.textContent = fmt(Math.round(target * e));
            if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    };

    const revealObs = new IntersectionObserver(entries => {
        entries.forEach(en => {
            if (!en.isIntersecting) return;
            en.target.classList.add('in');
            revealObs.unobserve(en.target);
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    $$('.reveal').forEach(el => revealObs.observe(el));

    const countObs = new IntersectionObserver(entries => {
        entries.forEach(en => {
            if (!en.isIntersecting) return;
            countUp(en.target);
            countObs.unobserve(en.target);
        });
    }, { threshold: 0.6 });
    $$('[data-count]').forEach(el => { el.textContent = '0'; countObs.observe(el); });

    /* section labels "denoise" from random glyphs */
    const GLYPHS = '░▒▓#%*+=-:·01<>/\\';
    const scramble = (node) => {
        const final = node.textContent;
        if (reduceMotion) return;
        const t0 = performance.now(), dur = 900;
        const tick = (now) => {
            const p = clamp((now - t0) / dur, 0, 1);
            let out = '';
            for (let i = 0; i < final.length; i++) {
                const ch = final[i];
                const settle = (i / final.length) * 0.7 + 0.3;
                out += (ch === ' ' || p >= settle) ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0];
            }
            node.textContent = out;
            if (p < 1) requestAnimationFrame(tick); else node.textContent = final;
        };
        requestAnimationFrame(tick);
    };
    const labelObs = new IntersectionObserver(entries => {
        entries.forEach(en => {
            if (!en.isIntersecting) return;
            labelObs.unobserve(en.target);
            Array.from(en.target.childNodes).filter(n => n.nodeType === 3 && n.textContent.trim()).forEach(scramble);
        });
    }, { threshold: 1 });
    $$('.sec-index').forEach(el => labelObs.observe(el));

    /* rupee counter */
    const payout = $('#payout-counter');
    if (payout) {
        const target = +payout.dataset.rupees;
        payout.textContent = '₹0';
        new IntersectionObserver((entries, o) => {
            if (!entries[0].isIntersecting) return;
            o.disconnect();
            if (reduceMotion) { payout.textContent = '₹' + fmt(target); return; }
            const t0 = performance.now(), dur = 2200;
            const tick = now => {
                const p = clamp((now - t0) / dur, 0, 1);
                const e = 1 - Math.pow(1 - p, 3);
                payout.textContent = '₹' + fmt(Math.round(target * e));
                if (p < 1) requestAnimationFrame(tick); else payout.textContent = '₹' + fmt(target);
            };
            requestAnimationFrame(tick);
        }, { threshold: 0.6 }).observe(payout);
    }

    /* ---------- climb timeline (scroll-linked) ---------- */
    const climb = $('#climb');
    const climbFill = $('#climb-fill');
    const climbSteps = $$('.climb-step');
    function updateClimb() {
        if (!climb) return;
        const r = climb.getBoundingClientRect();
        const vh = window.innerHeight;
        const p = reduceMotion ? 1 : clamp((vh * 0.88 - r.top) / (vh * 0.55), 0, 1);
        climbFill.style.setProperty('--progress', p.toFixed(4));
        const n = climbSteps.length;
        climbSteps.forEach((s, i) => s.classList.toggle('is-lit', p >= (i / (n - 1)) * 0.985 - 0.001));
    }
    updateClimb();

    /* ---------- card spotlight + sketch tilt + magnetic buttons ---------- */
    if (finePointer) {
        $$('.card').forEach(card => {
            card.addEventListener('pointermove', e => {
                const r = card.getBoundingClientRect();
                card.style.setProperty('--mx', `${e.clientX - r.left}px`);
                card.style.setProperty('--my', `${e.clientY - r.top}px`);
            });
        });

        const sketch = $('#sketch-card');
        if (sketch && !reduceMotion) {
            sketch.addEventListener('pointermove', e => {
                const r = sketch.getBoundingClientRect();
                const x = (e.clientX - r.left) / r.width - 0.5;
                const y = (e.clientY - r.top) / r.height - 0.5;
                sketch.style.setProperty('--ry', `${x * 7}deg`);
                sketch.style.setProperty('--rx', `${-y * 7}deg`);
            });
            sketch.addEventListener('pointerleave', () => {
                sketch.style.setProperty('--ry', '0deg');
                sketch.style.setProperty('--rx', '0deg');
            });
        }

        if (!reduceMotion) {
            $$('.magnetic').forEach(btn => {
                btn.addEventListener('pointermove', e => {
                    const r = btn.getBoundingClientRect();
                    const x = e.clientX - r.left - r.width / 2;
                    const y = e.clientY - r.top - r.height / 2;
                    btn.style.transform = `translate(${x * 0.18}px, ${y * 0.28}px)`;
                });
                btn.addEventListener('pointerleave', () => { btn.style.transform = ''; });
            });
        }
    }

    /* ---------- leaderboard bars ---------- */
    const lb = $('.lb');
    if (lb) new IntersectionObserver((en, o) => { if (en[0].isIntersecting) { lb.classList.add('in'); o.disconnect(); } }, { threshold: 0.2 }).observe(lb);

    /* ---------- writing: floating preview ---------- */
    const preview = $('#post-preview');
    if (preview && finePointer) {
        const img = preview.querySelector('img');
        let px = 0, py = 0, tx = 0, ty = 0, raf = null, on = false;
        const loop = () => {
            px += (tx - px) * 0.18; py += (ty - py) * 0.18;
            preview.style.left = px + 'px'; preview.style.top = py + 'px';
            raf = on || Math.abs(tx - px) > 0.5 ? requestAnimationFrame(loop) : null;
        };
        $$('.post[data-img]').forEach(p => {
            p.addEventListener('pointerenter', e => {
                img.src = p.dataset.img;
                tx = e.clientX + 170; ty = e.clientY;
                if (!on) { px = tx; py = ty; }
                on = true; preview.classList.add('is-on');
                if (!raf) raf = requestAnimationFrame(loop);
            });
            p.addEventListener('pointermove', e => { tx = e.clientX + 170; ty = e.clientY; });
            p.addEventListener('pointerleave', () => { on = false; preview.classList.remove('is-on'); });
        });
    }

    /* ---------- webinars rail ---------- */
    const rail = $('#webinar-rail');
    if (rail && typeof webinarsData !== 'undefined') {
        const toDate = s => new Date(s.replace(/(\w+) (\d{4})/, '$1 1, $2'));
        const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
        const items = [...webinarsData].sort((a, b) => toDate(b.date) - toDate(a.date));
        rail.innerHTML = items.map(w => `
            <article class="card webinar">
                <div class="webinar-img">
                    <img src="${esc(w.image)}" alt="${esc(w.title)}" loading="lazy">
                    <span class="webinar-att">${esc(w.attendees)} attendees</span>
                </div>
                <div class="webinar-body">
                    <span class="mono">${esc(w.date)}</span>
                    <h4>${esc(w.title)}</h4>
                    <p>${esc(w.description)}</p>
                    <a href="${esc(w.linkedInUrl)}" target="_blank" rel="noopener noreferrer" class="link-arrow">On LinkedIn <span>↗</span></a>
                </div>
            </article>`).join('');
        const step = () => (rail.querySelector('.webinar')?.getBoundingClientRect().width || 340) + 16;
        $('#rail-prev').addEventListener('click', () => rail.scrollBy({ left: -step(), behavior: 'smooth' }));
        $('#rail-next').addEventListener('click', () => rail.scrollBy({ left: step(), behavior: 'smooth' }));
        if (finePointer) $$('.webinar', rail).forEach(card => card.addEventListener('pointermove', e => {
            const r = card.getBoundingClientRect();
            card.style.setProperty('--mx', `${e.clientX - r.left}px`);
            card.style.setProperty('--my', `${e.clientY - r.top}px`);
        }));
    }

    /* ---------- copy email ---------- */
    const toast = $('#toast');
    let toastT;
    const showToast = (msg) => {
        toast.textContent = msg; toast.classList.add('is-on');
        clearTimeout(toastT); toastT = setTimeout(() => toast.classList.remove('is-on'), 2200);
    };
    $('#copy-email')?.addEventListener('click', async (e) => {
        const email = e.currentTarget.dataset.email;
        try { await navigator.clipboard.writeText(email); showToast('Email copied. Talk soon!'); }
        catch { showToast(email); }
    });

    /* ---------- local time ---------- */
    const lt = $('#local-time');
    const tickTime = () => {
        try {
            lt.textContent = new Intl.DateTimeFormat('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' }).format(new Date()) + ' IST';
        } catch { lt.textContent = 'IST'; }
    };
    if (lt) { tickTime(); setInterval(tickTime, 30000); }

    /* =========================================================
       DIFFUSION PORTRAIT
       The sketch is sampled into a point cloud. Each point follows
       x_t = cos(n·π/2)·x0 + sin(n·π/2)·ε  (cosine schedule), and the
       noise level n is annealed 1 → 0. Hovering adds noise locally
       ("forward process"); it then denoises itself back.
       ========================================================= */
    const canvas = $('#diffusion');
    if (canvas) initDiffusion(canvas);

    function initDiffusion(cv) {
        const ctx = cv.getContext('2d');
        const tEl = $('#diff-t'), barEl = $('#diff-bar'), statusEl = $('#diff-status');
        const INK = [42, 41, 39];
        const img = new Image();
        img.decoding = 'async';
        img.src = 'images/five_year_old_rm.jpg';

        let W, H, DPR, BW, BH, inkCanvas, pCanvas, pctx, pImage, buf8, buf32, ink32;
        let N = 0, TX, TY, TONE, NX, NY, RT, OFF;
        let wounds = [];
        let sched = 1, running = false, raf = null, introStart = 0, ready = false, fallback = false;
        const INTRO = 3400;

        const gauss = () => { let u = 0, v = 0; while (!u) u = Math.random(); while (!v) v = Math.random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };

        function build() {
            const rect = cv.getBoundingClientRect();
            W = Math.max(200, Math.round(rect.width));
            H = Math.round(W * 1280 / 1033);
            DPR = Math.min(window.devicePixelRatio || 1, 2);
            BW = Math.round(W * DPR); BH = Math.round(H * DPR);
            cv.width = BW; cv.height = BH;

            // ink layer: darkness → alpha, so the sketch sits on the card's paper
            inkCanvas = document.createElement('canvas');
            inkCanvas.width = BW; inkCanvas.height = BH;
            const ictx = inkCanvas.getContext('2d', { willReadFrequently: true });
            ictx.drawImage(img, 0, 0, BW, BH);
            let data;
            try { data = ictx.getImageData(0, 0, BW, BH); }
            catch (err) { fallback = true; return; }   // file:// taint → plain image
            const d = data.data;
            const dark = new Float32Array(BW * BH);
            for (let i = 0, p = 0; i < d.length; i += 4, p++) {
                const lum = (d[i] * 0.299 + d[i + 1] * 0.587 + d[i + 2] * 0.114) / 255;
                const k = clamp((1 - lum - 0.035) / 0.965, 0, 1);
                dark[p] = k;
                d[i] = INK[0]; d[i + 1] = INK[1]; d[i + 2] = INK[2]; d[i + 3] = k * 255;
            }
            ictx.putImageData(data, 0, 0);

            // sample point cloud
            const step = W < 340 ? 2.6 : 3;
            const cols = Math.floor(W / step), rows = Math.floor(H / step);
            const tmp = [];
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const x = (c + 0.5) * step, y = (r + 0.5) * step;
                    const k = dark[Math.floor(y * DPR) * BW + Math.floor(x * DPR)];
                    if (k > 0.07) tmp.push(x, y, k);
                }
            }
            N = tmp.length / 3;
            TX = new Float32Array(N); TY = new Float32Array(N); TONE = new Float32Array(N);
            NX = new Float32Array(N); NY = new Float32Array(N); RT = new Float32Array(N); OFF = new Float32Array(N);
            for (let i = 0; i < N; i++) {
                TX[i] = tmp[i * 3]; TY[i] = tmp[i * 3 + 1]; TONE[i] = tmp[i * 3 + 2];
                NX[i] = gauss(); NY[i] = gauss();
                RT[i] = 0.15 + Math.random() * 0.55;
                OFF[i] = Math.random();
            }

            pCanvas = document.createElement('canvas');
            pCanvas.width = BW; pCanvas.height = BH;
            pctx = pCanvas.getContext('2d');
            pImage = pctx.createImageData(BW, BH);
            buf8 = pImage.data;
            buf32 = new Uint32Array(buf8.buffer);
            ink32 = (0 << 24) | (INK[2] << 16) | (INK[1] << 8) | INK[0];
            ready = true;
        }

        function drawFallback() {
            ctx.clearRect(0, 0, cv.width, cv.height);
            ctx.globalCompositeOperation = 'multiply';
            ctx.drawImage(img, 0, 0, cv.width, cv.height);
            ctx.globalCompositeOperation = 'source-over';
            tEl.textContent = '0';
            barEl.style.transform = 'scaleX(1)';
            statusEl.textContent = 'x₀ · graphite on paper';
        }

        function frame(now) {
            raf = null;
            if (!ready) return;

            // global schedule (intro)
            if (sched > 0) {
                const p = clamp((now - introStart) / INTRO, 0, 1);
                const e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;  // easeInOutCubic
                sched = 1 - e;
            }
            // decay wounds (reverse process)
            for (let w of wounds) w.s *= 0.962;
            wounds = wounds.filter(w => w.s > 0.012);

            const imgA = Math.pow(clamp(1 - sched / 0.22, 0, 1), 1.6);
            const S = W * 0.42;             // noise scale
            const cx = W / 2, cy = H * 0.52;
            const size = Math.max(1, Math.round(3 * DPR * 0.7));

            buf32.fill(ink32);
            const nW = wounds.length;
            let drawn = 0;
            for (let i = 0; i < N; i++) {
                const tx = TX[i], ty = TY[i];
                let w = 0;
                for (let j = 0; j < nW; j++) {
                    const W0 = wounds[j];
                    const dx = tx - W0.x, dy = ty - W0.y;
                    const d2 = (dx * dx + dy * dy) / (W0.r * W0.r);
                    if (d2 < 1) { const f = (1 - d2); const v = W0.s * f * f; if (v > w) w = v; }
                }
                const gs = clamp(sched * 1.18 - 0.18 * OFF[i], 0, 1);
                const n = gs > w ? gs : w * 0.75;
                const vis = (1 - imgA) + imgA * clamp(w * 1.6, 0, 1);
                if (vis < 0.01) continue;

                const ang = n * 1.5707963;
                const a = Math.cos(ang), b = Math.sin(ang);
                const jit = n * 1.4;
                const x = cx + a * (tx - cx) + b * NX[i] * S + (Math.random() - 0.5) * jit;
                const y = cy + a * (ty - cy) + b * NY[i] * S * 1.1 + (Math.random() - 0.5) * jit;
                const tone = TONE[i] + (RT[i] - TONE[i]) * n;
                const alpha = tone * vis * 0.95;
                if (alpha < 0.02) continue;

                const px = (x * DPR) | 0, py = (y * DPR) | 0;
                if (px < 0 || py < 0 || px + size >= BW || py + size >= BH) continue;
                const a255 = alpha * 255;
                for (let yy = 0; yy < size; yy++) {
                    let idx = ((py + yy) * BW + px) * 4 + 3;
                    for (let xx = 0; xx < size; xx++, idx += 4) {
                        const v = buf8[idx] + a255;
                        buf8[idx] = v > 255 ? 255 : v;
                    }
                }
                drawn++;
            }
            pctx.putImageData(pImage, 0, 0);

            ctx.clearRect(0, 0, BW, BH);
            if (imgA > 0) {
                ctx.globalAlpha = imgA;
                ctx.drawImage(inkCanvas, 0, 0);
                ctx.globalAlpha = 1;
                if (nW) {
                    ctx.globalCompositeOperation = 'destination-out';
                    for (const w of wounds) {
                        const g = ctx.createRadialGradient(w.x * DPR, w.y * DPR, 0, w.x * DPR, w.y * DPR, w.r * DPR);
                        g.addColorStop(0, `rgba(0,0,0,${clamp(w.s * 1.6, 0, 1)})`);
                        g.addColorStop(0.45, `rgba(0,0,0,${clamp(w.s * 1.6 * 0.6, 0, 1)})`);
                        g.addColorStop(1, 'rgba(0,0,0,0)');
                        ctx.fillStyle = g;
                        ctx.fillRect((w.x - w.r) * DPR, (w.y - w.r) * DPR, w.r * 2 * DPR, w.r * 2 * DPR);
                    }
                    ctx.globalCompositeOperation = 'source-over';
                }
            }
            ctx.drawImage(pCanvas, 0, 0);

            // HUD
            const tNow = Math.round(Math.max(sched, wounds.reduce((m, w) => Math.max(m, w.s * 0.6), 0)) * 1000);
            tEl.textContent = tNow;
            barEl.style.transform = `scaleX(${(1 - sched).toFixed(3)})`;
            if (sched > 0) statusEl.textContent = `sampling · step ${1000 - Math.round(sched * 1000)}/1000`;
            else if (nW) statusEl.textContent = 'noise added · denoising…';
            else statusEl.textContent = finePointer ? 'x₀ · hover to add noise' : 'x₀ · tap to add noise';

            if (sched > 0 || nW) raf = requestAnimationFrame(frame);
            else running = false;
        }

        const kick = () => { if (!raf && ready) { running = true; raf = requestAnimationFrame(frame); } };

        function start(skipIntro) {
            if (fallback) { drawFallback(); return; }
            sched = skipIntro ? 0 : 1;
            introStart = performance.now();
            kick();
        }

        let lastWound = 0;
        const addWound = (e, strength = 1) => {
            if (!ready) return;
            const now = performance.now();
            if (now - lastWound < 28) return;
            lastWound = now;
            const r = cv.getBoundingClientRect();
            const x = (e.clientX - r.left) * (W / r.width);
            const y = (e.clientY - r.top) * (H / r.height);
            wounds.push({ x, y, r: W * 0.13, s: strength });
            if (wounds.length > 14) wounds.shift();
            kick();
        };
        cv.addEventListener('pointermove', e => addWound(e, 0.9));
        cv.addEventListener('pointerdown', e => { lastWound = 0; addWound(e, 1); });
        $('#diff-resample').addEventListener('click', () => { wounds = []; start(false); });

        const boot = () => {
            build();
            // start when the card is actually visible
            const io = new IntersectionObserver((en, o) => {
                if (!en[0].isIntersecting) return;
                o.disconnect();
                setTimeout(() => start(reduceMotion), reduceMotion ? 0 : 350);
            }, { threshold: 0.25 });
            io.observe(cv);
        };
        if (img.complete && img.naturalWidth) boot(); else img.addEventListener('load', boot);

        let rT;
        window.addEventListener('resize', () => {
            clearTimeout(rT);
            rT = setTimeout(() => {
                const w = Math.round(cv.getBoundingClientRect().width);
                if (!img.naturalWidth || Math.abs(w - W) < 2) return;
                ready = false; build();
                if (fallback) drawFallback(); else { sched = 0; kick(); }
            }, 200);
        });
    }

    /* =========================================================
       CONTACT: drifting graphite dust
       ========================================================= */
    const nc = $('#contact-noise');
    if (nc && !reduceMotion) {
        const c = nc.getContext('2d');
        let w, h, dpr, pts = [], visible = false, raf2 = null;
        const size = () => {
            const r = nc.getBoundingClientRect();
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            w = r.width; h = r.height;
            nc.width = w * dpr; nc.height = h * dpr;
            c.setTransform(dpr, 0, 0, dpr, 0, 0);
            const count = Math.round(clamp(w * h / 9000, 60, 220));
            pts = Array.from({ length: count }, () => ({
                x: Math.random() * w, y: Math.random() * h,
                r: Math.random() * 1.4 + 0.3,
                s: Math.random() * 0.35 + 0.08,
                p: Math.random() * Math.PI * 2,
                a: Math.random() * 0.5 + 0.15,
                blue: Math.random() < 0.18
            }));
        };
        const loop = (t) => {
            c.clearRect(0, 0, w, h);
            for (const p of pts) {
                p.y -= p.s;
                p.x += Math.sin(t * 0.0004 + p.p) * 0.25;
                if (p.y < -4) { p.y = h + 4; p.x = Math.random() * w; }
                c.globalAlpha = p.a * (0.6 + 0.4 * Math.sin(t * 0.001 + p.p));
                c.fillStyle = p.blue ? '#8490ff' : '#ecebe6';
                c.beginPath(); c.arc(p.x, p.y, p.r, 0, Math.PI * 2); c.fill();
            }
            c.globalAlpha = 1;
            raf2 = visible ? requestAnimationFrame(loop) : null;
        };
        size();
        new IntersectionObserver(en => {
            visible = en[0].isIntersecting;
            if (visible && !raf2) raf2 = requestAnimationFrame(loop);
        }).observe(nc);
        window.addEventListener('resize', () => { clearTimeout(nc._t); nc._t = setTimeout(size, 200); });
    }

    /* ---------- hello, fellow dev ---------- */
    console.log('%cKomil Parmar', 'font: 600 28px Geist, system-ui; color: #ecebe6; background: #0b0b0c; padding: 8px 14px; border-radius: 8px;');
    console.log('%cYou opened the console, so you are my kind of person. The hero is a tiny diffusion sampler written in vanilla JS (cosine schedule, ~13k particles). Say hi: komilparmar57@gmail.com', 'font: 13px ui-monospace, monospace; color: #8490ff;');
})();

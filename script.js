document.addEventListener('DOMContentLoaded', () => {
    // 1. Инициализация данных (из data.js)
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('id');
    
    if (window.location.pathname.includes('project') && projectId && typeof PROJECTS_DATA !== 'undefined') {
        const data = PROJECTS_DATA[projectId];
        if (data) {
            document.title = data.title;
            const el = (id) => document.getElementById(id);
            if(el('p-tag')) el('p-tag').textContent = data.tag;
            if(el('p-title')) el('p-title').textContent = data.title;
            if(el('p-desc')) el('p-desc').textContent = data.desc;
            if(el('p-context')) el('p-context').textContent = data.context;
            if(el('p-process')) el('p-process').textContent = data.process;
            if(el('p-results')) el('p-results').textContent = data.results;
            if(el('p-meta')) {
                el('p-meta').innerHTML = `
                    <div><dt>Functional</dt><dd>${data.functional}</dd></div>
                    <div><dt>Skills</dt><dd>${data.skills}</dd></div>
                    <div><dt>My role</dt><dd>${data.role}</dd></div>`;
            }
            data.images.forEach((src, idx) => {
                const img = el(`img-${idx}`);
                if (img) img.src = src;
            });
            if(el('next-link')) el('next-link').href = `project.html?id=${data.nextId}`;
            if(el('next-label')) el('next-label').textContent = data.nextTag;
        }
    }

    // 2. Входные анимации текста (GSAP)
    const hero = document.querySelector(".hero-content, .project-hero");
    if (hero && typeof gsap !== 'undefined') {
        gsap.from(hero.querySelectorAll(".text-h1, .text-p"), { 
            y: '110%', duration: 0.3, ease: 'power3.out', stagger: 0.15, delay: 0.3 
        });
        const profile = document.querySelector('.profile-card, .project-hero__tag');
        if (profile) gsap.fromTo(profile, { opacity: 0, scale: 0.95 }, { 
            opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out', delay: 0.1 
        });
    }

    // 3. WebGL Конфигурация
    if (typeof THREE !== 'undefined') {
        const cards = document.querySelectorAll('.webgl-project-card');
        const activeCards = new Set();
        let lastY = window.scrollY, currentDist = 0;

        const vShader = `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;
        const fShader = `
            precision highp float;
            varying vec2 vUv;
            uniform sampler2D uT; uniform float uS, uZ; uniform vec2 uR, uTR;
            float roundedBox(vec2 p, vec2 b, float r) {
                vec2 q = abs(p) - b + r;
                return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
            }
            void main() {
                vec2 ratio = vec2(min((uR.x/uR.y)/(uTR.x/uTR.y), 1.0), min((uR.y/uR.x)/(uTR.y/uTR.x), 1.0));
                vec2 uv = vUv - 0.5;
                float d = dot(uv, uv) * uS;
                vec2 fUv = (uv * (1.0 - d) / uZ) + 0.5;
                if(roundedBox((uv * (1.0 - d)) * uR, 0.5 * uR, 32.0) > 0.0) discard;
                if(fUv.x < 0.0 || fUv.x > 1.0 || fUv.y < 0.0 || fUv.y > 1.0) discard;
                gl_FragColor = texture2D(uT, fUv * ratio + (1.0 - ratio) * 0.5);
            }`;

        const cardObserver = new IntersectionObserver(entries => {
            entries.forEach(e => {
                const c = e.target._card;
                if (e.isIntersecting) {
                    activeCards.add(c);
                    if (!c.init) initCard(c);
                    if (!c.anim) {
                        gsap.fromTo(e.target, { opacity: 0, scale: 0.95, rotateX: -10 }, { 
                            opacity: 1, scale: 1, rotateX: 0, duration: 0.8, ease: 'power3.out' 
                        });
                        c.anim = true;
                    }
                } else activeCards.delete(c);
            });
        }, { threshold: 0.1 });

        const initCard = (c) => {
            const rect = c.el.getBoundingClientRect(), img = c.el.querySelector('.project-img--bg');
            const renderer = new THREE.WebGLRenderer({ canvas: c.el.querySelector('.project-card__canvas'), alpha: true, antialias: true });
            renderer.setSize(rect.width, rect.height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

            const tex = new THREE.Texture(img);
            tex.generateMipmaps = false;
            tex.minFilter = THREE.LinearFilter;

            const mat = new THREE.ShaderMaterial({
                uniforms: { 
                    uT: { value: tex }, uS: { value: 0 }, uZ: { value: 1 }, 
                    uR: { value: new THREE.Vector2(rect.width, rect.height) }, 
                    uTR: { value: new THREE.Vector2(img.naturalWidth || 1, img.naturalHeight || 1) } 
                },
                vertexShader: vShader, fragmentShader: fShader, transparent: true
            });

            const scene = new THREE.Scene();
            scene.add(new THREE.Mesh(new THREE.PlaneGeometry(1, 1), mat));
            const cam = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0.1, 10);
            cam.position.z = 1;

            const render = () => renderer.render(scene, cam);
            const update = () => { 
                tex.needsUpdate = true; 
                mat.uniforms.uTR.value.set(img.naturalWidth, img.naturalHeight); 
                render(); 
            };
            
            if (img.complete) update(); else img.onload = update;

            c.el.addEventListener('mouseenter', () => gsap.to(mat.uniforms.uZ, { 
                value: 1.025, duration: 0.45, ease: 'power2.out', onUpdate: render 
            }));
            c.el.addEventListener('mouseleave', () => gsap.to(mat.uniforms.uZ, { 
                value: 1.0, duration: 0.45, ease: 'power2.out', onUpdate: render 
            }));
            
            c.data = { renderer, mat, render };
            c.init = true;
        };

        cards.forEach(el => { el._card = { el }; cardObserver.observe(el); });

        // 4. Логика Футера и Единый Цикл Анимации
        const footer = document.querySelector('.footer');
        let footerTop = footer ? footer.offsetTop : 0;

        if (footer) {
            new IntersectionObserver(([e]) => {
                document.body.classList.toggle('is-at-bottom', e.isIntersecting);
            }, { threshold: 0.01 }).observe(footer);
        }

        gsap.ticker.add(() => {
            const vel = Math.abs(window.scrollY - lastY);
            lastY = window.scrollY;

            // Дисторсия WebGL
            const targetDist = Math.min(Math.pow(vel, 1.35) * 0.0012, 0.7);
            currentDist += (targetDist - currentDist) * 0.08;

            if (currentDist > 0.001) {
                activeCards.forEach(c => {
                    if (c.init) {
                        c.data.mat.uniforms.uS.value = currentDist;
                        c.data.render();
                    }
                });
            }

            // Блюр Футера
            if (footer) {
                const offset = Math.max(0, (window.scrollY + window.innerHeight) - footerTop);
                document.documentElement.style.setProperty('--blur-offset', `-${offset}px`);
            }
        });

        // Дебаунс ресайза
        let resizeTm;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTm);
            resizeTm = setTimeout(() => {
                footerTop = footer ? footer.offsetTop : 0;
                cards.forEach(el => {
                    const c = el._card;
                    if (c?.init) {
                        const r = el.getBoundingClientRect();
                        c.data.renderer.setSize(r.width, r.height);
                        c.data.mat.uniforms.uR.value.set(r.width, r.height);
                        c.data.render();
                    }
                });
            }, 150);
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {

    // === Navbar scroll effect ===
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // === Active nav link on scroll ===
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link:not(.nav-cta)');

    function updateActiveLink() {
        const scrollY = window.scrollY + 120;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollY >= top && scrollY < top + height) {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                if (activeLink) activeLink.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);

    // === Mobile menu toggle ===
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu on link click
    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // === Fade-in on scroll (Intersection Observer) ===
    const fadeElements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(el => observer.observe(el));

    // === Smooth scroll for anchor links ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // === Depoimentos Slider ===
    const depoimentosGrid = document.getElementById('depoimentosGrid');
    const depoimentosPrev = document.getElementById('depoimentosPrev');
    const depoimentosNext = document.getElementById('depoimentosNext');

    if (depoimentosGrid && depoimentosPrev && depoimentosNext) {
        depoimentosPrev.addEventListener('click', () => {
            const scrollAmount = depoimentosGrid.offsetWidth > 400 ? 344 : 304; // Card width + gap
            depoimentosGrid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        depoimentosNext.addEventListener('click', () => {
            const scrollAmount = depoimentosGrid.offsetWidth > 400 ? 344 : 304; // Card width + gap
            depoimentosGrid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    }

    // === WhatsApp Conversion Tracking ===
    document.querySelectorAll('a[href*="wa.me"]').forEach(button => {
        button.addEventListener('click', () => {
            if (typeof gtag === 'function') {
                gtag('event', 'click_whatsapp', {
                    'event_category': 'contato',
                    'event_label': 'botao_whatsapp',
                    'value': 1
                });
            }
        });
    });

});

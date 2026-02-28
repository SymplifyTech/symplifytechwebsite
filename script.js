document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll background change
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Fade up animations on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Attach styles and observe
    const elementsToAnimate = document.querySelectorAll('.service-card, .stat-item, .cta-container, .section-header');

    elementsToAnimate.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease-out, transform 0.6s ease-out`;

        // Slight stagger for service cards and stats
        if (el.classList.contains('service-card') || el.classList.contains('stat-item')) {
            const delay = (index % 4) * 0.15;
            el.style.transitionDelay = `${delay}s`;
        }

        observer.observe(el);
    });

    // Implement smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');

    function updateThemeIcon(theme) {
        if (!themeIcon) return;
        if (theme === 'dark') {
            // Moon icon for dark mode
            themeIcon.innerHTML = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;
        } else {
            // Sun icon for light mode
            themeIcon.innerHTML = `<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>`;
        }
    }

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateThemeIcon(theme);
    }

    // Initialize Theme
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme ? savedTheme : (systemPrefersDark ? 'dark' : 'light');

    setTheme(initialTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            setTheme(newTheme);
        });
    }

    // Listen to system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

    // 3D Interactive Hero Card Hover Logic
    const interactiveCard = document.getElementById('interactive-card');
    const interactivePanel = document.querySelector('.interactive-panel');

    if (interactiveCard && interactivePanel) {
        interactiveCard.addEventListener('mousemove', (e) => {
            const rect = interactiveCard.getBoundingClientRect();
            // Calculate mouse position relative to the center of the card
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Adjust divisor to change sensitivity (higher = less sensitive)
            const rotateX = -(y / 20).toFixed(2);
            const rotateY = (x / 20).toFixed(2);

            interactivePanel.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        interactiveCard.addEventListener('mouseleave', () => {
            // Reset to flat when mouse leaves
            interactivePanel.style.transform = `rotateX(0deg) rotateY(0deg)`;
            interactivePanel.style.transition = `transform 0.5s ease`;
        });

        interactiveCard.addEventListener('mouseenter', () => {
            // Remove transition for snappier tracking while inside
            interactivePanel.style.transition = `transform 0.1s ease`;
        });
    }

});

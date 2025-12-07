document.addEventListener('DOMContentLoaded', () => {
    const initHeaderComponent = (root) => {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = root.querySelectorAll('.header-nav-link');

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (!href) return;
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                link.classList.add('header-nav-link--active');
            }
        });

        const mobileMenu = root.querySelector('[data-mobile-menu]');
        const mobileOverlay = root.querySelector('[data-mobile-overlay]');
        const mobileToggles = root.querySelectorAll('[data-mobile-toggle]');
        const mobileCloses = root.querySelectorAll('[data-mobile-close]');

        if (!mobileMenu || mobileToggles.length === 0) {
            return;
        }

        const openMenu = () => {
            mobileMenu.classList.remove('hidden');
            mobileOverlay?.classList.remove('hidden');
            document.body.classList.add('overflow-hidden');
        };

        const closeMenu = () => {
            mobileMenu.classList.add('hidden');
            mobileOverlay?.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        };

        mobileToggles.forEach(btn => btn.addEventListener('click', openMenu));
        mobileCloses.forEach(btn => btn.addEventListener('click', closeMenu));
        mobileOverlay?.addEventListener('click', closeMenu);

        mobileMenu.querySelectorAll('.header-nav-link').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    };

    // Load HTML components
    document.querySelectorAll('[data-include]').forEach((placeholder) => {
        const file = placeholder.getAttribute('data-include');
        if (!file) {
            return;
        }

        fetch(file)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to load ${file}`);
                }
                return response.text();
            })
            .then((html) => {
                placeholder.innerHTML = html;
                if (file.includes('header.html')) {
                    initHeaderComponent(placeholder);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in-up').forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add parallax effect to background elements
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-animation');
        
        parallaxElements.forEach((el, index) => {
            const speed = 0.5 + (index * 0.1);
            const transform = `translateY(${scrolled * speed}px)`;
            el.style.transform = transform;
        });
        
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);

    // Enhanced button interactions
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });

        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1.02)';
        });
    });

    // Add dynamic cursor effect for interactive elements
    const cursor = document.createElement('div');
    cursor.className = 'fixed w-4 h-4 bg-primary/50 rounded-full pointer-events-none z-50 transition-all duration-300 mix-blend-difference';
    cursor.style.transform = 'translate(-50%, -50%)';
    document.body.appendChild(cursor);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Show/hide cursor based on hovering interactive elements
    const interactiveElements = document.querySelectorAll('button, a, [role="button"]');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(2)';
            cursor.style.backgroundColor = 'rgba(59, 130, 246, 0.8)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.backgroundColor = 'rgba(59, 130, 246, 0.5)';
        });
    });

    // Add loading animation to images
    document.querySelectorAll('img').forEach(img => {
        if (!img.complete) {
            img.style.opacity = '0';
            img.addEventListener('load', () => {
                img.style.transition = 'opacity 0.5s ease-in-out';
                img.style.opacity = '1';
            });
        }
    });
});

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });
    }
    
    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.querySelector('i').classList.add('fa-bars');
                navToggle.querySelector('i').classList.remove('fa-times');
            }
        });
    });
    
    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    
    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;
        
        revealElements.forEach(element => {
            const revealTop = element.getBoundingClientRect().top;
            
            if (revealTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    }
    
    // Initial check
    checkReveal();
    
    // Check on scroll
    window.addEventListener('scroll', checkReveal);
    
    // Page load animations
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroBio = document.querySelector('.hero-bio');
    const heroButtons = document.querySelector('.hero-buttons');
    const pageTitle = document.querySelector('.page-title');
    const pageSubtitle = document.querySelector('.page-subtitle');
    
    // Trigger animations after page load
    setTimeout(() => {
        if (heroTitle) {
            heroTitle.style.animation = 'slideInLeft 1s ease forwards';
        }
        
        if (heroSubtitle) {
            setTimeout(() => {
                heroSubtitle.style.animation = 'slideInRight 1s ease forwards';
            }, 300);
        }
        
        if (heroBio) {
            setTimeout(() => {
                heroBio.style.animation = 'fadeIn 1s ease forwards';
            }, 600);
        }
        
        if (heroButtons) {
            setTimeout(() => {
                heroButtons.style.animation = 'fadeIn 1s ease forwards';
            }, 900);
        }
        
        if (pageTitle) {
            setTimeout(() => {
                pageTitle.style.animation = 'fadeIn 1s ease forwards';
            }, 300);
        }
        
        if (pageSubtitle) {
            setTimeout(() => {
                pageSubtitle.style.animation = 'fadeIn 1s ease 0.5s forwards';
            }, 300);
        }
    }, 500);
    
    // Smooth hover effects for all interactive elements
    const interactiveElements = document.querySelectorAll('.btn, .service-card, .contact-card, .group-card, .info-card, .feature-card, .nav-link');
    
    interactiveElements.forEach(element => {
        // Add click animation
        element.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        element.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Add active state to current page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Add parallax effect to hero shapes
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.shape');
        
        shapes.forEach((shape, index) => {
            const speed = 0.3 + (index * 0.1);
            shape.style.transform = `translateY(${scrolled * speed * 0.1}px) rotate(${scrolled * 0.05}deg)`;
        });
    });
});
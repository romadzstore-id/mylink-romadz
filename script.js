// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.querySelector('.header');
const modalOverlay = document.querySelector('#modalOverlay');
const modalClose = document.querySelector('.modal-close');
const buyButtons = document.querySelectorAll('.btn-buy');
const modalServiceName = document.querySelector('#modalServiceName');

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Update active nav link
        navLinks.forEach(item => item.classList.remove('active'));
        link.classList.add('active');
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Trigger animations on scroll
    triggerAnimations();
});

// Modal functionality
function openModal(serviceName) {
    modalServiceName.textContent = serviceName;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Add event listeners to buy buttons
buyButtons.forEach(button => {
    button.addEventListener('click', () => {
        const serviceName = button.getAttribute('data-service') || "Layanan ROMADZ STORE";
        openModal(serviceName);
    });
});

// Close modal when clicking on overlay or close button
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

modalClose.addEventListener('click', closeModal);

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
    }
});

// Animations on scroll
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
        rect.bottom >= 0
    );
}

function triggerAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
    
    animatedElements.forEach(el => {
        if (isElementInViewport(el) && !el.classList.contains('animated')) {
            el.classList.add('animated');
            el.style.animationDelay = el.getAttribute('data-delay') || '0s';
        }
    });
}

// Initialize animations on page load
window.addEventListener('DOMContentLoaded', () => {
    triggerAnimations();
    
    // Add data-delay attributes for staggered animations
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.setAttribute('data-delay', `${index * 0.1}s`);
    });
    
    // Add animation to contact cards
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.05}s`;
    });
    
    // Smooth scroll to sections
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Set active nav link based on scroll position
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNavLink);
    
    // Add button click animation
    document.querySelectorAll('.btn, .btn-buy').forEach(button => {
        button.addEventListener('mousedown', () => {
            button.style.transform = 'translateY(2px)';
        });
        
        button.addEventListener('mouseup', () => {
            button.style.transform = 'translateY(0)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });
    
    // Add logo click to scroll to top
    document.querySelector('.logo').addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Update active nav link
        navLinks.forEach(link => link.classList.remove('active'));
        document.querySelector('.nav-link[href="#home"]').classList.add('active');
    });
});

// Add hover effect to product cards
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 20px 40px rgba(99, 102, 241, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
        if (!this.classList.contains('animated')) return;
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.05)';
    });
});

// Add click effect to contact cards
document.querySelectorAll('.contact-card').forEach(card => {
    card.addEventListener('click', function() {
        const link = this.querySelector('a');
        if (link) {
            link.click();
        }
    });
});
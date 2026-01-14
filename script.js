// DOM Elements
const loadingElement = document.getElementById('loading');
const toastElement = document.getElementById('toast');
const toastText = document.getElementById('toast-text');
const linkCards = document.querySelectorAll('.link-card');
const logoImg = document.getElementById('logo-img');

// Color Palette for animations
const colorPalette = {
    whatsapp: '#25D366',
    telegram: '#0088cc',
    testimoni: '#FFB347',
    marketplace1: '#7c5ac2',
    marketplace2: '#5a9bd4',
    marketplace3: '#7bc8a4',
    marketplace4: '#d47c9b',
    marketplace5: '#9b7cd4',
    informasi: '#a6a6a6'
};

// Page Loading Simulation
window.addEventListener('load', function() {
    // Hide loading animation after a short delay
    setTimeout(() => {
        loadingElement.style.opacity = '0';
        setTimeout(() => {
            loadingElement.style.display = 'none';
        }, 300);
        
        // Add subtle entrance animation to cards
        document.querySelectorAll('.link-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 + index * 50);
        });
    }, 800);
    
    // Add click animation to logo
    logoImg.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });
    
    // Initialize link cards
    initLinkCards();
    
    // Log initialization
    console.log('PixelLink website v2 initialized successfully');
});

// Initialize Link Cards
function initLinkCards() {
    linkCards.forEach(card => {
        // Add click event to each card
        card.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the URL from data attribute
            const url = this.getAttribute('data-url');
            
            // Get card type for animation color
            const cardClass = Array.from(this.classList).find(cls => cls.includes('-card'));
            const cardType = cardClass ? cardClass.replace('-card', '') : 'default';
            const cardColor = colorPalette[cardType] || '#7c5ac2';
            
            // Apply click animation
            this.style.transform = 'translate(5px, 5px)';
            this.style.boxShadow = `0px 0px 0 ${cardColor}`;
            
            // Create ripple effect
            createRippleEffect(this, cardColor);
            
            // Show click feedback
            this.style.backgroundColor = '#f8f8f8';
            
            // Reset animation after a short delay
            setTimeout(() => {
                this.style.transform = 'translate(0, 0)';
                this.style.boxShadow = `6px 6px 0 ${cardColor}`;
                this.style.backgroundColor = '#fff';
                
                // Open the link
                window.open(url, '_blank');
                
                // Show notification
                const linkTitle = this.querySelector('.link-title').textContent;
                showToast(`Membuka: ${linkTitle}`);
            }, 200);
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            // Get card type for shadow color
            const cardClass = Array.from(this.classList).find(cls => cls.includes('-card'));
            const cardType = cardClass ? cardClass.replace('-card', '') : 'default';
            const cardColor = colorPalette[cardType] || '#7c5ac2';
            
            this.style.transform = 'translate(3px, 3px)';
            this.style.boxShadow = `3px 3px 0 ${cardColor}`;
            
            // Add subtle scale effect
            this.style.transform = 'translate(3px, 3px) scale(1.01)';
        });
        
        card.addEventListener('mouseleave', function() {
            // Get card type for shadow color
            const cardClass = Array.from(this.classList).find(cls => cls.includes('-card'));
            const cardType = cardClass ? cardClass.replace('-card', '') : 'default';
            const cardColor = colorPalette[cardType] || '#7c5ac2';
            
            this.style.transform = 'translate(0, 0) scale(1)';
            this.style.boxShadow = `6px 6px 0 ${cardColor}`;
        });
        
        // Add touch feedback for mobile
        card.addEventListener('touchstart', function() {
            this.style.transform = 'translate(5px, 5px) scale(0.99)';
            this.style.boxShadow = '0px 0px 0';
        });
        
        card.addEventListener('touchend', function() {
            // Get card type for shadow color
            const cardClass = Array.from(this.classList).find(cls => cls.includes('-card'));
            const cardType = cardClass ? cardClass.replace('-card', '') : 'default';
            const cardColor = colorPalette[cardType] || '#7c5ac2';
            
            setTimeout(() => {
                this.style.transform = 'translate(0, 0) scale(1)';
                this.style.boxShadow = `6px 6px 0 ${cardColor}`;
            }, 150);
        });
    });
}

// Create Ripple Effect
function createRippleEffect(element, color) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.position = 'absolute';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.backgroundColor = color + '40'; // Add transparency
    ripple.style.borderRadius = '0'; // Pixel style - no rounded corners
    ripple.style.transform = 'scale(0)';
    ripple.style.opacity = '0.7';
    ripple.style.zIndex = '1';
    ripple.style.pointerEvents = 'none';
    ripple.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    // Trigger animation
    setTimeout(() => {
        ripple.style.transform = 'scale(2)';
        ripple.style.opacity = '0';
    }, 10);
    
    // Remove ripple after animation
    setTimeout(() => {
        if (ripple.parentNode === element) {
            element.removeChild(ripple);
        }
    }, 600);
}

// Show Toast Notification
function showToast(message) {
    // Update toast text
    toastText.textContent = message;
    
    // Randomize toast shadow color
    const colors = Object.values(colorPalette);
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    toastElement.style.boxShadow = `4px 4px 0 ${randomColor}`;
    
    // Show toast
    toastElement.classList.add('show');
    
    // Hide toast after 3 seconds
    setTimeout(() => {
        toastElement.classList.remove('show');
    }, 3000);
}

// Handle logo error (fallback mechanism)
logoImg.addEventListener('error', function() {
    console.log('Logo failed to load from external URL');
    
    // Try alternative approaches
    const fallbackImages = [
        'logo.jpg',
        'assets/logo.jpg',
        'images/logo.jpg'
    ];
    
    let currentIndex = 0;
    const tryNextFallback = () => {
        if (currentIndex < fallbackImages.length) {
            this.src = fallbackImages[currentIndex];
            currentIndex++;
        } else {
            // If all fail, create a placeholder
            this.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="140" height="140" viewBox="0 0 140 140"><rect width="140" height="140" fill="%23f0f0f0"/><text x="50%" y="50%" font-family="Arial" font-size="16" text-anchor="middle" dy=".3em" fill="%23333">LOGO</text></svg>';
            this.alt = 'Logo Placeholder';
        }
    };
    
    this.addEventListener('error', tryNextFallback, { once: true });
    tryNextFallback();
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // If user presses Enter while focused on a link card
    if (e.key === 'Enter' && document.activeElement.classList.contains('link-card')) {
        document.activeElement.click();
    }
    
    // Add keyboard shortcuts for accessibility
    if (e.altKey) {
        switch(e.key) {
            case '1':
                document.querySelector('.whatsapp-card')?.click();
                break;
            case '2':
                document.querySelector('.telegram-card')?.click();
                break;
            case '3':
                document.querySelector('.testimoni-card')?.click();
                break;
        }
    }
});

// Add scroll animation for sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for scroll animations
document.querySelectorAll('.links-section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Add theme color based on time of day
function updateThemeBasedOnTime() {
    const hour = new Date().getHours();
    const body = document.body;
    
    // Clear any existing time classes
    body.classList.remove('morning-theme', 'afternoon-theme', 'evening-theme', 'night-theme');
    
    // Add appropriate theme class
    if (hour >= 5 && hour < 12) {
        body.classList.add('morning-theme');
    } else if (hour >= 12 && hour < 17) {
        body.classList.add('afternoon-theme');
    } else if (hour >= 17 && hour < 21) {
        body.classList.add('evening-theme');
    } else {
        body.classList.add('night-theme');
    }
}

// Initialize time-based theme
updateThemeBasedOnTime();

// Update theme every hour
setInterval(updateThemeBasedOnTime, 3600000);

// Add CSS for dynamic themes
const themeStyle = document.createElement('style');
themeStyle.textContent = `
    .morning-theme {
        background-color: #f5f3f0;
    }
    
    .afternoon-theme {
        background-color: #f8f7f5;
    }
    
    .evening-theme {
        background-color: #f0f0f5;
    }
    
    .night-theme {
        background-color: #f0f0f0;
    }
    
    .morning-theme .link-card {
        background-color: #ffffff;
    }
    
    .evening-theme .link-card {
        background-color: #fcfcff;
    }
`;
document.head.appendChild(themeStyle);
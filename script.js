// DOM Elements
const loadingElement = document.getElementById('loading');
const toastElement = document.getElementById('toast');
const toastText = document.getElementById('toast-text');
const linkCards = document.querySelectorAll('.link-card');
const logoImg = document.getElementById('logo-img');

// Page Loading Simulation
window.addEventListener('load', function() {
    // Hide loading animation after a short delay
    setTimeout(() => {
        loadingElement.style.opacity = '0';
        setTimeout(() => {
            loadingElement.style.display = 'none';
        }, 300);
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
    console.log('PixelLink website initialized successfully');
});

// Initialize Link Cards
function initLinkCards() {
    linkCards.forEach(card => {
        // Add click event to each card
        card.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the URL from data attribute
            const url = this.getAttribute('data-url');
            
            // Apply click animation
            this.style.transform = 'translate(4px, 4px)';
            this.style.boxShadow = '0px 0px 0 #7c5ac2';
            
            // Reset animation after a short delay
            setTimeout(() => {
                this.style.transform = 'translate(0, 0)';
                this.style.boxShadow = '4px 4px 0 #7c5ac2';
                
                // Open the link
                window.open(url, '_blank');
                
                // Show notification
                showToast('Membuka tautan...');
            }, 200);
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translate(2px, 2px)';
            this.style.boxShadow = '2px 2px 0 #7c5ac2';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
            this.style.boxShadow = '4px 4px 0 #7c5ac2';
        });
        
        // Add touch feedback for mobile
        card.addEventListener('touchstart', function() {
            this.style.transform = 'translate(4px, 4px)';
            this.style.boxShadow = '0px 0px 0 #7c5ac2';
        });
        
        card.addEventListener('touchend', function() {
            this.style.transform = 'translate(0, 0)';
            this.style.boxShadow = '4px 4px 0 #7c5ac2';
        });
    });
}

// Show Toast Notification
function showToast(message) {
    // Update toast text
    toastText.textContent = message;
    
    // Show toast
    toastElement.classList.add('show');
    
    // Hide toast after 3 seconds
    setTimeout(() => {
        toastElement.classList.remove('show');
    }, 3000);
}

// Handle logo error (fallback to local logo)
logoImg.addEventListener('error', function() {
    // If the external logo fails to load, try to load a local one
    this.src = 'logo.jpg';
    this.alt = 'Logo Brand (Local)';
    
    // Log the error
    console.log('External logo failed to load, trying local logo');
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // If user presses Enter while focused on a link card
    if (e.key === 'Enter' && document.activeElement.classList.contains('link-card')) {
        document.activeElement.click();
    }
});

// Add ripple effect to link cards (optional enhancement)
function addRippleEffect(card) {
    card.style.position = 'relative';
    card.style.overflow = 'hidden';
    
    card.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.position = 'absolute';
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.backgroundColor = 'rgba(124, 90, 194, 0.3)';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
}

// Add CSS for ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Initialize ripple effect on all cards
linkCards.forEach(card => {
    addRippleEffect(card);
});
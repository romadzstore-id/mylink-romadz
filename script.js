// DOM Elements
const loadingOverlay = document.getElementById('loadingOverlay');
const mainContent = document.getElementById('mainContent');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');
const linkCards = document.querySelectorAll('.link-card');

// Initialize main content as hidden
mainContent.style.opacity = '0';

// Page Load Simulation
window.addEventListener('load', () => {
    // Simulate loading time
    setTimeout(() => {
        // Hide loading overlay
        loadingOverlay.style.opacity = '0';
        
        // Show main content with fade-in effect
        setTimeout(() => {
            loadingOverlay.style.display = 'none';
            mainContent.style.transition = 'opacity 0.5s ease';
            mainContent.style.opacity = '1';
            
            // Add a subtle entrance animation to cards
            const cards = document.querySelectorAll('.link-card, .stat-card');
            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100 + 300);
            });
        }, 500);
    }, 1500);
});

// Show Toast Notification Function
function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Handle Link Clicks
linkCards.forEach(link => {
    link.addEventListener('click', function(e) {
        // Add click effect
        this.style.transform = 'translate(0, 0)';
        this.style.boxShadow = '4px 4px 0 rgba(0, 0, 0, 0.2)';
        
        // Reset after a short delay
        setTimeout(() => {
            this.style.transform = '';
            this.style.boxShadow = '';
        }, 150);
        
        // Get platform name from data attribute
        const platform = this.getAttribute('data-platform');
        showToast(`Membuka ${platform}...`);
        
        // Note: Link will open in new tab as per HTML target="_blank"
        // No need to prevent default
    });
    
    // Add hover sound effect simulation (visual only)
    link.addEventListener('mouseenter', function() {
        // Create a subtle pixel effect on hover
        const originalBoxShadow = this.style.boxShadow;
        this.style.boxShadow = '10px 10px 0 rgba(0, 0, 0, 0.15)';
        
        // Add a subtle color shift based on icon type
        const icon = this.querySelector('.link-icon');
        if (icon.classList.contains('whatsapp')) {
            this.style.borderColor = '#25d366';
        } else if (icon.classList.contains('telegram')) {
            this.style.borderColor = '#0088cc';
        } else if (icon.classList.contains('marketplace')) {
            this.style.borderColor = '#8a63ff';
        } else if (icon.classList.contains('informasi')) {
            this.style.borderColor = '#66cc99';
        }
        
        // Store original border color to restore on mouseleave
        this.dataset.originalBorder = this.style.borderColor;
    });
    
    link.addEventListener('mouseleave', function() {
        // Restore original styles
        this.style.boxShadow = '6px 6px 0 rgba(0, 0, 0, 0.1)';
        this.style.borderColor = '#000';
    });
});

// Add click effect to footer links
const footerLinks = document.querySelectorAll('.footer-link');
footerLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        // If it's the email link, handle differently
        if (this.querySelector('.fa-envelope')) {
            e.preventDefault();
            showToast('Email: contact@romadzstore.id');
            // In a real implementation, you might want to open mail client
            // window.location.href = 'mailto:contact@romadzstore.id';
        } else {
            showToast('Membuka tautan...');
        }
        
        // Add click effect
        this.style.transform = 'translate(0, 0)';
        this.style.boxShadow = '2px 2px 0 rgba(0, 0, 0, 0.2)';
        
        // Reset after a short delay
        setTimeout(() => {
            this.style.transform = '';
            this.style.boxShadow = '';
        }, 150);
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // If user presses Escape, close toast if visible
    if (e.key === 'Escape' && toast.classList.contains('show')) {
        toast.classList.remove('show');
    }
    
    // If user presses Space or Enter on a focused link, simulate click
    if ((e.key === 'Enter' || e.key === ' ') && document.activeElement.classList.contains('link-card')) {
        document.activeElement.click();
    }
});

// Add a subtle background animation
function createBackgroundPixels() {
    const container = document.querySelector('.container');
    const pixelCount = 15;
    
    for (let i = 0; i < pixelCount; i++) {
        const pixel = document.createElement('div');
        pixel.classList.add('bg-pixel');
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Random color from palette
        const colors = ['#8a63ff', '#6a9eff', '#63c9ff', '#ff8ae0', '#66cc99'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Set styles
        pixel.style.position = 'absolute';
        pixel.style.left = `${posX}%`;
        pixel.style.top = `${posY}%`;
        pixel.style.width = '4px';
        pixel.style.height = '4px';
        pixel.style.backgroundColor = color;
        pixel.style.opacity = '0.3';
        pixel.style.zIndex = '-1';
        pixel.style.pointerEvents = 'none';
        
        // Add animation
        pixel.style.animation = `pixelFloat ${3 + Math.random() * 4}s infinite ease-in-out`;
        pixel.style.animationDelay = `${Math.random() * 2}s`;
        
        container.appendChild(pixel);
    }
}

// Add CSS for background animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pixelFloat {
        0%, 100% {
            transform: translateY(0) translateX(0);
        }
        25% {
            transform: translateY(-10px) translateX(5px);
        }
        50% {
            transform: translateY(5px) translateX(-10px);
        }
        75% {
            transform: translateY(-5px) translateX(10px);
        }
    }
`;
document.head.appendChild(style);

// Initialize background pixels after page loads
window.addEventListener('load', () => {
    setTimeout(createBackgroundPixels, 2000);
});

// Add year to copyright (dynamic)
document.addEventListener('DOMContentLoaded', () => {
    const copyrightElement = document.querySelector('.copyright');
    if (copyrightElement) {
        // Update year to 2026 as requested
        copyrightElement.textContent = `© 2026 - Romadz Store ID`;
    }
});
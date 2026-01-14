// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Hide loading animation after page loads
    setTimeout(() => {
        const loadingElement = document.getElementById('loading');
        loadingElement.style.opacity = '0';
        setTimeout(() => {
            loadingElement.style.display = 'none';
        }, 500);
    }, 1000);

    // Toast notification function
    function showToast(message) {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toast-message');
        
        toastMessage.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // Handle link card clicks
    const linkCards = document.querySelectorAll('.link-card');
    
    linkCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'translate(0, 0)';
            this.style.boxShadow = '4px 4px 0 #a8c6ff';
            
            setTimeout(() => {
                this.style.transform = '';
                this.style.boxShadow = '';
            }, 150);
            
            // Handle email card (copy to clipboard)
            if (this.classList.contains('email-card')) {
                const email = this.getAttribute('data-email');
                copyToClipboard(email);
                showToast('Email disalin ke clipboard: ' + email);
                return;
            }
            
            // Handle regular link cards
            const url = this.getAttribute('data-url');
            if (url) {
                // Show notification before redirecting
                showToast('Membuka tautan...');
                
                // Open link in new tab after short delay
                setTimeout(() => {
                    window.open(url, '_blank');
                }, 500);
            }
        });
        
        // Add hover effect with sound-like feedback
        card.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f9f9f9';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '#fff';
        });
    });

    // Copy to clipboard function
    function copyToClipboard(text) {
        // Create a temporary textarea element
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'absolute';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        
        // Select and copy text
        textarea.select();
        document.execCommand('copy');
        
        // Remove temporary element
        document.body.removeChild(textarea);
    }

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const toast = document.getElementById('toast');
            toast.classList.remove('show');
        }
    });

    // Add pixel animation effect to footer
    const footerPixel = document.querySelector('.footer-pixel');
    
    footerPixel.addEventListener('mouseenter', function() {
        this.style.transform = 'rotate(90deg)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    footerPixel.addEventListener('mouseleave', function() {
        this.style.transform = 'rotate(0deg)';
    });

    // Add click effect to logo
    const logo = document.querySelector('.logo');
    
    logo.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        this.style.transition = 'transform 0.2s ease';
        
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
        
        showToast('Romadz Store ID - Toko Online Terpercaya');
    });
    
    // Add page load animation to cards
    setTimeout(() => {
        linkCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.display = 'flex';
                
                setTimeout(() => {
                    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            }, index * 100);
        });
    }, 300);
});
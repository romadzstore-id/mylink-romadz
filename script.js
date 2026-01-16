// Menunggu DOM siap sepenuhnya
document.addEventListener('DOMContentLoaded', function() {
    // Elemen penting
    const loadingOverlay = document.getElementById('loadingOverlay');
    const toast = document.getElementById('toast');
    const logo = document.getElementById('logo');
    const linkCards = document.querySelectorAll('.link-card');
    
    // Simulasi loading (akan dihilangkan setelah 1.5 detik)
    setTimeout(function() {
        loadingOverlay.classList.add('hidden');
        
        // Hapus elemen loading dari DOM setelah transisi selesai
        setTimeout(function() {
            loadingOverlay.style.display = 'none';
        }, 300);
    }, 1500);
    
    // Fungsi untuk menampilkan toast notification
    function showToast(message) {
        const toastText = toast.querySelector('.toast-text');
        
        if (message) {
            toastText.textContent = message;
        }
        
        toast.classList.add('show');
        
        // Sembunyikan toast setelah 3 detik
        setTimeout(function() {
            toast.classList.remove('show');
        }, 3000);
    }
    
    // Fungsi untuk menyalin URL ke clipboard
    function copyToClipboard(url) {
        navigator.clipboard.writeText(url)
            .then(function() {
                showToast('Link berhasil disalin!');
            })
            .catch(function(err) {
                console.error('Gagal menyalin teks: ', err);
                showToast('Gagal menyalin link');
            });
    }
    
    // Tambahkan event listener untuk setiap link card
    linkCards.forEach(function(card) {
        // Tambahkan efek klik kanan untuk menyalin link
        card.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            
            const url = this.getAttribute('href');
            if (url) {
                copyToClipboard(url);
            }
            
            // Tambahkan efek visual feedback
            this.style.backgroundColor = '#f0f0f0';
            setTimeout(() => {
                this.style.backgroundColor = '';
            }, 300);
        });
        
        // Tambahkan efek hover dengan delay untuk kesan smooth
        let hoverTimeout;
        
        card.addEventListener('mouseenter', function() {
            clearTimeout(hoverTimeout);
            hoverTimeout = setTimeout(() => {
                this.style.transition = 'all 0.2s ease';
            }, 50);
        });
        
        card.addEventListener('mouseleave', function() {
            clearTimeout(hoverTimeout);
        });
    });
    
    // Efek klik pada logo
    logo.addEventListener('click', function() {
        // Animasi kecil pada logo
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
        
        // Scroll ke atas
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Tambahkan animasi saat halaman di-scroll
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 50) {
            // Scroll ke bawah
            header.style.transform = 'translateY(-10px)';
            header.style.opacity = '0.9';
        } else {
            // Scroll ke atas
            header.style.transform = 'translateY(0)';
            header.style.opacity = '1';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Tambahkan efek saat halaman pertama kali dimuat
    const container = document.querySelector('.container');
    container.style.opacity = '0';
    container.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        container.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
    }, 1600);
    
    // Tambahkan tahun saat ini di footer
    const currentYear = new Date().getFullYear();
    const footerText = document.querySelector('.footer-text');
    if (footerText) {
        footerText.textContent = footerText.textContent.replace('2023', currentYear);
    }
    
    // Handle klik pada link untuk tracking (contoh sederhana)
    linkCards.forEach(function(card) {
        card.addEventListener('click', function(e) {
            const linkType = this.getAttribute('data-link-type');
            const linkTitle = this.querySelector('.link-title').textContent;
            
            console.log(`Link diklik: ${linkTitle} (${linkType})`);
            
            // Di sini bisa ditambahkan kode untuk analytics tracking
            // Contoh: sendAnalyticsEvent('link_click', { type: linkType, title: linkTitle });
            
            // Tidak perlu mencegah default karena kita ingin link terbuka
        });
    });
    
    // Tambahkan touch feedback untuk perangkat mobile
    if ('ontouchstart' in window) {
        linkCards.forEach(function(card) {
            card.addEventListener('touchstart', function() {
                this.style.backgroundColor = '#f5f5f5';
            });
            
            card.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.backgroundColor = '';
                }, 200);
            });
        });
    }
});
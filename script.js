document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS Animation Library
    AOS.init({
        once: true,
        offset: 50,
        duration: 800,
        easing: 'ease-in-out'
    });

    // Header Scroll Effect
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
                icon.style.color = '#FFFFFF'; // white because the menu is now dark blue
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
                icon.style.color = ''; // reset to default
            }
        });
    }

    // Close menu when clicking link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            if (mobileToggle) {
                const icon = mobileToggle.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Number animation for stats
    const stats = document.querySelectorAll('.stat-number');
    let animated = false;

    const animateStats = () => {
        stats.forEach(stat => {
            const originalText = stat.innerText;
            const targetStr = originalText.replace(/\D/g, '');
            const suffix = originalText.replace(/[0-9]/g, '');
            const target = parseInt(targetStr);
            
            if (isNaN(target)) return;
            
            let current = 0;
            const increment = target / 50; // frames
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.innerText = target + suffix;
                    clearInterval(timer);
                } else {
                    stat.innerText = Math.ceil(current) + suffix;
                }
            }, 30);
        });
    }

    // Intersection Observer for stats animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animateStats();
                animated = true;
            }
        });
    }, { threshold: 0.5 });

    const statsContainer = document.querySelector('.hero-stats');
    if (statsContainer) {
        observer.observe(statsContainer);
    }

    // Booking Modal Logic
    const openBookingBtn = document.getElementById('open-booking');
    const closeBookingBtn = document.getElementById('close-booking');
    const bookingModal = document.getElementById('booking-modal');
    const bookingForm = document.getElementById('booking-form');

    if (openBookingBtn && bookingModal && closeBookingBtn) {
        openBookingBtn.addEventListener('click', () => {
            bookingModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Stop scrolling
        });

        const closeModal = () => {
            bookingModal.classList.remove('active');
            document.body.style.overflow = ''; // Resume scrolling
        };

        closeBookingBtn.addEventListener('click', closeModal);

        // Close on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && bookingModal.classList.contains('active')) {
                closeModal();
            }
        });

        // Close on clicking outside
        bookingModal.addEventListener('click', (e) => {
            if (e.target === bookingModal) {
                closeModal();
            }
        });

        // Form Submission to WhatsApp
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('user-name').value;
            const count = document.getElementById('bike-count').value;
            const time = document.getElementById('booking-time').value;
            
            const phoneNumber = '77777767070'; // +7 (777) 776-70-70
            const message = `Здравствуйте! Я хочу забронировать велосипед.\n\n👤 Имя: ${name}\n🚲 Количество: ${count}\n⏰ Время: ${time}`;
            
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            
            window.open(whatsappUrl, '_blank');
            closeModal();
            bookingForm.reset();
        });
    }
});

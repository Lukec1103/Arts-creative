// Bubble animation
function createBubbles() {
    const background = document.getElementById('background');
    const bubbleCount = 10;
    
    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        
        const size = Math.random() * 400 + 300;
        const top = Math.random() * 110 - 5;
        const left = Math.random() * 110 - 5;
        
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.top = `${top}%`;
        bubble.style.left = `${left}%`;
        
        bubble.style.zIndex = Math.floor(Math.random() * 3) - 3;
        
        background.appendChild(bubble);
        
        setTimeout(() => {
            bubble.style.opacity = '0.6';
            animateBubble(bubble);
        }, i * 200);
    }
}

function animateBubble(bubble) {
    let direction = 1;
    let position = parseFloat(bubble.style.left);
    
    setInterval(() => {
        position += 0.03 * direction;
        
        if (position > 102) {
            direction = -1;
        } else if (position < -2) {
            direction = 1;
        }
        
        bubble.style.left = `${position}%`;
    }, 50);
}

// Navigation and scroll handling
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.work-section');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        if (link.getAttribute('href').startsWith('#')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                window.scrollTo({
                    top: targetSection.offsetTop - 20,
                    behavior: 'smooth'
                });
            });
        }
    });
    
    // Highlight active nav link based on scroll position
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && 
                scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${section.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
        
        // Special handling for last section
        const lastSection = sections[sections.length - 1];
        const documentHeight = document.documentElement.scrollHeight;
        const windowBottom = window.scrollY + window.innerHeight;
        
        if (windowBottom >= documentHeight - 50) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${lastSection.id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
    
    // Create bubbles
    createBubbles();
    
    // Lightbox functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxCounter = document.getElementById('lightbox-counter');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    
    // Store all images grouped by section
    const galleryImages = {
        zokni: [],
        voscilnice: [],
        ostalo: []
    };
    
    // Populate galleryImages with all images from the gallery
    document.querySelectorAll('.gallery-item').forEach(item => {
        const section = item.dataset.section;
        const images = Array.from(item.querySelectorAll('img'));
        galleryImages[section].push(...images);
    });
    
    let currentSection = '';
    let currentIndex = 0;
    
    // Open lightbox with specific section
    function openLightbox(section, index = 0) {
        currentSection = section;
        currentIndex = index;
        updateLightbox();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Update lightbox content
    function updateLightbox() {
        const image = galleryImages[currentSection][currentIndex];
        lightboxImg.src = image.src;
        lightboxCaption.textContent = image.alt;
        lightboxCounter.textContent = `${currentIndex + 1} / ${galleryImages[currentSection].length}`;
    }
    
    // Navigate to next image
    function nextImage() {
        currentIndex = (currentIndex + 1) % galleryImages[currentSection].length;
        updateLightbox();
    }
    
    // Navigate to previous image
    function prevImage() {
        currentIndex = (currentIndex - 1 + galleryImages[currentSection].length) % galleryImages[currentSection].length;
        updateLightbox();
    }
    
    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Event listeners
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function() {
            const section = this.dataset.section;
            // Find the index of the first image in this item
            const firstImage = this.querySelector('img');
            const images = galleryImages[section];
            const index = images.findIndex(img => img.src === firstImage.src);
            openLightbox(section, index);
        });
    });
    
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', prevImage);
    lightboxNext.addEventListener('click', nextImage);
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                prevImage();
            } else if (e.key === 'ArrowRight') {
                nextImage();
            }
        }
    });
    
    // Close lightbox when clicking outside image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // NEW: Info button functionality
    const infoBtn = document.querySelector('.info-btn');
    const infoDropdown = document.querySelector('.info-dropdown');
    
    if (infoBtn && infoDropdown) {
        infoBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            // Toggle dropdown visibility
            infoDropdown.style.display = 
                infoDropdown.style.display === 'block' ? 'none' : 'block';
        });
        
        // Close dropdown when clicking anywhere else
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.info-wrapper')) {
                infoDropdown.style.display = 'none';
            }
        });
        
        // Prevent closing when clicking inside dropdown
        infoDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
});
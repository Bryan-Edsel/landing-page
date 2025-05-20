// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Ensure all images are loaded properly
    const allImages = document.querySelectorAll('img');
    let imagesLoaded = 0;
    
    allImages.forEach(img => {
        // If image is already loaded or has an error
        if (img.complete) {
            imagesLoaded++;
            if (imagesLoaded === allImages.length) {
                document.body.classList.add('images-loaded');
            }
        } else {
            // Add load and error event listeners
            img.addEventListener('load', function() {
                imagesLoaded++;
                if (imagesLoaded === allImages.length) {
                    document.body.classList.add('images-loaded');
                }
            });
            
            img.addEventListener('error', function() {
                // Try to reload the image
                const imgSrc = img.src;
                img.src = '';
                setTimeout(() => {
                    img.src = imgSrc;
                }, 500);
                
                imagesLoaded++;
                if (imagesLoaded === allImages.length) {
                    document.body.classList.add('images-loaded');
                }
            });
        }
    });

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseover', function() {
            this.style.backgroundColor = '#3a9c3a';
            this.style.transition = 'background-color 0.3s ease';
        });
        
        button.addEventListener('mouseout', function() {
            this.style.backgroundColor = '#4CAF4F';
        });
    });

    // Add animation to stats numbers
    const stats = document.querySelectorAll('.stat-number');
    const animateStats = () => {
        stats.forEach(stat => {
            const target = parseInt(stat.textContent.replace(/,/g, ''));
            const time = 2000; // 2 seconds for the animation
            const step = target / (time / 30); // 30 fps
            
            let current = 0;
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    clearInterval(timer);
                    current = target;
                }
                stat.textContent = Math.floor(current).toLocaleString();
            }, 30);
        });
    };

    // Check if the element is in viewport
    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    // Listen for scroll events to trigger animations
    let animated = false;
    const checkForAnimation = () => {
        if (!animated && document.querySelector('.stats') && isInViewport(document.querySelector('.stats'))) {
            animateStats();
            animated = true;
        }
    };
    
    window.addEventListener('scroll', checkForAnimation);
    // Also check on page load
    checkForAnimation();

    // Create mobile menu toggle functionality
    const createMobileMenu = () => {
        const header = document.querySelector('header');
        const navMenu = document.querySelector('.nav-menu');
        
        // Create hamburger menu button if it doesn't exist
        if (!document.querySelector('.hamburger-menu')) {
            const hamburger = document.createElement('div');
            hamburger.className = 'hamburger-menu';
            hamburger.innerHTML = '<span></span><span></span><span></span>';
            
            // Add to DOM for mobile only
            if (window.innerWidth <= 768) {
                navMenu.prepend(hamburger);
                
                // Toggle menu on click
                hamburger.addEventListener('click', () => {
                    const menu = document.querySelector('.nav-menu ul');
                    
                    if (menu.style.display === 'flex') {
                        menu.style.display = 'none';
                    } else {
                        menu.style.display = 'flex';
                        menu.style.flexDirection = 'column';
                        menu.style.position = 'absolute';
                        menu.style.top = '60px';
                        menu.style.right = '20px';
                        menu.style.backgroundColor = '#FFFFFF';
                        menu.style.padding = '20px';
                        menu.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.1)';
                        menu.style.zIndex = '100';
                        menu.style.borderRadius = '4px';
                    }
                });
            }
        }
    };

    // Initialize mobile menu
    createMobileMenu();
    
    // Update mobile menu on resize
    window.addEventListener('resize', () => {
        const hamburger = document.querySelector('.hamburger-menu');
        if (hamburger) {
            hamburger.remove();
        }
        createMobileMenu();
        
        // Reset menu display on resize
        if (window.innerWidth > 768) {
            const navMenu = document.querySelector('.nav-menu ul');
            navMenu.style.display = 'flex';
            navMenu.style.flexDirection = 'row';
            navMenu.style.position = 'static';
            navMenu.style.boxShadow = 'none';
            navMenu.style.padding = '0';
            navMenu.style.borderRadius = '0';
        }
    });
    
    // Add hover interactions to cards
    const communityCards = document.querySelectorAll('.community-card');
    communityCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0px 5px 10px rgba(171, 190, 209, 0.4)';
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0px 1.4px 2.8px 0px rgba(171, 190, 209, 0.2)';
        });
    });
    
    const blogCards = document.querySelectorAll('.blog-card');
    blogCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}); 
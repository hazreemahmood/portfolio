/**
 * Welcome Page - Interactive Features
 * Reusable across guest/landing pages
 */

(function() {
    'use strict';

    // ========================================
    // Typing Effect
    // ========================================
    const typingElement = document.getElementById('typing-text');
    const taglineElement = document.getElementById('dynamic-tagline');

    if (typingElement) {
        const roles = [
            'building scalable systems with Laravel & React',
            'crafting intuitive user experiences',
            'optimizing backend performance',
            'integrating RESTful APIs & third-party services',
            'leading end-to-end feature delivery',
        ];

        const taglines = [
            '10+ years of experience building scalable web applications',
            'From architecture to deployment — full-stack expertise',
            'Passionate about clean code & great user experiences',
            'Laravel · React · MySQL — the full stack toolkit',
        ];

        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let taglineIndex = 0;

        function typeEffect() {
            const currentRole = roles[roleIndex];
            
            if (!isDeleting) {
                typingElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                if (charIndex === currentRole.length) {
                    isDeleting = true;
                    setTimeout(typeEffect, 2000);
                    return;
                }
                setTimeout(typeEffect, 40);
            } else {
                typingElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                if (charIndex === 0) {
                    isDeleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                    if (taglineElement) {
                        taglineIndex = (taglineIndex + 1) % taglines.length;
                        taglineElement.textContent = taglines[taglineIndex];
                    }
                    setTimeout(typeEffect, 500);
                    return;
                }
                setTimeout(typeEffect, 20);
            }
        }

        setTimeout(typeEffect, 1000);
    }

    // ========================================
    // Mouse Parallax Effect for Orbs
    // ========================================
    const orbs = document.querySelectorAll('.orb');
    
    if (orbs.length > 0) {
        document.addEventListener('mousemove', function(e) {
            const x = (e.clientX / window.innerWidth) * 20 - 10;
            const y = (e.clientY / window.innerHeight) * 20 - 10;
            orbs.forEach(function(orb, i) {
                orb.style.transform = 'translate(' + (x * (i + 1) * 0.2) + 'px, ' + (y * (i + 1) * 0.2) + 'px)';
            });
        });
    }

    // ========================================
    // Job Card Expand/Collapse (Accordion)
    // ========================================
    const jobCards = document.querySelectorAll('.job-card');

    jobCards.forEach(function(card) {
        card.addEventListener('click', function(e) {
            // Don't toggle if clicking a tag badge
            if (e.target.closest('.job-tag')) return;

            const isActive = card.classList.contains('active');
            
            // Close all other cards (accordion)
            jobCards.forEach(function(otherCard) {
                if (otherCard !== card) {
                    otherCard.classList.remove('active');
                }
            });

            // Toggle clicked card
            if (isActive) {
                card.classList.remove('active');
            } else {
                card.classList.add('active');
            }
        });
    });

})();
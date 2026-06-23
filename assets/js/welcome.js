/**
 * Welcome Page - Interactive Features
 * Pure vanilla JS, no dependencies
 * Compatible with the deployed HTML structure
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    console.log('[Portfolio] JS initialized successfully');

    // ========================================
    // Futuristic Loading Screen
    // ========================================
    const loadingScreen = document.getElementById('loading-screen');
    const loaderStatus = document.getElementById('loader-status');
    const loaderProgressBar = document.getElementById('loader-progress-bar');
    const loaderParticles = document.getElementById('loader-particles');

    if (loadingScreen && loaderStatus && loaderProgressBar) {
        console.log('[Portfolio] Loading screen initialized');
        console.log('[Portfolio] Loading screen element:', loadingScreen);
        console.log('[Portfolio] Progress bar element:', loaderProgressBar);

        // Create particles
        if (loaderParticles) {
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: absolute;
                    width: ${Math.random() * 4 + 2}px;
                    height: ${Math.random() * 4 + 2}px;
                    background: rgba(102, 126, 234, ${Math.random() * 0.5 + 0.3});
                    border-radius: 50%;
                    top: ${Math.random() * 100}%;
                    left: ${Math.random() * 100}%;
                    animation: particleFloat ${Math.random() * 3 + 2}s ease-in-out infinite;
                    animation-delay: ${Math.random() * 2}s;
                `;
                loaderParticles.appendChild(particle);
            }
        }

        // Loading messages
        const loadingMessages = [
            'Loading neural interface...',
            'Initializing quantum cores...',
            'Calibrating experience modules...',
            'Synchronizing career timeline...',
            'System ready'
        ];

        let progress = 0;
        let messageIndex = 0;
        const totalDuration = 3000; // 3 seconds
        const intervalTime = 30; // Update every 30ms for smooth animation
        const increment = 100 / (totalDuration / intervalTime);

        console.log('[Portfolio] Starting loading sequence, duration:', totalDuration + 'ms');

        const loadingInterval = setInterval(function() {
            try {
                progress += increment;

                if (progress >= 100) {
                    progress = 100;
                    clearInterval(loadingInterval);
                    console.log('[Portfolio] Loading complete, progress:', progress + '%');

                    // Ensure progress bar shows 100%
                    loaderProgressBar.style.width = '100%';
                    console.log('[Portfolio] Progress bar set to 100%');

                    // Final message
                    loaderStatus.textContent = loadingMessages[loadingMessages.length - 1];
                    console.log('[Portfolio] Final message set');

                    // Hide loading screen after a short delay
                    setTimeout(function() {
                        try {
                            console.log('[Portfolio] Adding hidden class...');
                            loadingScreen.classList.add('hidden');
                            console.log('[Portfolio] Hidden class added successfully');

                            // Trigger page reveal animation
                            triggerPageReveal();

                            // Remove loading screen from DOM after transition
                            setTimeout(function() {
                                try {
                                    if (loadingScreen.parentNode) {
                                        loadingScreen.parentNode.removeChild(loadingScreen);
                                        console.log('[Portfolio] Loading screen removed from DOM');
                                    }
                                } catch (e) {
                                    console.error('[Portfolio] Error removing loading screen:', e);
                                }
                            }, 600);
                        } catch (e) {
                            console.error('[Portfolio] Error hiding loading screen:', e);
                        }
                    }, 400);
                } else {
                    // Update progress bar with smooth animation
                    loaderProgressBar.style.width = progress + '%';

                    // Update message at certain progress points
                    const newMessageIndex = Math.floor((progress / 100) * (loadingMessages.length - 1));
                    if (newMessageIndex !== messageIndex && newMessageIndex < loadingMessages.length - 1) {
                        messageIndex = newMessageIndex;
                        loaderStatus.textContent = loadingMessages[messageIndex];
                    }
                }
            } catch (e) {
                console.error('[Portfolio] Error in loading interval:', e);
                clearInterval(loadingInterval);
            }
        }, intervalTime);
    } else {
        console.warn('[Portfolio] Loading screen elements not found');
        console.warn('[Portfolio] loadingScreen:', loadingScreen);
        console.warn('[Portfolio] loaderStatus:', loaderStatus);
        console.warn('[Portfolio] loaderProgressBar:', loaderProgressBar);
    }

    // ========================================
    // Typing Effect
    // ========================================
    const typingElement = document.getElementById('typing-text');
    const taglineElement = document.getElementById('dynamic-tagline');

    if (typingElement) {
        console.log('[Portfolio] Typing effect initialized');

        const roles = [
            'building scalable systems with Laravel & React',
            'crafting intuitive user experiences',
            'optimizing backend performance',
            'integrating RESTful APIs & third-party services',
            'leading end-to-end feature delivery',
        ];

        const taglines = [
            '10+ years of experience building scalable web applications',
            'From architecture to deployment \u2014 full-stack expertise',
            'Passionate about clean code & great user experiences',
            'Laravel \u00B7 React \u00B7 MySQL \u2014 the full stack toolkit',
        ];

        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let taglineIndex = 0;
        let typingTimeout = null;

        function typeEffect() {
            try {
                const currentRole = roles[roleIndex];
                
                if (!isDeleting) {
                    typingElement.textContent = currentRole.substring(0, charIndex + 1);
                    charIndex++;
                    if (charIndex === currentRole.length) {
                        isDeleting = true;
                        typingTimeout = setTimeout(typeEffect, 2000);
                        return;
                    }
                    typingTimeout = setTimeout(typeEffect, 40);
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
                        typingTimeout = setTimeout(typeEffect, 500);
                        return;
                    }
                    typingTimeout = setTimeout(typeEffect, 20);
                }
            } catch (err) {
                console.error('[Portfolio] Typing effect error:', err);
            }
        }

        typingTimeout = setTimeout(typeEffect, 1000);
    } else {
        console.warn('[Portfolio] Typing element (#typing-text) not found');
    }

    // ========================================
    // Mouse Parallax Effect for Orbs
    // ========================================
    const orbs = document.querySelectorAll('.orb');
    
    if (orbs.length > 0) {
        console.log('[Portfolio] Parallax effect initialized (' + orbs.length + ' orbs)');

        document.addEventListener('mousemove', function(e) {
            try {
                const x = (e.clientX / window.innerWidth) * 20 - 10;
                const y = (e.clientY / window.innerHeight) * 20 - 10;
                orbs.forEach(function(orb, i) {
                    orb.style.transform = 'translate(' + (x * (i + 1) * 0.2) + 'px, ' + (y * (i + 1) * 0.2) + 'px)';
                });
            } catch (err) {
                console.error('[Portfolio] Parallax error:', err);
            }
        });
    } else {
        console.warn('[Portfolio] No .orb elements found');
    }

    // ========================================
    // Job Card Expand/Collapse (Accordion)
    // ========================================
    const jobCards = document.querySelectorAll('.job-card');

    if (jobCards.length > 0) {
        console.log('[Portfolio] Job card accordion initialized (' + jobCards.length + ' cards)');

        jobCards.forEach(function(card) {
            card.addEventListener('click', function(e) {
                try {
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
                } catch (err) {
                    console.error('[Portfolio] Accordion error:', err);
                }
            });
        });
    } else {
        console.warn('[Portfolio] No .job-card elements found');
    }

    // ========================================
    // Navigation Dots (Click to scroll)
    // ========================================
    const navDots = document.querySelectorAll('.nav-dot');

    if (jobCards.length > 0 && navDots.length > 0) {
        console.log('[Portfolio] Navigation dots initialized (' + jobCards.length + ' cards)');

        let currentCardIndex = 0;

        // Update active dot
        function updateActiveDot(index) {
            navDots.forEach(function(dot, i) {
                if (i === index) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        // Click handler for navigation dots
        navDots.forEach(function(dot, index) {
            dot.addEventListener('click', function() {
                if (index >= 0 && index < jobCards.length) {
                    currentCardIndex = index;
                    jobCards[index].scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    updateActiveDot(index);
                }
            });
        });

        // Update active dot based on scroll position
        window.addEventListener('scroll', function() {
            jobCards.forEach(function(card, index) {
                const rect = card.getBoundingClientRect();
                if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
                    currentCardIndex = index;
                    updateActiveDot(index);
                }
            });
        }, { passive: true });

        console.log('[Portfolio] Navigation dots ready');
    }

    // ========================================
    // Page Reveal Animation
    // ========================================
    function triggerPageReveal() {
        console.log('[Portfolio] Starting page reveal sequence');

        // Trigger scan line
        const scanLine = document.getElementById('scan-line');
        if (scanLine) {
            scanLine.classList.add('active');
            console.log('[Portfolio] Scan line triggered');
        }

        // Add reveal class to body for page-wide effect
        document.body.classList.add('page-reveal');

        // Add reveal class to hero section
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.classList.add('reveal');
            console.log('[Portfolio] Hero reveal triggered');
        }

        // Add glitch effect to title
        const title = document.querySelector('.hero h1');
        if (title) {
            title.classList.add('glitch');
        }

        // Add reveal class to job cards
        const jobCardsContainer = document.querySelector('.job-cards');
        if (jobCardsContainer) {
            jobCardsContainer.classList.add('reveal');
            console.log('[Portfolio] Job cards reveal triggered');
        }

        // Add reveal class to background elements
        const bgGrid = document.querySelector('.bg-grid');
        const orbs = document.querySelectorAll('.orb');
        if (bgGrid) bgGrid.classList.add('reveal');
        orbs.forEach(function(orb) {
            orb.classList.add('reveal');
        });

        console.log('[Portfolio] Page reveal sequence complete');
    }

    // ========================================
    // Theme Switcher
    // ========================================
    const themeButtons = document.querySelectorAll('.theme-btn');

    if (themeButtons.length > 0) {
        console.log('[Portfolio] Theme switcher initialized');

        // Set default theme (grey)
        document.documentElement.setAttribute('data-theme', 'grey');

        themeButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                const theme = this.getAttribute('data-theme');
                
                // Remove active class from all buttons
                themeButtons.forEach(function(btn) {
                    btn.classList.remove('active');
                });
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Set theme attribute on html element
                document.documentElement.setAttribute('data-theme', theme);
                
                console.log('[Portfolio] Theme changed to:', theme);
            });
        });

        console.log('[Portfolio] Theme switcher ready');
    }

    console.log('[Portfolio] All features initialized');
});

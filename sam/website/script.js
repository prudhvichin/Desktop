/* -------------------------------------------------------------
 * ASHER COMMUNICATIONS - Interactive Web Systems
 * ------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {

    // 1. PRELOADER TERMINATION
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500); // match transition duration
            }, 800); // brief pleasant delay to show off preloader design
        });

        // Safety Fallback (if window load is slow or blocked)
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 3000);
    }

    // 2. STICKY NAVBAR & SCROLL PROGRESS INDICATOR
    const header = document.getElementById('header');
    const scrollProgress = document.getElementById('scrollProgress');
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Sticky Header Toggle
        if (scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }

        // Scroll Progress Bar Update
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight > 0) {
            const scrollPercentage = (scrollY / docHeight) * 100;
            scrollProgress.style.width = `${scrollPercentage}%`;
        }

        // Back to Top Button Toggle
        if (scrollY > 400) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    // Back to top scroll execution
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 3. MOBILE MENU TOGGLE
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('open');
        });

        // Close menu when clicking navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('open');

                // Set active link visually on click
                navLinks.forEach(nl => nl.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }

    // 4. SERVICES CATEGORY TABS SWITCHING
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            // Deactivate all tab selectors and content wrappers
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Activate select configurations
            btn.classList.add('active');
            const targetPane = document.getElementById(targetTab);
            if (targetPane) {
                targetPane.classList.add('active');

                // Re-trigger reveal animations inside the newly opened tab pane
                const revealsInPane = targetPane.querySelectorAll('.reveal-item');
                revealsInPane.forEach(item => {
                    item.classList.add('reveal-active');
                });
            }
        });
    });

    // 5. COUNTER STATISTICS ANIMATION (SCROLL-TRIGGERED)
    const statsSection = document.querySelector('.stats-section');
    const statNumbers = document.querySelectorAll('.stat-numbers');
    let countersStarted = false;

    const runCounters = () => {
        statNumbers.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'), 10);
            let current = 0;
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // ~60fps

            const updateCount = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.floor(current);
                    requestAnimationFrame(updateCount);
                } else {
                    counter.innerText = target;
                }
            };

            updateCount();
        });
    };

    // 6. SCROLL REVEAL OBSERVER (INTERSECTION OBSERVER)
    const revealItems = document.querySelectorAll('.reveal-item');

    if ('IntersectionObserver' in window) {
        // Element Reveals Observer
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        revealItems.forEach(item => {
            revealObserver.observe(item);
        });

        // Statistics Trigger Observer
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countersStarted) {
                    runCounters();
                    countersStarted = true;
                }
            });
        }, { threshold: 0.3 });

        if (statsSection) {
            statsObserver.observe(statsSection);
        }
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        revealItems.forEach(item => item.classList.add('reveal-active'));
        runCounters();
    }

    // 7. TOAST NOTIFICATION UTILITY
    const toastContainer = document.getElementById('toastContainer');

    const showToast = (message, type = 'success') => {
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        const icon = type === 'success'
            ? '<i class="fa-solid fa-circle-check"></i>'
            : '<i class="fa-solid fa-circle-exclamation"></i>';

        toast.innerHTML = `
            ${icon}
            <span class="toast-msg">${message}</span>
        `;

        toastContainer.appendChild(toast);

        // Slide in
        setTimeout(() => {
            toast.classList.add('show');
        }, 50);

        // Auto remove after 4 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 400);
        }, 4000);
    };

    // 8. CONTACT FORM SUBMISSION HANDLING (MOCK API CALL)
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('formSubmitBtn');

    if (contactForm && submitBtn) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Add visual submitting state
            submitBtn.classList.add('submitting');
            submitBtn.setAttribute('disabled', 'true');

            // Gather inputs (for simulation)
            const name = document.getElementById('formName').value;
            const categorySelect = document.getElementById('formCategory');
            const categoryText = categorySelect.options[categorySelect.selectedIndex].text;

            // Simulate server network latency of 1.5s
            setTimeout(() => {
                // Clear loading state
                submitBtn.classList.remove('submitting');
                submitBtn.removeAttribute('disabled');

                // Clear form fields
                contactForm.reset();

                // Trigger Success Toast
                showToast(`Thank you, ${name}! Your enquiry for ${categoryText} has been submitted successfully.`);
            }, 1500);
        });
    }

    // 9. DYNAMIC NAVIGATION ACTIVE STATE ON SCROLL
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + 100; // offset header height

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    navLinks.forEach(nl => nl.classList.remove('active'));
                    activeLink.classList.add('active');
                }
            }
        });
    });
});

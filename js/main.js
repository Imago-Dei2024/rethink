/**
 * ReThink Mental Health - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    const dropdowns = document.querySelectorAll('.dropdown');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }

    // Handle mobile dropdown menus
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');

        // For mobile view
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (nav.classList.contains('active') && !nav.contains(e.target) && e.target !== mobileMenuBtn) {
            nav.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });

    // Testimonial slider
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.testimonial-nav .prev');
    const nextBtn = document.querySelector('.testimonial-nav .next');

    if (testimonials.length > 0) {
        let currentTestimonial = 0;

        // Hide all testimonials except the first one
        testimonials.forEach((testimonial, index) => {
            if (index !== 0) {
                testimonial.style.display = 'none';
            }
        });

        // Function to show a specific testimonial
        function showTestimonial(index) {
            testimonials.forEach(testimonial => {
                testimonial.style.display = 'none';
            });
            testimonials[index].style.display = 'block';

            // Add fade-in animation
            testimonials[index].classList.add('fade-in');
            setTimeout(() => {
                testimonials[index].classList.remove('fade-in');
            }, 500);
        }

        // Event listeners for navigation buttons
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', function() {
                currentTestimonial--;
                if (currentTestimonial < 0) {
                    currentTestimonial = testimonials.length - 1;
                }
                showTestimonial(currentTestimonial);
            });

            nextBtn.addEventListener('click', function() {
                currentTestimonial++;
                if (currentTestimonial >= testimonials.length) {
                    currentTestimonial = 0;
                }
                showTestimonial(currentTestimonial);
            });

            // Auto-rotate testimonials
            setInterval(() => {
                currentTestimonial++;
                if (currentTestimonial >= testimonials.length) {
                    currentTestimonial = 0;
                }
                showTestimonial(currentTestimonial);
            }, 8000); // Change testimonial every 8 seconds
        }
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            // Skip if it's just "#" or empty
            if (targetId === '#' || targetId === '') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();

                window.scrollTo({
                    top: targetElement.offsetTop - 100, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form validation for contact and review forms
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let valid = true;
            const requiredFields = form.querySelectorAll('[required]');

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    valid = false;
                    field.classList.add('error');

                    // Add error message if it doesn't exist
                    let errorMsg = field.nextElementSibling;
                    if (!errorMsg || !errorMsg.classList.contains('error-message')) {
                        errorMsg = document.createElement('div');
                        errorMsg.classList.add('error-message');
                        errorMsg.textContent = 'This field is required';
                        field.parentNode.insertBefore(errorMsg, field.nextSibling);
                    }
                } else {
                    field.classList.remove('error');

                    // Remove error message if it exists
                    const errorMsg = field.nextElementSibling;
                    if (errorMsg && errorMsg.classList.contains('error-message')) {
                        errorMsg.remove();
                    }

                    // Email validation
                    if (field.type === 'email' && !isValidEmail(field.value)) {
                        valid = false;
                        field.classList.add('error');

                        let errorMsg = field.nextElementSibling;
                        if (!errorMsg || !errorMsg.classList.contains('error-message')) {
                            errorMsg = document.createElement('div');
                            errorMsg.classList.add('error-message');
                            errorMsg.textContent = 'Please enter a valid email address';
                            field.parentNode.insertBefore(errorMsg, field.nextSibling);
                        }
                    }
                }
            });

            if (!valid) {
                e.preventDefault();
            }
        });
    });

    // Helper function to validate email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Add animation classes when elements come into view
    const animatedElements = document.querySelectorAll('.feature-card, .service-card, .about-content, .about-image');

    function checkIfInView() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    }

    // Run on initial load
    checkIfInView();

    // Run on scroll
    window.addEventListener('scroll', checkIfInView);

    // Create images directory if needed and handle image placeholders
    const imagePlaceholders = document.querySelectorAll('.image-placeholder');

    imagePlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            alert('This is a placeholder for an image. In a production environment, this would be replaced with actual images of the office, treatment rooms, or team members.');
        });
    });
});

// Add CSS class for animations
document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('dom-loaded');
});

// Handle review form submission
document.addEventListener('DOMContentLoaded', function() {
    const reviewForm = document.getElementById('review-form');

    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // In a real implementation, this would send the data to a server
            // For now, we'll just show a success message
            const formData = new FormData(reviewForm);
            const reviewData = {};

            formData.forEach((value, key) => {
                reviewData[key] = value;
            });

            // Hide the form
            reviewForm.style.display = 'none';

            // Show success message
            const successMessage = document.createElement('div');
            successMessage.classList.add('success-message');
            successMessage.innerHTML = `
                <h3>Thank You for Your Review!</h3>
                <p>We appreciate your feedback and will review it shortly.</p>
                <p>Your review helps us improve our services and lets others know about your experience.</p>
            `;

            reviewForm.parentNode.appendChild(successMessage);

            // Log the review data (in a real app, this would be sent to a server)
            console.log('Review submitted:', reviewData);
        });
    }
});

// Handle appointment booking form
document.addEventListener('DOMContentLoaded', function() {
    const appointmentForm = document.getElementById('appointment-form');

    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // In a real implementation, this would send the data to a server
            // For now, we'll just show a success message
            const formData = new FormData(appointmentForm);
            const appointmentData = {};

            formData.forEach((value, key) => {
                appointmentData[key] = value;
            });

            // Hide the form
            appointmentForm.style.display = 'none';

            // Show success message
            const successMessage = document.createElement('div');
            successMessage.classList.add('success-message');
            successMessage.innerHTML = `
                <h3>Appointment Request Received</h3>
                <p>Thank you for requesting an appointment with ReThink Mental Health.</p>
                <p>Our team will contact you shortly at ${appointmentData.email || appointmentData.phone} to confirm your appointment.</p>
            `;

            appointmentForm.parentNode.appendChild(successMessage);

            // Log the appointment data (in a real app, this would be sent to a server)
            console.log('Appointment requested:', appointmentData);
        });
    }
});

/**
 * Enhanced UI Components
 */

// Floating Appointment Button
function initFloatingAppointmentButton() {
    const body = document.querySelector('body');

    // Create the button element
    const floatingBtn = document.createElement('button');
    floatingBtn.className = 'floating-appointment-btn';
    floatingBtn.innerHTML = '<i class="fas fa-calendar-alt"></i> Book Appointment';

    // Create the pulse effect
    const pulseEffect = document.createElement('div');
    pulseEffect.className = 'pulse-effect';

    // Append elements
    floatingBtn.appendChild(pulseEffect);
    body.appendChild(floatingBtn);

    // Add click event
    floatingBtn.addEventListener('click', function() {
        window.location.href = 'contact.html';
    });
}

// Enhanced Testimonial Carousel
function initEnhancedTestimonials() {
    const testimonialSection = document.querySelector('.testimonials');
    if (!testimonialSection) return;

    // Get existing testimonials
    const existingTestimonials = document.querySelectorAll('.testimonial');
    if (existingTestimonials.length === 0) return;

    // Create new container structure
    const testimonialContainer = document.createElement('div');
    testimonialContainer.className = 'testimonial-container';

    const testimonialWrapper = document.createElement('div');
    testimonialWrapper.className = 'testimonial-wrapper';

    // Create dots container
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'testimonial-dots';

    // Process each testimonial
    existingTestimonials.forEach((testimonial, index) => {
        // Extract content
        const content = testimonial.querySelector('.testimonial-content').innerHTML;
        const authorName = testimonial.querySelector('.testimonial-author h4').textContent;
        const authorRole = testimonial.querySelector('.testimonial-author p').textContent;

        // Create new testimonial card
        const newCard = document.createElement('div');
        newCard.className = `testimonial-card ${index === 0 ? 'active' : ''}`;

        // Create rating stars
        const rating = document.createElement('div');
        rating.className = 'testimonial-rating';
        for (let i = 0; i < 5; i++) {
            const star = document.createElement('i');
            star.className = 'fas fa-star';
            rating.appendChild(star);
        }

        // Create content
        const newContent = document.createElement('div');
        newContent.className = 'testimonial-content';
        newContent.innerHTML = content;

        // Create author section
        const author = document.createElement('div');
        author.className = 'testimonial-author';

        const authorImage = document.createElement('div');
        authorImage.className = 'testimonial-author-image';
        // Use a placeholder image or extract from existing if available
        authorImage.innerHTML = '<img src="https://via.placeholder.com/50" alt="Testimonial Author">';

        const authorInfo = document.createElement('div');
        authorInfo.className = 'testimonial-author-info';
        authorInfo.innerHTML = `<h4>${authorName}</h4><p>${authorRole}</p>`;

        author.appendChild(authorImage);
        author.appendChild(authorInfo);

        // Assemble the card
        newCard.appendChild(rating);
        newCard.appendChild(newContent);
        newCard.appendChild(author);

        // Add to wrapper
        testimonialWrapper.appendChild(newCard);

        // Create dot for this testimonial
        const dot = document.createElement('div');
        dot.className = `testimonial-dot ${index === 0 ? 'active' : ''}`;
        dot.dataset.index = index;
        dotsContainer.appendChild(dot);
    });

    // Assemble the container
    testimonialContainer.appendChild(testimonialWrapper);
    testimonialContainer.appendChild(dotsContainer);

    // Replace the old slider with the new one
    const oldSlider = testimonialSection.querySelector('.testimonial-slider');
    oldSlider.parentNode.replaceChild(testimonialContainer, oldSlider);

    // Add event listeners to dots
    const dots = document.querySelectorAll('.testimonial-dot');
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            showTestimonial(index);
        });
    });

    // Function to show a specific testimonial
    function showTestimonial(index) {
        // Update cards
        const cards = document.querySelectorAll('.testimonial-card');
        cards.forEach((card, i) => {
            card.classList.toggle('active', i === index);
        });

        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        // Slide the wrapper
        testimonialWrapper.style.transform = `translateX(-${index * 100}%)`;
    }

    // Auto-rotate testimonials
    let currentTestimonial = 0;
    const totalTestimonials = existingTestimonials.length;

    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
        showTestimonial(currentTestimonial);
    }, 5000);
}

// Enhanced Service Cards
function initEnhancedServiceCards() {
    const servicesSection = document.querySelector('.services-preview');
    if (!servicesSection) return;

    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        // Create enhanced card
        const enhancedCard = document.createElement('div');
        enhancedCard.className = 'service-card-enhanced';

        // Get existing content
        const icon = card.querySelector('.service-icon i').cloneNode(true);
        const title = card.querySelector('h3').textContent;
        const description = card.querySelector('p').textContent;
        const link = card.querySelector('a').getAttribute('href');

        // Create enhanced icon
        const enhancedIcon = document.createElement('div');
        enhancedIcon.className = 'service-icon-enhanced';
        enhancedIcon.appendChild(icon);

        // Create content
        const enhancedTitle = document.createElement('h3');
        enhancedTitle.textContent = title;

        const enhancedDescription = document.createElement('p');
        enhancedDescription.textContent = description;

        // Create link
        const enhancedLink = document.createElement('a');
        enhancedLink.className = 'service-link-enhanced';
        enhancedLink.href = link;
        enhancedLink.innerHTML = 'Learn More <i class="fas fa-arrow-right"></i>';

        // Assemble the card
        enhancedCard.appendChild(enhancedIcon);
        enhancedCard.appendChild(enhancedTitle);
        enhancedCard.appendChild(enhancedDescription);
        enhancedCard.appendChild(enhancedLink);

        // Replace the old card with the enhanced one
        card.parentNode.replaceChild(enhancedCard, card);
    });
}

// Modern FAQ Accordion
function initModernFaqAccordion() {
    const faqPage = document.querySelector('.page-header');
    if (!faqPage) return;

    // Add a class to the body for the FAQ page
    document.body.classList.add('faq-page');

    // Get existing FAQ sections
    const faqSections = document.querySelectorAll('.faq-section');

    faqSections.forEach(section => {
        // Get section title
        const sectionTitle = section.querySelector('h2').textContent;

        // Create accordion container
        const accordionContainer = document.createElement('div');
        accordionContainer.className = 'faq-accordion';
        accordionContainer.id = section.id; // Preserve the section ID for navigation

        // Create title section
        const titleSection = document.createElement('div');
        titleSection.className = 'faq-accordion-title';
        titleSection.innerHTML = `
            <h2>${sectionTitle}</h2>
            <p>Find answers to frequently asked questions about ${sectionTitle.toLowerCase()}</p>
        `;

        // Create items container
        const itemsContainer = document.createElement('div');
        itemsContainer.className = 'faq-items';

        // Get all FAQ items in this section
        const faqItems = section.querySelectorAll('.faq-item');

        faqItems.forEach(item => {
            // Get question and answer
            const question = item.querySelector('.faq-question').childNodes[0].textContent.trim();
            const answer = item.querySelector('.faq-answer').innerHTML;

            // Create new FAQ item
            const newItem = document.createElement('div');
            newItem.className = 'faq-item';

            // Create question element
            const questionEl = document.createElement('div');
            questionEl.className = 'faq-question';
            questionEl.textContent = question;

            // Create answer element
            const answerEl = document.createElement('div');
            answerEl.className = 'faq-answer';
            answerEl.innerHTML = answer;

            // Add click event to question
            questionEl.addEventListener('click', () => {
                // Toggle active class
                newItem.classList.toggle('active');

                // Close other items
                const siblings = itemsContainer.querySelectorAll('.faq-item');
                siblings.forEach(sibling => {
                    if (sibling !== newItem) {
                        sibling.classList.remove('active');
                    }
                });
            });

            // Assemble the item
            newItem.appendChild(questionEl);
            newItem.appendChild(answerEl);

            // Add to container
            itemsContainer.appendChild(newItem);
        });

        // Assemble the accordion
        accordionContainer.appendChild(titleSection);
        accordionContainer.appendChild(itemsContainer);

        // Replace the old section with the new accordion
        section.parentNode.replaceChild(accordionContainer, section);
    });

    // Preserve the category functionality
    const faqCategories = document.querySelectorAll('.faq-category');
    faqCategories.forEach(category => {
        category.addEventListener('click', function() {
            // Remove active class from all categories
            faqCategories.forEach(cat => cat.classList.remove('active'));

            // Add active class to clicked category
            this.classList.add('active');

            // Get target section
            const targetId = this.getAttribute('data-target');

            // Hide all accordions
            const accordions = document.querySelectorAll('.faq-accordion');
            accordions.forEach(accordion => {
                accordion.style.display = 'none';
            });

            // Show target accordion
            const targetAccordion = document.getElementById(targetId);
            if (targetAccordion) {
                targetAccordion.style.display = 'block';
            }
        });
    });

    // Trigger click on active category to initialize the view
    const activeCategory = document.querySelector('.faq-category.active');
    if (activeCategory) {
        activeCategory.click();
    }

    // Add animation to the accordion items
    const allFaqItems = document.querySelectorAll('.faq-item');
    allFaqItems.forEach((item, index) => {
        // Add a slight delay to each item for a staggered appearance
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';

            // Trigger animation
            setTimeout(() => {
                item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 50);
        }, index * 100);
    });
}

// Scroll to Top Button
function initScrollToTopButton() {
    // Create the button
    const scrollTopBtn = document.createElement('div');
    scrollTopBtn.className = 'scroll-to-top';
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';

    // Add to the body
    document.body.appendChild(scrollTopBtn);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    // Scroll to top when clicked
    scrollTopBtn.addEventListener('click', function() {
        // Smooth scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize all enhanced UI components
document.addEventListener('DOMContentLoaded', function() {
    // Initialize existing functionality first

    // Then initialize new components
    initFloatingAppointmentButton();
    initEnhancedTestimonials();
    initEnhancedServiceCards();
    initModernFaqAccordion();
    initScrollToTopButton();
});

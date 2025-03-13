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

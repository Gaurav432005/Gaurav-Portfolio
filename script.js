// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBrlpqy8RY9jb9ZK_-Q9sjJDTSPp-rSHTI",
    authDomain: "portfolio-website-2d969.firebaseapp.com",
    projectId: "portfolio-website-2d969",
    storageBucket: "portfolio-website-2d969.firebasestorage.app",
    messagingSenderId: "578469599468",
    appId: "1:578469599468:web:6551387ea83cf8bc086dc9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// DOM Elements
const menuToggle = document.querySelector('.menu-toggle');
const overlay = document.querySelector('.overlay');
const navbar = document.querySelector('.navbar');
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('form-message');
const currentYear = document.getElementById('year');
const submitBtn = document.getElementById('submitBtn');
const btnText = submitBtn.querySelector('.btn-text');
const btnSpinner = submitBtn.querySelector('.btn-spinner');

// Menu Toggle
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    overlay.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.overlay-content a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        overlay.classList.remove('active');
    });
});

// Form Submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Show loading spinner
    btnSpinner.style.display = 'inline-block';
    btnText.textContent = 'Sending...';
    submitBtn.disabled = true;

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Save to Firebase
    const newMessageRef = database.ref('messages').push();
    newMessageRef.set({
        name: name,
        email: email,
        subject: subject,
        message: message,
        timestamp: firebase.database.ServerValue.TIMESTAMP
    })
    .then(() => {
        formMessage.textContent = 'Thank you! Your message has been sent.';
        formMessage.classList.add('success');
        formMessage.style.display = 'block';
        contactForm.reset();
        setTimeout(() => {
            formMessage.style.display = 'none';
            formMessage.classList.remove('success');
        }, 5000);
    })
    .catch((error) => {
        formMessage.textContent = 'Error: ' + error.message;
        formMessage.classList.add('error');
        formMessage.style.display = 'block';
        setTimeout(() => {
            formMessage.style.display = 'none';
            formMessage.classList.remove('error');
        }, 5000);
    })
    .finally(() => {
        // Hide loading spinner
        btnSpinner.style.display = 'none';
        btnText.textContent = 'Send Message';
        submitBtn.disabled = false;
    });
});

// Set current year in footer
currentYear.textContent = new Date().getFullYear();

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Animate elements with class 'gsap-animate'
document.querySelectorAll('.gsap-animate').forEach(el => {
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power2.out"
    });
});

// Hero animation
gsap.from('.hero-title', {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: 'power3.out',
    delay: 0.3
});

gsap.from('.hero-subtitle', {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: 'power3.out',
    delay: 0.5
});

gsap.from('.hero-buttons', {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: 'power3.out',
    delay: 0.7
});

// Shorts cards animation
gsap.utils.toArray('.short-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: i * 0.1,
        ease: "back.out(1.7)"
    });
});

// Contact section animation
gsap.from('.contact-info', {
    scrollTrigger: {
        trigger: '.contact-section',
        start: "top 80%",
        toggleActions: "play none none none"
    },
    opacity: 0,
    x: -50,
    duration: 1,
    ease: "power2.out"
});

gsap.from('.contact-form', {
    scrollTrigger: {
        trigger: '.contact-section',
        start: "top 80%",
        toggleActions: "play none none none"
    },
    opacity: 0,
    x: 50,
    duration: 1,
    ease: "power2.out",
    delay: 0.2
});

// Footer animation
gsap.from('.footer-content', {
    scrollTrigger: {
        trigger: '.footer',
        start: "top 80%",
        toggleActions: "play none none none"
    },
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power2.out"
});
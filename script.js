document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- FAQ Accordion Logic ---
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // --- Scroll Reveal Animation ---
    const reveals = document.querySelectorAll('.reveal');

    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    }

    // Trigger once on load
    revealOnScroll();

    // Attach to scroll event
    window.addEventListener('scroll', revealOnScroll);

    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust for fixed navbar height
                const offset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Registration Form Handling ---
    const regForm = document.getElementById('registration-form');
    if (regForm) {
        regForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(regForm);
            const user = {
                id: Date.now(),
                name: formData.get('full_name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                business: formData.get('business_type'),
                date: new Date().toLocaleDateString()
            };

            // Save to localStorage
            const enrollees = JSON.parse(localStorage.getItem('enrollees') || '[]');
            enrollees.push(user);
            localStorage.setItem('enrollees', JSON.stringify(enrollees));

            // Feedback and Redirect
            const btn = regForm.querySelector('button');
            const originalContent = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-check"></i> ¡Registrado con éxito!';
            btn.style.background = 'var(--success)';

            setTimeout(() => {
                window.open('gracias.html', '_self');
                regForm.reset();
                btn.innerHTML = originalContent;
                btn.style.background = '';
            }, 1000);
        });
    }

});


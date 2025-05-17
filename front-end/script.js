const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

const typewriterTextElement = document.getElementById('typewriter-text');
const textToType = "Com GabirIA, você Domina o ENEM";
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const delayBeforeDelete = 2000;

function typeWriter() {
    if (!typewriterTextElement) return;

    const currentText = textToType.substring(0, charIndex);
    typewriterTextElement.textContent = currentText;
    typewriterTextElement.classList.add('gradient-text');

    if (!isDeleting && charIndex < textToType.length) {
        charIndex++;
        setTimeout(typeWriter, typingSpeed);
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(typeWriter, deletingSpeed);
    } else if (!isDeleting && charIndex === textToType.length) {
        isDeleting = true;
        setTimeout(typeWriter, delayBeforeDelete);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        setTimeout(typeWriter, typingSpeed);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    if (typewriterTextElement) {
        setTimeout(typeWriter, 500);
    }

    const animatedScrollElements = document.querySelectorAll('.scroll-animated-item');
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    observerInstance.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.1
        });

        animatedScrollElements.forEach(el => {
            observer.observe(el);
        });
    } else {
        animatedScrollElements.forEach(el => {
            el.style.opacity = 1;
        });
    }
});
// Script para o menu mobile
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Fechar menu mobile ao clicar num link (opcional)
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// Smooth scroll para âncoras
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') { // Evita erro se for apenas "#"
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

// Typewriter effect
const typewriterTextElement = document.getElementById('typewriter-text');
const textToType = "Com GabirIA, você Domina o ENEM";
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100; // Milissegundos por caractere
const deletingSpeed = 50; // Milissegundos para apagar
const delayBeforeDelete = 2000; // Tempo antes de começar a apagar

function typeWriter() {
    if (!typewriterTextElement) return; // Garante que o elemento exista

    const currentText = textToType.substring(0, charIndex);
    typewriterTextElement.textContent = currentText;
    typewriterTextElement.classList.add('gradient-text'); // Manter o gradiente

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
        setTimeout(typeWriter, typingSpeed); // Reinicia a digitação
    }
}

document.addEventListener('DOMContentLoaded', function() {
    if (typewriterTextElement) {
        setTimeout(typeWriter, 500); // Pequeno atraso para iniciar
    }

    // Scroll reveal animation
    const animatedScrollElements = document.querySelectorAll('.scroll-animated-item');
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    observerInstance.unobserve(entry.target); // Anima apenas uma vez
                }
            });
        }, { 
            threshold: 0.1 // Aciona quando 10% do item está visível (ajuste conforme necessário)
        });

        animatedScrollElements.forEach(el => {
            observer.observe(el);
        });
    } else {
        // Fallback para navegadores sem IntersectionObserver: apenas torna os elementos visíveis
        animatedScrollElements.forEach(el => {
            el.style.opacity = 1;
        });
    }
});
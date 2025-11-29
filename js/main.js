// Main shared script
console.log('Multi-App Platform Loaded');

// Add any shared initialization here
document.addEventListener('DOMContentLoaded', () => {
    // Example: Add simple animation to cards on load
    const cards = document.querySelectorAll('.app-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

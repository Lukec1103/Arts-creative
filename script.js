// Variables to control lava lamp thickness and speed
const bubbleCount = 20;         // Number of bubbles (increase for thicker effect)
const minBubbleSize = 400;      // Minimum bubble size in pixels
const maxBubbleSize = 800;      // Maximum bubble size in pixels
const bubbleSpeed = 0.03;       // Speed of movement (higher = faster)
const animationInterval = 50;    // Interval in ms (lower = faster)

function easeInOutBack(t) {
    const c1 = 1.70158;
    const c2 = c1 * 1.525;
    return t < 0.5
        ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
        : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;
}

function createBubbles() {
    const background = document.getElementById('background');
    
    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        
        const size = Math.random() * (maxBubbleSize - minBubbleSize) + minBubbleSize;
        const top = Math.random() * 110 - 5;
        const left = Math.random() * 110 - 5;
        
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.top = `${top}%`;
        bubble.style.left = `${left}%`;
        
        bubble.style.zIndex = Math.floor(Math.random() * 3) - 3;
        
        background.appendChild(bubble);
        
        setTimeout(() => {
            bubble.style.opacity = '0.6';
            animateBubble(bubble);
        }, i * 200);
    }
}

function animateBubble(bubble) {
    let direction = 1;
    let position = parseFloat(bubble.style.left);
    
    setInterval(() => {
        position += bubbleSpeed * direction;
        
        if (position > 102) {
            direction = -1;
        } else if (position < -2) {
            direction = 1;
        }
        
        bubble.style.left = `${position}%`;
    }, animationInterval);
}

function fadeInElements() {
    const elements = [
        document.querySelector('h1'),
        document.querySelector('.bio'),
        document.querySelector('.buttons'),
        document.querySelector('.logo')
    ];
    
    const container = document.querySelector('.container');
    container.style.opacity = '1';
    container.style.transform = 'translateY(0)';
    container.style.transition = 'opacity 1s ease, transform 1s ease';
    
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        }, 500 + index * 300);
    });
}

let isContactOpen = false;
document.querySelector('.kontakt-btn').addEventListener('click', (e) => {
    e.preventDefault();
    const dropdown = document.getElementById('contact-dropdown');
    const kontaktBtn = document.querySelector('.kontakt-btn');
    
    if (!isContactOpen) {
        dropdown.style.display = 'block';
        kontaktBtn.classList.add('active');
        isContactOpen = true;
    } else {
        dropdown.style.display = 'none';
        kontaktBtn.classList.remove('active');
        isContactOpen = false;
    }
});

let isMojeDeloOpen = false;
document.querySelector('.moje-delo-btn').addEventListener('click', (e) => {
    e.preventDefault();
    const dropdown = document.getElementById('moje-delo-dropdown');
    const mojeDeloBtn = document.querySelector('.moje-delo-btn');
    
    if (!isMojeDeloOpen) {
        dropdown.style.display = 'block';
        mojeDeloBtn.classList.add('active');
        isMojeDeloOpen = true;
    } else {
        dropdown.style.display = 'none';
        mojeDeloBtn.classList.remove('active');
        isMojeDeloOpen = false;
    }
});

window.onload = function() {
    createBubbles();
    setTimeout(fadeInElements, 300);
};
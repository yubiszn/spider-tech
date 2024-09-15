let banner = document.querySelector('.banner');
let canvas = document.getElementById('dotsCanvas');
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
const ctx = canvas.getContext('2d');
let dots = [];

// Define your colors.
const colors = ['#DD6E42', '#E8DAB2', '#4F6D7A', '#C0D6DF', '#EAEAEA'];

// Function to generate a random color by mixing provided colors
const getRandomMixedColor = () => {
    // Pick two random colors from the array
    const color1 = colors[Math.floor(Math.random() * colors.length)];
    const color2 = colors[Math.floor(Math.random() * colors.length)];

    // Convert hex to RGB
    const hexToRgb = (hex) => {
        let r = parseInt(hex.slice(1, 3), 16);
        let g = parseInt(hex.slice(3, 5), 16);
        let b = parseInt(hex.slice(5, 7), 16);
        return { r, g, b };
    };

    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);

    // Blend the colors
    const blend = (rgb1, rgb2) => {
        let weight = Math.random(); // Random weight for blending
        let r = Math.round(rgb1.r * (1 - weight) + rgb2.r * weight);
        let g = Math.round(rgb1.g * (1 - weight) + rgb2.g * weight);
        let b = Math.round(rgb1.b * (1 - weight) + rgb2.b * weight);
        return `rgb(${r}, ${g}, ${b})`;
    };

    return blend(rgb1, rgb2);
};

// Initialize dots with random mixed colors
for (let index = 0; index < 50; index++) {
    dots.push({
        x: Math.floor(Math.random() * canvas.width),
        y: Math.floor(Math.random() * canvas.height),
        size: Math.random() * 3 + 5,
        color: getRandomMixedColor()
    });
}

const drawDots = () => {
    dots.forEach(dot => {
        ctx.fillStyle = dot.color;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fill();
    });
};

drawDots();

banner.addEventListener('mousemove', (event) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDots();
    let mouse = {
        x: event.pageX - banner.getBoundingClientRect().left,
        y: event.pageY - banner.getBoundingClientRect().top
    };
    dots.forEach(dot => {
        let distance = Math.sqrt((mouse.x - dot.x) ** 2 + (mouse.y - dot.y) ** 2);
        if (distance < 300) {
            ctx.strokeStyle = dot.color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
    });
});

banner.addEventListener('mouseout', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDots();
});

window.addEventListener('resize', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = banner.offsetWidth;
    canvas.height = banner.offsetHeight;

    dots.length = 0; // Clear the array without creating a new one
    for (let index = 0; index < 50; index++) {
        dots.push({
            x: Math.floor(Math.random() * canvas.width),
            y: Math.floor(Math.random() * canvas.height),
            size: Math.random() * 3 + 5,
            color: getRandomMixedColor()
        });
    }
    drawDots();
});


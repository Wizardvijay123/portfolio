
const canvas = document.getElementById('space');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const numStars = 1000;

for (let i = 0; i < numStars; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * canvas.width,
        radius: Math.random() * 1.0,
        color: `rgba(255, 255, 255, ${Math.random()})`,
    });
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach((star) => {
        const x = (star.x - canvas.width / 2) * (canvas.width / star.z);
        const y = (star.y - canvas.height / 2) * (canvas.width / star.z);
        const radius = star.radius * (canvas.width / star.z);

        ctx.beginPath();
        ctx.arc(x + canvas.width / 2, y + canvas.height / 2, radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.fill();

        star.z -= 1;

        if (star.z <= 0) {
            star.z = canvas.width;
        }
    });

    requestAnimationFrame(drawStars);
}

drawStars();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});



document.addEventListener("DOMContentLoaded", () => {
    const themeSwitch = document.getElementById("switch");

    // Check if a theme is stored in localStorage
    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light-mode");
        themeSwitch.checked = true;
    }

    themeSwitch.addEventListener("change", () => {
        if (themeSwitch.checked) {
            document.body.classList.add("light-mode");
            localStorage.setItem("theme", "light"); // Store theme preference
        } else {
            document.body.classList.remove("light-mode");
            localStorage.setItem("theme", "dark");
        }
    });
});

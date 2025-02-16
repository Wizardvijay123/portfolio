const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const numStars = 1000;

for (let i = 0; i < numStars; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * canvas.width,
        radius: Math.random() * 1.5,
        color: `rgba(255, 255, 255, ${Math.random()})`,
    });
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach((star) => {
        const perspective = canvas.width / star.z;
        const x = (star.x - canvas.width / 2) * perspective + canvas.width / 2;
        const y = (star.y - canvas.height / 2) * perspective + canvas.height / 2;
        const radius = star.radius * perspective;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.fill();

        star.z -= 1.5;

        if (star.z <= 0) {
            star.x = Math.random() * canvas.width;
            star.y = Math.random() * canvas.height;
            star.z = canvas.width;
        }
    });

    requestAnimationFrame(drawStars);
}

drawStars();

// Handle window resize
window.addEventListener("resize", () => {
    const prevWidth = canvas.width;
    const prevHeight = canvas.height;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    stars.forEach((star) => {
        star.x = (star.x / prevWidth) * canvas.width;
        star.y = (star.y / prevHeight) * canvas.height;
    });
});



// Theme Button
document.addEventListener("DOMContentLoaded", () => {
    const themeSwitch = document.getElementById("switch");

    // Set dark mode as default if no preference is stored
    if (!localStorage.getItem("theme")) {
        localStorage.setItem("theme", "light");
    }

    // Apply stored theme
    const applyTheme = () => {
        if (localStorage.getItem("theme") === "dark") {
            document.body.classList.add("light-mode");
            themeSwitch.checked = true;
        } else {
            document.body.classList.remove("light-mode");
            themeSwitch.checked = false;
        }
    };

    applyTheme();

    // Toggle theme on switch change
    themeSwitch.addEventListener("change", () => {
        localStorage.setItem("theme", themeSwitch.checked ? "dark" : "light");
        applyTheme();
    });
});

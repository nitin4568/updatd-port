const canvas = document.getElementById("fireflyCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const toggleBtn = document.getElementById("themeToggle");
let hour = new Date().getHours();
let currentTheme = hour >= 6 && hour < 18 ? "day" : "night";
setTheme(currentTheme);

// Toggle manually
toggleBtn.addEventListener("click", () => {
  currentTheme = currentTheme === "day" ? "night" : "day";
  setTheme(currentTheme);
});

function setTheme(theme) {
  document.body.className = theme;
  toggleBtn.textContent = theme === "day" ? "🌙" : "☀️";
}

// -------- Stars + Firefly + Shooting Stars --------
class Star {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.alpha = 0.3 + Math.random() * 0.7;
    this.size = Math.random() * 1.8 + 0.3;
    this.twinkle = Math.random() * 0.05 + 0.01;
  }
  draw() {
    this.alpha += this.twinkle;
    if (this.alpha > 1 || this.alpha < 0.3) this.twinkle = -this.twinkle;
    ctx.beginPath();
    ctx.fillStyle = `rgba(255,255,255,${this.alpha})`;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

class ShootingStar {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height * 0.3;
    this.len = 150;
    this.speed = 12 + Math.random() * 5;
    this.angle = Math.PI / 4;
  }
  draw() {
    ctx.save();
    ctx.strokeStyle = "rgba(255,255,255,0.7)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(
      this.x - this.len * Math.cos(this.angle),
      this.y - this.len * Math.sin(this.angle)
    );
    ctx.stroke();
    ctx.restore();

    this.x += this.speed;
    this.y += this.speed / 2;
    if (this.x > canvas.width || this.y > canvas.height) this.reset();
  }
}

let stars = Array.from({ length: 400 }, () => new Star());
let shootingStars = [new ShootingStar()];
const particle = { x: canvas.width / 2, y: canvas.height / 2, r: 5 };
const mouse = { x: particle.x, y: particle.y };

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach((s) => s.draw());
  shootingStars.forEach((s) => s.draw());

  // Firefly
  particle.x += (mouse.x - particle.x) * 0.1;
  particle.y += (mouse.y - particle.y) * 0.1;
  const glow = ctx.createRadialGradient(
    particle.x,
    particle.y,
    0,
    particle.x,
    particle.y,
    60
  );
  glow.addColorStop(0, "rgba(255,255,200,0.8)");
  glow.addColorStop(1, "rgba(255,255,150,0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(particle.x, particle.y, 60, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.fillStyle = "rgb(255,255,180)";
  ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
  ctx.fill();

  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// ---------------- TAB SWITCHING ----------------
const tablinks = document.getElementsByClassName("tab-links");
const tabcontents = document.getElementsByClassName("tab-contentes");

function opentab(tabname, event) {
    for (let tablink of tablinks) tablink.classList.remove("make-link");
    for (let tabcontent of tabcontents) tabcontent.classList.remove("active-tab");
    event.currentTarget.classList.add("make-link");
    document.getElementById(tabname).classList.add("active-tab");
}

// ---------------- SIDEMENU ----------------
const sidemenu = document.getElementById("sidemenu");
function openmenu() { sidemenu.style.right = "0"; }
function closemenu() { sidemenu.style.right = "-250px"; }



// ---------------- HIRE ME BUTTON ----------------
document.addEventListener('DOMContentLoaded', () => {
    const hireMeButton = document.querySelector('.hire-me-btn');
    if (hireMeButton) {
        hireMeButton.addEventListener('click', () => {
            const phoneNumber = '+918085476868';
            if (confirm(`Do you want to call ${phoneNumber}?`)) {
                window.location.href = `tel:${phoneNumber}`;
            }
        });
    }
});
// ---------------- EMAILJS + CONTACT FORM ----------------
document.addEventListener("DOMContentLoaded", () => {

    // EmailJS init
    emailjs.init("8EvoiB8MzMiYK5WWy");

    const form = document.getElementById("contact-form");
    const msg = document.getElementById("msg");

    if (!form) {
        console.warn("Contact form not found");
        return;
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        emailjs.sendForm(
            "service_d1lpa6d",
            "template_wlx3nbj",
            this
        )
        .then(() => {
            msg.innerHTML = "Message sent successfully ✅";
            form.reset();
            setTimeout(() => (msg.innerHTML = ""), 5000);
        })
        .catch((error) => {
            console.error("EmailJS Error:", error);
            msg.innerHTML = "Something went wrong ❌";
        });
    });

});


// ---------------- GALAXY / STAR BACKGROUND ----------------
const canvas = document.getElementById("fireflyCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// const toggleBtn = document.getElementById("themeToggle");
// let hour = new Date().getHours();
// let currentTheme = hour >= 6 && hour < 18 ? "day" : "night";
// setTheme(currentTheme);

// toggleBtn.addEventListener("click", () => {
//     currentTheme = currentTheme === "day" ? "night" : "day";
//     setTheme(currentTheme);
// });

// function setTheme(theme) {
//     document.body.className = theme;
//     if (toggleBtn) toggleBtn.textContent = theme === "day" ? "🌙" : "☀️";
// }
const moon = document.querySelector(".moon");

function setDailyMoonSize() {
    const today = new Date();
    const day = today.getDate(); // 1–31

    // Moon size range (px)
    const minSize = 60;
    const maxSize = 120;

    // Daily size calculation
    const size = minSize + (day % 15) * ((maxSize - minSize) / 15);

    moon.style.width = `${size}px`;
    moon.style.height = `${size}px`;
}

setDailyMoonSize();


// ---------------- STAR + SHOOTING STAR ANIMATION ----------------
document.body.classList.add("dark");

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
    constructor() { this.reset(); }
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
        ctx.lineTo(this.x - this.len * Math.cos(this.angle),
                   this.y - this.len * Math.sin(this.angle));
        ctx.stroke();
        ctx.restore();
        this.x += this.speed;
        this.y += this.speed / 2;
        if (this.x > canvas.width || this.y > canvas.height) this.reset();
    }
}

const stars = Array.from({ length: 400 }, () => new Star());
const shootingStars = [new ShootingStar()];
const particle = { x: canvas.width / 2, y: canvas.height / 2, r: 5 };
const mouse = { x: particle.x, y: particle.y };

// ---- Mouse tracking (desktop)
window.addEventListener("mousemove", e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

// ---- Touch tracking (mobile)
window.addEventListener("touchmove", e => {
    const touch = e.touches[0];
    if (touch) {
        mouse.x = touch.clientX;
        mouse.y = touch.clientY;
    }
});

// ---- Touch start (for single tap)
window.addEventListener("touchstart", e => {
    const touch = e.touches[0];
    if (touch) {
        mouse.x = touch.clientX;
        mouse.y = touch.clientY;
    }
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => s.draw());
    shootingStars.forEach(s => s.draw());

    particle.x += (mouse.x - particle.x) * 0.1;
    particle.y += (mouse.y - particle.y) * 0.1;

    const glow = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, 60);
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

// ---------------- CERTIFICATE SECTION ----------------
let cards = document.querySelectorAll(".card");
let stackArea = document.querySelector(".stack-area");
let title = document.getElementById("title");
let subtitleElement = document.getElementById("sub-title");

let cardTitles = [
    "Kotlin Offer Letter",
    "Kotlin Certificate",
    "Flutter Offer Letter",
    "Flutter Internship",
    "Flutter Certificate",
    "Operating System"
];

let cardSubtitles = [
    "Received an offer letter for Kotlin development, working on real-world Android projects.",
    "Successfully completed Kotlin training and gained hands-on experience in app development.",
    "Received an offer letter for Flutter development, contributing to cross-platform mobile apps.",
    "Completed Flutter internship with practical experience in UI design and app logic.",
    "Successfully completed Flutter certification with strong knowledge of Dart and Flutter framework.",
    "Developed skills in Linux and Operating System concepts, process management, and memory handling."
];


let currentCardIndex = -1;
let isLightboxOpen = false;

// -------- LIGHTBOX --------
function createLightbox() {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    const content = document.createElement('div');
    content.className = 'lightbox-content';
    const img = document.createElement('img');
    img.className = 'lightbox-image';
    const closeBtn = document.createElement('button');
    closeBtn.className = 'lightbox-close';
    closeBtn.innerHTML = '&times;';
    const caption = document.createElement('div');
    caption.className = 'lightbox-caption';
    content.append(img, closeBtn, caption);
    lightbox.append(content);
    document.body.append(lightbox);

    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && isLightboxOpen) closeLightbox(); });

    return { lightbox, img, caption };
}

const { lightbox, img: lightboxImage, caption } = createLightbox();

function openLightbox(src, alt) {
    if (isLightboxOpen) return;
    lightboxImage.src = src;
    caption.textContent = alt;
    lightbox.classList.add('active');
    isLightboxOpen = true;
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    isLightboxOpen = false;
    document.body.style.overflow = '';
}

// -------- CARD ROTATION --------
function rotateCards() {
    let angle = 0;
    const isMobile = window.innerWidth <= 768;
    cards.forEach((card, index) => {
        if (card.classList.contains("away")) {
            card.style.transform = isMobile ? 
                `translateY(-100vh) rotate(-30deg)` :
                `translateY(-120vh) rotate(-48deg)`;
        } else {
            const rotation = isMobile ? angle * 0.7 : angle;
            card.style.transform = `rotate(${rotation}deg)`;
            angle -= isMobile ? 8 : 10;
            card.style.zIndex = cards.length - index;
        }
    });
}

function initCards() {
    rotateCards();
    if (currentCardIndex === -1 && cards.length > 0) {
        currentCardIndex = 0;
        title.innerText = cardTitles[0];
        subtitleElement.innerText = cardSubtitles[0];
    }
    cards.forEach(card => {
        card.addEventListener('click', e => {
            if (!card.classList.contains("away")) {
                const img = card.querySelector('img');
                openLightbox(img.src, img.alt);
                e.stopPropagation();
            }
        });
    });
}
initCards();

window.addEventListener("resize", rotateCards);

window.addEventListener("scroll", () => {
    if (isLightboxOpen) return;
    const isMobile = window.innerWidth <= 768;
    let distance = window.innerHeight * (isMobile ? 0.4 : 0.5);
    let topVal = stackArea.getBoundingClientRect().top;
    let index = -1 * Math.floor(topVal / distance + 1);
    index = Math.max(0, Math.min(index, cards.length - 1));

    if (index !== currentCardIndex) {
        currentCardIndex = index;
        title.style.opacity = 0;
        subtitleElement.style.opacity = 0;
        setTimeout(() => {
            title.innerText = cardTitles[currentCardIndex];
            subtitleElement.innerText = cardSubtitles[currentCardIndex];
            title.style.opacity = 1;
            subtitleElement.style.opacity = 1;
        }, 200);

        cards.forEach((card, i) => {
            if (i < currentCardIndex) card.classList.add("away");
            else card.classList.remove("away");
        });
        rotateCards();
    }
});

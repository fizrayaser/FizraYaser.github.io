const dynamicTextWrapper = document.querySelector('.dynamic-text-wrapper');
const dynamicText = document.getElementById('dynamic-text');

const words = ["Web/App developer", "Wordpress developer", "UX/UI Designer", "Flutter developer"];
let wordIndex = 0;
let charIndex = 0;
let typing = true;

function type() {
    const currentWord = words[wordIndex];

    if (typing) {
        dynamicText.textContent = currentWord.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentWord.length) {
            typing = false;
            setTimeout(type, 500);
        } else {
            setTimeout(type, 60); // faster typing
        }
    } else {
        dynamicText.textContent = currentWord.slice(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            typing = true;
            wordIndex = (wordIndex + 1) % words.length;

            // Trigger neon animation
            dynamicTextWrapper.classList.remove('neon');
            void dynamicTextWrapper.offsetWidth; // force reflow
            dynamicTextWrapper.classList.add('neon');
        }
        setTimeout(type, 40); // faster deleting
    }
}

type();


const skills = document.querySelectorAll('.skill-progress');

skills.forEach(skill => {
  const width = skill.style.width;
  skill.style.width = '0';
  setTimeout(() => {
    skill.style.width = width;
  }, 300);
});


const canvas = document.getElementById('snow');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const numFlakes = 80; // adjust density
const flakes = [];

function random(min, max) {
    return Math.random() * (max - min) + min;
}

// Create snowflakes
for (let i = 0; i < numFlakes; i++) {
    flakes.push({
        x: random(0, width),
        y: random(0, height),
        r: random(1, 4), // radius
        d: random(0.2, 1) // slower speed factor
    });
}

// Animate snow
function drawSnow() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "rgba(255, 255, 255, 0.3)"; // decreased opacity
    ctx.beginPath();
    for (let i = 0; i < numFlakes; i++) {
        const f = flakes[i];
        ctx.moveTo(f.x, f.y);
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
    }
    ctx.fill();
    moveSnow();
}

let angle = 0;

function moveSnow() {
    angle += 0.005; // slower sway
    for (let i = 0; i < numFlakes; i++) {
        const f = flakes[i];
        f.y += Math.pow(f.d, 2) + 0.2; // slower fall
        f.x += Math.sin(angle) * 1;

        if (f.y > height) {
            f.y = -f.r;
            f.x = random(0, width);
        }
    }
}

function animate() {
    drawSnow();
    requestAnimationFrame(animate);
}

animate();

// Resize canvas on window change
window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

// Project Filtering
const tabs = document.querySelectorAll(".tab");
const projects = document.querySelectorAll(".project-card");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    // remove active from all
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    const filter = tab.getAttribute("data-filter");

    projects.forEach(project => {
      if (filter === "all" || project.getAttribute("data-category") === filter) {
        project.style.display = "block";
        project.style.opacity = "1";
      } else {
        project.style.display = "none";
        project.style.opacity = "0";
      }
    });
  });
});
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  const videoModal = document.getElementById("video-modal");
const videoFrame = document.getElementById("video-frame");
const imageModal = document.getElementById("image-modal");
const popupImage = document.getElementById("popup-image");
const closeButtons = document.querySelectorAll(".close-modal");

document.querySelectorAll(".project-thumb").forEach((thumb) => {
  thumb.addEventListener("click", () => {
    const videoURL = thumb.getAttribute("data-video");
    const imageURL = thumb.getAttribute("data-image");

    // Close both modals before opening a new one
    videoModal.classList.remove("active");
    imageModal.classList.remove("active");
    videoFrame.src = "";
    popupImage.src = "";

    if (videoURL) {
      // 🎬 Video project
      videoFrame.src = `${videoURL}?autoplay=1`;
      videoModal.classList.add("active");
    } else if (imageURL) {
      // 🖼️ Image project
      popupImage.src = imageURL;
      imageModal.classList.add("active");
    }
  });
});

// Close modals when clicking the close (×) button
closeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    videoModal.classList.remove("active");
    imageModal.classList.remove("active");
    videoFrame.src = "";
    popupImage.src = "";
  });
});

// Close modals when clicking outside the content area
[videoModal, imageModal].forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
      videoFrame.src = "";
      popupImage.src = "";
    }
  });
});

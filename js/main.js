//scroll to sections using top nav bar, and update the section in top nav bar 
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links");

//background and text gradient

const bgStart = [242, 245, 248];
const bgEnd   = [226, 232, 200];

const primarytextStart = [28, 38, 48];
const primarytextEnd   = [52, 66, 79];

const secondarytextStart = [90, 104, 117];
const secondarytextEnd   = [130, 144, 156];


function lerp(a, b, t){
    return a + (b-a) * t;
}

function lerpColor(c1, c2, t){
    return `rgb(
        ${Math.round(lerp(c1[0], c2[0], t))},
        ${Math.round(lerp(c1[1], c2[1], t))},
        ${Math.round(lerp(c1[2], c2[2], t))}
    )`;
}



//canvas for bacground animation with scroll
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 1920;
canvas.height=1080;
const frames = [];
const totalFrames = 251;

for (let i = 0; i < totalFrames; i++) {
  const img = new Image();

  const frameNumber = String(i).padStart(4,"0")
  img.src = `animation for website/${frameNumber}.png`;
  frames.push(img);
}

window.addEventListener("scroll", updateOnScroll);
window.addEventListener("load",updateOnScroll);


function updateOnScroll(){
    const scrollTop = window.scrollY;
    const maxScroll =
        document.body.scrollHeight - window.innerHeight;

    const t = Math.min(Math.max(scrollTop / maxScroll, 0), 1);

    /* ---------- NAV ACTIVE STATE ---------- */
    let current = "";
    sections.forEach(section => {
        if (scrollTop >= section.offsetTop - 120) {
        current = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${current}`
        );
    });

    /* ---------- BACKGROUND GRADIENT ---------- */
    document.body.style.background = `
        linear-gradient(
        180deg,
        ${lerpColor(bgStart, bgEnd, t)},
        ${lerpColor(bgEnd, bgStart, t)}
        )
    `;

    /* ---------- TEXT COLOR ---------- */
    document.documentElement.style.setProperty(
        "--primary-text-color",
        lerpColor(primarytextStart, primarytextEnd, t)
    );
    document.documentElement.style.setProperty(
        "--secondary-text-color",
        lerpColor(secondarytextStart, secondarytextEnd, t)
    );

    /* ---------- CANVAS FRAME ---------- */
    const frameIndex = Math.floor(t * (totalFrames - 1));
    if (frames[frameIndex]?.complete) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(frames[frameIndex], 0, 0, canvas.width, canvas.height);
    }
}
//scroll to sections using top nav bar, and update the section in top nav bar 
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

//background and text gradient

const bgStart = [255, 251, 0]; 
const bgEnd   = [0, 200, 255];

const textStart = [30, 30, 60];
const textEnd   = [230, 230, 245];

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

window.addEventListener("scroll", () => {
  const t = window.scrollY /(document.body.scrollHeight - innerHeight);

  document.body.style.background =
    `linear-gradient(
      180deg,
      ${lerpColor(bgStart, bgEnd, t)},
      ${lerpColor(bgEnd, bgStart, t)}
    )`;
//change this to edit the variable --primary and secondary text in css
  document.querySelector(".text").style.color =
    lerpColor(textStart, textEnd, t);
});


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

window.addEventListener("scroll", () => {
  const t = window.scrollY /
    (document.body.scrollHeight - innerHeight);
  if(t>1)
    t=1;
  const index = Math.floor(t * (totalFrames - 1));
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  ctx.drawImage(frames[index], 0, 0);
});

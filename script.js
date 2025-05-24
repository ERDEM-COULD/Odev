const slides = document.querySelectorAll(".slide");
let currentSlide = 0;
let poemStarted = false;
let currentLineIndex = -1;
const audio = document.getElementById("audio");
const clapAudio = document.getElementById("clap-audio");
const thankYou = document.getElementById("thankyou");
const poemContainer = document.getElementById("poem-container");

const poemLines = [
  { eng: "Should current age of the eye to cry?", tr: "Ağlamak için yaş mı gerekir?" },
  { eng: "Lips laughing, people do not cry?", tr: "Gülen dudaklar, insan ağlamaz mı?" },
  { eng: "Should be looking at the beautiful to love?", tr: "Sevmek için güzel mi bakmalı?" },
  { eng: "Ugly skin a beautiful soul, does not bind the heart?", tr: "Çirkin bir ten, güzel bir ruh; gönül bağlamaz mı?" },
  { eng: "Longing; Is is to stay away from missed?", tr: "Özlemek; uzakta kalmak mıdır sevdiğinden?" },
  { eng: "Have Longed near, hicran inaudible?", tr: "Yanında olup da özlemek olmaz mı?" },
  { eng: "Theft; money, is to steal goods?", tr: "Hırsızlık; para mı çalmaktır?" },
  { eng: "Felicity steal, theft does not?", tr: "Mutluluk çalmak hırsızlık sayılmaz mı?" },
  { eng: "Did the roses wilting branches to be broken?", tr: "Güller dalından kopunca mı solar?" },
  { eng: "It does not fade while a pink rosebud on rose branches?", tr: "Dalında bir gonca solmaz mı?" },
  { eng: "Weapons to kill, should it be the dagger?", tr: "Öldürmek için silah mı gerek?" },
  { eng: "Hair ties, weapons eyes, smile, do not lead?", tr: "Saç, göz, bir gülüş; öldürmez mi?" },
  { eng: "Producer: Victor Hugo", tr: "Yazar: Victor Hugo" }
];

// Şiir satırlarını oluştur
poemLines.forEach((line, i) => {
  const div = document.createElement("div");
  div.classList.add("line");
  div.setAttribute("data-index", i);

  const eng = document.createElement("div");
  eng.classList.add("eng");
  eng.textContent = line.eng;

  const tr = document.createElement("div");
  tr.classList.add("tr");
  tr.textContent = line.tr;

  div.appendChild(eng);
  div.appendChild(tr);
  poemContainer.appendChild(div);
});

document.addEventListener("click", () => {
  if (currentSlide < slides.length - 1) {
    slides[currentSlide].classList.remove("active");
    currentSlide++;
    slides[currentSlide].classList.add("active");

    if (currentSlide === 3) {
      if (!audio.paused) {
        audio.pause();
        audio.currentTime = 0;
      }
      poemStarted = true;
      currentLineIndex = -1;
      showNextLine();
    }
    return;
  }

  if (poemStarted) {
    if (currentLineIndex < poemLines.length - 1) {
      showNextLine();
    } else {
      if (!audio.paused) {
        audio.pause();
        audio.currentTime = 0;
      }
      clapAudio.play();
      poemContainer.style.display = "none";
      thankYou.style.display = "block";
      poemStarted = false;
    }
  }
});

function showNextLine() {
  const lines = document.querySelectorAll(".line");

  if (currentLineIndex >= 0) {
    lines[currentLineIndex].classList.remove("visible");
    lines[currentLineIndex].style.backgroundColor = "black";
  }

  currentLineIndex++;

  if (currentLineIndex < lines.length) {
    lines[currentLineIndex].classList.add("visible");
    lines[currentLineIndex].style.backgroundColor = "#111";

    if (currentLineIndex > 0) {
      lines[currentLineIndex - 1].style.backgroundColor = "#111";
    }
    if (currentLineIndex > 1) {
      lines[currentLineIndex - 2].style.backgroundColor = "black";
    }

    lines[currentLineIndex].scrollIntoView({ behavior: "smooth", block: "center" });

    if (currentLineIndex === 0 && poemStarted) {
      audio.play().catch(e => console.log("Şarkı çalma hatası:", e));
    }
  }
}


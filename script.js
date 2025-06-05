const images = [
  "lapiz.png","libro.png","limon.png","luna.png","manzana.png","media.png",
  "mesa.png","mono.png","niña.png","niño.png","oveja.png","pan.png","papá.png",
  "pelota.png","pera.png","pez.png","puerco.png","rana.png","raton.png","reloj.png",
  "silla.png","sol.png","sombrero.png","taza.png","telefono.png","tomate.png",
  "tren.png","trompeta.png","uvas.png","vaca.png","zapato.png","camión.png",
  "carro.png","casa.png","cebolla.png","cerdo.png","cielo.png","flor.png",
  "gallo.png","gato.png","jirafa.png","leche.png","leon.png","lapiz.png","niño.png"
];

let currentImage = "";
let correctAnswer = "";

function speak(text) {
  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = "es-ES";
  speechSynthesis.speak(msg);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function getRandomItem(array, exclude) {
  let item;
  do {
    item = array[Math.floor(Math.random() * array.length)];
  } while (item === exclude);
  return item;
}

function showNewQuestion() {
  const image = images[Math.floor(Math.random() * images.length)];
  const correct = image.split(".")[0].replace(/-\\d+$/, "");
  const wrong = getRandomItem(images, image).split(".")[0].replace(/-\\d+$/, "");

  currentImage = image;
  correctAnswer = correct;

  document.getElementById("question-image").src = "images/" + image;
  speak(correct);

  const options = [correct, wrong];
  shuffle(options);
  document.getElementById("option1").textContent = options[0];
  document.getElementById("option2").textContent = options[1];
}

function handleOptionClick(e) {
  const selected = e.target.textContent;
  speak(selected);
  const effect = document.getElementById("effect");
  if (selected === correctAnswer) {
    effect.textContent = "¡Muy bien!";
    effect.classList.add("correct");
    setTimeout(() => {
      effect.classList.remove("correct");
      effect.textContent = "";
      showNewQuestion();
    }, 1500);
  } else {
    effect.textContent = "Intenta otra vez";
    setTimeout(() => {
      effect.textContent = "";
    }, 1000);
  }
}

document.getElementById("option1").addEventListener("click", handleOptionClick);
document.getElementById("option2").addEventListener("click", handleOptionClick);

showNewQuestion();

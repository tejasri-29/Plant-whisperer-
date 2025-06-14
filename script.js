function speak(text) {

  const msg = new SpeechSynthesisUtterance(text);

  window.speechSynthesis.speak(msg);

}

function getGreeting() {

  const hour = new Date().getHours();

  if (hour < 12) return "Good Morning!";

  if (hour < 18) return "Good Afternoon!";

  return "Good Evening!";

}

function showGreeting() {

  document.getElementById("greeting").innerText = getGreeting();

}

function saveName() {

  const name = document.getElementById("plant-name").value.trim();

  if (name) {

    localStorage.setItem("plantName", name);

    alert("Saved! Your plant is now called " + name);

  }

}

function getPlantName() {

  return localStorage.getItem("plantName") || "Your plant";

}

function checkPlant() {

  const plantName = getPlantName();

  const waterLevel = Math.random();

  const sunlight = Math.random();

  const temperature = Math.floor(Math.random() * 45); // 0–44°C

  let message = `${plantName} is feeling okay 🌿`;

  if (waterLevel < 0.3) {

    message = `${plantName} says: 💧 Please water me!`;

  } else if (sunlight < 0.3) {

    message = `${plantName} says: ☀️ I need more sunlight!`;

  } else if (temperature > 38) {

    message = `${plantName} says: 🔥 It’s too hot here!`;

  } else if (temperature < 10) {

    message = `${plantName} says: 🥶 I'm freezing!`;

  }

  document.getElementById("plant-status").innerHTML = `<p>${message}</p>`;

  speak(message);

  saveHistory(message);

}

function toggleDarkMode() {

  document.body.classList.toggle("dark");

}

function saveHistory(msg) {

  let history = JSON.parse(localStorage.getItem("plantHistory")) || [];

  history.push(msg);

  localStorage.setItem("plantHistory", JSON.stringify(history));

  showHistory();

}

function showHistory() {

  const historyEl = document.getElementById("history");

  historyEl.innerHTML = "";

  let history = JSON.parse(localStorage.getItem("plantHistory")) || [];

  history.slice(-5).forEach(item => {

    const li = document.createElement("li");

    li.textContent = item;

    historyEl.appendChild(li);

  });

}

function shareMood() {

  const text = document.getElementById("plant-status").innerText;

  const url = `https://wa.me/?text=${encodeURIComponent("🌿 Plant Whisperer says: " + text)}`;

  window.open(url, '_blank');

}

showGreeting();

showHistory();
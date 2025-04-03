document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navList = document.querySelector("nav ul");

  menuToggle.addEventListener("click", () => {
    navList.classList.toggle("show");
  });
  
  // Set footer information
  document.getElementById("lastModified").textContent = document.lastModified;
  document.getElementById("currentYear").textContent = new Date().getFullYear();

  // LocalStorage: Manage visit message
  const visitMessage = document.getElementById("visitMessage");
  const lastVisit = localStorage.getItem("lastVisit");
  const now = Date.now();
  let message = "";
  if (!lastVisit) {
    message = "Welcome! Let us know if you have any questions.";
  } else {
    const diff = now - parseInt(lastVisit);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days < 1) {
      message = "Back so soon! Awesome!";
    } else if (days === 1) {
      message = "You last visited 1 day ago.";
    } else {
      message = `You last visited ${days} days ago.`;
    }
  }
  visitMessage.textContent = message;
  localStorage.setItem("lastVisit", now);

  // Fetch and display discover cards from JSON data
  fetch('data/items.json')
    .then(response => response.json())
    .then(data => {
      const cardsContainer = document.querySelector(".discover-cards");
      data.items.forEach(item => {
        const card = document.createElement("div");
        card.className = "discover-card";
        card.innerHTML = `
          <h2>${item.title}</h2>
          <figure>
            <img src="images/${item.image}" alt="${item.title}" loading="lazy">
          </figure>
          <address>${item.address}</address>
          <p>${item.description}</p>
          <button class="learn-more">Learn More</button>
        `;
        cardsContainer.appendChild(card);
      });
    })
    .catch(error => console.error("Error loading JSON data:", error));
});
// scripts/main.js
document.addEventListener('DOMContentLoaded', () => {
  // Set current year in footer.
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
  
  // Toggle hamburger menu.
  const menuToggle = document.querySelector('.menu-toggle');
  const navList = document.querySelector('nav ul');
  if (menuToggle && navList) {
    menuToggle.addEventListener('click', () => {
      navList.classList.toggle('show');
      if (menuToggle.textContent.trim() === '☰') {
        menuToggle.textContent = '✕';
      } else {
        menuToggle.textContent = '☰';
      }
    });
  }
  
  // Display last visit date.
  const lastVisit = localStorage.getItem('lastVisit');
  const now = Date.now();
  let lastVisitMessage = "This is your first visit!";
  if (lastVisit) {
    const daysAgo = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
    lastVisitMessage = `Your last visit was ${daysAgo} day${daysAgo !== 1 ? 's' : ''} ago.`;
  }
  localStorage.setItem('lastVisit', now);
  const lastVisitInfo = document.getElementById('lastVisitInfo');
  if (lastVisitInfo) {
    lastVisitInfo.textContent = lastVisitMessage;
  }
  
  // Random Featured Attraction on Home Page.
  const featuredContainer = document.getElementById('featuredAttraction');
  if (featuredContainer) {
    fetch('data/attractions.json')
      .then(res => res.json())
      .then(data => {
        const items = data.items;
        if (items && items.length) {
          const randomItem = items[Math.floor(Math.random() * items.length)];
          featuredContainer.innerHTML = `
            <h3>${randomItem.title}</h3>
            <figure>
              <img src="images/${randomItem.image}" alt="${randomItem.title}" loading="lazy">
            </figure>
            <em>${randomItem.address}</em>
            <p>${randomItem.description}</p>
          `;
        }
      })
      .catch(error => {
        console.error('Error fetching featured attraction:', error);
        featuredContainer.innerHTML = '<p>Featured attraction unavailable.</p>';
      });
  }
});
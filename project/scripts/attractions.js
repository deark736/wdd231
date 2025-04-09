// scripts/attractions.js
import { getAttractions } from './data.js';

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('attractionsContainer');
  try {
    const attractions = await getAttractions();
    attractions.forEach(attraction => {
      const card = document.createElement('div');
      card.classList.add('attraction-card');
      card.innerHTML = `
        <h3>${attraction.title}</h3>
        <figure>
          <img src="images/${attraction.image}" alt="${attraction.title}" loading="lazy">
        </figure>
        <address>${attraction.address}</address>
        <p>${attraction.description}</p>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    container.innerHTML = '<p>Sorry, there was an error loading attractions.</p>';
  }
});
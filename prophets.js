// URL for the JSON data
const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';

// Select the div element where the cards will be appended
const cards = document.querySelector('#cards');

// Async function to fetch and process the data
async function getProphetData() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // For debugging, you can uncomment the next line to see the data in a table format
    // console.table(data.prophets);
    // Pass the prophets array to the display function
    displayProphets(data.prophets);
  } catch (error) {
    console.error("Error fetching the data:", error);
  }
}

// Helper function to convert a number to an ordinal (e.g., 1 -> 1st)
const ordinalSuffix = (i) => {
  let j = i % 10,
      k = i % 100;
  if (j === 1 && k !== 11) {
      return i + "st";
  }
  if (j === 2 && k !== 12) {
      return i + "nd";
  }
  if (j === 3 && k !== 13) {
      return i + "rd";
  }
  return i + "th";
};

// Function expression to display prophets using an arrow function
const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
      // Create a card section for each prophet
      let card = document.createElement('section');
  
      // Create an h2 element for the full name
      let fullName = document.createElement('h2');
      fullName.textContent = `${prophet.name} ${prophet.lastname}`;
  
      // Create an img element for the portrait
      let portrait = document.createElement('img');
      const orderOrdinal = ordinalSuffix(prophet.order); // e.g. 1st, 2nd, 3rd...
      portrait.setAttribute('src', prophet.imageurl);
      portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname} – ${orderOrdinal} Latter-day President`);
      portrait.setAttribute('loading', 'lazy');
      portrait.setAttribute('width', '340');
      portrait.setAttribute('height', '440');
  
      // Create paragraph elements for the Date of Birth and Place of Birth
      let birthDate = document.createElement('p');
      birthDate.textContent = `Date of Birth: ${prophet.birthdate}`;
  
      let birthPlace = document.createElement('p');
      birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`;
  
      // Append the heading, portrait, and new paragraphs to the card
      card.appendChild(fullName);
      card.appendChild(portrait);
      card.appendChild(birthDate);
      card.appendChild(birthPlace);
  
      // Finally, append the card to the #cards container
      cards.appendChild(card);
    });
  };  

// Call the function to fetch and display the data
getProphetData();

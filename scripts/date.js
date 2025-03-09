/* date.js */

// Dynamically show current year
const yearSpan = document.getElementById("currentYear");
yearSpan.textContent = new Date().getFullYear();

// Dynamically show last modified date
const lastModSpan = document.getElementById("lastModified");
lastModSpan.textContent = `Last Update: ${document.lastModified}`;

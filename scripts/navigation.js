/* navigation.js */
const hamButton = document.getElementById('hamburgerBtn');
const mainNav = document.getElementById('mainNav');

hamButton.addEventListener('click', () => {
  // Toggle the "closed" class to show/hide the menu
  mainNav.classList.toggle('closed');
});

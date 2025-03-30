document.addEventListener("DOMContentLoaded", () => {
  // Set the hidden timestamp field to the current date/time in ISO format
  document.getElementById('timestamp').value = new Date().toISOString();

  // Set footer information for last modified and current year
  document.getElementById("lastModified").textContent = document.lastModified;
  document.getElementById("currentYear").textContent = new Date().getFullYear();

  // Hamburger Menu Toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const navList = document.querySelector("nav ul");
  if (menuToggle && navList) {
    menuToggle.addEventListener("click", () => {
      navList.classList.toggle("show");
    });
  }

  // Modal functionality
  const modalLinks = document.querySelectorAll('.modal-link');
  modalLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const membership = e.target.getAttribute('data-membership');
      const modalId = 'modal' + membership;
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.showModal();
      }
    });
  });

  // Close modals when clicking the close button or outside the dialog
  const closeButtons = document.querySelectorAll('.close-modal');
  closeButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      const modal = e.target.closest('dialog');
      modal.close();
    });
  });

  // Optional: Close modal if the user clicks outside the dialog content
  const modals = document.querySelectorAll('dialog');
  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      const rect = modal.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        modal.close();
      }
    });
  });
});
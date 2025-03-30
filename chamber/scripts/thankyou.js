document.addEventListener("DOMContentLoaded", () => {
  // Hamburger Menu Toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const navList = document.querySelector("nav ul");
  if (menuToggle && navList) {
    menuToggle.addEventListener("click", () => {
      navList.classList.toggle("show");
    });
  }

  // Set footer information for last modified and current year
  document.getElementById("lastModified").textContent = document.lastModified;
  document.getElementById("currentYear").textContent = new Date().getFullYear();

  // Get URL search parameters
  const params = new URLSearchParams(window.location.search);

  // Container to display the submitted data
  const container = document.getElementById("submissionData");

  // List of fields to display (must match the names used in join.html)
  const fields = [
    { label: "First Name", name: "firstName" },
    { label: "Last Name", name: "lastName" },
    { label: "Organizational Title", name: "orgTitle" },
    { label: "Email", name: "email" },
    { label: "Mobile Phone", name: "phone" },
    { label: "Business/Organization Name", name: "orgName" },
    { label: "Membership Level", name: "membershipLevel" },
    { label: "Business/Organization Description", name: "orgDescription" },
    { label: "Timestamp", name: "timestamp" }
  ];

  // Generate HTML for each field if it exists in the query parameters
  fields.forEach(field => {
    const value = params.get(field.name);
    if (value) {
      const p = document.createElement("p");
      p.innerHTML = `<strong>${field.label}:</strong> ${value}`;
      container.appendChild(p);
    }
  });
});
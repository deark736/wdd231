// Run when the DOM content has loaded
document.addEventListener("DOMContentLoaded", () => {
    // Display last modification date and current year in the footer
    const lastModifiedSpan = document.getElementById("lastModified");
    const currentYearSpan = document.getElementById("currentYear");
    lastModifiedSpan.textContent = document.lastModified;
    currentYearSpan.textContent = new Date().getFullYear();
  
    // Fetch and display member data from JSON
    fetchMembers();
  
    // Setup view toggle buttons
    const gridButton = document.getElementById("grid");
    const listButton = document.getElementById("list");
    const memberContainer = document.getElementById("memberContainer");
  
    gridButton.addEventListener("click", () => {
      memberContainer.classList.remove("list");
      memberContainer.classList.add("grid");
    });
  
    listButton.addEventListener("click", () => {
      memberContainer.classList.remove("grid");
      memberContainer.classList.add("list");
    });
  
    // ========== HAMBURGER MENU TOGGLE ==========
    const menuToggle = document.querySelector(".menu-toggle");
    const navList = document.querySelector("nav ul");
  
    // When hamburger button is clicked, toggle .show on nav ul
    menuToggle.addEventListener("click", () => {
      navList.classList.toggle("show");
    });
  });
  
  // Function to fetch members.json and display data
  async function fetchMembers() {
    try {
      const response = await fetch('data/members.json');
      const members = await response.json();
      displayMembers(members);
    } catch (error) {
      console.error("Error fetching member data:", error);
    }
  }
  
  // Function to generate and insert member cards into the DOM
  function displayMembers(members) {
    const container = document.getElementById("memberContainer");
    members.forEach(member => {
      const card = document.createElement("div");
      card.classList.add("member-card");
  
      card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name}">
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
        <p>Membership Level: ${member.membershipLevel}</p>
      `;
  
      container.appendChild(card);
    });
  }
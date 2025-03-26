document.addEventListener("DOMContentLoaded", () => {
    // 1. Update footer info
    const lastModifiedSpan = document.getElementById("lastModified");
    const currentYearSpan = document.getElementById("currentYear");
    lastModifiedSpan.textContent = document.lastModified;
    currentYearSpan.textContent = new Date().getFullYear();
  
    // 2. Mobile nav toggle
    const menuToggle = document.querySelector(".menu-toggle");
    const navList = document.querySelector("nav ul");
    menuToggle.addEventListener("click", () => {
      navList.classList.toggle("show");
    });
  
    // 3. Fetch Weather + Forecast
    fetchWeather();
    fetchForecast();
  
    // 4. Fetch & Display Spotlights
    fetchSpotlights();
  });
  
  /* ========== 3A. CURRENT WEATHER  ========== */
  async function fetchWeather() {
    const apiKey = "f95a8f56a36f30898ca0942d11181c87";
    // Example: Hong Kong lat/long. Adjust if needed.
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=22.31&lon=114.17&units=metric&appid=${apiKey}`;
  
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        displayWeather(data);
      } else {
        throw Error(await response.text());
      }
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  }
  
  function displayWeather(data) {
    // Round the temperature, e.g., 22.1 -> 22
    const temp = Math.round(data.main.temp);
    // Convert each word in description to capitalized
    const description = data.weather[0].description
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  
    document.getElementById("current-temp").textContent = `${temp}°C`;
    document.getElementById("weather-desc").textContent = description;
    document.getElementById("weather-humidity").textContent = `${data.main.humidity}%`;
    document.getElementById("weather-wind").textContent = `${data.wind.speed} m/s`;
  }
  
  /* ========== 3B. 3-DAY FORECAST  ========== */
  async function fetchForecast() {
    const apiKey = "f95a8f56a36f30898ca0942d11181c87";
    // 5-day / 3-hour forecast
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=22.31&lon=114.17&units=metric&appid=${apiKey}`;
  
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        displayForecast(data);
      } else {
        throw Error(await response.text());
      }
    } catch (error) {
      console.error("Error fetching forecast:", error);
    }
  }
  
  function displayForecast(data) {
    const forecastList = data.list;
    
    // Pick forecast data roughly 24h, 48h, and 72h from now.
    const day1 = forecastList[8];
    const day2 = forecastList[16];
    const day3 = forecastList[24];
  
    if (day1 && day2 && day3) {
      document.getElementById("forecastDay1").innerHTML = formatForecast(day1, "Tomorrow");
      document.getElementById("forecastDay2").innerHTML = formatForecast(day2, "In 2 Days");
      document.getElementById("forecastDay3").innerHTML = formatForecast(day3, "In 3 Days");
    }
  }
  
  function formatForecast(forecastItem, dayLabel) {
    const temp = Math.round(forecastItem.main.temp);
    const description = forecastItem.weather[0].description
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    const iconCode = forecastItem.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  
    return `
      <div class="forecast-label">${dayLabel}</div>
      <img src="${iconUrl}" alt="${description}" class="forecast-icon">
      <div class="forecast-details">${temp}°C - ${description}</div>
    `;
  }  
  
  /* ========== 4. SPOTLIGHTS  ========== */
  async function fetchSpotlights() {
    try {
      const response = await fetch("data/members.json");
      if (response.ok) {
        const members = await response.json();
        displaySpotlights(members);
      } else {
        throw Error(await response.text());
      }
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  }
  
  function displaySpotlights(members) {
    const container = document.getElementById("spotlightContainer");
    container.innerHTML = ""; // Clear existing content
  
    // Filter for Gold or Silver members
    const filtered = members.filter(m => 
      m.membershipLevel === "Gold" || m.membershipLevel === "Silver"
    );
  
    // Shuffle and pick 2 or 3
    shuffleArray(filtered);
    const selected = filtered.slice(0, 3);
  
    // Create spotlight cards
    selected.forEach(member => {
      const card = document.createElement("div");
      card.classList.add("member-card");
      card.innerHTML = `
        <h3>${member.name}</h3>
        <img src="images/${member.image}" alt="${member.name} Logo">
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <p><a href="${member.website}" target="_blank">${member.website}</a></p>
        <p>Membership: ${member.membershipLevel}</p>
      `;
      container.appendChild(card);
    });
  }
  
  // Utility: Shuffle array in place
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }  
// Select HTML elements to update with weather data
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

// Build the API URL with Trier, Germany coordinates and metric units
const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=metric&appid=f95a8f56a36f30898ca0942d11181c87';

// Asynchronous function to fetch weather data
async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // For testing purposes
      displayResults(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

// Function to display the weather results on the page
function displayResults(data) {
  // Display temperature in Celsius
  currentTemp.innerHTML = `${data.main.temp}&deg;C`;
  
  // Build the icon URL using the icon code from the weather data
  const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  let desc = data.weather[0].description;
  
  // Update the image element with the icon URL and a description for accessibility
  weatherIcon.setAttribute('src', iconsrc);
  weatherIcon.setAttribute('alt', desc);
  
  // Display the weather description in the figcaption element
  captionDesc.textContent = desc;
}

// Invoke the API fetch function
apiFetch();
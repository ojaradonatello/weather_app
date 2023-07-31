// Helper function to fetch weather data from the API
async function fetchWeatherData(location) {
    const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
    
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return null;
    }
  }
  
  // Helper function to process the JSON data and return relevant weather information
  function processWeatherData(data) {
    if (!data) {
      return null;
    }
    
    const weatherData = {
      location: data.name,
      temperature: data.main.temp,
      description: data.weather[0].description,
    };
    
    return weatherData;
  }
  
  // Function to display weather information on the webpage
  function displayWeatherInfo(weatherData) {
    const weatherInfoElement = document.getElementById('weatherInfo');
    if (!weatherData) {
      weatherInfoElement.innerHTML = '<p>Weather data not available.</p>';
      return;
    }
    
    weatherInfoElement.innerHTML = `
      <h2>${weatherData.location}</h2>
      <p>Temperature: ${weatherData.temperature}°C</p>
      <p>Description: ${weatherData.description}</p>
    `;
  }
  
  // Function to handle form submission and fetch weather data
  async function handleFormSubmit(event) {
    event.preventDefault();
    
    const locationInput = document.getElementById('locationInput');
    const location = locationInput.value;
    
    if (location.trim() === '') {
      console.error('Please enter a valid location.');
      return;
    }
    
    const weatherData = await fetchWeatherData(location);
    const processedWeatherData = processWeatherData(weatherData);
    displayWeatherInfo(processedWeatherData);
  }
  
  // Event listener for form submission
  const weatherForm = document.getElementById('weatherForm');
  weatherForm.addEventListener('submit', handleFormSubmit);
  
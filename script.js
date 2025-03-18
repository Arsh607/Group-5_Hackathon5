document.getElementById("getWeatherBtn").addEventListener("click", getWeather);

async function getWeather() {
  const cityName = document.getElementById("cityInput").value;
  const errorMessage = document.getElementById("errorMessage");

  // Clear previous data and error messages
  document.getElementById("cityName").textContent = "";
  document.getElementById("temp").textContent = "";
  document.getElementById("description").textContent = "";
  document.getElementById("humidity").textContent = "";
  document.getElementById("wind").textContent = "";
  errorMessage.textContent = "";

  if (!cityName) {
    errorMessage.textContent = "Please enter a city name.";
    return;
  }

  try {
    const apiKey = "YOUR_API_KEY";  // Get your API key from https://openweathermap.org/api
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    // Display weather data
    document.getElementById("cityName").textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById("temp").textContent = `Temperature: ${data.main.temp}°C`;
    document.getElementById("description").textContent = `Weather: ${data.weather[0].description}`;
    document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById("wind").textContent = `Wind: ${data.wind.speed} m/s`;

  } catch (error) {
    // Display error message if something goes wrong
    errorMessage.textContent = error.message;
  }
}
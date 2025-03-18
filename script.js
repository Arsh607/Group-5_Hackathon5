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

  // You can replace these values with the latitude and longitude of your desired city
  const latitude = 52.52; // Example for Berlin (replace with the actual coordinates)
  const longitude = 13.41;

  try {
    // Make an API call to Open-Meteo
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`;
    const response = await fetch(url);
    const data = await response.json();

    console.log(data); // Log the data to the console to check the structure

    if (!response.ok) {
      throw new Error("Failed to fetch weather data.");
    }

    // Fetch the hourly temperature data
    if (data.hourly && data.hourly.temperature_2m) {
      const temperature = data.hourly.temperature_2m[0]; // Getting the first hourly temperature
      document.getElementById("cityName").textContent = `Weather for ${cityName}`;
      document.getElementById("temp").textContent = `Temperature: ${temperature}°C`;
    } else {
      throw new Error("No weather data available.");
    }
  } catch (error) {
    // Display error message if something goes wrong
    console.error(error);
    errorMessage.textContent = error.message;
  }
}

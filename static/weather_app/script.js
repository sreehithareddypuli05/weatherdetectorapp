function getWeather() {
  const weatherDiv = document.getElementById("weatherResult");
  weatherDiv.innerHTML = "Detecting location...";

  if (!navigator.geolocation) {
    weatherDiv.innerHTML = "Geolocation not supported.";
    return;
  }

  navigator.geolocation.getCurrentPosition(success, error);

  function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    fetch(`/get-weather/?lat=${lat}&lon=${lon}`)
      .then(response => response.json())
      .then(data => {
        if (data.cod == 200) {
          const temp = data.main.temp;
          const desc = data.weather[0].description;
          const city = data.name;
          weatherDiv.innerHTML = `📍 <strong>${city}</strong><br/>🌡️ ${temp}°C, ${desc}`;
        } else {
          weatherDiv.innerHTML = "Weather data not found.";
        }
      })
      .catch(() => {
        weatherDiv.innerHTML = "Failed to fetch weather.";
      });
  }

  function error() {
    weatherDiv.innerHTML = "Could not get your location.";
  }
}

function getWeatherByCity() {
  const weatherDiv = document.getElementById("weatherResult");
  const city = document.getElementById("cityInput").value.trim();

  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  weatherDiv.innerHTML = `Fetching weather for <strong>${city}</strong>...`;

  fetch(`/get-weather-by-city/?city=${encodeURIComponent(city)}`)
    .then(response => response.json())
    .then(data => {
      if (data.cod == 200) {
        const temp = data.main.temp;
        const desc = data.weather[0].description;
        const cityName = data.name;
        weatherDiv.innerHTML = `📍 <strong>${cityName}</strong><br/>🌡️ ${temp}°C, ${desc}`;
      } else {
        weatherDiv.innerHTML = "Weather data not found for that city.";
      }
    })
    .catch(() => {
      weatherDiv.innerHTML = "Failed to fetch weather.";
    });
}

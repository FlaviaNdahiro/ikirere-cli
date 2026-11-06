
export async function getCityCoordinates(city) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;

  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(10000)
    });

    if (!response.ok) {
      throw new Error("Could not connect to the location service.");
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      throw new Error(`City "${city}" was not found.`);
    }

    return {
      name: data.results[0].name,
      latitude: data.results[0].latitude,
      longitude: data.results[0].longitude
    };
  } catch (error) {
    if (
      error.message.includes("was not found") ||
      error.message.includes("location service")
    ) {
      throw error;
    }

    if (error.name === "TimeoutError") {
      throw new Error("Location service timed out. Please try again.");
    }

    throw new Error(
      "Unable to connect to the location service. Check your internet connection."
    );
  }
}

export async function getCurrentWeather(latitude, longitude) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=auto`;

  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(10000)
    });

    if (!response.ok) {
      throw new Error("Could not connect to the weather service.");
    }

    const data = await response.json();

    return {
      temperature: data.current.temperature_2m,
      humidity: data.current.relative_humidity_2m,
      feelsLike: data.current.apparent_temperature,
      weatherCode: data.current.weather_code,
      windSpeed: data.current.wind_speed_10m,
      time: data.current.time
    };
  } catch (error) {
    if (error.message.includes("weather service")) {
      throw error;
    }

    if (error.name === "TimeoutError") {
      throw new Error("Weather service timed out. Please try again.");
    }

    throw new Error(
      "Unable to connect to the weather service. Check your internet connection."
    );
  }
}

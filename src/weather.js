
export async function getCityCoordinates(city) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;

  const response = await fetch(url);

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
}

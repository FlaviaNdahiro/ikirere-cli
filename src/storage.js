
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import os from "node:os";

const DATA_DIR =
  process.env.IKIRERE_DATA_DIR ||
  path.join(os.homedir(), ".ikirere-cli");

const DATA_FILE = path.join(DATA_DIR, "settings.json");

const defaultData = {
  favorites: [],
  history: [],
  settings: {
    units: "celsius"
  }
};

async function readData() {
  try {
    const content = await readFile(DATA_FILE, "utf8");
    return JSON.parse(content);
  } catch (error) {
    if (error.code === "ENOENT") {
      return {
        favorites: [],
        history: [],
        settings: { units: "celsius" }
      };
    }

    throw error;
  }
}

async function saveData(data) {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

export async function getFavorites() {
  const data = await readData();
  return data.favorites;
}

export async function addFavorite(city) {
  const data = await readData();

  const exists = data.favorites.some(
    favorite => favorite.toLowerCase() === city.toLowerCase()
  );

  if (!exists) {
    data.favorites.push(city);
    await saveData(data);
  }
}

export async function removeFavorite(city) {
  const data = await readData();

  data.favorites = data.favorites.filter(
    favorite => favorite.toLowerCase() !== city.toLowerCase()
  );

  await saveData(data);
}

export async function addHistory(city) {
  const data = await readData();

  data.history.unshift({
    city,
    searchedAt: new Date().toISOString()
  });

  data.history = data.history.slice(0, 20);

  await saveData(data);
}

export async function getHistory() {
  const data = await readData();
  return data.history;
}

export async function getSettings() {
  const data = await readData();
  return data.settings;
}

export async function updateUnits(units) {
  if (!["celsius", "fahrenheit"].includes(units)) {
    throw new Error("Units must be celsius or fahrenheit.");
  }

  const data = await readData();
  data.settings.units = units;
  await saveData(data);
}

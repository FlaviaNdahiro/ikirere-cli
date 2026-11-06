#!/usr/bin/env node
import { parseArgs } from "node:util";
import chalk from "chalk";

import {
  getCityCoordinates,
  getCurrentWeather
} from "./weather.js";

import {
  getFavorites,
  addFavorite,
  removeFavorite,
  addHistory,
  getHistory
} from "./storage.js";

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    help: { type: "boolean", short: "h" },
    version: { type: "boolean", short: "v" }
  }
});

const [command, ...args] = positionals;

async function main() {
  if (values.help || command === "help") {
    console.log(chalk.blue("Welcome to Ikirere CLI!"));
    console.log("\nAvailable commands:");
    console.log("  weather <city>          Get weather information");
    console.log("  favorite add <city>     Save a favorite city");
    console.log("  favorite list           Show favorite cities");
    console.log("  favorite remove <city>  Remove a favorite city");
    console.log("  history                 Show recent searches");
    console.log("  --help                  Show help");
    console.log("  --version               Show version");
    return;
  }

  if (values.version) {
    console.log("Ikirere CLI version 1.0.0");
    return;
  }

  if (!command) {
    console.log(chalk.green("Welcome to Ikirere CLI!"));
    console.log("Type --help to see available commands.");
    return;
  }

  if (command === "weather") {
    const cityName = args.join(" ");

    if (!cityName) {
      throw new Error("Please provide a city name.");
    }

    console.log(chalk.yellow("Getting weather information..."));

    const city = await getCityCoordinates(cityName);
    const weather = await getCurrentWeather(
      city.latitude,
      city.longitude
    );

    await addHistory(city.name);

    console.log(chalk.green("\nCurrent Weather"));
    console.log("----------------------");
    console.log("City:", city.name);
    console.log("Temperature:", weather.temperature, "°C");
    console.log("Humidity:", weather.humidity, "%");
    console.log("Feels like:", weather.feelsLike, "°C");
    console.log("Wind speed:", weather.windSpeed, "km/h");
    console.log("Time:", weather.time);
    return;
  }

  if (command === "favorite") {
    const action = args[0];
    const cityName = args.slice(1).join(" ");

    if (action === "add") {
      if (!cityName) {
        throw new Error("Please provide a city name.");
      }

      await addFavorite(cityName);
      console.log(chalk.green(`${cityName} saved to favorites!`));
      return;
    }

    if (action === "list") {
      const favorites = await getFavorites();

      if (favorites.length === 0) {
        console.log("You have no favorite cities yet.");
        return;
      }

      console.log(chalk.blue("Favorite cities:"));
      favorites.forEach(city => console.log("-", city));
      return;
    }

    if (action === "remove") {
      if (!cityName) {
        throw new Error("Please provide a city name.");
      }

      await removeFavorite(cityName);
      console.log(chalk.green(`${cityName} removed from favorites.`));
      return;
    }

    throw new Error("Use favorite add, favorite list, or favorite remove.");
  }

  if (command === "history") {
    const history = await getHistory();

    if (history.length === 0) {
      console.log("No search history yet.");
      return;
    }

    console.log(chalk.blue("Recent searches:"));

    history.forEach(item => {
      console.log("-", item.city, "|", item.searchedAt);
    });
    return;
  }

  throw new Error(`Unknown command: ${command}. Type --help for help.`);
}

main().catch(error => {
  console.log(chalk.red("Error:"), error.message);
  process.exitCode = 1;
});

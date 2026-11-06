
import { parseArgs } from "node:util";
import chalk from "chalk";
import {
  getCityCoordinates,
  getCurrentWeather
} from "./weather.js";

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    help: {
      type: "boolean",
      short: "h"
    },
    version: {
      type: "boolean",
      short: "v"
    }
  }
});

const [command, ...args] = positionals;

async function main() {
  if (values.help || command === "help") {
    console.log(chalk.blue("Welcome to Ikirere CLI!"));
    console.log("Available commands:");
    console.log("  weather <city>   Get weather information");
    console.log("  help             Show available commands");
    console.log("  --version        Show application version");
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
    const cityName = args[0];

    if (!cityName) {
      console.log(chalk.red("Please provide a city name."));
      process.exitCode = 1;
      return;
    }

    try {
      console.log(chalk.yellow("Getting weather information..."));

      const city = await getCityCoordinates(cityName);

      const weather = await getCurrentWeather(
        city.latitude,
        city.longitude
      );

      console.log(chalk.green("\nCurrent Weather"));
      console.log("----------------------");
      console.log("City:", city.name);
      console.log("Temperature:", weather.temperature, "°C");
      console.log("Humidity:", weather.humidity, "%");
      console.log("Feels like:", weather.feelsLike, "°C");
      console.log("Wind speed:", weather.windSpeed, "km/h");
      console.log("Time:", weather.time);
    } catch (error) {
      console.log(chalk.red("Error:"), error.message);
      process.exitCode = 1;
    }

    return;
  }

  console.log(chalk.red(`Unknown command: ${command}`));
  console.log("Type --help to see available commands.");
  process.exitCode = 1;
}

main();

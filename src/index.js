import { getCityCoordinates } from "./weather.js";
const city = await getCityCoordinates("Kigali");

console.log("City:", city.name);
console.log("Latitude:", city.latitude);
console.log("Longitude:", city.longitude);

import { parseArgs } from "node:util";
import chalk from "chalk";

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

if (values.help || command === "help") {
  console.log(chalk.blue("Welcome to Ikirere CLI!"));
  console.log("Available commands:");
  console.log("  weather <city>   Get weather information");
  console.log("  help             Show available commands");
  console.log("  --version        Show application version");
} else if (values.version) {
  console.log("Ikirere CLI version 1.0.0");
} else if (!command) {
  console.log(chalk.green("Welcome to Ikirere CLI!"));
  console.log("Type --help to see available commands.");
} else {
  console.log(chalk.red(`Unknown command: ${command}`));
  process.exitCode = 1;
}




console.log("Node version:", process.version);
console.log("Operating system:", process.platform);
console.log("Current folder:", process.cwd());
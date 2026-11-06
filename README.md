# Ikirere CLI 🌦️

Ikirere CLI is a command-line weather application built with Node.js. It allows users to check current weather information for a city, save favorite cities, and view recent weather searches directly from the terminal.

## Features

- Search for current weather by city name.
- Display temperature, humidity, feels-like temperature, and wind speed.
- Save favorite cities.
- List and remove favorite cities.
- View recent search history.
- Display friendly error messages for invalid cities, connection problems, and timeouts.
- Store favorites and search history in a local JSON file.
- Support a custom data directory through an environment variable.

## Technologies Used

- Node.js
- JavaScript (ES Modules)
- Open-Meteo Geocoding API
- Open-Meteo Weather Forecast API
- Native Node.js modules:
  - `node:util`
  - `node:fs/promises`
  - `node:path`
  - `node:os`
  - `node:process`
- Chalk
- Git and GitHub

## Requirements

- Node.js version 22 or higher
- npm
- Internet connection

## Installation

Clone the repository:

```bash
git clone https://github.com/FlaviaNdahiro/ikirere-cli.git
```

Enter the project directory:

```bash
cd ikirere-cli
```

Install dependencies:

```bash
npm install
```

## Usage

Run the application using:

```bash
node src/index.js
```

### 1. Check the weather

```bash
node src/index.js weather Kigali
```

You can replace Kigali with another city.

The application displays:
- City name
- Temperature
- Humidity
- Feels-like temperature
- Wind speed
- Local time

### 2. Add a favorite city

```bash
node src/index.js favorite add Huye
```

### 3. List favorite cities

```bash
node src/index.js favorite list
```

### 4. Remove a favorite city

```bash
node src/index.js favorite remove Huye
```

### 5. View search history

```bash
node src/index.js history
```

### 6. Display help

```bash
node src/index.js --help
```

### 7. Display version

```bash
node src/index.js --version
```

## Data Storage

The application saves favorites, search history, and settings in a JSON file.

By default, the file is stored in:

```text
~/.ikirere-cli/settings.json
```

On Windows, this is normally inside your user profile directory.

You can also choose a custom storage directory using the `IKIRERE_DATA_DIR` environment variable.

PowerShell example:

```powershell
$env:IKIRERE_DATA_DIR = ".\my-weather-data"
```

## APIs

Ikirere CLI uses the free Open-Meteo APIs:

- [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api) – Finds the coordinates of a city.
- [Open-Meteo Weather Forecast API](https://open-meteo.com/en/docs) – Retrieves current weather information.

No API key is required.

## Project Structure

```text
ikirere-cli/
├── data/
│   └── settings.json
├── src/
│   ├── index.js
│   ├── weather.js
│   ├── storage.js
│   └── display.js
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

### File Descriptions

- `index.js` – Handles command-line arguments and application commands.
- `weather.js` – Connects to the Open-Meteo APIs and retrieves weather information.
- `storage.js` – Saves and retrieves favorites, history, and settings.
- `display.js` – Reserved for weather display formatting.
- `data/settings.json` – Project data folder; the application currently uses the user's local data directory for storage.

## Error Handling

The application handles common errors, including:

- Missing city names.
- Cities that cannot be found.
- Internet connection problems.
- API request timeouts.
- Unknown commands.

## Author

**Flavia Ndahiro**

Computer Networking Student  
Adventist University of Central Africa (AUCA), Rwanda

GitHub: [FlaviaNdahiro](https://github.com/FlaviaNdahiro)

---

*Ikirere* means *weather* in Kinyarwanda.



## Temperature Unit Settings

Ikirere CLI supports Celsius and Fahrenheit.

Show the current temperature unit:

```bash
node src/index.js settings units
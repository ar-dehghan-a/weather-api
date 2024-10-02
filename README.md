# Weather API

This Weather API application is built with Express and Redis, and it fetches weather data from the Visual Crossing Weather API. The application caches the results using Redis for faster responses.

## Requirements

To run this project, you need the following:

- Node.js (>= 18.x)
- Redis (for caching)
- Visual Crossing Weather API Key

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/weather-api.git
   cd weather-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory and add your Visual Crossing Weather API key

   ```bash
   API_KEY=your_visual_crossing_api_key
   ```

4. Ensure Redis is running on your system.

5. Start the application:

   ```bash
   npm start
   ```

## Usage

### Endpoints

The following endpoints are available:

1. Get Current Weather

   - URL: `/weather`
   - Method: `GET`
   - Query Parameters: `location` (required): Name of the city or latitude,longitude coordinates.

   Example request:

   ```bash
   GET /weather?location=London
   ```

2. Get 7-Day Weather Forecast

   - URL: `/forecast`
   - Method: `GET`
   - Query Parameters: `location` (required): Name of the city or latitude,longitude coordinates.

   Example request:

   ```bash
   GET /forecast?location=London
   ```

## Redis Caching

Weather data is cached in Redis for 1 hour (3600 seconds). If the same location is requested within that time frame, the cached result is returned.

[Idea from roadmap.sh](https://roadmap.sh/projects/weather-api-wrapper-service)

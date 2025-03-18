import { tool as createTool } from 'ai';
import { z } from 'zod';

import { WeatherResponse } from '../model/weather.model';

export const weatherTool = createTool({
  description: 
  'Display the weather for a holiday location',
  parameters: z.object({
    location: z.string().describe('The location to get the weather for')
  }),
  execute: async function ({ location }) {
    // While a historical forecast may be better, this example gets the next 3 days
    // WEATHER_API_KEY=2aac98aa52b44d97917154037251402
    const url = `https://api.weatherapi.com/v1/forecast.json?q=${location}&days=3&key=${process.env.WEATHER_API_KEY}`;
    
    try {
      const response = await fetch(url);
      const weather : WeatherResponse = await response.json();
      return { 
        location: location, 
        condition: weather.current.condition.text, 
        condition_image: weather.current.condition.icon,
        temperature: Math.round(weather.current.temp_c),
        feels_like_temperature: Math.round(weather.current.feelslike_c),
        humidity: weather.current.humidity
      };
    } catch(e) {
      console.error(e);
      return { 
        message: 'Unable to obtain weather information', 
        location: location
      };
    }
  }
});
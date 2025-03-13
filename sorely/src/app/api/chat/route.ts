import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { NextResponse } from 'next/server';

import { weatherTool } from '@/app/ai/weather.tool';
import { fcdoTool } from '@/app/ai/fcdo.tool';
import { flightTool } from '@/app/ai/flights.tool';

// Allow streaming responses up to 30 seconds to address typically longer responses from LLMs
export const maxDuration = 30;

export const tools = {
  getFlights: flightTool,
  displayWeather: weatherTool,
  fcdoGuidance: fcdoTool
};

// Post request handler
export async function POST(req: Request) {
  const { messages } = await req.json();

  try {
    const result = streamText({
      model: openai('gpt-4-turbo'),
      system:
      "You are a helpful assistant that returns travel itineraries based on location, the FCDO guidance from the specified tool, and the weather captured from the displayWeather tool." + 
      "Use the flight information from tool getFlights only to recommend possible flights in the itinerary." + 
      "Return an itinerary of sites to see and things to do based on the weather." + 
      "If the FCDO tool warns against travel DO NOT generate an itinerary.",
      messages,
      maxSteps: 2,
      tools
    });

    // Return data stream to allow the useChat hook to handle the results as they are streamed through for a better user experience
    return result.toDataStreamResponse();
  } catch (e) {
    console.error(e);
    return new NextResponse(
      "Unable to generate a plan. Please try again later!"
    );
  }
}

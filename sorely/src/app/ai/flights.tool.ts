import { tool as createTool } from 'ai';
import { z } from 'zod';

import { Client } from '@elastic/elasticsearch';
import { SearchResponseBody } from '@elastic/elasticsearch/lib/api/types';

import { Flight } from '../model/flight.model';

const index: string = "upcoming-flight-data";
const client: Client = new Client({
  node: process.env.ELASTIC_DEPLOYMENT,
  auth: {
    apiKey: process.env.ELASTIC_API_KEY || "",
  },
});

function extractFlights(response: SearchResponseBody<Flight>): (Flight | undefined)[] {
    return response.hits.hits.map(hit => { return hit._source})
}

export const flightTool = createTool({
  description:
    "Get flight information for a given destination from Elasticsearch, both outbound and return journeys",
  parameters: z.object({
    destination: z.string().describe("The destination we are flying to"),
    origin: z
      .string()
      .describe(
        "The origin we are flying from (defaults to London if not specified)"
      ),
  }),
  execute: async function ({ destination, origin }) {
    try {
      const responses = await client.msearch({
        searches: [
          { index: index },
          {
            query: {
              bool: {
                must: [
                  {
                    match: {
                      origin: origin,
                    },
                  },
                  {
                    match: {
                      destination: destination,
                    },
                  },
                ],
              },
            },
          },

          // Return leg
          { index: index },
          {
            query: {
              bool: {
                must: [
                  {
                    match: {
                      origin: destination,
                    },
                  },
                  {
                    match: {
                      destination: origin,
                    },
                  },
                ],
              },
            },
          },
        ],
      });

      if (responses.responses.length < 2) {
        throw new Error("Unable to obtain flight data");
      }

      return {
        outbound: extractFlights(responses.responses[0] as SearchResponseBody<Flight>),
        inbound: extractFlights(responses.responses[1] as SearchResponseBody<Flight>)
      };
    } catch (e) {
      console.error(e);
      return {
        message: "Unable to obtain flight information",
        location: location,
      };
    }
  },
});

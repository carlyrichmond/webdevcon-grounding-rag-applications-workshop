import { Client } from '@elastic/elasticsearch';
import { Flight, Location } from '../model/flight.model';

const index: string = "upcoming-flight-data";
const client: Client = new Client({
  node: process.env.ELASTIC_DEPLOYMENT,
  auth: {
    apiKey: process.env.ELASTIC_API_KEY || "",
  },
});

async function createIndex() {
  // Delete the index if it exists
  if (await client.indices.exists({ index: index })) {
    await client.indices.delete({ index: index });
  }

  // Create the index
  await client.indices.create({
    index: index,
    mappings: {
      properties: {
        origin: { type: "keyword" },
        destination: { type: "keyword" },
        airline: { type: "keyword" },
        flight_number: { type: "keyword" },
        departure_date: { type: "date" },
        currency: { type: "keyword" },
        price: { type: "float" },
      },
    },
  });

  console.log(`Index created`);
}

async function addFlightsToIndex() {
  // Adding wait to pause ahead of document ingestion
  await new Promise(r => setTimeout(r, 5000));

  // Generate random flight data and index the documents
  const locations: Location[] = [
    "London",
    "Glasgow",
    "Munich",
    "Dublin",
    "Barcelona",
    "Paris",
    "Mauritius",
    "Iran",
    "Madrid",
    "New York",
    "Las Vegas",
    "Seattle",
    "Prague",
    "Sao Paulo",
    "Sydney",
    "Warsaw",
  ];

  for (let i = 0; i < 1000; i++) {
    const startDate = new Date();
    const endDate = new Date(2026, 1, 1);
    const departureDate = new Date(
      startDate.getTime() +
        Math.random() * (endDate.getTime() - startDate.getTime())
    );

    const flight: Flight = {
      origin: locations[(locations.length * Math.random()) | 0],
      destination: locations[(locations.length * Math.random()) | 0],
      airline: "Elastic Air",
      flight_number: `ES${Math.round(Math.random() * 1234)}`,
      departure_date: departureDate,
      currency: "GBP",
      price: Math.round(Math.random() * 102938),
    };

    await client.index({
      index: index,
      document: flight,
    });

    console.log(`Document ${i} indexed`);
  }
}

createIndex();
addFlightsToIndex();
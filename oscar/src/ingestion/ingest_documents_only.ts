import { Client, type ClientOptions } from "@elastic/elasticsearch";

import fs from "node:fs";
import { Movie, MovieCollection } from "./movies";

// Initialize Elasticsearch
const config: ClientOptions = {
  node: process.env.ELASTIC_DEPLOYMENT,
  auth: {
    apiKey: process.env.ELASTIC_API_KEY || "",
  },
};

const client = new Client(config);
const indexName = process.env.INDEX_NAME;

/**
 * Generate collection of documents from specified JSON file
 * @param pathToJSON file containing movies
 * @returns array of documents
 */
async function generateDocumentsFromJson(pathToJSON: string): Promise<Movie[]> {
  try {
    const jsonDocs: MovieCollection = JSON.parse(
      fs.readFileSync(pathToJSON).toString()
    );
    console.log(`Doc count: ${jsonDocs.results.length}`);

    return jsonDocs.results;
  } catch (e) {
    console.log(e);
    return [];
  }
}

/**
 * Example search function to find relevant movies
 * @param text: prompt to be used for similarity search
 * @returns
 */
async function findRelevantMovies(text: string): Promise<Movie[]> {
  try {
    const searchResults = await client.search({
      index: indexName,
      query: {
        match: {
          title: text
        }
      }
    });
    return searchResults.hits.hits.map(hit => {
      return hit._source as Movie;
    });
  } catch (e) {
    console.log(e);
    return [];
  }
}

async function main() {
  // Clean up index if it exists
  if (indexName && (await client.indices.exists({ index: indexName }))) {
    await client.indices.delete({ index: indexName });
  }

  // Create index
  await client.indices.create({ index: indexName });

  // Load data from JSON
  const documents = await generateDocumentsFromJson("./data/movies.json");

  // Ingest documents as they are
  // Index with the bulk helper
  const bulkResponse = await client.helpers.bulk({
    datasource: documents,
    onDocument: (doc) => ({ index: { _index: indexName } }),
  });

  const itemCount = await client.count({ index: indexName });
  console.log(`Ingested ${itemCount.count} documents`);

  // Example retrieval
  const character = "Venom";
  const topMovieResults = await findRelevantMovies(character);
  const title = topMovieResults.length > 0 ? topMovieResults[0]._source.title : 'UNKNOWN';

  console.log(`The movie featuring ${character} is: "${title}"`);
}

main();

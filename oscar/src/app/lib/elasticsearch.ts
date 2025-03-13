import { Client, type ClientOptions } from "@elastic/elasticsearch";

// Initialize Elasticsearch
const config: ClientOptions = {
  node: process.env.ELASTIC_DEPLOYMENT,
};

if (process.env.ELASTIC_API_KEY) {
  config.auth = {
    apiKey: process.env.ELASTIC_API_KEY,
  };
}

const client: Client = new Client(config);
const indexName: string = process.env.INDEX_NAME || "";

/**
 * Retrieves the most popular movies based on average vote
 * @returns most popular 5 movies
 */
export async function getPopularMovies() {
  if (!client || !indexName) {
    return;
  }

  const query = {
    index: indexName,
    query: {
      bool: {
        must: [
          {
            range: {
              "metadata.vote_average": {
                gte: 5,
              },
            },
          },
          {
            term: {
              "metadata.chunk": 0,
            },
          },
        ],
      },
    },
    sort: [{ "metadata.popularity": "desc" }],
    size: 4,
    _source: [ "metadata", "text" ]
  };

  return client.search(query);
}
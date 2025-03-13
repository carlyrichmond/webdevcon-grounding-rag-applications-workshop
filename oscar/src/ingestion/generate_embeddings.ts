import {
  ElasticVectorSearch,
  type ElasticClientArgs,
} from "@langchain/community/vectorstores/elasticsearch";
import { Document } from "@langchain/core/documents";
import {
  RecursiveCharacterTextSplitter,
  TextSplitter,
} from "langchain/text_splitter";

import { OllamaEmbeddings } from "@langchain/ollama";

import { Client, type ClientOptions } from "@elastic/elasticsearch";

import fs from "node:fs";
import { Movie, MovieCollection } from "./movies";

// Initialize Ollama embeddings
const ollamaEmbeddings = new OllamaEmbeddings({
  model: "mxbai-embed-large", // Default value
  //baseUrl: "http://localhost:11434", // Default value
});

// Initialize Langchain and Elasticsearch
const config: ClientOptions = {
  node: process.env.ELASTIC_DEPLOYMENT,
};

if (process.env.ELASTIC_API_KEY) {
  config.auth = {
    apiKey: process.env.ELASTIC_API_KEY,
  };
}

const clientArgs: ElasticClientArgs = {
  client: new Client(config),
  indexName: process.env.INDEX_NAME,
  vectorSearchOptions: {
    engine: "hnsw",
    similarity: "cosine"
  },
};

const vectorStore = new ElasticVectorSearch(ollamaEmbeddings, clientArgs);

/**
 * Generate collection of documents from specified JSON file
 * @param pathToJSON file containing movies
 * @returns array of documents
 */
async function generateDocumentsFromJson(
  pathToJSON: string
): Promise<Document[]> {
  try {
    const jsonDocs: MovieCollection = JSON.parse(
      fs.readFileSync(pathToJSON).toString()
    );
    console.log(`Doc count: ${jsonDocs.results.length}`);

    // Split text based on overview
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 200,
      chunkOverlap: 0,
    });
    let documents: Document[] = [];

    for (const content of jsonDocs.results) {
      const splitDocs: Document[] = await splitContentByOverview(
        textSplitter,
        content
      );
      documents = documents.concat(splitDocs);
    }
    return documents;
  } catch (e) {
    console.log(e);
    return [];
  }
}

/**
 * Chunk content into smaller documents based on overview
 * @param textSplitter
 * @param content
 * @returns Document[] based on split document
 */
async function splitContentByOverview(
  textSplitter: TextSplitter,
  content: Movie
) {
  const splits = await textSplitter.splitText(content.overview);
  console.log(`Split doc count: ${splits.length}`);

  const splitDocs: Document[] = splits.map((split, index) => {
    return new Document({
      pageContent: split,
      metadata: {
        title: content.title,
        original_language: content.original_language,
        popularity: content.popularity,
        releaseDate: new Date(content.release_date),
        vote_average: content.vote_average,
        vote_count: content.vote_count,
        isAdult: content.adult,
        poster_path: `https://image.tmdb.org/t/p/original${content.poster_path}`,
        chunk: index,
      },
    });
  });
  return splitDocs;
}

// Ingest document with embedding
async function generateEmbeddings(documents: Document[]): Promise<string[]> {
  try {
    return await vectorStore.addDocuments(documents);
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
async function findRelevantMovies(text: string): Promise<Document[]> {
  try {
    const filter = [
      {
        operator: "match",
        field: "isAdult",
        value: false,
      },
    ];

    const similaritySearchResults = await vectorStore.similaritySearch(
      text,
      1,
      filter
    );
    return similaritySearchResults;
  } catch (e) {
    console.log(e);
    return [];
  }
}

async function main() {
  // Clean up index if it exists
  vectorStore.deleteIfExists();

  // Load data from JSON
  const documents = await generateDocumentsFromJson("./data/movies.json");

  // Ingest documents and generate embeddings
  const ids = await generateEmbeddings(documents);
  console.log(`Ingested ${ids.length} documents with embeddings`);

  // Example retrieval
  const topMovieResult = await findRelevantMovies(
    "Find me a movie featuring a dark anti-hero"
  );

  console.log(`The anti-hero movie is: "${topMovieResult[0].metadata.title}"`);
}

main();

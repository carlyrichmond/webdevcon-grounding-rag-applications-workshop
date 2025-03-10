import { Client, type ClientOptions } from "@elastic/elasticsearch";

import fs from "node:fs";
import { Movie, MovieCollection } from "./movies";

// Initialize Elasticsearch

/**
 * Generate collection of documents from specified JSON file
 * @param pathToJSON file containing movies
 * @returns array of documents
 */
async function generateDocumentsFromJson(pathToJSON: string): Promise<Movie[]> {

}

/**
 * Example search function to find relevant movies
 * @param text: prompt to be used for similarity search
 * @returns
 */
async function findRelevantMovies(text: string): Promise<Movie[]> {
  
}

async function main() {
  // Clean up index if it exists

  // Create index

  // Load data from JSON

  // Ingest documents as they are
  // Index with the bulk helper

  // Example retrieval
  
}

main();

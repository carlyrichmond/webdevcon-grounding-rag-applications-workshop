import {
  ElasticVectorSearch,
  type ElasticClientArgs,
} from "@langchain/community/vectorstores/elasticsearch";

import { Ollama, OllamaEmbeddings } from "@langchain/ollama";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatMessageHistory } from "langchain/stores/message/in_memory";

import { Client, type ClientOptions } from "@elastic/elasticsearch";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { StringOutputParser } from "@langchain/core/output_parsers";

// Initialize Ollama embeddings for the query
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
    similarity: "cosine", //Default cosine
  },
};

const vectorStore = new ElasticVectorSearch(ollamaEmbeddings, clientArgs);

// Initialise LLM and prompt
const template = `You are a helpful movie trivial assistant that loves to recommend movies to people. 
      Check your knowledge base before answering any questions.
      If no relevant information is found in the context, respond, "I don't know, sorry!"
      
      Please use the below context in your answer:
      <context>
      {context}
      </context>`;

const prompt = ChatPromptTemplate.fromTemplate(template);

const llm = new Ollama({
  model: "llama3", // Default: "llama3",
  temperature: 0,
  maxRetries: 3
});

const chatHistory = new ChatMessageHistory();

/**
 * Example search function to find relevant movies
 * @param text: prompt to be used for similarity search
 * @returns
 */
export async function recommendMovies(question: string): Promise<ReadableStream> {
  chatHistory.addUserMessage(question);

  const retriever = vectorStore.asRetriever(3);

  const customRagChain = await createStuffDocumentsChain({
    llm: llm,
    prompt: prompt,
    outputParser: new StringOutputParser(),
  });

  const context = await retriever.invoke(question);

  const stream = await customRagChain.stream({
    question: question,
    messages: await chatHistory.getMessages(),
    context
  });

  return stream;
}

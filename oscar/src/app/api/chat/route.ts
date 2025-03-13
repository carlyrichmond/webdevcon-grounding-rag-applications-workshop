import { createOllama } from 'ollama-ai-provider';
import { LangChainAdapter } from 'ai';

import { recommendMovies } from '@/app/lib/movie-finder';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const ollama = createOllama({
  baseURL: 'http://localhost:11434/api', // Default
});

export async function POST(req: Request) {
  const { messages } = await req.json();
  
  try {
    const question: string = messages[messages.length - 1].content;
    const stream = await recommendMovies(question);

    return LangChainAdapter.toDataStreamResponse(stream);
  } catch(e) {
    console.error(e);
    return Response.error();
  }
}
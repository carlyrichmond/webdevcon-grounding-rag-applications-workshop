export interface MovieDocument {
    text: string;
    metadata: MovieMetadata;
  }
  
  export interface MovieMetadata {
    adult: boolean;
    chunk: number;
    original_language: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    vote_average: number;
    vote_count: number;
  }
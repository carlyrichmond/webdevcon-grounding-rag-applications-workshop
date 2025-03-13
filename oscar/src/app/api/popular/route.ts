import { getPopularMovies } from "@/app/lib/elasticsearch";

export async function GET(req: Request) {
  try {
    const popularResponses = await getPopularMovies();
    const movies = popularResponses?.hits.hits.map((doc) => {
      return doc._source;
    })

    return Response.json({ results: movies });
  } catch (e) {
    console.error(e);
    return Response.json({
      results: [],
      errorMessage: e
    });
  }
}

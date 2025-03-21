'use client';

import { useEffect, useState } from "react";
import { MovieDocument } from "../model/movie-document";
import Card from "./Card";

export default function Chat() {
    const [movies, setMovies] = useState<MovieDocument[]>();

    useEffect(() => {
        if (!movies) {
            getPopularMovies()
        }
    }, [movies]);

    async function getPopularMovies() {
    }

    return (
        <div className="row">
            <h2>Popular</h2>
            <div className="row__posters">
                { movies ?
                    movies.map((movie: MovieDocument, i: number) => {
                        return <Card key={i} movie={movie} />
                    }) :
                    <div className="no-results">
                        No popular movies!
                    </div>
                }
            </div>
        </div>
    );
}
import * as React from "react";
import { MovieDocument } from "../model/movie-document";

export default function Card(props: { movie: MovieDocument }) {
  return (
    <div className="card">
      <div className="wrapper">
        <div className="image">
          <div className="poster">
            <img loading="lazy" className="poster" src={props.movie.metadata.poster_path} alt={props.movie.metadata.title} />
          </div>
        </div>
        <div className="details">
          <div className="wrapper">
            <div className="title">
              <div>
                <h2 dangerouslySetInnerHTML={{ __html: props.movie.metadata.title}}/>
              </div>
              <span className="release_date">
                { new Date(props.movie.metadata.release_date) > new Date() ? 'Releasing ' : 'Released '}
                {new Intl.DateTimeFormat("en-GB", {
                  year: "numeric",
                  month: "long",
                  day: "2-digit"
                }).format(new Date(props.movie.metadata.release_date))}</span>
            </div>
          </div>
          <div className="overview">
            <p dangerouslySetInnerHTML={{ __html: `${props.movie.text}...`}} />
          </div>
        </div>
      </div>
    </div>
  );
}
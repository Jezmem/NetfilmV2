import React from "react";
import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.id}`} className="block">
      <div className="bg-gray-800 rounded-lg p-4 text-white">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="rounded-lg"
        />
        <h2 className="mt-2 text-lg font-bold">{movie.title}</h2>
      </div>
    </Link>
  );
}

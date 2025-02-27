import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_DETAILS = "https://api.themoviedb.org/3/movie/";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMDQyYzkyNmQ4NDc4ZDEyYTExNTdhMjU2ZTZmZTBiZSIsIm5iZiI6MTczODc2ODI2MC4zNTgsInN1YiI6IjY3YTM3Zjg0YmUzNDU5ZDQ4MjgxMjBhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6oVexvXJObN_wbggn0WxpxIIFtgxZGD6_TZ_ww2fpLY",
  },
};

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(`${API_DETAILS}${id}?language=fr-FR`, options)
      .then((res) => res.json())
      .then((data) => setMovie(data))
      .catch((err) => console.error("Erreur:", err));
  }, [id]);

  if (!movie) return <div className="text-center text-white">Chargement...</div>;

  return (
    <div className="container mx-auto p-4 text-white">
      <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="rounded-lg"
      />
      <p className="mt-4"><strong>Date de sortie:</strong> {movie.release_date}</p>
      <p className="mt-2"><strong>Note:</strong> {movie.vote_average}/10</p>
      <p className="mt-2"><strong>Synopsis:</strong> {movie.overview}</p>
    </div>
  );
}

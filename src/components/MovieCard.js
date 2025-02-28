import React from "react";
import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  function addToFavorites(movieId) {
    const accountId = "21798255";
  
    const url = `https://api.themoviedb.org/3/account/${accountId}/favorite`;
  
    const body = {
      media_type: "movie",
      media_id: movieId,
      favorite: true,
    };
  
    fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMDQyYzkyNmQ4NDc4ZDEyYTExNTdhMjU2ZTZmZTBiZSIsIm5iZiI6MTczODc2ODI2MC4zNTgsInN1YiI6IjY3YTM3Zjg0YmUzNDU5ZDQ4MjgxMjBhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6oVexvXJObN_wbggn0WxpxIIFtgxZGD6_TZ_ww2fpLY",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status_code === 1) {
          console.log(`Le film ${movieId} a été ajouté aux favoris.`);
        } else {
          console.error("Erreur lors de l'ajout aux favoris :", data.status_message);
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la requête :", error);
      });
  }
  

  return (
    <div className="bg-gray-800 rounded-lg p-4 text-white">
      <Link to={`/movie/${movie.id}`} className="block">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="rounded-lg"
        />
        <h2 className="mt-2 text-lg font-bold">{movie.title}</h2>
      </Link>
      <button
        onClick={addToFavorites(movie.id)}
        className="mt-2 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded"
      >
        Ajouter aux favoris
      </button>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { useNavigate } from "react-router-dom";

const API_FAVORITES = "https://api.themoviedb.org/3/account/21798255/favorite/movies?language=fr-FR";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_TMDB_BEARER_TOKEN}`,
  },
};

export default function FavouriteMovies() {
  const [favouriteMovies, setFavouriteMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFavouriteMovies();
  }, []);

  const fetchFavouriteMovies = async () => {
    try {
      const response = await fetch(API_FAVORITES, options);
      const data = await response.json();
      setFavouriteMovies(data.results);
    } catch (error) {
      console.error("Erreur lors de la récupération des films favoris :", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center bg-gray-900 text-white p-4 rounded-lg mb-4">
        <h1 className="text-2xl font-bold">Films Favoris</h1>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => navigate("/")}
        >
          Retour
        </button>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {favouriteMovies.length > 0 ? (
          favouriteMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p className="text-center col-span-4 text-gray-500">Aucun film favori trouvé.</p>
        )}
      </div>
    </div>
  );
}

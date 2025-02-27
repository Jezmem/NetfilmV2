import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";

const API_URL = "https://api.themoviedb.org/3/trending/movie/day?language=fr-FR";
const SEARCH_URL = "https://api.themoviedb.org/3/search/movie?language=fr-FR&query=";
const API_GENRE = "https://api.themoviedb.org/3/genre/movie/list?language=fr";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMDQyYzkyNmQ4NDc4ZDEyYTExNTdhMjU2ZTZmZTBiZSIsIm5iZiI6MTczODc2ODI2MC4zNTgsInN1YiI6IjY3YTM3Zjg0YmUzNDU5ZDQ4MjgxMjBhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6oVexvXJObN_wbggn0WxpxIIFtgxZGD6_TZ_ww2fpLY",
  },
};

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);


  useEffect(() => {
    fetchTrendingMovies();
    fetchGenres();
  }, []);

  const fetchTrendingMovies = async () => {
    try {
      const response = await fetch(API_URL, options);
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error("Erreur lors de la récupération des films :", error);
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await fetch(API_GENRE, options);
      const data = await response.json();
      console.log(data)

      setGenres(data.genres);
    } catch (error) {
      console.error("Erreur lors de la récupération des genres :", error);
    }
  };

  const handleSearch = async (query) => {
    if (!query) {
      fetchTrendingMovies();
      return;
    }
    try {
      const response = await fetch(`${SEARCH_URL}${query}`, options);
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error("Erreur lors de la recherche de films :", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <header className="flex justify-between items-center bg-gray-900 text-white p-4 rounded-lg mb-4">
        <h1 className="text-2xl font-bold">Netfilm</h1>
        <SearchBar onSearch={handleSearch} />

        <select
          className="bg-gray-800 text-white p-2 rounded"
          value="test"
        >
          <option value="">Tous les genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>{genre.name}</option>
          ))}
        </select>
      </header>

      <h1 className="text-3xl font-bold mb-4">Films du Moment</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

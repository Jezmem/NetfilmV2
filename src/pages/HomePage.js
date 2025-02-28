import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";

const API_ACCOUNT = "https://api.themoviedb.org/3/account/21798255";
const API_TENDING_MOVIES = "https://api.themoviedb.org/3/trending/movie/day?language=fr-FR";
const SEARCH_URL = "https://api.themoviedb.org/3/search/movie?language=fr-FR&query=";
const API_GENRE = "https://api.themoviedb.org/3/genre/movie/list?language=fr";
const API_GENRE_MOVIES = "https://api.themoviedb.org/3/discover/movie?language=fr-FR&with_genres=";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMDQyYzkyNmQ4NDc4ZDEyYTExNTdhMjU2ZTZmZTBiZSIsIm5iZiI6MTczODc2ODI2MC4zNTgsInN1YiI6IjY3YTM3Zjg0YmUzNDU5ZDQ4MjgxMjBhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6oVexvXJObN_wbggn0WxpxIIFtgxZGD6_TZ_ww2fpLY",
  },
};

export default function HomePage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState([]);
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(""); // Stocke l'ID du genre sélectionné

  useEffect(() => {
    fetchAccountUsername();
    fetchTrendingMovies();
    fetchGenres();
  }, []);

  const fetchAccountUsername = async () => {
    try {
      const response = await fetch(API_ACCOUNT, options);
      const data = await response.json();
      setUsername(data.username);
    } catch (error) {
      console.error("Erreur lors de la récupération des films :", error);
    }
  };

  const fetchTrendingMovies = async () => {
    try {
      const response = await fetch(API_TENDING_MOVIES, options);
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
      setGenres(data.genres);
    } catch (error) {
      console.error("Erreur lors de la récupération des genres :", error);
    }
  };

  const fetchMoviesByGenre = async (genreId) => {
    if (!genreId) {
      fetchTrendingMovies(); // Si aucun genre sélectionné, afficher les films tendance
      return;
    }
    try {
      const response = await fetch(`${API_GENRE_MOVIES}${genreId}`, options);
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error("Erreur lors de la récupération des films par genre :", error);
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

  const handleGenreChange = (event) => {
    const genreId = event.target.value;
    setSelectedGenre(genreId);
    fetchMoviesByGenre(genreId);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <header className="flex justify-between items-center bg-gray-900 text-white p-4 rounded-lg mb-4">
        <h1 className="text-2xl font-bold">Netfilm</h1>
        <SearchBar onSearch={handleSearch} />
        
        <select
          className="bg-gray-800 text-white p-2 rounded"
          value={selectedGenre}
          onChange={handleGenreChange}
        >
          <option value="">Tous les genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>{genre.name}</option>
          ))}
        </select>
        <button
          className="bg-yellow-500 text-black px-4 py-2 rounded-lg"
          onClick={() => navigate("/favourites")}
        >
          Favoris
        </button>
        <h2>{username}</h2>
      </header>

      <h1 className="text-3xl font-bold mb-4">Films du Moment</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p className="text-center col-span-4 text-gray-500">Aucun film trouvé.</p>
        )}
      </div>
    </div>
  );
}

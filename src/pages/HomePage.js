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
    Authorization: `Bearer ${process.env.REACT_APP_TMDB_BEARER_TOKEN}`,
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
    <div className="bg-black text-white min-h-screen">
      {/* Header fixe avec fond transparent qui devient noir au scroll */}
      <header className="fixed top-0 left-0 right-0 z-10 transition-all duration-300 bg-gradient-to-b from-black to-transparent px-4 py-2">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-red-600 text-4xl font-bold mr-10">NETFILM</h1>
            
            {/* Navigation principale */}
            <nav className="hidden md:flex">
              <ul className="flex space-x-6">
                <li className="hover:text-gray-300 cursor-pointer font-medium">Accueil</li>
                <li className="hover:text-gray-300 cursor-pointer">Séries</li>
                <li className="hover:text-gray-300 cursor-pointer">Films</li>
                <li className="hover:text-gray-300 cursor-pointer">Nouveautés</li>
                <li className="hover:text-gray-300 cursor-pointer">Ma liste</li>
              </ul>
            </nav>
          </div>
          
          {/* Partie droite du header */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Titres, personnes, genres"
                className="bg-black bg-opacity-70 text-white border border-gray-600 rounded px-3 py-1 pl-8 focus:outline-none focus:border-white transition"
                onChange={(e) => handleSearch(e.target.value)}
              />
              <svg className="w-4 h-4 absolute left-2 top-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
              </svg>
            </div>
            
            <select
              className="bg-black bg-opacity-70 text-white border border-gray-600 rounded px-2 py-1 focus:outline-none focus:border-white"
              value={selectedGenre}
              onChange={handleGenreChange}
            >
              <option value="">Tous les genres</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>{genre.name}</option>
              ))}
            </select>
            
            <button
              className="bg-red-600 hover:bg-red-700 mx-4 text-white px-4 py-1 rounded transition"
              onClick={() => navigate("/favourites")}
            >
              Favoris
            </button>
            
            {/* Profil utilisateur */}
            <div className="flex items-center space-x-2 cursor-pointer">
              <span>{username}</span>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="relative pt-16 h-screen">
        {movies.length > 0 && (
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent z-1"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black opacity-40 z-1"></div>
          </div>
        )}
      </div>

      {/* Conteneur principal - en dessous du hero */}
      <div className="container mx-auto px-12 -mt-200 relative z-10">
        {/* Films du moment */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Films du Moment</h2>
            <div className="flex overflow-x-auto space-x-4 pb-4 hide-scrollbar">
              {movies.length > 0 ? (
                movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
              ) : (
                <p className="text-center text-gray-500 py-8 w-full">Aucun film trouvé.</p>
              )}
            </div>
        </div>     
       
      </div>
      
      {/* Footer */}
      <footer className="mt-12 py-8 border-t border-gray-800">
        <div className="container mx-auto px-12">
          <div className="text-gray-500 text-sm">
            <p className="mb-4">© 2025 Netfilm. Tous droits réservés.</p>
            <div className="grid grid-cols-3 gap-4">
              <a href="#" className="hover:text-gray-300">Confidentialité</a>
              <a href="#" className="hover:text-gray-300">Conditions d'utilisation</a>
              <a href="#" className="hover:text-gray-300">Préférences de cookies</a>
              <a href="#" className="hover:text-gray-300">Centre d'aide</a>
              <a href="#" className="hover:text-gray-300">Mentions légales</a>
              <a href="#" className="hover:text-gray-300">Nous contacter</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

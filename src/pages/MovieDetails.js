import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_DETAILS = "https://api.themoviedb.org/3/movie/";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_TMDB_BEARER_TOKEN}`,
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
    <div className="relative text-white">
      {/* Hero Banner with Backdrop Image */}
      <div className="relative w-full h-screen">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
            filter: 'brightness(0.7)'
          }}
        ></div>
        
        {/* Content Container */}
        <div className="relative z-20 container mx-auto px-4 pt-24 h-full flex flex-col justify-center">
          <h1 className="text-5xl font-bold mb-4">{movie.title}</h1>
          
          {/* Movie Info */}
          <div className="flex items-center text-sm text-gray-300 mb-4">
            <span className="text-green-500 font-bold mr-2">{Math.round(movie.vote_average * 10)}% match</span>
            <span>{movie.release_date}</span>
            <span className="mx-2">|</span>
            <span>4K</span>
            <span className="mx-2">|</span>
            <span className="border border-gray-600 px-1 text-xs">HD</span>
          </div>
          
          {/* Synopsis */}
          <div className="max-w-2xl mb-8">
          <p>{movie.overview}</p>
          </div>
      
        </div>
      </div>
    </div>
  );
}

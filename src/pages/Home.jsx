import Moviecard from "../components/Moviecard";
import { useEffect, useState } from "react";

import '../css/Home.css';
import { getPopularMovies } from "../services/api";

function Home({ searchResults }) {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
   
    useEffect(() => {
        const loadPopularMovies = async () => {
          try {
            setLoading(true);
            const popularMovies = await getPopularMovies();
            console.log('Popular movies loaded:', popularMovies);
            setMovies(popularMovies);
          } catch (err) {
            console.error('Error loading popular movies:', err);
            setError("Failed to load movies: " + err.message);
          } finally {
            setLoading(false);
          }
        };
    
        loadPopularMovies();
      }, []);

    // Update movies when search results are available
    useEffect(() => {
        if (searchResults) {
            setMovies(searchResults);
            setError(null);
        }
    }, [searchResults]);

    return (
        <div className="home">
            {error && <div className="error-message">{error}</div>}
            
            {loading && <div className="loading">Loading movies...</div>}
            
            <div className="movie-grid">
                {movies.map((movie) => (
                    <Moviecard 
                        key={movie.id}
                        movie={movie}
                    />
                ))}
            </div>
        </div>
    );
}

export default Home;
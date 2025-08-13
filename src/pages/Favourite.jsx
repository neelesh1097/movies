import { useState, useEffect } from 'react';
import Moviecard from '../components/Moviecard';
import '../css/Favourite.css';

function Favourite() {
    const [favourites, setFavourites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load favourites from localStorage
        const loadFavourites = () => {
            try {
                const stored = localStorage.getItem('favouriteMovies');
                if (stored) {
                    const parsed = JSON.parse(stored);
                    setFavourites(parsed);
                }
            } catch (error) {
                console.error('Error loading favourites:', error);
            } finally {
                setLoading(false);
            }
        };

        loadFavourites();
    }, []);

    const clearAllFavourites = () => {
        setFavourites([]);
        localStorage.removeItem('favouriteMovies');
    };

    // Function to handle when a movie is removed from favourites
    const handleMovieRemoved = (removedMovieId) => {
        setFavourites(prev => prev.filter(movie => movie.id !== removedMovieId));
    };

    if (loading) {
        return (
            <div className="favourites-container">
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>Loading your favourites...</p>
                </div>
            </div>
        );
    }

    if (favourites.length === 0) {
        return (
            <div className="favourites-container">
                <div className="favourites-empty">
                    <div className="empty-icon">🎬</div>
                    <h1>Your Favourites List is Empty</h1>
                    <p>Start building your collection by adding movies you love!</p>
                    <div className="empty-actions">
                        <a href="/" className="browse-button">
                            Browse Movies
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="favourites-container">
            <div className="favourites-header">
                <div className="header-content">
                    <h1>My Favourites</h1>
                    <p>You have {favourites.length} movie{favourites.length !== 1 ? 's' : ''} in your collection</p>
                </div>
                <div className="header-actions">
                    <button 
                        onClick={clearAllFavourites}
                        className="clear-all-button"
                        title="Remove all favourites"
                    >
                        🗑️ Clear All
                    </button>
                </div>
            </div>

            <div className="favourites-grid">
                {favourites.map((movie) => (
                    <div key={movie.id} className="favourite-movie-wrapper">
                        <Moviecard 
                            movie={movie} 
                            onFavouriteChange={handleMovieRemoved}
                            isInFavourites={true}
                        />
                    </div>
                ))}
            </div>

            {favourites.length > 0 && (
                <div className="favourites-footer">
                    <p>Total: {favourites.length} movie{favourites.length !== 1 ? 's' : ''}</p>
                </div>
            )}
        </div>
    );
}

export default Favourite;
import '../css/Moviecard.css';
import { useState, useEffect } from 'react';

function Moviecard({ movie, onFavouriteChange, isInFavourites = false }) {
  const { title, release_date, poster_path, id } = movie;
  const [isFavourite, setIsFavourite] = useState(isInFavourites);
  
  useEffect(() => {
    // Check if movie is already in favourites
    const favourites = JSON.parse(localStorage.getItem('favouriteMovies') || '[]');
    setIsFavourite(favourites.some(fav => fav.id === id));
  }, [id, isInFavourites]);

  function onfavouriteclick() {
    const favourites = JSON.parse(localStorage.getItem('favouriteMovies') || '[]');
    
    if (isFavourite) {
      // Remove from favourites
      const updatedFavourites = favourites.filter(fav => fav.id !== id);
      localStorage.setItem('favouriteMovies', JSON.stringify(updatedFavourites));
      setIsFavourite(false);
      
      // Notify parent component if callback is provided
      if (onFavouriteChange) {
        onFavouriteChange(id);
      }
      
      alert(`Removed ${title} from favourites`);
    } else {
      // Add to favourites
      const updatedFavourites = [...favourites, movie];
      localStorage.setItem('favouriteMovies', JSON.stringify(updatedFavourites));
      setIsFavourite(true);
      alert(`Added ${title} to favourites`);
    }
  }

  const posterUrl = poster_path 
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : "https://via.placeholder.com/300x450?text=No+Image";

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={posterUrl} alt={title}/>
        <div className="movie-overlay">
          <button 
            className={`favourite ${isFavourite ? 'favourite-active' : ''}`}
            onClick={onfavouriteclick}
          >
            {isFavourite ? '❤️' : '🤍'} {isFavourite ? 'Remove' : 'Favourite'}
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h3>{title}</h3>
        <p>{release_date}</p>
      </div>
    </div>
  );
}

export default Moviecard;
  
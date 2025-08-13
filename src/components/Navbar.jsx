import '../css/Navbar.css';
import { Link } from "react-router-dom";
import { useState } from "react";
import { searchMovies } from "../services/api";

function Navbar({ onSearchResults }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      const searchResults = await searchMovies(searchQuery);
      onSearchResults(searchResults);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Movie App</Link>
      </div>
      
      <div className="navbar-search">
        <form onSubmit={handleSearch} className="search-form">
          <input 
            type="text" 
            placeholder="Search for movies..." 
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-button" disabled={isSearching}>
            {isSearching ? '...' : '🔍'}
          </button>
        </form>
      </div>
      
      <div className="navbar-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/favourite" className="nav-link">Favourites</Link>
      </div>
    </nav>
  );
}

export default Navbar;
import React, { useState } from 'react';
import Home from './pages/Home';
import { Routes, Route,} from 'react-router-dom';
import Favourite from './pages/Favourite';
import Navbar from './components/Navbar';
import './css/App.css'

function App() {
  const [searchResults, setSearchResults] = useState(null);

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  return (
    <div>
      <Navbar onSearchResults={handleSearchResults} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home searchResults={searchResults} />} />
          <Route path="/favourite" element={<Favourite />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;








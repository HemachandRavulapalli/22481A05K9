import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UrlShortenerForm from './components/UrlShortenerForm';
import UrlStatistics from './components/UrlStatistics';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UrlShortenerForm />} />
        <Route path="/stats" element={<UrlStatistics />} />
      </Routes>
    </Router>
  );
}

export default App;
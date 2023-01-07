import './App.css';
import Home from './Page/Home';
import Bookmark from './Components/Bookmark/Bookmark';
import Movies from './Components/Movies/Movies';
import Series from './Components/Series/Series';
import { Route, Routes } from 'react-router-dom';
import Notfound from './Components/NotFound/Notfound';
import Header from './Components/Header/Header';
import MovieDetail from './Page/MovieDetail/MovieDetail';
import { useState, createContext, useEffect } from 'react';
import axios from 'axios';
import { API_KEY } from './API';
import TVDetail from './Page/TVDetail/TVDetail';
function App() {
  let bookMarkMovies = []
  const [tvFeed, setTVFeed] = useState([])
  const [tvCategories, setTVCategories] = useState([])
  const getMovieData = () => {
    axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US`).then((response) => setTVFeed(response.data.results))
    axios.get(`https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=en-US`).then((response) => setTVCategories(response.data.genres))

  }

  useEffect(() => {
    getMovieData()
  }, [])
  const contextValue = { tvFeed, tvCategories, }
  return (
    <div className="App">
      <MovieContext.Provider value={contextValue}>
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="movies" element={<Movies />} />
          <Route path="series" element={<Series />} />
          <Route path="bookmark" element={<Bookmark bookMarkMovies={bookMarkMovies} />} />
          <Route path="moviedetail/:id" element={<MovieDetail />} />
          <Route path="seriesdetail/:id" element={<TVDetail />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </MovieContext.Provider>

    </div>
  );
}
export const MovieContext = createContext([])

export default App;

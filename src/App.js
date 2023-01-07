import './App.css';
import Home from './Page/Home';
import Bookmark from './Components/Bookmark/Bookmark';
import Movies from './Components/Movies/Movies';
import Series from './Components/Series/Series';
import { Route, Routes } from 'react-router-dom';
import Notfound from './Components/NotFound/Notfound';
import Header from './Components/Header/Header';
import MovieDetail from './Components/MovieDetail/MovieDetail';
import { data } from "./utils/data"
import { useState, createContext } from 'react';

function App() {
  let bookMarkMovies = []
  const [movieFeed, setMovieFeed] = useState(data)
  const [showMovie, setshowMovie] = useState([])
  const bookmarking = (e) => {
    let target = e.target
    bookMarkMovies = bookMarkMovies.push(target)
  }
  const getMovie = (e) => {
    setshowMovie(movieFeed.find(item => item.id === e))
  }
  return (
    <div className="App">
      <MovieContext.Provider value={data}>
        <Header />
        <Routes>
          <Route index element={<Home data={data} bookmarking={bookmarking} getMovie={getMovie} movieFeed={movieFeed} />} />
          <Route path="movies" element={<Movies getMovie={getMovie} />} />
          <Route path="series" element={<Series getMovie={getMovie} />} />
          <Route path="bookmark" element={<Bookmark bookMarkMovies={bookMarkMovies} bookmarking={bookmarking} />} />
          <Route path="moviedetail/:id" element={<MovieDetail showMovie={showMovie} />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </MovieContext.Provider>

    </div>
  );
}
export const MovieContext = createContext(data)

export default App;

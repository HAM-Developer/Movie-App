import './App.css';
import Home from './Page/Home';
import Bookmark from './Components/Bookmark/Bookmark';
import Movies from './Components/Movies/Movies';
import Series from './Components/Series/Series';
import { Route, Routes } from 'react-router-dom';
import Notfound from './Components/NotFound/Notfound';
import Header from './Components/Header/Header';
import MovieDetail from './Page/MovieDetail/MovieDetail';
import TVDetail from './Page/TVDetail/TVDetail';
import { createContext } from 'react';
export const BookmarkContext = createContext(null)
function App() {
  let bookMarkMovies = []
  function addBookmarkMovie(e) {
    bookMarkMovies.push(e.target.parentElement)
    console.log(e)
  }
  console.log(bookMarkMovies)
  return (
    <div className="App">
      <BookmarkContext.Provider value={addBookmarkMovie}>
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="movies" element={<Movies />} />
          <Route path="series" element={<Series />} />
          <Route path="bookmark" element={<Bookmark bookMarkMovies={bookMarkMovies} />} />
          <Route path="moviedetail/:id" element={<MovieDetail />} />
          <Route path="tvdetail/:id" element={<TVDetail />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </BookmarkContext.Provider>
    </div>
  );
}
export default App;

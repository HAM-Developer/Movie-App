import React, { useEffect, useState } from 'react'
import Movie from '../Movie/Movie'
import "../Home/Home.css"
import { API_KEY } from '../../API'
import axios from 'axios'

const Movies = () => {
    const [movieFeed, setMovieFeed] = useState([])
    const [changeFeed, setChangeFeed] = useState([])
    const [movieCategories, setMovieCategories] = useState([])
    function changeMovieFeed(e) {
        setChangeFeed(movieFeed.filter(movie => parseInt(movie.genre_ids[0]) === e))
    }
    const getMovieData = () => {
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US`).then((response) => setMovieFeed(response.data.results))
        axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`).then((response) => setMovieCategories(response.data.genres))
    }
    useEffect(() => {
        getMovieData()
    }, [])
    return (
        <div className='movies_only'>
            <div className="movie_categories categories_filter">
                <ul>
                    {
                        movieCategories.map(category => (
                            <li className="genre" id={category.id} key={category.id} onClick={() => changeMovieFeed(category.id)}>{category.name}</li>
                        ))
                    }
                </ul>
            </div>
            <h1 className='page_heading'>Movies</h1>
            <div className='movies'>    {changeFeed.length === 0 ?
                movieFeed.map(dataset => (
                    <Movie key={dataset.id} id={dataset.id} movieTitle={dataset.title} movieImage={dataset.poster_path} movieRating={dataset.vote_average} movieYear={dataset.release_date} movieGenre={dataset.genre_ids} />
                ))
                :
                changeFeed.map(dataset => (
                    <Movie key={dataset.id} id={dataset.id} movieTitle={dataset.title} movieImage={dataset.poster_path} movieRating={dataset.vote_average} movieYear={dataset.release_date} movieGenre={dataset.genre_ids} />))

            }</div>

        </div>
    )
}

export default Movies
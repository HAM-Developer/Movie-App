import React, { useContext, useEffect, useState } from 'react'
import "./MovieDetail.css"
import axios from 'axios'
import { API_KEY } from '../../API'
import Movie from '../../Components/Movie/Movie'
import { useParams } from 'react-router-dom'
const MovieDetail = () => {
    const { id } = useParams()
    const [movieReviews, setMovieReviews] = useState([])
    const [movieDetails, setMovieDetails] = useState([])
    const [similarMovies, setSimilarMovies] = useState([])
    useEffect(() => {
        getData()
        window.scrollTo(0, 0)
    }, [id])
    const getData = () => {
        axios.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}&language=en-US`).then(function (res) {
            setSimilarMovies(res.data.results)
        })
        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`).then(function (res) {
            setMovieDetails(res.data)
        })
        axios.get(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}&language=en-US`).then(function (res) {
            setMovieReviews(res.data.results)
        })
    }
    return (
        <div className='moviedetail'>
            <div className='moviedetail_wrapper'>
                <img src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`} alt={movieDetails.title} />
                <div className='movieInfo'>
                    <h2>{movieDetails.title}</h2>
                    <p>{movieDetails.tagline}</p>
                    <div className='movieInfo_description'>
                        <h3>Description</h3>
                        <p>{movieDetails.overview}</p>
                    </div>
                    <div className='movieInfo_date'>
                        <p>Release Date: </p>
                        <p>{movieDetails.release_date}</p>
                    </div>
                    <div className='movieInfo_genre'>
                        <p>Genre: </p>
                        {movieDetails.genres ? movieDetails.genres.map(genre => <p key={genre.id}>{genre.name}</p>) : ""}
                    </div>
                    <div className='movieInfo_rating'>
                        <p>Rating:</p>
                        <p>{`${movieDetails.vote_average}`.slice(0, 3)}</p>
                    </div>
                </div>
                <div className='movie_reviews'>
                    {movieReviews.length !== 0 ? movieReviews.map(review => <div className='review' key={review.id}>
                        <h3>{review.author}</h3>
                        <p className='review__content'>{review.content}</p>
                    </div>) : <p>No reviews yet</p>}
                </div>
            </div>
            <div className='movies'>
                <h1 >Similar Movies</h1>
                {
                    similarMovies.map(dataset => (
                        <Movie key={dataset.id} id={dataset.id} movieTitle={dataset.title} movieImage={dataset.poster_path} movieRating={dataset.vote_average} movieYear={dataset.release_date} movieGenre={dataset.genre_ids} />
                    ))
                }
            </div>
        </div>
    )
}

export default MovieDetail
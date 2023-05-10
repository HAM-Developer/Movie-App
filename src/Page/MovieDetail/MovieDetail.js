import React, { useRef, useEffect, useState } from 'react'
import "./MovieDetail.css"
import axios from 'axios'
import Movie from '../../Components/Movie/Movie'
import { useParams } from 'react-router-dom'
import { API_KEY } from '../../API'

const MovieDetail = () => {
    const { id } = useParams()
    const descHeight = useRef(null)
    const descConRef = useRef(null)
    const descBtnRef = useRef("More")
    const [movieDetails, setMovieDetails] = useState([])
    const [similarMovies, setSimilarMovies] = useState([])
    function showDescription() {
        let descConHeight = window.getComputedStyle(descConRef.current).maxHeight
        if (descConHeight === "75px") {
            descConRef.current.style.maxHeight = window.getComputedStyle(descHeight.current).maxHeight
            descBtnRef.current.childNodes[1].innerHTML = "Less"
        } else {
            descConRef.current.style.maxHeight = "75px"
            descBtnRef.current.childNodes[1].innerHTML = "More"
        }

    }
    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}&language=en-US`).then(function (res) {
            setSimilarMovies(res.data.results)
        })
        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`).then(function (res) {
            setMovieDetails(res.data)
        })
        window.scrollTo(0, 0)
    }, [id])

    return (
        <div className='moviedetail'>
            <div className='moviedetail_container' style={{
                backgroundImage:
                    `url('https://image.tmdb.org/t/p/w1280${movieDetails.backdrop_path}')`
            }}>
                <div className='moviedetail_wrapper' >
                    <img className='moviedetail_img' src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`} alt={movieDetails.title} />
                    <div className='movieInfo'>
                        <h2>{movieDetails.title}</h2>
                        <p>{movieDetails.tagline}</p>
                        <div className='movieInfo_description'>
                            <h3>Description</h3>
                            <div className='desc_container' ref={descConRef}>
                                <p ref={descHeight}>{movieDetails.overview}</p>
                            </div>
                            <span className='read_btn' onClick={showDescription} ref={descBtnRef}>
                                Read <span>More</span></span>
                        </div>
                        <div className='movieInfo_date'>
                            <h3>Release Date:</h3>
                            <p>{movieDetails.release_date}</p>
                        </div>
                        <div className='movieInfo_genre'>
                            <h3>Genre:</h3>
                            {movieDetails.genres ? movieDetails.genres.map(genre => <p key={genre.id}>{genre.name}</p>) : ""}
                        </div>
                        <div className='movieInfo_rating'>
                            <h3>Rating:</h3>
                            <p>{`${movieDetails.vote_average}`.slice(0, 3)}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='movies similar_movies'>
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
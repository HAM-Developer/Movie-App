import React, { useRef, useEffect, useState } from 'react'
import "./MovieDetail.css"
import axios from 'axios'
import { API_KEY } from '../../API'
import Movie from '../../Components/Movie/Movie'
import { useParams } from 'react-router-dom'
const MovieDetail = () => {
    const { id } = useParams()
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
    }
    const descHeight = useRef(null)
    const descConRef = useRef(null)
    const descBtnRef = useRef("More")
    function showDescription() {
        let descConHeight = window.getComputedStyle(descConRef.current).maxHeight
        if (descConHeight === "80px") {
            descConRef.current.style.maxHeight = window.getComputedStyle(descHeight.current).maxHeight
            descBtnRef.current.childNodes[1].innerHTML = "Less"
        } else {
            descConRef.current.style.maxHeight = "80px"
            descBtnRef.current.childNodes[1].innerHTML = "More"
        }
        console.log(descConHeight)
        console.log(descConRef.current)
    }
    return (
        <div className='moviedetail'>
            <div className='moviedetail_wrapper'>
                <img className='movie_bg' src={`https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`} alt={movieDetails.title} />
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
            </div>
            <h1 >Similar Movies</h1>
            <div className='movies'>
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
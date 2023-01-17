import React from 'react'
import { Link } from 'react-router-dom'

const MovieCard = ({ id, movieImage, movieTitle, seriesTitle, movieDesc }) => {
    return (
        <div className='moviecard'>
            <img className='movie_img' src={`https://image.tmdb.org/t/p/w500${movieImage}`} alt="movie" />
            <h1 className='movie_title' >{movieTitle ? movieTitle : seriesTitle}</h1>
            <p>{movieDesc}</p>
            <li className="movie_link">
                <Link to={`/moviedetail/${id}`}>Get Details</Link>
            </li>
        </div>
    )
}

export default MovieCard
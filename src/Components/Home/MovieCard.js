import React from 'react'
import { Link } from 'react-router-dom'
import "./Home.css"

const MovieCard = ({ id, movieImage, movieTitle, seriesTitle, movieDesc }) => {
    return (
        <div className='moviecard' style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movieImage})` }} >
            <div className='moviecard_info'>
                <h1 className='movie_title' >{movieTitle ? movieTitle : seriesTitle}</h1>
                <p>{movieDesc}</p>
                <li className="movie_link">
                    <Link to={`/moviedetail/${id}`}>Get Details</Link>
                </li>
            </div>
        </div>
    )
}

export default MovieCard 
import { Link } from "react-router-dom"
import React from 'react'
import "./Movie.css"
import { BookmarkIcon } from '@heroicons/react/24/outline'
import { BiCameraMovie } from 'react-icons/bi'

function Movie({ id, movieImage, movieYear, movieGenre, movieTitle, movieRating, bookmarking, getMovie }) {
    return (
        <div className='movie'>
            <img className='movie_img' src={movieImage} alt="movie" />
            <div className='movie__info'>
                <div className='movie__wrapper'>
                    <p className='movie__year'>{movieYear}</p>
                    <p className='movie__category'><BiCameraMovie />  {movieGenre}</p>
                    <p className='movie__rating'>{movieRating}</p>
                </div>
                <Link to={`/moviedetail/${id}`} className='movie_title' onClick={() => getMovie(id)}>{movieTitle}</Link>
            </div>
            <div className='bookmarkedIcon' onClick={() => bookmarking()}><BookmarkIcon /></div>
        </div>
    )
}

export default Movie
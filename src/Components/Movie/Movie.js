import { Link } from "react-router-dom"
import React, { useContext, useEffect, useState } from 'react'
import { MovieContext } from "../../App"
import "./Movie.css"
import { BookmarkIcon } from '@heroicons/react/24/outline'

function Movie({ id, movieImage, movieYear, movieGenre, movieTitle, movieRating }) {
    const { movieCategories } = useContext(MovieContext)
    const IMG_URL = "https://image.tmdb.org/t/p/w500"
    const date = new Date()
    const timeYear = date.getMonth() - parseInt(movieYear.slice(5, 7))

    return (
        <div className='movie'>
            <img className='movie_img' src={`${IMG_URL}${movieImage}`} alt="movie" />
            <div className='movie__info'>
                <div className='movie__wrapper'>
                    <p className='movie__year'>{timeYear > 1 ? `${timeYear} months ago` : "1 month ago"} </p>
                    <p className='movie__rating'>{`${movieRating}`.slice(0, 3)}</p>
                </div>
                <li className="movie_link">
                    <Link to={`/moviedetail/${id}`} className='movie_title' >{movieTitle}</Link>
                </li>
            </div>
            <div className='bookmarkedIcon'><BookmarkIcon /></div>
        </div>
    )
}

export default Movie
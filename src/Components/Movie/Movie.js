import { Link } from "react-router-dom"
import React, { useState } from 'react'
import "./Movie.css"
import { BookmarkIcon } from '@heroicons/react/24/outline'

function Movie({ id, movieImage, movieYear, movieTitle, movieRating }) {
    const date = new Date()
    const movieDate = new Date(movieYear.slice(0, 4), movieYear.slice(5, 7), movieYear.slice(8, 10))
    const movieMonth = date.getMonth() - parseInt(movieYear.slice(5, 7))
    let different = date - movieDate
    let secos = 1000 * 60 * 60 * 24
    let days = Math.round(different / secos)
    // console.log(movieYear.slice(8, 10))
    // console.log(date)
    console.log(movieDate)
    console.log(Math.round(different / secos))

    return (
        <div className='movie'>
            <img className='movie_img' src={`https://image.tmdb.org/t/p/w500${movieImage}`} alt="movie" />
            <div className='movie__info'>
                <div className='movie__wrapper'>
                    <p className='movie__year'>{days < 0 ? "Coming Soon" : `${days} days ago`} </p>
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
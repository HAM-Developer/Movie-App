import { BookmarkIcon } from '@heroicons/react/24/outline'
import { Link } from "react-router-dom"
import React from 'react'
import { BiCameraMovie } from 'react-icons/bi'

const TV = ({ id, movieImage, movieYear, movieGenre, movieTitle, movieRating, getSeries }) => {
    const IMG_URL = "https://image.tmdb.org/t/p/w500"
    movieYear = movieYear.slice(0, 4)
    return (
        <div className='movie tv_series'>
            <img className='movie_img' src={`${IMG_URL}${movieImage}`} alt="movie" />
            <div className='movie__info'>
                <div className='movie__wrapper'>
                    <p className='movie__year'>{movieYear}</p>
                    <p className='movie__category'><BiCameraMovie />  {movieGenre}</p>
                    <p className='movie__rating'>{movieRating}</p>
                </div>
                <li className="movie_link">
                    <Link to={`/seriesdetail/${id}`} className='movie_title' onClick={() => getSeries(id)}>{movieTitle}</Link>
                </li>
            </div>
            <div className='bookmarkedIcon' ><BookmarkIcon /></div>
        </div>
    )
}

export default TV
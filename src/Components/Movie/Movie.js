import { Link } from "react-router-dom"
import React, { useEffect, useState } from 'react'
import "./Movie.css"
import { BookmarkIcon } from '@heroicons/react/24/outline'

function Movie({ id, movieImage, movieYear, movieTitle, movieRating, seriesYear, seriesTitle }) {
    const [time, setTime] = useState('days')
    const [days, setDays] = useState(null)
    const [seriesDays, setSeriesDays] = useState(null)
    const movieDate = () => {
        setDays(Math.round(((new Date) - (new Date(`${movieYear}`))) / (1000 * 60 * 60 * 24)))
        setSeriesDays(Math.round(((new Date) - (new Date(`${seriesYear}`))) / (1000 * 60 * 60 * 24)))
    }
    useEffect(() => {
        movieDate()
    }, [])

    return (
        <div className='movie'>
            <img className='movie_img' src={`https://image.tmdb.org/t/p/w500${movieImage}`} alt="movie" />
            <div className='movie__info'>
                <div className='movie__wrapper'>
                    <p className='movie__year'>{days ? `${days} ${time} ago` : `${seriesDays} ${time} ago`} </p>
                    <p className='movie__rating'>{`${movieRating}`.slice(0, 3)}</p>
                </div>
                <li className="movie_link">
                    <Link to={`/moviedetail/${id}`} className='movie_title' >{movieTitle ? movieTitle : seriesTitle}</Link>
                </li>
            </div>
            <div className='bookmarkedIcon'><BookmarkIcon /></div>
        </div>
    )
}

export default Movie
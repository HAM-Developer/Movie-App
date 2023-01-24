import { Link } from "react-router-dom"
import React, { useEffect, useRef, useState } from 'react'
import "./Movie.css"
import { BookmarkIcon } from '@heroicons/react/24/outline'

function Movie({ id, movieImage, movieYear, movieTitle, movieRating, seriesYear, seriesTitle }) {
    const timeRef = useRef(null)
    const [time, setTime] = useState('days')
    const [seriesTime, setSeriesTime] = useState('days')
    const [days, setDays] = useState(null)
    const [seriesDays, setSeriesDays] = useState(null)
    const movieDate = () => {
        setDays(Math.round(((new Date) - (new Date(`${movieYear}`))) / (1000 * 60 * 60 * 24)))
        setSeriesDays(Math.round(((new Date) - (new Date(`${seriesYear}`))) / (1000 * 60 * 60 * 24)))
        if (days > 30) {
            setTime('month')
            setSeriesTime('month')
            // setDays(Math.round(days / 30))
        } if (days > 360) {
            // setDays(Math.round(days / 360))
            setSeriesTime('year')
            setTime("year")
        }
        console.log('timeRef')
    }
    useEffect(() => {
        movieDate()
    }, [movieDate])

    return (
        <div className='movie'>
            <img className='movie_img' src={`https://image.tmdb.org/t/p/w500${movieImage}`} alt="movie" />
            <div className='movie__info'>
                <li className="movie_link">
                    <Link to={`/moviedetail/${id}`} className='movie_title' >{movieTitle ? movieTitle : seriesTitle}</Link>
                </li>
                <div className='movie__wrapper'>
                    <p className='movie__year' ref={timeRef}>{days ? `${days} ${time} ago` : `${seriesDays} ${seriesTime} ago`} </p>
                    <p className='movie__rating'>{`${movieRating}`.slice(0, 3)}</p>
                </div>
            </div>
            <div className='bookmarkedIcon'><BookmarkIcon /></div>
        </div>
    )
}

export default Movie
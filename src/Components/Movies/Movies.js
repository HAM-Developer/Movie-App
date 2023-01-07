import React, { useContext } from 'react'
import Movie from '../Movie/Movie'
import { MovieContext } from "../../App"
import "../Section/Section.css"

const Movies = ({ bookmarking, getMovie }) => {
    const moviesFeed = useContext(MovieContext)
    let moviesOnly = []
    moviesFeed.forEach(movie => {
        if (movie.category === "movie") {
            moviesOnly.push(movie)
        }
    })
    return (
        <div className='movies_only'>
            <h1 className='page_heading'>Movies</h1>
            <div className='movies'>    {
                moviesOnly.map(dataset => (
                    <Movie
                        key={dataset.id} id={dataset.id} getMovie={getMovie}
                        movieTitle={dataset.title} movieGenre={dataset.genre} movieRating={dataset.rating} movieImage={dataset.image} movieYear={dataset.year} bookmarking={bookmarking} />))
            }</div>
        </div>
    )
}

export default Movies
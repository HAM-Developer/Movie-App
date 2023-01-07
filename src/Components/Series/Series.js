import React, { useContext } from 'react'
import Movie from '../Movie/Movie'
import { MovieContext } from "../../App"
import "../Section/Section.css"

const Series = ({ bookmarking, getMovie }) => {
    const moviesFeed = useContext(MovieContext)
    let seriesOnly = []
    moviesFeed.forEach(movie => {
        if (movie.category === "series") {
            seriesOnly.push(movie)
        }
    })
    return (
        <div className='series'>
            <h1 className='page_heading'>Series</h1>
            <div className='movies'>    {
                seriesOnly.map(dataset => (
                    <Movie
                        key={dataset.id} id={dataset.id} getMovie={getMovie}
                        movieTitle={dataset.title} movieGenre={dataset.genre} movieRating={dataset.rating} movieImage={dataset.image} movieYear={dataset.year} bookmarking={bookmarking} />))

            }</div>
        </div>
    )
}

export default Series
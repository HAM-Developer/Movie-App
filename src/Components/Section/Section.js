import React, { useContext } from 'react'
import { BsSearch } from 'react-icons/bs'
import Movie from '../Movie/Movie'
import { MovieContext } from "../../App"
import "./Section.css"
function Section({ movieFeed, bookmarking, getMovie }) {
    const moviesFeed = useContext(MovieContext)
    let trendingOnly = []
    moviesFeed.forEach(movie => {
        if (movie.trending === true) {
            trendingOnly.push(movie)
        }
    })
    return (
        <div className='section'>
            <div className='movie__section'>
                <div className='search' >
                    <BsSearch className='searchIcon' />
                    <input type="text" placeholder="Search for movies and TV series" />
                </div>
                <h1>Trending Movies</h1>
                <div className="trending__wrapper">
                    <div className="trending__movies">
                        {
                            trendingOnly.map(trending =>
                                <Movie
                                    key={trending.id} id={trending.id}
                                    movieTitle={trending.title} movieGenre={trending.genre} movieRating={trending.rating} movieImage={trending.image} movieYear={trending.year}
                                    getMovie={getMovie} />)
                        }
                    </div>
                </div>
                <h1>Recommended for you</h1>
                <div className='movies'>
                    {
                        movieFeed.map(dataset => (
                            <Movie
                                key={dataset.id} id={dataset.id}
                                movieTitle={dataset.title} movieGenre={dataset.genre} movieRating={dataset.rating} movieImage={dataset.image} movieYear={dataset.year} bookmarking={bookmarking} getMovie={getMovie} />))
                    }
                </div>
            </div>
        </div>
    )
}

export default Section
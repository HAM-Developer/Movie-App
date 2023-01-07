import React, { useContext } from 'react'
import Movie from '../Movie/Movie'
import { MovieContext } from "../../Page/Home"
import "../Home/Home.css"

const Bookmark = ({ bookMarkMovies }) => {
    return (
        <div className='bookmarkMovies'>
            <h1 className='page_heading'>Bookmark Movies</h1>
            <div className=' movies'>
                {bookMarkMovies.length === 0 ? <h1>No BookMark Movies Yet</h1> :
                    bookMarkMovies.map(dataset => (
                        <Movie
                            key={dataset.id} id={dataset.id}
                            movieTitle={dataset.title} movieGenre={dataset.genre} movieRating={dataset.rating} movieImage={dataset.image} movieYear={dataset.year} />))

                }</div>
        </div>
    )
}

export default Bookmark



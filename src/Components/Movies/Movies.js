import React, { useEffect, useState } from 'react'
import Movie from '../Movie/Movie'
import "../Home/Home.css"
import { API_KEY } from '../../API'
import { motion } from "framer-motion"
import axios from 'axios'

const Movies = () => {
    const [movieFeed, setMovieFeed] = useState([])
    const [changeFeed, setChangeFeed] = useState([])
    const [categoryId, setCategoryId] = useState([])
    const [movieCategories, setMovieCategories] = useState([])
    function changeMovieFeed(e) {
        setChangeFeed(movieFeed.filter(movie => parseInt(movie.genre_ids[0]) === e))
        if (e === 13) {
            setChangeFeed(movieFeed)
        }
        setCategoryId(e)
    }
    const getMovieData = () => {
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US`).then((response) => setMovieFeed(response.data.results))
        axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`).then((response) => setMovieCategories([{ id: 13, name: 'All' }].concat(response.data.genres)))
        // const allCategory = [{ id: 13, name: 'All' }]
        // setMovieCategories(allCategory.concat(movieCategories))
        console.log(movieCategories)
    }
    useEffect(() => {
        getMovieData()

    }, [])
    return (
        <div className='movies_only'>
            <div className="movie_categories categories_filter"  >
                <motion.div className="movie_categoryList " drag='x' dragConstraints={{ left: -391, right: 0 }} dragElastic="0.1" dragMomentum={false} >
                    {
                        movieCategories.map(category => (
                            <li className={`${category.id === categoryId ? "active_category" : "genre"}`} key={category.id} onClick={() => changeMovieFeed(category.id)}>{category.name}</li>

                        ))
                    }
                </motion.div>
            </div>
            <h1 className='page_heading'>Movies</h1>
            <div className='movies'>    {changeFeed.length === 0 ?
                movieFeed.map(dataset => (
                    <Movie key={dataset.id} id={dataset.id} movieTitle={dataset.title} movieImage={dataset.poster_path} movieRating={dataset.vote_average} movieYear={dataset.release_date} movieGenre={dataset.genre_ids} />
                ))
                :
                changeFeed.map(dataset => (
                    <Movie key={dataset.id} id={dataset.id} movieTitle={dataset.title} movieImage={dataset.poster_path} movieRating={dataset.vote_average} movieYear={dataset.release_date} movieGenre={dataset.genre_ids} />))

            }</div>

        </div>
    )
}

export default Movies
import React, { useEffect, useRef, useState } from 'react'
import Movie from '../Movie/Movie'
import "../Home/Home.css"
import "../Movie/Movie.css"
import { API_KEY } from '../../API'
import { motion } from "framer-motion"
import axios from 'axios'
import MovieCard from '../Home/MovieCard'

const Movies = () => {
    const [movieFeed, setMovieFeed] = useState([])
    const [changeFeed, setChangeFeed] = useState([])
    const [categoryWidth, setCategoryWidth] = useState(0)
    const [categoryId, setCategoryId] = useState([])
    const [movieCategories, setMovieCategories] = useState([])
    const [selectMovieCategory, setSelectMovieCategory] = useState('')
    const categoryListRef = useRef(null)
    const categoryWrapRef = useRef(null)
    function changeMovieFeed(e) {
        setChangeFeed(movieFeed.filter(movie => parseInt(movie.genre_ids[0]) === e))
        movieCategories.forEach(category => {
            if (category.id === e) {
                setSelectMovieCategory(category.name)
            }
        })
        if (e === 13) {
            setChangeFeed(movieFeed)
        }
        setCategoryId(e)
    }
    const getMovieData = () => {
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US`).then((response) => setMovieFeed(response.data.results))
        axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`).then((response) => setMovieCategories([{ id: 13, name: 'All' }].concat(response.data.genres)))
    }
    useEffect(() => {
        const categoryListWidth = categoryListRef.current.clientWidth
        getMovieData()
        setCategoryWidth(categoryListWidth - 1654)
    }, [categoryListRef, categoryWidth])

    return (
        <div className='movies_only'>
            <div className="movie_categories categories_filter" ref={categoryListRef}>
                <motion.div className="movie_categoryList " ref={categoryWrapRef} style={{ width: 'fit-content' }} drag='x' dragConstraints={{ left: categoryWidth, right: 0 }} dragElastic="0.1" dragMomentum={false} >
                    {
                        movieCategories.map(category => (
                            <li className={`${category.id === categoryId ? "active_category" : "genre"}`} key={category.id} onClick={() => changeMovieFeed(category.id)}>{category.name}</li>

                        ))
                    }
                </motion.div>
            </div>
            <div className='movies'>    {changeFeed.length !== 0 ?
                changeFeed.map(dataset => (
                    <Movie key={dataset.id} id={dataset.id} movieTitle={dataset.title} movieImage={dataset.poster_path} movieRating={dataset.vote_average} movieYear={dataset.release_date} movieGenre={dataset.genre_ids} />))
                :
                <h1 style={{ marginTop: '1rem', fontWeight: 'normal', textAlign: 'center' }}>No movies regarding <h1 style={{ color: 'var(--pr-clr)' }}>'{selectMovieCategory}'</h1></h1>
            }</div>

        </div>
    )
}

export default Movies
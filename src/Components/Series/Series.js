import "../Home/Home.css"
// import TV from '../TV/TV'
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import Movie from '../Movie/Movie'
import { API_KEY } from "../../API"
import axios from "axios"


const Series = () => {
    const [movieFeed, setMovieFeed] = useState([])
    const [changeFeed, setChangeFeed] = useState([])
    const [categoryWidth, setCategoryWidth] = useState(0)
    const [categoryId, setCategoryId] = useState([])
    const [movieCategories, setMovieCategories] = useState([])
    const categoryListRef = useRef(null)
    const categoryWrapRef = useRef(null)
    function changeMovieFeed(e) {
        setChangeFeed(movieFeed.filter(movie => parseInt(movie.genre_ids[0]) === e))
        if (e === 13) {
            setChangeFeed(movieFeed)
        }
        setCategoryId(e)
    }
    const getMovieData = () => {
        axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US`).then((response) => setMovieFeed(response.data.results))
        axios.get(`https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=en-US`).then((response) => setMovieCategories([{ id: 13, name: 'All' }].concat(response.data.genres)))
    }
    useEffect(() => {
        const categoryListWidth = categoryListRef.current.clientWidth
        getMovieData()
        setCategoryWidth(categoryListWidth - 1654)
    }, [categoryListRef, categoryWidth])

    return (
        <div className='series'>
            <div className="series_categories categories_filter" ref={categoryListRef}>
                <motion.div className="movie_categoryList " ref={categoryWrapRef} style={{ width: 'fit-content' }} drag='x' dragConstraints={{ left: categoryWidth, right: 0 }} dragElastic="0.1" dragMomentum={false} >
                    {
                        movieCategories.map(category => (
                            <li className={`${category.id === categoryId ? "active_category" : "genre"}`} key={category.id} onClick={() => changeMovieFeed(category.id)}>{category.name}</li>

                        ))
                    }
                </motion.div>
            </div>
            <div className='movies'>    {changeFeed.length === 0 ?
                movieFeed.map(dataset => (
                    <Movie key={dataset.id} id={dataset.id} seriesTitle={dataset.name} movieImage={dataset.poster_path} movieRating={dataset.vote_average} movieYear={dataset.first_air_date} movieGenre={dataset.genre_ids} />
                ))
                :
                changeFeed.map(dataset => (
                    <Movie key={dataset.id} id={dataset.id} seriesTitle={dataset.name} movieImage={dataset.poster_path} movieRating={dataset.vote_average} movieYear={dataset.first_air_date} movieGenre={dataset.genre_ids} />))

            }</div>
        </div>
    )
}

export default Series
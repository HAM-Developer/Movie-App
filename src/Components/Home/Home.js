import { useContext, useEffect, useState } from 'react'
import { motion } from "framer-motion"
import { BsSearch } from 'react-icons/bs'
import Movie from '../Movie/Movie'
import { MovieContext } from "../../App"
import "./Home.css"
import { API_KEY } from '../../API'
import axios from 'axios'
import MovieCard from '../Movie/MovieCard'
function Section() {
    const [feed, setFeed] = useState([])
    const [topRatedTV, setTopRatedTV] = useState([])
    const { getSeries } = useContext(MovieContext)
    const [nowPlaying, setNowPlaying] = useState([])
    const searchFeed = (e) => {
        setTopRatedTV(topRatedTV.filter(movie => e.target.value === movie.title))
        setFeed(feed.filter(movie => e.target.value === movie.title[0]))
        topRatedTV.forEach(movie => console.log(movie.title[0]))
        console.log(e.target.value)
    }
    const getData = () => {
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US`).then((response) => setFeed(response.data.results))
        axios.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US`).then((response) => setTopRatedTV(response.data.results))
        axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US`).then((response) => setNowPlaying(response.data.results))
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <div className='section'>
            <div className='movie__section'>
                {/* <div className='search' >
                    <BsSearch className='searchIcon' />
                    <input type="text" placeholder="Search for movies and TV series" onChange={searchFeed} />
                </div> */}
                <div className='heroImages ' >
                    {
                        nowPlaying.slice(0, 4).map(dataset => (
                            <MovieCard key={dataset.id} id={dataset.id} movieTitle={dataset.title} movieImage={dataset.poster_path} movieDesc={dataset.overview} movieGenre={dataset.genre_ids} />
                        ))
                    }
                </div>
                <h1>Upcoming Movies</h1>
                <div className='upcoming_movies ' >
                    <motion.div className='movies_wrapper' drag='x' dragConstraints={{ left: -2800, right: 0 }} dragElastic="0.1" dragMomentum={false}  >
                        {
                            topRatedTV.map(dataset => (
                                <Movie key={dataset.id} id={dataset.id} seriesTitle={dataset.name} movieImage={dataset.poster_path} movieRating={dataset.vote_average} seriesYear={dataset.first_air_date} getSeries={getSeries} />
                            ))
                        }
                    </motion.div>
                </div>
                <h1>Recommended for you</h1>
                <div className='movies'>
                    {
                        feed.map(dataset => (
                            <Movie key={dataset.id} id={dataset.id} movieTitle={dataset.title} movieImage={dataset.poster_path} movieRating={dataset.vote_average} movieYear={dataset.release_date} movieGenre={dataset.genre_ids} />
                        ))
                    }
                </div>
            </div>
        </div >
    )
}

export default Section
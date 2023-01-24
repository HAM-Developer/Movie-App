import { useContext, useEffect, useRef, useState } from 'react'
import { motion } from "framer-motion"
import { BsSearch } from 'react-icons/bs'
import Movie from '../Movie/Movie'
import { MovieContext } from "../../App"
import "./Home.css"
import { API_KEY } from '../../API'
import axios from 'axios'
import MovieCard from './MovieCard'
import CarouselCard from './CarouselCard'
function Section() {
    const movieContainer = useRef(null)
    const [sliderWidth, setSliderWidth] = useState(0)
    const [feed, setFeed] = useState([])
    const [nowPlaying, setNowPlaying] = useState([])
    const [topRatedTV, setTopRatedTV] = useState([])
    const { getSeries } = useContext(MovieContext)
    // const searchFeed = (e) => {
    //     setTopRatedTV(topRatedTV.filter(movie => e.target.value === movie.title))
    //     setFeed(feed.filter(movie => e.target.value === movie.title[0]))
    //     topRatedTV.forEach(movie => console.log(movie.title[0]))
    //     console.log(e.target.value)
    // }
    const getData = () => {
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US`).then((response) => setFeed(response.data.results))
        axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US`).then((response) => setNowPlaying(response.data.results))
        axios.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US`).then((response) => setTopRatedTV(response.data.results))
    }
    useEffect(() => {
        const movieContainerWidth = movieContainer.current.clientWidth
        getData()
        setSliderWidth(movieContainerWidth - 4000)
    }, [movieContainer])


    return (
        <div className='section'>
            <div className='movie__section'>
                {/* <div className='search' >
                    <BsSearch className='searchIcon' />
                    <input type="text" placeholder="Search for movies and TV series" onChange={searchFeed} />
                 </div> */}

                <motion.div className='heroImages '
                >
                    {
                        nowPlaying.slice(0, 10).map(dataset => (
                            <MovieCard key={dataset.id} id={dataset.id} movieTitle={dataset.title} movieImage={dataset.backdrop_path} movieDesc={dataset.overview} movieGenre={dataset.genre_ids} />
                        ))
                    }
                </motion.div>
                <h1 className='heading'>Upcoming Movies</h1>
                <div className='upcoming_movies ' ref={movieContainer} >
                    <motion.div className='movies_wrapper' style={{ width: topRatedTV.length * 200 }} drag='x' dragConstraints={{ left: sliderWidth, right: 0 }} dragElastic="0.1" dragMomentum={false}  >
                        {
                            topRatedTV.map(dataset => (
                                <Movie key={dataset.id} id={dataset.id} seriesTitle={dataset.name} movieImage={dataset.poster_path} movieRating={dataset.vote_average} seriesYear={dataset.first_air_date} getSeries={getSeries} />
                            ))
                        }
                    </motion.div>
                </div>
                <h1 className='heading'>Top TV Shows</h1>
                <CarouselCard />
                <h1 className='heading'>Recommended for you</h1>
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
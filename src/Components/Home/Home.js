import { useContext, useEffect, useRef, useState } from 'react'
import { motion } from "framer-motion"
import Movie from '../Movie/Movie'
import { MovieContext } from "../../App"
import "./Home.css"
import { API_KEY } from '../../API'
import axios from 'axios'
import MovieCard from './MovieCard'
import CarouselCard from './CarouselCard'
import formSvg from "./formSVG.svg"
function Home() {
    const movieContainer = useRef(null)
    const [sliderWidth, setSliderWidth] = useState(0)
    const [nowPlaying, setNowPlaying] = useState([])
    const [topRatedTV, setTopRatedTV] = useState([])
    const { getSeries } = useContext(MovieContext)

    const getData = () => {
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
                <motion.div className='heroImages '
                >
                    {
                        nowPlaying.slice(0, 10).map(dataset => (
                            <MovieCard key={dataset.id} id={dataset.id} movieTitle={dataset.title} movieImage={dataset.backdrop_path} movieDesc={dataset.overview} movieGenre={dataset.genre_ids} />
                        ))
                    }
                </motion.div>
                <h1 className='heading'>Top Rated TV Shows</h1>
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
                <form>
                    <div className='form_wrapper1'>
                        <img src={formSvg} alt="form svg" />
                    </div>
                    <div className='form_Wrapper'>
                        <div className='input_info'>
                            <label>Username:</label>
                            <input type='text' placeholder='Username' />
                        </div>
                        <div className='input_info'>
                            <label>Email:</label>
                            <input type='text' placeholder='Email Address' />
                        </div>
                        <label>Message:</label>
                        <textarea placeholder='Your message here ...' />
                        <button type='submit' >Submit</button>
                    </div>
                </form>
                <footer>
                    &copy; Copyright 2023. All rights reserved
                </footer>
            </div>
        </div >
    )
}

export default Home
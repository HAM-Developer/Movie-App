import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { API_KEY } from '../../API'

const CarouselCard = () => {
    const [count, setCount] = useState(0)
    const [nowPlaying, setNowPlaying] = useState([])
    const sliderRange = 100
    const containerWidth = 6 * sliderRange
    const sliderReCount = sliderRange - containerWidth
    const getData = () => {

        axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US`).then((response) => setNowPlaying((response.data.results).slice(0, 6)))
    }
    useEffect(() => {
        getData()
    }, [])
    if (count > 0) {
        setCount(sliderReCount)
    }
    if (count < sliderReCount) {
        setCount(0)
    }
    const prevSlide = () => {
        setCount(count + sliderRange)
    }
    const nextSlide = () => {
        setCount(count - sliderRange)
    }
    // const showCurrentSlide = (e) => {
    //     setCount("0")
    //     console.log(e)
    // }
    return (
        <div className="imageCarousel">
            <button className="prevBtn" onClick={prevSlide}><BsChevronLeft /></button>
            <div className="carousel">
                <div className="carousel-container" style={{ left: `${count}%`, width: `${containerWidth}%` }}>
                    {
                        nowPlaying.map(dataset => (
                            <img key={dataset.id} src={`https://image.tmdb.org/t/p/w500${dataset.backdrop_path}`} />
                        ))
                    }

                </div>
            </div>
            <button className="nextBtn" onClick={nextSlide}> <BsChevronRight /> </button>
            {/* <div className="indicators-container">
                {
                    nowPlaying.map(dataset => (
                        <div className="indicator" key={dataset.id} onClick={() => showCurrentSlide(dataset.id)}></div>
                    )
                    )
                }
            </div> */}
        </div>
    )
}

export default CarouselCard 
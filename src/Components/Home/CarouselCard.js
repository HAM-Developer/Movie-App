import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { API_KEY } from '../../API'

const CarouselCard = () => {
    const carouselWidthRef = useRef(null)
    const containerWidthRef = useRef(null)
    const [count, setCount] = useState(0)
    const [nowPlaying, setNowPlaying] = useState([])
    const [carouselWidth, setCarouselWidth] = useState(0)
    const [containerWidth, setContainerWidth] = useState(0)
    const sliderReCount = carouselWidth - containerWidth
    const getData = () => {
        axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US`).then((response) => setNowPlaying(response.data.results))
    }
    if (count > 0) {
        setCount(sliderReCount)
    }
    if (count < sliderReCount) {
        setCount(0)
    }
    const prevSlide = () => {
        setCount(count + carouselWidth)
    }
    const nextSlide = () => {
        setCount(count - carouselWidth)
    }
    // const showCurrentSlide = (e) => {
    //     setCount("0")
    //     console.log(e)
    // }
    useEffect(() => {
        setCarouselWidth(carouselWidthRef.current.clientWidth)
        setContainerWidth(containerWidthRef.current.clientWidth)
        setTimeout(() => {
            setCount(count - carouselWidth)
            console.log(count)
        }, 5000);
        getData()
    }, [carouselWidthRef, containerWidthRef, count])

    return (
        <div className="imageCarousel">
            <button className="prevBtn" onClick={prevSlide}><BsChevronLeft /></button>
            <div className="carousel" ref={carouselWidthRef}>
                <div className="carousel-container" ref={containerWidthRef} style={{ left: count, width: '2000%' }}>
                    {
                        nowPlaying.map(dataset => (
                            <img key={dataset.id} src={`https://image.tmdb.org/t/p/original${dataset.backdrop_path}`} style={{ width: carouselWidth }} />
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
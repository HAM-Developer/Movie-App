import React, { useEffect, useRef, useState } from 'react'
import "../MovieDetail/MovieDetail.css"
import axios from 'axios'
import { API_KEY } from '../../API'
import { useParams } from 'react-router-dom'
import Movie from '../../Components/Movie/Movie'
const TVDetail = () => {

    const { id } = useParams()
    const [tvDetails, setTVDetails] = useState([])
    const [similarTV, setSimilarTV] = useState([])
    const descHeight = useRef(null)
    const descConRef = useRef(null)
    const descBtnRef = useRef("More")
    function showDescription() {
        let descConHeight = window.getComputedStyle(descConRef.current).maxHeight
        if (descConHeight === "75px") {
            descConRef.current.style.maxHeight = window.getComputedStyle(descHeight.current).maxHeight
            descBtnRef.current.childNodes[1].innerHTML = "Less"
        } else {
            descConRef.current.style.maxHeight = "75px"
            descBtnRef.current.childNodes[1].innerHTML = "More"
        }

    }

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/tv/${id}/similar?api_key=${API_KEY}&language=en-US`).then(function (res) {
            setSimilarTV(res.data.results)
        })
        axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`).then(function (res) {
            setTVDetails(res.data)
        })
        window.scrollTo(0, 0)
    }, [id])
    return (
        <div className='moviedetail'>
            <div className='moviedetail_container' style={{
                backgroundImage:
                    `url('https://image.tmdb.org/t/p/w1280${tvDetails.backdrop_path}')`
            }}>
                <div className='moviedetail_wrapper'>
                    <img className='moviedetail_img' src={`https://image.tmdb.org/t/p/w500${tvDetails.poster_path}`} alt={tvDetails.title} />
                    <div className='movieInfo'>
                        <h2>{tvDetails.name}</h2>
                        <p>{tvDetails.tagline}</p>
                        <div className='movieInfo_description'>
                            <h3>Description</h3>
                            <div className='desc_container' ref={descConRef}>
                                <p ref={descHeight}>{tvDetails.overview}</p>
                            </div>
                            <span className='read_btn' onClick={showDescription} ref={descBtnRef}>
                                Read <span>More</span></span>
                        </div>
                        <div className='movieInfo_date'>
                            <h3>Release Date: </h3>
                            <p>{tvDetails.first_air_date}</p>
                        </div>
                        <div className='movieInfo_genre'>
                            <h3>Genre: </h3>
                            {tvDetails.genres ? tvDetails.genres.map(genre => <p key={genre.id}>{genre.name}</p>) : ""}
                        </div>
                        <div className='movieInfo_rating'>
                            <h3>Rating:</h3>
                            <p>{`${tvDetails.vote_average}`.slice(0, 3)}</p>
                        </div>
                        <div className='movieInfo_rating'>
                            <h3>Seasons:</h3>
                            <p>{tvDetails.number_of_seasons}</p>
                        </div>   <div className='movieInfo_rating'>
                            <h3>Episodes:</h3>
                            <p>{tvDetails.number_of_episodes}</p>
                        </div>

                    </div>
                </div>
            </div>
            <div className='movies similar_movies'>
                <h1 >Similar TV Series</h1>
                {
                    similarTV.map(dataset => (
                        <Movie key={dataset.id} id={dataset.id} seriesTitle={dataset.name} movieImage={dataset.poster_path} movieRating={dataset.vote_average} seriesYear={dataset.first_air_date} movieGenre={dataset.genre_ids} />
                    ))
                }
            </div>
        </div>
    )
}

export default TVDetail
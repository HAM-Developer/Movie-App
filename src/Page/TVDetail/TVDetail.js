import React, { useEffect, useState } from 'react'
import "../MovieDetail/MovieDetail.css"
import axios from 'axios'
import { API_KEY } from '../../API'
import TV from '../../Components/TV/TV'
import { useParams } from 'react-router-dom'
const TVDetail = () => {
    const [tvDetails, setTVDetails] = useState([])
    const { id } = useParams()
    const [similarTV, setSimilarTV] = useState([])
    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/tv/${id}/similar?api_key=${API_KEY}&language=en-US`).then(function (res) {
            setSimilarTV(res.data.results)
        })
        axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`).then(function (res) {
            setTVDetails(res.data)
        })
    }, [])


    return (
        <div className='moviedetail'>
            <div className='moviedetail_wrapper'>
                <img src={`https://image.tmdb.org/t/p/w500${tvDetails.poster_path}`} alt={tvDetails.title} />
                <div className='movieInfo'>
                    <h2>{tvDetails.name}</h2>
                    <p>{tvDetails.tagline}</p>
                    <div className='movieInfo_description'>
                        <h3>Description</h3>
                        <p>{tvDetails.overview}</p>
                    </div>
                    <div className='movieInfo_date'>
                        <p>Release Date: </p>
                        <p>{tvDetails.first_air_date}</p>
                    </div>
                    <div className='movieInfo_genre'>
                        <p>Genre: </p>
                        <p>{tvDetails.genre}</p>
                    </div>
                    <div className='movieInfo_rating'>
                        <p>Rating:</p>
                        <p>{`${tvDetails.vote_average}`.slice(0, 3)}</p>
                    </div>
                    <div className='movieInfo_rating'>
                        <p>Seasons:</p>
                        <p>{tvDetails.number_of_seasons}</p>
                    </div>   <div className='movieInfo_rating'>
                        <p>Episodes:</p>
                        <p>{tvDetails.number_of_episodes}</p>
                    </div>
                    <h3 className='movieInfo_actors'>Actors:</h3>
                    <div className='movie_cast'>
                        <div className='movie_actors'>
                            <img src='./images/3idiots.jpg' alt='m' />
                            <h3>Actor Name</h3>
                        </div>
                        <div className='movie_actors'>
                            <img src='./images/3idiots.jpg' alt='m' />
                            <h3>Actor Name</h3>
                        </div>  <div className='movie_actors'>
                            <img src='./images/3idiots.jpg' alt='m' />
                            <h3>Actor Name</h3>
                        </div>  <div className='movie_actors'>
                            <img src='./images/3idiots.jpg' alt='m' />
                            <h3>Actor Name</h3>
                        </div>  <div className='movie_actors'>
                            <img src='./images/3idiots.jpg' alt='m' />
                            <h3>Actor Name</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className='movies'>
                {
                    similarTV.map(dataset => (
                        <TV key={dataset.id} id={dataset.id} movieTitle={dataset.name} movieImage={dataset.poster_path} movieRating={dataset.vote_average} movieYear={dataset.first_air_date} />
                    ))
                }
            </div>
        </div>
    )
}

export default TVDetail
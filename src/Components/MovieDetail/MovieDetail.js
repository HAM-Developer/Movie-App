import React from 'react'
import "./MovieDetail.css"
const MovieDetail = ({ showMovie }) => {
    console.log(showMovie.image)
    return (
        <div className='moviedetail'>
            <div className='moviedetail_wrapper'>
                <img src={showMovie.image} />
                <div className='movieInfo'>
                    <h2>{showMovie.title}</h2>
                    <div className='movieInfo_description'>
                        <h3>Description</h3>
                        <p>{showMovie.description}</p>
                    </div>
                    <div className='movieInfo_genre'>
                        <p>Genre: </p>
                        <p>{showMovie.genre}</p>
                    </div>
                    <div className='movieInfo_rating'>
                        <p>Rating: </p>
                        <p>{showMovie.rating}</p>
                    </div>
                    <h2 className='movieInfo_actors'>Actors:</h2>
                    <div className='movie_cast'>
                        <div className='movie_actors'>
                            <img src='./images/3idiots.jpg' />
                            <h3>Actor Name</h3>
                        </div>
                        <div className='movie_actors'>
                            <img src='./images/3idiots.jpg' />
                            <h3>Actor Name</h3>
                        </div>  <div className='movie_actors'>
                            <img src='./images/3idiots.jpg' />
                            <h3>Actor Name</h3>
                        </div>  <div className='movie_actors'>
                            <img src='./images/3idiots.jpg' />
                            <h3>Actor Name</h3>
                        </div>  <div className='movie_actors'>
                            <img src='./images/3idiots.jpg' />
                            <h3>Actor Name</h3>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default MovieDetail
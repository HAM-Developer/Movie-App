import React, { useState } from 'react'
import Section from '../Components/Section/Section';
const Home = ({ bookmarking, getMovie, data, movieFeed }) => {

    return (
        <div className="App">
            <Section data={data} movieFeed={movieFeed} bookmarking={bookmarking} getMovie={getMovie} />
        </div>
    );
}

export default Home
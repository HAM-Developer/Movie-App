import axios from "axios";


export const API_KEY = process.env.REACT_APP_API_KEY
export const apiget = axios.get(`https://api.themoviedb.org/3/movie/550?api_key=${API_KEY}`).then(function (res) {
    return res
})
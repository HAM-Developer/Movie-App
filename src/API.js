import axios from "axios";
export const API_KEY = 'd38d78ed22ed153a0a1736512a0208f3'
export const apiget = axios.get(`https://api.themoviedb.org/3/movie/550?api_key=${API_KEY}`).then(function (res) {
    return res
})
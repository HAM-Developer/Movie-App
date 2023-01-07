import "./Header.css"
import { Link } from "react-router-dom"
import { IoGrid } from "react-icons/io5";
import { BsFillBookmarkFill } from "react-icons/bs"
import { MdLocalMovies, MdMovie } from "react-icons/md"
import { BiCameraMovie } from "react-icons/bi"
import { SiGravatar } from "react-icons/si"

function Header({ changeFeed, data }) {
    function filterResults(item) {
        const result = data.filter(dataitem => {
            return dataitem.category === item
        })
        changeFeed(result)
    }
    return (
        <header className="header_wrapper" >
            <div className='header'>
                <div className='logo'>
                    <MdMovie />
                </div>
                <nav className='menu' >
                    <Link to="/"><IoGrid className="all" /></Link>
                    <Link to="/movies"><BiCameraMovie className="movies" /></Link>
                    <Link to="/series"><MdLocalMovies className="series" /></Link>
                    <Link to="/bookmark"><BsFillBookmarkFill className="bookmark_movies" /></Link>
                </nav>
                <div className='account_info'>
                    <SiGravatar />
                </div>
            </div>
        </header>
    )
}

export default Header
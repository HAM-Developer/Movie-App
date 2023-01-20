import "./Header.css"
import { Link, useParams } from "react-router-dom"
import { IoGrid } from "react-icons/io5";
import { BsFillBookmarkFill } from "react-icons/bs"
import { MdLocalMovies, MdMovie } from "react-icons/md"
import { BiCameraMovie } from "react-icons/bi"
import { SiGravatar } from "react-icons/si"
import { useState } from "react";

function Header() {
    const links = [
        { path: '/', name: "Home" },
        { path: '/movies', name: "Movies" },
        { path: '/series', name: "Series" },
        { path: '/bookmark', name: "Bookmark" },
    ]
    const [linkId, setLinkId] = useState()
    function activeLink(e) {
        setLinkId(e)
    }
    return (
        <header className="header_wrapper" >
            <div className='header'>
                <div className='logo'>
                    <MdMovie />
                </div>
                <nav className='menu' >
                    {links.map(link => <Link to={link.path} key={link.path} className={`${link.path === linkId ? "active_link" : "links"}`} onClick={() => activeLink(link.path)} >{link.name}</Link>)}
                </nav>
                <div className='account_info'>
                    <SiGravatar />
                </div>
            </div>
        </header>
    )
}

export default Header
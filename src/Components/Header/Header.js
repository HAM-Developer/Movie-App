import "./Header.css"
import { Link } from "react-router-dom"
import { MdMovie } from "react-icons/md"
import { useState } from "react";
import { FiMenu } from "react-icons/fi"
function Header() {
    const [linkId, setLinkId] = useState()
    const [toggleMenu, setToggleMenu] = useState(true)
    const links = [
        { path: '/', name: "Home" },
        { path: '/movies', name: "Movies" },
        { path: '/series', name: "Series" },
        // { path: '/bookmark', name: "Bookmark" },
    ]
    function changeMenu() {
        !toggleMenu ? setToggleMenu(true) : setToggleMenu(false)
    }
    function activeLink(e) {
        setLinkId(e)
        setToggleMenu(true)
    }
    return (
        <header className="header_wrapper" >
            <div className='header'>
                <div className='logo'>
                    <Link to='/'>
                        <MdMovie />
                    </Link>
                </div>
                <nav className={toggleMenu ? 'close_menu' : ' show_menu'} >
                    {links.map(link => <Link to={link.path} key={link.path} className={`${link.path === linkId ? "active_link" : "links"}`} onClick={() => activeLink(link.path)} >{link.name}</Link>)}
                    <button>Sign In</button>
                </nav>
                <FiMenu className="menuBtn" onClick={changeMenu} />
            </div>
        </header>
    )
}

export default Header
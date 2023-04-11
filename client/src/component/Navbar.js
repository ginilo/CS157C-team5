import {Link} from "react-router-dom"

export default function Navbar(){
    return(
        <nav className = "nav">
            <Link to="/" className = "site-title">
                SJSU Pantry
            </Link>
        </nav>
    )
}
import {Link} from "react-router-dom"

export default function Footer(){
    return(
        <nav className = "footer">
            <Link to="/" className = "site-title">
                Footer
            </Link>
        </nav>
    )
}
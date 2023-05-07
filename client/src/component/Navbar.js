import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import { faPortrait} from '@fortawesome/free-solid-svg-icons';



export default function Navbar() {
  return (
    <nav className="nav">
      <div className="navlogo">
        <Link to="/">
          <img
            src="https://i.ibb.co/Mc6LfDh/logo.png"
            alt="logo"
            border="0"
          ></img>
        </Link>
        <h1>Spartan Pantry</h1>
      </div>
      <div className="navmenu">
        <Link to="/Orders">
          <button>Orders</button>
        </Link>
        <Link to="/Resources">
          <button>Resources</button>
        </Link>
        <Link to="/Contact">
          <button>Contact</button>
        </Link>
        <Link to="/Cart"><FontAwesomeIcon icon = {faShoppingCart}/></Link>
        <Link to="/Profile"><FontAwesomeIcon icon = {faPortrait}/></Link>
      </div>
    </nav>
  );
}

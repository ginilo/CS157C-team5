import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Orders from "./pages/Orders";
import Resources from "./pages/Resources";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import {Route, Routes} from "react-router-dom";
import './App.css';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path = "/" element = {<Home />} />
        <Route path = "/Orders" element = {<Orders />} />
        <Route path = "/Resources" element = {<Resources />} />
        <Route path = "/Contact" element = {<Contact/>} />
        <Route path = "/Cart" element = {<Cart />} />
        <Route path = "/Profile" element = {<Profile />} />

      </Routes>
      <Footer />
    </div>

  );
}

export default App;

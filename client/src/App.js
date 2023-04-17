import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Orders from "./pages/Orders";
import Resources from "./pages/Resources";
import {Route, Routes} from "react-router-dom";
import './App.css';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path = "/" element = {<Home />} />
        <Route path = "/orders" element = {<Orders />} />
        <Route path = "/resources" element = {<Resources />} />
        <Route path = "/contact" element = {<Contact/>} />
      </Routes>
      <Footer />
    </div>

  );
}

export default App;

import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Orders from "./pages/Orders";
import Resources from "./pages/Resources";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import SignUp from "./pages/Signup";
import SignIn from "./pages/Signin";
import PreviousOrders from "./pages/PreviousOrders";
import EmployeePortal from "./pages/EmployeePortal";
import {Route, Routes} from "react-router-dom";
import './App.css';
import EmployeeSignIn from "./pages/EmployeeSignIn";

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
        <Route path = "/SignUp" element = {<SignUp />} />
        <Route path = "/SignIn" element = {<SignIn />} />
        <Route path = "/PreviousOrders" element = {<PreviousOrders/>} />
        <Route path = "/EmployeePortal" element = {<EmployeePortal/>} />
        <Route path = "/EmployeeSignIn" element = {<EmployeeSignIn/>} />

      </Routes>
      <Footer />
    </div>

  );
}

export default App;

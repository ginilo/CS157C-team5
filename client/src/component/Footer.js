import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {faPhone} from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebook, faTwitter} from '@fortawesome/free-brands-svg-icons';
import { Link } from "react-router-dom";


export default function Footer(){
    return(
        <footer className = "footer">
            <div className = "footerinfo">
            <section>
            <Link to="/">
          <img
            src="https://i.ibb.co/Mc6LfDh/logo.png"
            alt="logo"
            border="0"
          ></img>
        </Link>
            </section>
            <section>
                <h1>SJSU Cares</h1>
                <p>Clark Hall - Room 140</p>
                <p>Monday - Friday 9AM - 5PM</p>
            </section>

            <section>
                <h1>Spartan Food Pantry</h1>
                <p>Diaz Compean Student Union</p>
                <p>(exterior entrance across from Engineering Rotunda)</p>
            </section>

            <section>
                <h1>Spring Term Pantry Hours</h1>
                <p>Monday & Friday 10AM - 5PM</p>
                <p>Tuesday - Thursday 10AM - 6PM</p>
            </section>
            </div>

            <div className = "footerinfo">
                <div className = "footerlogos">
                <FontAwesomeIcon icon={faPhone} /><p>408-924-1234</p>
                </div>
                <div className = "footerlogos">
                <FontAwesomeIcon icon = {faEnvelope}/><p>sjsucares@sjsu.edu</p>
                </div>
                <div className = "footerlogos">
                <a href = "https://www.facebook.com/SJSUCaresBasicNeeds/"><FontAwesomeIcon icon={faFacebook} />Follow us on Facebook</a>
                </div>
                <div className = "footerlogos">
                <a href = "https://www.instagram.com/SJSUCaresBasicNeeds/"><FontAwesomeIcon icon = {faInstagram}/>Check out our Instagram</a>
                </div>
                <div className = "footerlogos">
                <a href = "https://twitter.com/SJSUCares"><FontAwesomeIcon icon = {faTwitter}/>Keep up with our Twiiter</a>
                </div>
            </div>
            <hr></hr>

            <div className = "footerinfo">
                <p>Copyright 2023 SJSU Pantry</p>
                <p>All Rights Reserved</p>
            </div>
        </footer>
    )
}
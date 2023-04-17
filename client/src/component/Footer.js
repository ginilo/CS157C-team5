import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {faPhone} from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebook} from '@fortawesome/free-brands-svg-icons';


export default function Footer(){
    return(
        <footer className = "footer">
            <div class = "footerinfo">
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
                <p>Tuesday - Thursday 10Am - 6PM</p>
            </section>
            </div>

            <div class = "footerinfo">
                <div class = "footerlogos">
                <FontAwesomeIcon icon={faPhone} /><p>408-924-1234</p>
                </div>
                <div class = "footerlogos">
                <FontAwesomeIcon icon = {faEnvelope}/><p>sjsucares@sjsu.edu</p>
                </div>
                <div class = "footerlogos">
                <a href = "https://www.facebook.com/SJSUCaresBasicNeeds/"><FontAwesomeIcon icon={faFacebook} />Follow us on Facebook</a>
                </div>
                <div class = "footerlogos">
                <a href = "https://www.instagram.com/SJSUCaresBasicNeeds/"><FontAwesomeIcon icon = {faInstagram}/>Check out our Instagram</a>
                </div>
            </div>
            <hr></hr>

            <div class = "footerinfo">
                <p>Copyright 2023 SJSU Pantry</p>
                <p>All Rights Reserved</p>
                <p>Privacy Policy</p>
            </div>
        </footer>
    )
}
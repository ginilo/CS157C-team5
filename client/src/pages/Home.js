import React from "react";
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket, faNewspaper, faQuestion} from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  return (
    <div class="home">
        <img class = "storeimage" src="https://i.ibb.co/vHGn1p5/storeimage.png" alt="storeimage" border="0"></img>
      <div class="info">
        <section>
          <h2>Get the food and nutrition you need</h2>
          <p class = "intro">
            The Spartan Food Pantry is a walk-in, full-service, staffed, food
            assistance program offering non-perishable goods, fresh produce, and
            refrigerated items to eligible students. Learn how the pantry got
            started.
          </p>
        </section>

        <section>
        <FontAwesomeIcon icon = {faShoppingBasket}/>
        <div>
          <h2>Order in advance</h2>
          <p>
            See if you are eligible to use the pantry. Order in advance and see
            what is available in store online. <Link to="/orders">Learn more.</Link>
          </p>
          </div>
          
          <FontAwesomeIcon icon = {faNewspaper}/>
          <div>
          <h2>Apply to Calfresh</h2>
          <p>
            Request CalFresh sign up assistance with an SJSU Cares Basic Needs
            Coordinator. <a href = "https://www.sjsu.edu/sjsucares/get-assistance/calfresh.php">Learn more!</a>
          </p>
          </div>
          <FontAwesomeIcon icon = {faQuestion}/>
          <div>
          <h2>Need Help?</h2>
          <p>
            Have a question? Stop by the pantry or send us a message. <Link to = "/contact">Contact
            us.</Link>
          </p>
          </div>
        </section>
      </div>

      <div class = "info hours">
        <section>
            <h2>Come Visit Us</h2>
            <h3>Spring 2023 Hours</h3>
            <p>Monday & Friday: 10 AM - 5PM</p>
            <p>Tuesday -Thursday: 10AM - 6PM</p>
            <h3>Location</h3>
            <p>Diaz Compean Student Union (exterior entrance across from Engineering Rotunda</p>
            <Link to = "/orders"><button>See what's in stock</button></Link>
        </section>
        <section>
        <img src="https://i.ibb.co/RS5kWFj/staffpic.jpg" alt="staffpic" border="0"></img>
        </section>
      </div>

      <div class = "resourcehome">
            <h2>Check out some of our resources</h2>
            <Link to ="/resources"><button>Resources</button></Link>

        </div>

    </div>
  );
}

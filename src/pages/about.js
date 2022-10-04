import "../css/about.css";
import item1 from "../image/pages/about1.png";
import item2 from "../image/pages/about2.png";
import item3 from "../image/pages/aboutUs1.png";
import item4 from "../image/pages/aboutUs2.png";
import item5 from "../image/pages/aboutUs3.png";
import item6 from "../image/pages/aboutUs4.png";
import React from "react";

export default function About() {
  return (
    <div className="layout-about">
      <div className="about-web-container">
        <img class="item1" src={item1} alt="item1"></img>
        <h1 class="aboutThisWebsiteHeading">About this Website</h1>
        <p class="aboutThisWebsiteContent">
        Our website is a welcoming community for anyone who wants to share, post or sell their little things. While browsing our website, you may find someone’s handmade ceramic mugs, an artist’s hand sketches, or even an old gentleman’s favourite old story books! 
        We are here to support people with creativity with their little business, as well as to provide a platform for people to sell the things that no longer needed but too good to be thrown away.
        </p>
        <img class="item2" src={item2} alt="item2"></img>
        <h1 class="whyThisWebsiteHeading">Why this Website</h1>
        <p class="whyThisWebsiteContent">
        Nowadays, everything is always fast-paced and commercial. Our team would like to encourage people to slow down a bit while using our website - in here, you can discover someone’s magical thoughts through their handicrafts, you may got a chance to hear a good old memory from a stranger, or simply, you can chill on our website and have a fun time browsing unique items that don’t follow a certain formula.{" "}
        </p>
      </div>
      <div className="about-us-container">
        <img class="item3" src={item3} alt="item3"></img>
        <img class="item4" src={item4} alt="item4"></img>
        <img class="item5" src={item5} alt="item5"></img>
        <img class="item6" src={item6} alt="item6"></img>
        <h1 class="aboutUsHeading">About Us</h1>
        <p class="aboutUsContent">
        <p>Da-dum-da-dum…!</p>

        <p>Let me introduce you with our lovely team who built this website! </p>

        <p>We are a group of students studying at University of Melbourne, majoring in Computing and Software Systems. This website is a final product of a semester-long project from the subject IT PROJECT. </p>

        <p>Hailin Jiang, our scrum master and front-end developer, manages project risks and adjust project plans.</p>

        <p>Ashley Wang, our product owner and front-end developer, communicates with both the clients and the team.</p>

        <p>Hanlin Zhu, our UI designer and front-end developer, designs User interface and improve user experience.</p>

        <p>Lily Li, our back-end developer, xxxxxx.</p>

        DI Lu, our back-end developer, xxxxxx.
        </p>
      </div>
    </div>
  );
}

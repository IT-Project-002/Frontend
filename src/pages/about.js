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
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
          sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
          et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
          takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
          amet, consetetur sadipscing elitr, sed diam nonumy.
        </p>
        <img class="item2" src={item2} alt="item2"></img>
        <h1 class="whyThisWebsiteHeading">Why this Website</h1>
        <p class="whyThisWebsiteContent">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
          sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam{" "}
        </p>
      </div>
      <div className="about-us-container">
        <img class="item3" src={item3} alt="item3"></img>
        <img class="item4" src={item4} alt="item4"></img>
        <img class="item5" src={item5} alt="item5"></img>
        <img class="item6" src={item6} alt="item6"></img>
        <h1 class="aboutUsHeading">About Us</h1>
        <p class="aboutUsContent">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
          sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
          et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
          takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
          amet, consetetur sadipscing elitr, sed diam nonumy. Lorem ipsum dolor
          sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
          invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
          At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
          kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
          amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
          diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
          erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
          et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
          Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
          sadipscing elitr, sed diam nonumy.
        </p>
      </div>
    </div>
  );
}

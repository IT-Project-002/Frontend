import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
// import sample from "../image/items/item1.png";
import sample from "../image/background/register.png";
import sample1 from "../image/pages/aboutUs3.png"
import sample2 from "../image/pages/landingSlider2.png"
import "../css/slider.css"


class Gallery extends React.Component {
    render() {
        return (
            <div>
                <Carousel autoPlay={false} interval="5000" transitionTime="3000" infiniteLoop>
                    <img src={sample} alt="" />
                    <img src={sample1} alt="" />
                    <img src={sample2} alt="" />
                </Carousel>
            </div>
        )
    };
}
export default Gallery
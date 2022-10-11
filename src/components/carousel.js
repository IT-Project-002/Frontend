import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import image1 from "../image/pages/landingSlider1.png";
import image2 from "../image/pages/landingSlider2.png";


class Gallery extends React.Component {
    render() {
        return (
            <div className="carousel">
                <Carousel autoPlay={false} interval="5000" transitionTime="3000" infiniteLoop>
                    <div>
                        <img src={image1} alt="" />
                    </div>
                    <div>
                        <img src={image2} alt="" />
                    </div>
                    <div>
                        <img src="https://uptoncountrypark.com/wp-content/uploads/2018/02/1300-x-400-IMG_95954.jpg" alt="" />
                    </div>
                </Carousel>
            </div>
        )
    };
}
export default Gallery
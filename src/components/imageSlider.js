import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
// import sample from "../image/items/item1.png";
import "../css/slider.css";

class Gallery extends React.Component {
  render() {
    const image = this.props.image;
    // console.log(image);
    return (
      <div>
        <Carousel
          autoPlay={false}
          interval="5000"
          transitionTime="3000"
          infiniteLoop
        >
          {image?.map((item) => {
            return (
              <div key={image}>
                <img src={item} alt="file" />
              </div>
            );
          })}
        </Carousel>
      </div>
    );
  }
}
export default Gallery;

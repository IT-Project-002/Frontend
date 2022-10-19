import React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'

class Gallery extends React.Component {
  render () {
    return (
            <div className="carousel">
                <Carousel autoPlay={false} interval="5000" transitionTime="3000" infiniteLoop>
                    <div>
                        <img src="https://it-project-002.s3.ap-southeast-2.amazonaws.com/admin/landingSlider1.png" alt="" />
                    </div>
                    <div>
                        <img src="https://it-project-002.s3.ap-southeast-2.amazonaws.com/admin/landingSlider2.png" alt="" />
                    </div>
                    <div>
                        <img src="https://it-project-002.s3.ap-southeast-2.amazonaws.com/admin/landingSlider4.png" alt="" />
                    </div>
                    <div>
                        <img src="https://it-project-002.s3.ap-southeast-2.amazonaws.com/admin/landingSlider3.png" alt="" />
                    </div>
                </Carousel>
            </div>
    )
  };
}
export default Gallery

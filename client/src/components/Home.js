import React from 'react'
import { Carousel } from 'react-bootstrap'

export default function Home() {
  return (
    <div className="container">
      <div className="row">
        <div className="col">Left part</div>

        <div className="col">
          <Carousel>
            <Carousel.Item style={{ 'height': "400px", 'width': "900px" }}>
              <img
                className="d-block w-100"
                src="images/hall_1.jpg"
                alt="First Hall"
              />
              <Carousel.Caption>
                <h3>First Hall</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item style={{ 'height': "400px", 'width': "900px" }}>
              <img
                className="d-block w-100"
                src="images/hall_2.jpg"
                alt="Second hall"
              />

              <Carousel.Caption>
                <h3>Second Hall</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            
            <Carousel.Item style={{ 'height': "400px", 'width': "900px" }}>
              <img
                className="d-block w-100"
                src="images/iict.jpg"
                alt="Second slide"
              />
            </Carousel.Item>

            <Carousel.Item style={{ 'height': "400px", 'width': "900px" }}>
              <img
                className="d-block w-100"
                src="images/shahidMinar.jpg"
                alt="Second slide"
              />
            </Carousel.Item>
          </Carousel>


        </div>


        <div className="col">Right side</div>
      </div>

    </div>
  )
}

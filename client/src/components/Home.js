import React,{useEffect, useState} from 'react'
import { Carousel } from 'react-bootstrap'
import { getData } from "../App";
import Axios from 'axios';
import NoticeCard from './NoticeCard';

export default function Home() {

  const [notices, setNotices] = useState([]);
  const getNotices = () => {

    let role_id = -1;
    if(getData('user_role_id')){
      role_id = getData('user_role_id');
    }
    console.log("home page o rule paisi = "+ role_id);
    Axios.get("http://localhost:3001/getData/notice/home", { params: { id: role_id } }).then((response) => {
      setNotices(response.data);
    });
  };

  useEffect(() => {
    getNotices();
}, []);

  return (
    <div className="container">

      <div className="row">
        <div className="col"></div>

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


        <div className="col"></div>
      </div>

      {
        notices.map((val, idx) => {
          return (<NoticeCard notice={val} id={idx} />)
      })
    }


    </div>
  )
}

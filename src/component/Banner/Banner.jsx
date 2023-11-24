import React, { useEffect, useState } from "react";
import "../../style/banner/banner.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function Banner(){
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const [list, setList] = useState([])
  useEffect(()=>{
    fetch(`testData/banner.json`)
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        setList(data);
      });
    }, []);

  useEffect(() => {
    const interval = setInterval(() => {nextImage()}, 5000);
    return () => clearInterval(interval);
  }, [currentImageIndex, list.length]);

  
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % list.length); 
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + list.length) % list.length); 
  };

  const translateValue = -currentImageIndex * 100;

return(
  <div className="banner">
    <div className="banner_slider" style={{ transform: `translateX(${translateValue}%)` }}>
      {list.map((item, index) => (
          <img key={index + list.length} className="banner_img" src={item.banner} alt={`Banner  ${index + 1}`} />
        ))}
    </div>
    <div className="banner_controls">
      <button className="banner_control" onClick={prevImage}>
        <IoIosArrowBack />
      </button>
      <button className="banner_control" onClick={nextImage}>
        <IoIosArrowForward />
      </button>
    </div>
  </div>
  )
}

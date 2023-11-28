import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';


// import required modules
import { Navigation } from 'swiper/modules';
import Image from '../common/Image';

export default function SwiperComponent(props) {

  const [pageBoolean,setPageBoolean] = useState(false)

  return (
    <>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        spaceBetween={15}
        slidesPerView={5}
        onSlideChange={() => {
          setPageBoolean(!pageBoolean)
          props.changePage(pageBoolean);
        }}
        slidesPerGroup={5}
        className="mySwiper">
        <SwiperSlide>
          <Image
            className="detailItemImg"
            url="productImg\\image-1700725251398.jpg"
          />
          <span className='slideProduct'>이자벨마랑 니트</span>
        </SwiperSlide>
        <SwiperSlide>
          <Image
            className="detailItemImg"
            url="productImg\\image-1700725251398.jpg"
          />
          <span className='slideProduct'>이자벨마랑 니트</span>
        </SwiperSlide>
        <SwiperSlide>
          <Image
            className="detailItemImg"
            url="productImg\\image-1700725251398.jpg"
          />
          <span className='slideProduct'>이자벨마랑 니트</span>
        </SwiperSlide>
        <SwiperSlide>
          <Image
            className="detailItemImg"
            url="productImg\\image-1700725251398.jpg"
          />
          <span className='slideProduct'>이자벨마랑 니트</span>
        </SwiperSlide>
        <SwiperSlide>
          <Image
            className="detailItemImg"
            url="productImg\\image-1700725251398.jpg"
          />
          <span className='slideProduct'>이자벨마랑 니트</span>
        </SwiperSlide>
        <SwiperSlide>
          <Image
            className="detailItemImg"
            url="productImg\\image-1700725251398.jpg"
          />
          <span className='slideProduct'>이자벨마랑 니트</span>
        </SwiperSlide>
        <SwiperSlide>
          <Image
            className="detailItemImg"
            url="productImg\\image-1700725251398.jpg"
          />
          <span className='slideProduct'>이자벨마랑 니트</span>
        </SwiperSlide>
        <SwiperSlide>
          <Image
            className="detailItemImg"
            url="productImg\\image-1700725251398.jpg"
          />
          <span className='slideProduct'>이자벨마랑 니트</span>
        </SwiperSlide>
        <SwiperSlide>
          <Image
            className="detailItemImg"
            url="productImg\\image-1700725251398.jpg"
          />
          <span className='slideProduct'>이자벨마랑 니트</span>
        </SwiperSlide>
        <SwiperSlide>
          <Image
            className="detailItemImg"
            url="productImg\\image-1700725251398.jpg"
          />
          <span className='slideProduct'>이자벨마랑 니트</span>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
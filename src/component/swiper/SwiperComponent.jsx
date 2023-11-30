import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// import required modules
import { Pagination ,EffectFade ,Navigation} from 'swiper/modules';
import Image from '../common/Image';

export default function SwiperComponent(props) {

  const [pageBoolean,setPageBoolean] = useState(false)




  return (
    <>
      <Swiper
        navigation={true}
        modules={[Navigation,Pagination,EffectFade]}
        spaceBetween={props.between}
        slidesPerView={props.view}
        effect={props.effect}
        onSlideChange={() => {
          setPageBoolean(!pageBoolean)
          props.changePage(pageBoolean);
        }}
        
        pagination={props.pagination}
        slidesPerGroup={props.group}
        className={`mySwiper ${props.hover}`}>

        <SwiperSlide >
          <Image
            className="detailItemImg"
            url="productImg\\image-1700723555581.png"
          />
          {props.pName && <span className='slideProduct'>이자벨마랑 니트</span>}
        </SwiperSlide>
        <SwiperSlide >
          <Image
            className="detailItemImg"
            url="productImg\\images-1701140289870.PNG"
          />
          {props.pName && <span className='slideProduct'>이자벨마랑 니트</span>}
        </SwiperSlide>
        <SwiperSlide >
          <Image
            className="detailItemImg"
            url="productImg\\images-1701141335587.jpg"
          />
          {props.pName && <span className='slideProduct'>이자벨마랑 니트</span>}
        </SwiperSlide>
        <SwiperSlide > 
          <Image
            className="detailItemImg"
            url="productImg\\image-1700725251398.jpg"
          />
          {props.pName && <span className='slideProduct'>이자벨마랑 니트</span>}
        </SwiperSlide>
        <SwiperSlide >
          <Image
            className="detailItemImg"
            url="productImg\\images-1701141335589.jpg"
          />
          {props.pName && <span className='slideProduct'>이자벨마랑 니트</span>}
        </SwiperSlide>
        <SwiperSlide >
          <Image
            className="detailItemImg"
            url="productImg\\images-1701141335588.jpg"
          />
          {props.pName && <span className='slideProduct'>이자벨마랑 니트</span>}
        </SwiperSlide>
        <SwiperSlide >
          <Image
            className="detailItemImg"
            url="productImg\\images-1701141335589.jpg"
          />
          {props.pName && <span className='slideProduct'>이자벨마랑 니트</span>}
        </SwiperSlide>
        <SwiperSlide >
          <Image
            className="detailItemImg"
            url="productImg\\image-1700725251398.jpg"
          />
          {props.pName && <span className='slideProduct'>이자벨마랑 니트</span>}
        </SwiperSlide>
        <SwiperSlide >
          <Image
            className="detailItemImg"
            url="productImg\\images-1701141335588.jpg"
          />
          {props.pName && <span className='slideProduct'>이자벨마랑 니트</span>}
        </SwiperSlide>
        <SwiperSlide >
          <Image
            className="detailItemImg"
            url="productImg\\image-1700725251398.jpg"
          />
          {props.pName && <span className='slideProduct'>이자벨마랑 니트</span>}
        </SwiperSlide>
      </Swiper>
    </>
  );
}
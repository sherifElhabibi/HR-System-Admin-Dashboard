// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation, Autoplay } from 'swiper';
import img_0 from '../public/images/x_1.png';
import img_1 from '../public/images/xx.png';
import Image from 'next/image';

import DaleelInfo from './DaleelInfo';
export default function LandingSlider({
  title,
  firstDesc,
  seconDesc,
  isBtn,
  isDaleel,
  isInfo,
}) {
  return (
    <div className="slider__section  relative h-[500px] " id="landing_swiper">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className={`mySwiper`}
      >
        <SwiperSlide className="relative  ">
          <div className="h-full">
            <Image
              src={img_0}
              alt={'image'}
              layout="fill"
              loading={'lazy'}
              className="aspect-square"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide className="relative  ">
          <div className="h-full">
            <Image
              src={img_1}
              alt={'image'}
              layout="fill"
              loading={'lazy'}
              className="aspect-square"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide className="relative  h-full">
          <div className="h-full">
            <Image
              src={img_0}
              alt={'image'}
              layout="fill"
              loading={'lazy'}
              className="aspect-square"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide className="relative h-full">
          <div className="h-full">
            <Image
              src={img_1}
              alt={'image'}
              layout="fill"
              loading={'lazy'}
              className="aspect-square"
            />
          </div>
        </SwiperSlide>
      </Swiper>
      {isInfo && (
        <DaleelInfo
          title={title}
          firstDesc={firstDesc}
          seconDesc={seconDesc}
          isBtn={isBtn}
          isDaleel={isDaleel}
        />
      )}

      {/* <div className="py-4 absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] flex justify-center items-center flex-col  z-10 bg-white rounded-sm ">
        <h1 className="font-bold text-3xl mb-3 text-center ">
          {' '}
          مرحبا بك في دليلكم
        </h1>
        <p className="text-gray-500 text-base mb-1.5 px-5 text-center ">
          يزودك بالمعلومات للوصول إلى جميع الخدمات من مكان واحد
        </p>
        <div className=" text-gray-500 text-base my-2  sm:px-5 text-center flex justify-between sm:justify-center items-center">
          <p className="text-sm sm:text-sm ml-2 whitespace-nowrap">
            هل أنت مقدم الخدمة؟
          </p>{' '}
          <Link href="/register">
            <a className="bg-regal-green px-3 py-1.5 text-white shadow-md rounded-md whitespace-nowrap font-medium ">
              انضم إلينا
            </a>
          </Link>
          <Image src={free} width={'60px'} height={'60px'} alt={'free'} />
        </div>
      </div> */}
    </div>
  );
}

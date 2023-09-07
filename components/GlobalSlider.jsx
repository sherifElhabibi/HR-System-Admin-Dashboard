import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import DaleelInfo from './DaleelInfo'
import React, { useState } from 'react';
import SearchBox from '../components/autoSpares_com/searchBox'
// import '../app/(pages)/styles.css'
// import '@/app/globals.css'
const GlobalSlider = ({
  title,
  firstDesc,
  seconDesc,
  isBtn,
  isDaleel,
  isInfo,
  isWatercom,
  isGascom,
  isAutoSpares,
  isItSolution,
  isSupAtathcom,
  Images
}) => {
  //These are custom properties for zoom effect while slide-show
  const Properties = {
    indicators: true,
    // scale: 1.2,
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    prevArrow: (
      <div className="w-8 h-8 flex justify-center items-center rounded-sm absolute top-[90%]  translate-y-[-90%]  !left-[calc(100%-93px)]  text-2xl  bg-white text-black/60 hover:text-black duration-200 cursor-pointer">
        <FaChevronLeft size={20} className='' />
      </div>
    ),
    nextArrow: (
      <div className="w-8 h-8 flex justify-center items-center rounded-sm absolute top-[90%]  translate-y-[-90%] !right-5 text-2xl bg-white text-black/60 hover:text-black duration-200 cursor-pointer">
        <FaChevronRight size={20} />
      </div>
    ),
  };






  return (
    <div >

      <Fade {...Properties}>
        {Images.map((each, index) => (
          <div
            key={index}
            className={`w-full ${isSupAtathcom == true ? 'h-[300px]' : 'h-[500px]'
              }   flex justify-center items-center  relative`}
          >
            {isInfo && (
              <DaleelInfo
                title={title}
                firstDesc={firstDesc}
                seconDesc={seconDesc}
                isBtn={isBtn}
                isDaleel={isDaleel}
                isWatercom={isWatercom}
                isGascom={isGascom}
                isItSolution={isItSolution}
                isSupAtathcom={isSupAtathcom}
              />
            )}

            <Image
              className="object-cover rounded-sm shadow-xl"
              src={each.url}
              alt={'image'}
              layout="fill"
              priority={true}
            >
            </Image>


          </div>
        ))}
      </Fade>
      {isAutoSpares && (
        <div className='flex justify-center items-center '>
          <SearchBox></SearchBox>
        </div>

      )}
    </div>
  );
};

export default GlobalSlider;

import React from 'react';
import Search from './Search';
import { HiOutlineChevronDoubleDown } from 'react-icons/hi';
// import * as Scroll from 'react-scroll';
// import { Link, animateScroll as scroll } from 'react-scroll';

function LandingPage({ main_Items }) {
 
  return (    
    <section className="text-white bg-hero-pattern bg-center bg-no-repeat bg-cover  min-h-screen relative   flex justify-center items-center after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-regal-dark after:opacity-70">
      <div className="container mx-auto px-3 z-20 ">
        <div className="text-center mt-10 md:mt-24">
          <div className="text-regal-green text-xl mb-2.5"> مرحباً بك في</div>
          <h1 className="font-bold text-4xl mb-4"> منصة أنجز</h1>
          <div className="text-gray-300 text-base mb-2 px-12">
            منصة إلكترونية تقدم مجموعة من الخدمات عن طريق أقسام متعددة
          </div>
        </div>

        <Search main_Items={main_Items} />

        <div className="text-center">
          <button className="mt-12">
            <Link
              activeClass="active"
              to="module__section"
              spy={true}
              smooth={true}
              offset={-25}
              duration={500}
            >
              <HiOutlineChevronDoubleDown
                fontSize={'1.7em'}
                className="animate-bounce "
              />
            </Link>
          </button>
        </div>
      </div>
    </section>
  );
}

export default LandingPage;

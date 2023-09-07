import React from 'react';
import Image from 'next/image';
import loader from '../public/images/loader.svg';
function Loading() {
  return (
    <div className="z-index flex justify-center items-center bg-gray-100 h-screen  w-full fixed top-0 left-0 ">
      <Image
        src={loader}
        width="100px"
        height="100px"
        alt="Logo"
        className="block  w-6/12 "
      />
    </div>
  );
}

export default Loading;

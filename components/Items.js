import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';
import * as BsIcons from 'react-icons/bs';
import whatsapp from '../public/images/whatsapp.png';
import map from '../public/images/map.png';
import wordwide from '../public/images/worldwide.png';
import telephone from '../public/images/telephone.png';
import facebook from '../public/images/facebook.png';
import avatar from '../public/images/avatar.png';
function Items({ item }) {
  return (
    <div
      key={item.id}
      className="relative  py-2 rounded bg-white shadow-md  border-2 border-gray-500 hover:border-regal-green text-sm  text-gray-500 "
    >
      {/* <div className="absolute top-1.5 left-1.5">
        <BsIcons.BsFillHeartFill
          fontSize={'23px'}
          onClick={() => setFav(!fav)}
          className={`cursor-pointer ${fav ? 'text-red-600' : 'text-gray-400'}`}
        />
      </div> */}
      {item.establishment !== null ? (
        <h2 className="text-regal-dark text-center font-semibold text-lg mb-1.5 h-9">
          {item.establishment}
        </h2>
      ) : (
        <h2 className="text-regal-dark text-center font-semibold text-lg mb-1.5"></h2>
      )}
      {item.name !== null ? (
        <h3 className="text-regal-green text-center font-semibold  text-base md:text-lg  mb-1.5 ">
          {item.name}
        </h3>
      ) : (
        <h3 className="text-regal-green text-center font-semibold  text-base md:text-lg  mb-1.5 "></h3>
      )}

      <div className="flex items-center flex-wrap md:flex-nowrap">
        <div className="w-full md:w-2/3 ">
          <div className="flex items-center">
            <div className="mr-2.5 mb-2.5">
              {item.Daleel_Item_Image && item.Daleel_Item_Image !== null ? (
                <Image
                  className="items-end rounded-full"
                  src={`https://ultimate.abuzeit.com/assets/${item.Daleel_Item_Image}?fit=outside&width=200&height=200&quality=100`}
                  alt="img"
                  width={'85px'}
                  height={'85px'}
                />
              ) : (
                <Image
                  className="items-end rounded-full"
                  src={avatar}
                  alt="img"
                  width={'85px'}
                  height={'85px'}
                />
              )}
            </div>
            <div className="ml-2 mr-3 md:ml-2 ">
              <p className="mb-2">{item.Short_description}</p>

              <p className="mb-2">
                {item.governorate.name} - {item.address}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/3 ">
          <div className="flex items-center justify-center md:block ml-2">
            <div className="flex justify-end  w-full  ">
              {item.mobile_number_2 && item.mobile_number_2 !== null ? (
                <Link
                  href={`https://api.whatsapp.com/send/?phone=${item.mobile_number_2.slice(
                    1
                  )}&text=I%27m+interested+in+your+service.&type=phone_number&app_absent=0`}
                >
                  <a className="mx-1" target="_blank">
                    <Image
                      src={whatsapp}
                      alt="whatsapp"
                      width={'20px'}
                      height={'20px'}
                    />
                  </a>
                </Link>
              ) : null}
              {item.location !== null ? (
                <Link
                  href={`https://maps.google.com/?q=${item.location.coordinates[1]},${item.location.coordinates[0]}`}
                >
                  <a className="mx-1" target="_blank">
                    <Image width={'20px'} height={'20px'} src={map} alt="map" />
                  </a>
                </Link>
              ) : null}
              {/* {console.log(item.location.coordinates[1])} */}
              {item.website !== null ? (
                <Link href={`${item.website}`}>
                  <a className="mx-1" target="_blank">
                    <Image
                      width={'20px'}
                      height={'20px'}
                      src={wordwide}
                      alt="wordwide"
                    />
                  </a>
                </Link>
              ) : null}
              {item.mobile_number_2 !== null ? (
                <Link href={`tel:${item.mobile_number_2}`}>
                  <a className="mx-1" target="_blank">
                    <Image
                      width={'20px'}
                      height={'20px'}
                      src={telephone}
                      alt="telephone"
                    />
                  </a>
                </Link>
              ) : null}
              {item.SocialMedia !== null ? (
                <Link href={`${item.SocialMedia}`}>
                  <a className="mx-1" target="_blank">
                    <Image
                      width={'20px'}
                      height={'20px'}
                      src={facebook}
                      alt="facebook"
                    />
                  </a>
                </Link>
              ) : null}
            </div>
            {/* <div className="w-full text-left">
              
              <button
                href="#"
                className="relative px-7 py-2 overflow-hidden font-medium text-regal-dark  bg-regal-green  border border-gray-100 rounded-lg shadow-inner group"
              >
                <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-500 group-hover:w-full ease"></span>
                <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-500 group-hover:w-full ease"></span>
                <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-500 group-hover:h-full ease"></span>
                <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-500 group-hover:h-full ease"></span>
                <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-500 opacity-0 group-hover:opacity-100"></span>
                <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">
                  المزيد ...
                </span>
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Items;

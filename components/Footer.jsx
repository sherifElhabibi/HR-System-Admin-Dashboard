import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../public/images/logo-x.png';
import logo1 from '../public/images/logo-2.png';
import fetchItems from './FetchDaleelItems';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
function Footer() {
  const year = new Date().getFullYear();
  const pages = [
    {
      title: 'الرئيسية',
      path: '/',
    },
    {
      title: 'من نحن',
      path: '/aboutus',
    },
    {
      title: 'تواصل معنا',
      path: '/contactus',
    },

    {
      title: 'سياسة الخصوصية',
      path: '/privacy-policy',
    },
    {
      title: 'شروط الإستخدام',
      path: '/terms-of-use',
    },
  ];

  const social_media = [
    { title: <FaTwitter />, path: '/' },
    { title: <FaInstagram />, path: 'https://www.instagram.com/it.abuzeit/' },
    { title: <FaFacebookF />, path: 'https://www.facebook.com/abuzeit' },
  ];
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState();

  useEffect(() => {
    fetchItems(setItems, setIsLoading);
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <footer className="bg-regal-dark py-2 text-right font-DroidKufi  z-20 relative">
      <div className="container m-auto">
        <div className="px-2 py-2">
          <div className="grid lg:grid-cols-3 md:grid-cols-2">
            <div className="mb-4 pr-3 flex items-start ">
              <div className="flex flex-col">
                <h5 className=" font-bold  text-regal-green block w-full mb-2 ">
                  الصفحات
                </h5>
                <ul className="list-none mb-0 block md:flex  md:flex-wrap text-sm">
                  {pages.map((page, index) => (
                    <li className="mb-2 ml-5" key={index}>
                      <Link href={`${page.path}`}>
                        <a className="text-white hover:pr-0.5 hover:text-regal-green duration-200">
                          {page.title}
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mb-4 pr-3 flex items-start ">
              <div className="flex flex-col">
                <h5 className="font-bold  text-regal-green block w-full mb-2">
                  {' '}
                  الأقسام
                </h5>

                <ul className="list-none mb-0 block md:flex  md:flex-nowrap text-sm">
                  {items.data.map((item, index) => {
                    return (
                      <li className="mb-2 ml-5 " key={index}>
                        {item.category_name_ar == 'حلولكم البرمجية' ? (
                          <Link href={'/it-solution'}>
                            <a className="text-white hover:pr-0.5 text-sm hover:text-regal-green duration-200">
                              {' '}
                              {item.category_name_ar}
                            </a>
                          </Link>
                        ) : item.category_name_ar == 'دليلكم' ? (
                          <Link href={'/daleelcom'}>
                            <a className="text-white hover:pr-0.5 text-sm hover:text-regal-green duration-200">
                              {' '}
                              {item.category_name_ar}
                            </a>
                          </Link>
                        ) : item.category_name_ar == 'غازكم' ? (
                          <Link href={'/gascom'}>
                            <a className="text-white hover:pr-0.5 text-sm hover:text-regal-green duration-200">
                              {' '}
                              {item.category_name_ar}
                            </a>
                          </Link>
                        ) : item.category_name_ar == 'مياهكم' ? (
                          <Link href={'/watercom'}>
                            <a className="text-white hover:pr-0.5 text-sm hover:text-regal-green duration-200">
                              {' '}
                              {item.category_name_ar}
                            </a>
                          </Link>
                        ) : (
                          item.category_name_ar == 'أثاثكم' && (
                            <Link href={'/athathcom'}>
                              <a className="text-white hover:pr-0.5 text-sm hover:text-regal-green duration-200">
                                {' '}
                                {item.category_name_ar}
                              </a>
                            </Link>
                          )
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div className="mb-2 flex items-center justify-center col-span-2 lg:col-span-1  z-0">
              <div>
                <Link href="/" passHref className="items-center ml-3">
                  <a>
                    <Image
                      src={logo}
                      alt={'ultimate-app'}
                      width="90px"
                      height="90px"
                      className="block  md:m-auto"
                    />
                  </a>
                </Link>
                <Link
                  href="https://abuzeit.com/"
                  passHref
                  className="items-center ml-3"
                >
                  <a>
                    <Image
                      src={logo1}
                      alt={'abuzeit'}
                      width={'150px'}
                      height={'80px'}
                      className="block  md:m-auto"
                    />
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <ul className="list-none mb-0 flex justify-center mt-2">
            {social_media.map((icon, index) => (
              <li className="mb-2 transition ml-2.5" key={index}>
                <Link href={icon.path} target="_blank">
                  <a className="flex items-center mb-3 text-lg text-gray-600 hover:text-white">
                    {icon.title}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className=" text-center border-gray-500 border-t-2 py-2 text-xs md:text-sm">
          <span className="text-white"> جميع الحقوق محفوظة © {year} </span>
          <Link href="https://abuzeit.com/">
            <a
              target="_blank"
              className="text-white hover:text-blue-600 duration-300"
            >
              {' '}
              لشركة نويس لتطوير البرامج.
            </a>
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

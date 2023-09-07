import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';
import Loading from '../Loading';
import logoX from '../../public/images/logo-x.png';
import logoY from '../../public/images/logo-y.png';
import fetchItems from '../FetchDaleelItems';
import DHMobileNav from './DHMobilNav';
import { useSelector } from 'react-redux';
import { signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

 import '@/app/globals.css'
const LinksDataAr = [
  {
    title: 'الرئيسية',
    path: '/',
  },
  {
    title: 'الأقسام',
    path: '/',
    hasSubMenu: true,
  },
  {
    title: 'من نحن',
    path: '/aboutus',
  },
  {
    title: 'تواصل معنا',
    path: '/contactus',
  },
];

export default function Navbar() {
  const [sticky, setSticky] = useState(false);
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState();
  // const favQty = useSelector((state) => state.fav.favFurnitureItems.length);
  const pathname = usePathname();
  const router = useRouter();
  // const { supplier } = pathname;

  const { data: session, status } = useSession();
  //console.log(session);
  useEffect(() => {
    fetchItems(setItems, setIsLoading);
  }, []);

  useEffect(() => {
    setShow(false);
  }, [pathname]);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      const nav = document.querySelector('nav');
      window.scrollY > 0 ? setSticky(true) : setSticky(false);
    });
  }, []);

  const routerStatus = () => {
    if (
      pathname === '/daleelcom' ||
      pathname === '/autoSpares' ||
      pathname === '/daleelcom/register'
    ) {
      return true;
    } else {
      return false;
    }
  };
  const handleRoutingFav = () => {
    router.push(`/athathcom/${pathname}/fav`);
  };
  if (isLoading) {
    return <Loading />;
  }

  return (
    <nav
      className={`font-DroidKufi ${
        routerStatus()
          ? 'bg-regal-dark text-gray-50 flex fixed top-0 left-0 w-full z-[999] border-b-2 px-3 py-2 h-20 items-center  font-semibold  '
          : 'bg-gray-100 flex fixed top-0 left-0 w-full z-[999] border-b-2 px-3 py-2 h-20 items-center font-semibold '
      }${sticky ? 'bg-regal-dark/90  text-white' : 'text-regal-dark'}`}
   
   >
   
      <DHMobileNav
        open={open}
        setOpen={setOpen}
        show={show}
        setShow={setShow}
        items={items}
        routerStatus={routerStatus()}
        sticky={sticky}
        LinksDataAr={LinksDataAr}
      />
      <div
        className={`${
          pathname === '/daleelcom'
            ? 'w-2/12 md:w-1/12 lg:w-3/12 xl:w-4/12'
            : 'w-4/12 md:w-2/12 lg:w-4/12'
        } flex items-center mt-0  `}
      >
        
        {sticky && !routerStatus() ? (
          <Link href="/" passHref>
           
              <Image src={logoX} alt={'Engeez-app'} width={60} height={60} />
            
          </Link>
        ) : sticky && routerStatus() ? (
          <Link href="/" passHref>
           
              <Image src={logoX} alt={'Engeez-app'} width={60} height={60} />
            
          </Link>
        ) : !sticky && routerStatus() ? (
          <Link href="/" passHref>
           
              <Image src={logoX} alt={'Engeez-app'} width={60} height={60} />
            
          </Link>
        ) : (
          <Link href="/" passHref>
           
              <Image src={logoY} alt={'Engeez-app'} width={60} height={60} />
            
          </Link>
        )}
      </div>
      <div
        className={`${
          pathname === '/daleelcom'
            ? 'w-10/12 md:w-11/12 lg:w-9/12 xl:w-8/12'
            : 'w-8/12 md:w-10/12 lg:w-8/12'
        } flex justify-end md:justify-between items-center`}
      >
        <div
          className="z-50 flex relative w-7 h-5 flex-col justify-between items-center md:hidden order-1 "
          onClick={() => setOpen(!open)}
        >
          {/* hamburger button */}
          <span
            className={`h-1 w-full ${
              routerStatus() ? 'bg-white' : sticky ? 'bg-white' : 'bg-black'
            } rounded-lg transform transition duration-300 ease-in-out ${
              open ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`h-1 w-full ${
              routerStatus() ? 'bg-white' : sticky ? 'bg-white' : 'bg-black'
            }  rounded-lg transition-all duration-300 ease-in-out ${
              open ? 'w-0' : 'w-full'
            }`}
          />
          <span
            className={`h-1 w-full ${
              routerStatus() ? 'bg-white' : sticky ? 'bg-white' : 'bg-black'
            }  rounded-lg transform transition duration-300 ease-in-out ${
              open ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </div>

        <ul className={`hidden md:flex  justify-between items-center`}>
          {LinksDataAr.map((link) => {
            return (
              <div key={link.title} className="overflow-hidden">
                {link.hasSubMenu ? (
                  <>
                    <div>
                      <span className={`mx-4 duration-200 flex items-center `}>
                        <span
                          className={`${
                            pathname == '/daleelcom' &&
                            'md:text-sm lg:text-base'
                          }`}
                        >
                          {link.title}
                        </span>
                        {link.hasSubMenu && (
                          <FiChevronDown
                            className="mt-1 text-lg cursor-pointer"
                            onClick={() => setShow(!show)}
                          />
                        )}
                      </span>
                    </div>
                    
                    <ul
                      className={`absolute top-[80px]  px-4  w-[185px]   ${
                        routerStatus()
                          ? 'bg-regal-dark text-white'
                          : 'bg-gray-100 '
                      }  ${show ? 'block' : 'hidden'} ${
                        sticky && 'bg-regal-dark/90  text-white'
                      }`}
                    >
                      {items.data.map((item, index) => {
                        return (
                          <li
                            key={index}
                            className={`py-2.5 duration-200 hover:text-regal-green border-b last-of-type:border-b-0 ${
                              pathname == '/daleelcom' &&
                              'md:text-sm lg:text-base'
                            }`}
                            onClick={() => setShow(!show)}
                          >
                            {item.category_name_ar == 'حلولكم البرمجية' ? (
                              <Link href={'/it-solution'}  className="block w-full">
                                  {' '}
                                  {item.category_name_ar}
                                
                              </Link>
                            ) : item.category_name_ar == 'دليلكم' ? (
                              <Link href={'/daleelcom'}  className="block w-full">
                                  {' '}
                                  {item.category_name_ar}
                                
                              </Link>
                            ) : item.category_name_ar == 'أثاثكم' ? (
                              <Link href={'/athathcom'}  className="block w-full">
                                  {' '}
                                  {item.category_name_ar}
                                
                              </Link>
                            ) : item.category_name_ar == 'مياهكم' ? (
                              <Link href={'/watercom'}  className="block w-full">
                                  {' '}
                                  {item.category_name_ar}
                                
                              </Link>
                            ) : (
                              item.category_name_ar == 'غازكم' && (
                                <Link href={'/gascom'} className="block w-full">
                                    {' '}
                                    {item.category_name_ar}
                                  
                                </Link>
                              )
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </>
                ) : (
                  <li onClick={() => setShow(false)}>
                    <Link href={link.path} 
                        className={`mx-4 duration-200 hover:text-regal-green ${
                          pathname == '/daleelcom' &&
                          'md:text-sm lg:text-base'
                        }`}
                      >
                        {link.title}
                      
                    </Link>
                  </li>
                )}
              </div>
            );
          })}
        </ul>
        <div className="text-end flex">
          {pathname.startsWith('/athathcom/') && (
            <motion.button
              onClick={handleRoutingFav}
              whileHover={{ scale: 0.9 }}
              className="relative  w-10 h-10 flex items-center justify-center rounded-full "
            >
              <FaHeart
                fontSize={'23px'}
                className={`${sticky ? 'text-white' : 'text-gray-700'}`}
              />
              {favQty > 0 && (
                <span className="absolute -top-1 -right-[7px]   bg-red-600  w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold text-white ">
                  {favQty}
                </span>
              )}
            </motion.button>
          )}

          {pathname === '/daleelcom' ? (
            <div className="flex items-center">
              <span className="text-xs text-white "> هل أنت مقدم خدمة؟</span>
              <Link href="/register"  className="bg-regal-green p-2 m-1 text-white shadow-md rounded-md whitespace-nowrap font-medium ">
                  انضم إلينا مجانا
                
              </Link>
            </div>
          ) : status == 'authenticated' ? (
            <>
              <div className="relative bg-gray-700 text-white p-2 rounded-sm m-1">
                <span
                  className={` duration-200 flex items-center justify-center`}
                >
                  <span
                    className={`${
                      pathname == '/daleelcom' &&
                      'md:text-sm lg:text-base'
                    }`}
                  >
                    walaa
                  </span>

                  <FiChevronDown
                    className="mt-1 text-lg cursor-pointer"
                    onClick={() => setShowDropdown(!showDropdown)}
                  />
                </span>
                <div
                  className={`absolute top-[61px] text-center  left-2 py-2 px-4    ${
                    routerStatus() ? 'bg-regal-dark text-white' : 'bg-gray-100 '
                  }  ${showDropdown ? 'block' : 'hidden'} ${
                    sticky && 'bg-regal-dark/90  text-white'
                  }`}
                >
                  <Link href={'/user-profile'} 
                      className={`block text-xs whitespace-nowrap mb-2 ${
                        sticky ? 'text-white' : 'text-regal-dark'
                      } `}
                    >
                      البروفايل الشخصى
                    
                  </Link>
                  <button
                    className="bg-regal-green text-red-800 p-2  text-sm rounded whitespace-nowrap   "
                    onClick={() => signOut({ callbackUrl: '/' })}
                  >
                    تسجيل خروج
                  </button>
                </div>
              </div>
            </>
          ) : (
            <Link href={'/login'} className="bg-regal-green  p-2  text-sm rounded whitespace-nowrap  order-0 ml-2 md:m-0 ">
                تسجيل الدخول
              
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

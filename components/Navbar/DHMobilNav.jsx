import Image from 'next/image';
import Link from 'next/link';
import { FiChevronDown } from 'react-icons/fi';
import { useRouter } from 'next/router';
import logoX from '../../public/images/logo-x.png';
import logoY from '../../public/images/logo-y.png';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
function DHMobileNav({
  open,
  setOpen,
  show,
  setShow,
  items,
  sticky,
  routerStatus,
  LinksDataAr,
}) {
  // const router = useRouter();
  //  const pathname = usePathname();
  // const handleClosing = () => {
  //   setShow(!show);
  //   setOpen(!open);
  // };
  // window.onresize = function () {
  //   setShow(false);
  //   setOpen(false);
  // };
  // useEffect(() => {
  //   setShow(false);
  //   setOpen(false);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [pathname]);
  return (
    <div
      // className={`absolute top-0 right-0 h-screen w-[250px] max-w-full shadow-md transform z-10 ${
      //   open ? 'translate-x-0' : 'translate-x-[100%]'
      // } 
      //   bg-gray-100
      //   transition-transform duration-300 ease-in-out filter py-2.5 text-white${
      //     sticky && ' bg-regal-dark/90  text-white'
      //   }
        
      //   ${routerStatus && 'bg-regal-dark  text-white '}
      //   `}
    >
     
      {/* <div className="container m-auto">
        <div className="flex items-center justify-start filter  px-2">
          {sticky && !routerStatus ? (
            <Link href="/" passHref>
             
                <Image src={logoX} alt={'Engeez-app'} width={60} height={60} />
             
            </Link>
          ) : sticky && routerStatus ? (
            <Link href="/" passHref>
             
                <Image src={logoX} alt={'Engeez-app'} width={60} height={60} />
             
            </Link>
          ) : !sticky && routerStatus ? (
            <Link href="/" passHref>
             
                <Image src={logoX} alt={'Engeez-app'} width={60} height={60} />
             
            </Link>
          ) : (
            <Link href="/" passHref>
             
                <Image src={logoY} alt={'Engeez-app'} width={60} height={60} />
             
            </Link>
          )}
        </div>
        <ul className="flex flex-col mr-4 ">
          {LinksDataAr.map((link) => {
            return (
              <div key={link.title}>
                {!link.hasSubMenu ? (
                  <li
                    className="text-lg font-semibold my-4 duration-200 hover:text-regal-green"
                    onClick={() => setOpen(!open)}
                  >
                    <Link href={link.path} className="flex relative">
                        <span>{link.title}</span>
                     
                    </Link>
                  </li>
                ) : (
                  <li className="text-lg font-semibold my-4 ">
                    <div className="relative">
                      <div className="flex">
                        <span>{link.title}</span>

                        <FiChevronDown
                          className="mt-1 text-lg"
                          onClick={() => setShow(!show)}
                        />
                      </div>
                      <ul
                        className={`relative top-2 
                          ${routerStatus && sticky ? 'text-white' : ''}
                            px-3 h-auto    z-10  w-[235px]
                            ${show ? 'block' : 'hidden'} 
                           ${sticky && 'text-white'}
                          
                          }`}
                      >
                        {items.data.map((item, index2) => {
                          return (
                            <li
                              key={index2}
                              className="mb-2.5 duration-200 hover:text-regal-green whitespace-nowrap"
                              onClick={() => handleClosing()}
                            >
                              {item.category_name_ar == 'حلولكم البرمجية' ? (
                                <Link href={'/it-solution'}  className="block w-full text-base">
                                    {' '}
                                    {item.category_name_ar}
                                 
                                </Link>
                              ) : item.category_name_ar == 'دليلكم' ? (
                                <Link href={'/daleelcom'}  className="block w-full text-base">
                                    {' '}
                                    {item.category_name_ar}
                                 
                                </Link>
                              ) : item.category_name_ar == 'غازكم' ? (
                                <Link href={'/gascom'}  className="block w-full text-base">
                                    {' '}
                                    {item.category_name_ar}
                                 
                                </Link>
                              ) : item.category_name_ar == 'مياهكم' ? (
                                <Link href={'/watercom'}  className="block w-full text-base">
                                    {' '}
                                    {item.category_name_ar}
                                 
                                </Link>
                              ) : (
                                item.category_name_ar == 'أثاثكم' && (
                                  <Link href={'/athathcom'}  className="block w-full text-base">
                                      {' '}
                                      {item.category_name_ar}
                                   
                                  </Link>
                                )
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </li>
                )}
              </div>
            );
          })}
        </ul>
      </div> */}
    </div>
  );
}
export default DHMobileNav;

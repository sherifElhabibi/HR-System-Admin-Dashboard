
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import free from '../public/images/00.jpeg';
import '@/app/globals.css'
function DaleelInfo({ title, firstDesc, seconDesc, isSupAtathcom }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div
      className={`max-w-full py-4 w-[90%] md:w-1/2 flex justify-center items-center flex-col z-10 rounded-sm bg-white bg-opacity-90 shadow-md border border-neutral-300'
      `}
    >
      <h1
        className={`font-extrabold text-xl md:text-3xl text-center  ${
          pathname.startsWith('/athathcom/') ? 'mb-0' : 'mb-4'
        }  ${pathname == '/daleelcom' && 'text-regal-dark'}  ${
          pathname == '/watercom' && 'text-regal-blue'
        } ${pathname == '/gascom' && 'text-regal-red'} ${
          pathname == '/it-solution' && 'text-regal-green-dark'
        }`}
      >
        {' '}
        {title}
      </h1>
      {firstDesc && (
        <p className="text-gray-500 text-sm md:text-base mb-1.5 px-5 text-center ">
          {firstDesc}
        </p>
      )}
      {pathname == '/gascom' && (
        <span className="inline-block px-5 py-1.5 bg-regal-red text-white rounded-md">
          قريباً
        </span>
      )}
      {pathname == '/daleelcom' && (
        <div className=" text-gray-500 text-sm md:text-base my-2  px-5 text-center flex justify-between  sm:justify-center items-center flex-row-reverse">
          <p className="text-sm sm:text-sm ml-2 whitespace-nowrap">
            {seconDesc}
          </p>

          <Link href="/register"  className="bg-regal-green px-3 py-1.5 text-white shadow-md rounded-md mx-3 whitespace-nowrap font-medium ">
              انضم إلينا
            
          </Link>
          <div className='w-[60px] h-[60px]'>
          <Image src={free} 
           alt={'free'} />

          </div>
        </div>
      )}
    </div>
  );
}

export default DaleelInfo;

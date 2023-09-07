import DaleelSearch from './DaleelSearch';

import LandingSlider from './LandingSlider';

function LandingDaleel({ supplier, governorate }) {
  return (
    <section className="mt-[90px]  h-auto  relative z-[300]  flex justify-center items-center ">
      <div className="container m-auto z-20  ">
        <LandingSlider
          title={`مرحبا بك في دليلكم`}
          firstDesc={`يزودك بالمعلومات للوصول إلى جميع الخدمات من مكان واحد`}
          seconDesc={` هل أنت مقدم الخدمة؟`}
          isBtn={true}
          isInfo={true}
        />
        {/* <div className="mt-8 md:mt-20 lg:mt-0">
          <div className="mb-1 text-center hidden lg:flex justify-center items-center ">
            <div className="flex justify-center items-center bg-regal-dark w-[180px] h-[180px] rounded-full">
              <Image
                src={logoDaleel}
                width={'150px'}
                height={'150px'}
                alt={'Daleelcom'}
              />
            </div>
          </div>
          <h1 className="font-bold text-3xl mb-1.5 text-center ">
            {' '}
            مرحبا بك في دليلكم
          </h1>
          <p className="text-gray-400 text-base mb-1.5 px-5 text-center ">
            يزودك بالمعلومات للوصول إلى جميع الخدمات من مكان واحد
          </p>
        </div> */}

        <DaleelSearch supplier={supplier} governorate={governorate} />
      </div>
    </section>
  );
}

export default LandingDaleel;

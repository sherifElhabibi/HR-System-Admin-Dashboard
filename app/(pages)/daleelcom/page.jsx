'use client'
import React, { useEffect } from 'react';
import DaleelSearch from '../../../components/DaleelSearch';
import GlobalSlider from '../../../components/GlobalSlider';
const Images = [
  {
    url: 'https://ultimate.abuzeit.com/assets/f0b7d99b-e1bd-4663-b420-1548fcb1c040',
    caption: 'First Slide',
  },
  {
    url: 'https://ultimate.abuzeit.com/assets/398b3107-1366-44c0-8ab5-7348899c9d13',
    caption: 'Second Slide',
  },
  {
    url: 'https://ultimate.abuzeit.com/assets/177e1b04-3dba-4fb9-951d-679717d8cb68',
    caption: 'Third Slide',
  },
];

function Daleelcom({ supplier, governorate }) {
  useEffect(() => {
    // Set the document title after the component has mounted
    document.title = 'أنجز - دليلكم';
  }, []);  return (
    <section className="mt-[90px]  h-auto  relative z-[300]  flex justify-center items-center ">
      <div className="container m-auto z-20 px-4">
        <GlobalSlider
          title={`مرحبا بك في دليلكم`}
          firstDesc={`يزودك بالمعلومات للوصول إلى جميع الخدمات من مكان واحد`}
          seconDesc={` هل أنت مقدم الخدمة؟`}
          isBtn={true}
          isDaleel={true}
          isInfo={true}
          Images={Images}
              />

        {/* <DaleelSearch supplier={supplier} governorate={governorate} /> */}
      </div>
    </section>
  );
}

export default Daleelcom;

export async function getServerSideProps(context) {
  const resp1 = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/items/supplier?filter[main_category_id][_eq]=2`
  );
  const resp3 = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/items/governorate?fields=name`
  );

  return {
    props: {
      supplier: await resp1.json(),
      governorate: await resp3.json(),
    },
  };
}

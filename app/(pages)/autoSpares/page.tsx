'use client'
import GlobalSlider from '@/components/GlobalSlider'
import React from 'react'
import autoImg1 from '@/public/autoImg1.png'
import autoImg2 from '@/public/autoImg2.png'
import autoImg3 from '@/public/autoImg3.png'
const Images = [
    {
      url: `${autoImg1.src}`,
      caption: 'First Slide',
    },
    {
      url: `${autoImg2.src}`,
      caption: 'Second Slide',
    },
    {
      url: `${autoImg3.src}`,
      caption: 'Third Slide',
    },
  ];
function AutoSpares() {
  return (
   <div>
     <GlobalSlider
      title={''}
      firstDesc={''}
      seconDesc={''}
      isBtn={false}
      isDaleel={false}
      isInfo={false} isWatercom={undefined}
      isGascom={undefined} isItSolution={undefined}
      isSupAtathcom={undefined}
      Images={Images} isAutoSpares={true}        />

      <div className='h-[600px] bg-white'>

      </div>
    </div>
  )
}

export default AutoSpares
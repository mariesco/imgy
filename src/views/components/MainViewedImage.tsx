import { useState, useEffect } from 'react';
import Image from "next/image";
import { Inter } from 'next/font/google'

const inter = Inter({subsets: ['latin']})

export const MainViewedImage = () => {

  const [height] = useState(0)
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if(typeof window !== 'undefined' && window.innerHeight && window.innerWidth){
        setWidth(window.innerWidth/1.9);
    }
  }, [])

  return (
    <>
      <div className="flex items-center justify-center mb-4">
               <Image
                  src="https://assets.imgix.net/unsplash/alarmclock.jpg"
                  width={width}
                  height={height}
                  alt="A lovely bath"
                  className="z-1"
                />   
      </div>
      <div className="flex items-center justify-center h-12 mb-4 rounded bg-gray-800">
        <p className={`${inter.className} text-gray-500 font-semibold pr-4`}>
          Generated URL: 
        </p> 
        <p className={`${inter.className} text-gray-300`}>
          https://www.crehana.com/org/crehana
        </p>
      </div>
    </>
  )
}

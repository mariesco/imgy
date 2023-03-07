import { Images } from '@/entities/Images'
import { SetImageForViewInterface } from '@/entities/ImagesStore'
import { Inter } from 'next/font/google'
import { FC } from 'react'
import { ModalNewImage } from './ModalNewImage'
const inter = Inter({subsets: ['latin']})

//TODO: Type correctly addNewImages
type MainHeadProps = {
  images: Images;
  addNewImages: any;
  setImageForView: SetImageForViewInterface;
}

export const MainHead: FC<MainHeadProps> = ({images, addNewImages, setImageForView}) => {

  return (
    <div className="grid grid-cols-2 gap-4 mb-4">
        <p className={`${inter.className} mt-2 md:mt-0 text-3xl font-bold`}>
                 Imgy
         </p>
        <div className="md:ml-12 flex items-center justify-center">
            <select id="countries" className="mr-4 cursor-pointer font-semibold border border-gray-800 text-sm rounded-lg block w-full p-2.5 bg-gray-800 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" onChange={(e) => {setImageForView().set(parseInt(e.target.value))}}>
              {images.map((img) => {
                if(img.selected){
                  return (
                    <option key={img.id} value={img.id} selected>{img.name}</option>
                  )
                }
                return (
                  <option key={img.id} value={img.id}>{img.name}</option>
                )
              })}
            </select>
            <ModalNewImage addNewImages={addNewImages}/>
          </div>
    </div>
  )
}

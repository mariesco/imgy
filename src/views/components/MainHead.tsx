import { Inter } from 'next/font/google'
import { ModalNewImage } from './ModalNewImage'
const inter = Inter({subsets: ['latin']})

export const MainHead = () => {

  return (
    <div className="grid grid-cols-2 gap-4 mb-4">
        <p className={`${inter.className} mt-2 md:mt-0 text-3xl font-bold`}>
                 Imgy
         </p>
        <div className="md:ml-12 flex items-center justify-center">
            <select id="countries" className="mr-4 cursor-pointer font-semibold border border-gray-800 text-sm rounded-lg block w-full p-2.5 bg-gray-800 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500">
              <option defaultValue={'s'}>Choose a image</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
            <ModalNewImage />
          </div>
    </div>
  )
}

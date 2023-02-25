import {useState} from 'react';
import { Inter } from 'next/font/google'

const inter = Inter({subsets: ['latin']})

export const ModalNewImage = () => {

  const [openModal, setOpenModal] = useState(false);

   return (
      <>
   <button className={`${inter.className} block text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-48 text-sm px-5 py-2.5 text-center`} type="button" onClick={() => setOpenModal(true)}>
      Add image
   </button>

                <div tabIndex={-1} aria-hidden={openModal} className={`fixed top-0 left-0 right-0 z-50 ${openModal === false ? 'hidden' : ''} w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full flex justify-center items-center bg-gray-800/75`} >
         <div className="relative w-full h-full max-w-md md:h-auto">
             {/* Modal Content */}
             <div className="relative rounded-lg shadow bg-gray-900">
                 <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-700 hover:text-gray-200 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-hide="authentication-modal" onClick={() => setOpenModal(false)}>
                     <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                     <span className="sr-only">Close modal</span>
                 </button>
                 <div className="px-6 pt-6 pb-8 lg:px-8">
                     <h3 className="mb-4 text-xl font-medium text-white">Add image</h3>
                     <form className="space-y-6" action="#">
                         <div>
                             <label htmlFor="url" className="block mb-2 text-sm font-medium text-white">Your URL</label>
                             <input type="url" name="url" id="url" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="imgx.com/blabla.jpg" required />
                         </div>
                         <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add now</button>
                     </form>
                 </div>
             </div>
         </div>
      </div> 

      </>
   )
}

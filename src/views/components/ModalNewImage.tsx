import { FC } from 'react';
import { Inter } from 'next/font/google'

import { Uploader } from "uploader";
import { UploadButton } from "react-uploader";

const inter = Inter({subsets: ['latin']})

const uploader = Uploader({ apiKey: "public_kW15b6i9e8CiaLmuQBRsj1Cv2Rvq"});

type ModalNewImageProps = {
    addNewImages:()=> void;
}

export const ModalNewImage: FC<ModalNewImageProps> = ({addNewImages}) => {

   return (
      <>
        <UploadButton uploader={uploader}
                      options={{ multi: true }}
                      onComplete={ files => {
                         let imagesSaveds = localStorage.getItem("imgy-images");
                         let finalImagesSaved;
                         let uploadedFiles = files.map(x => x.fileUrl.slice(44,x.fileUrl.indexOf("?"))).join('___');
                   
                         if(uploadedFiles.length > 0){
                             if(imagesSaveds){
                                 finalImagesSaved = `${imagesSaveds}___${uploadedFiles}`
                             } else {
                                 finalImagesSaved = `${uploadedFiles}`;
                             }
                             localStorage.setItem("imgy-images", finalImagesSaved);
                             addNewImages(); 
                         }
                     }
            }>
          {({onClick}) =>
            <button className={`${inter.className} block text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-48 text-sm px-5 py-2.5 text-center`} type="button" onClick={onClick}>
                Add image
            </button>
          }
        </UploadButton>
      </>
   )
}

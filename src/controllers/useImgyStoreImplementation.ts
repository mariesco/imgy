import { Images } from "@/entities/Images";
import { ImagesDispatcher, ImagesStoreDestructured } from "@/entities/ImagesStore";
import { useActor } from "@xstate/react";
import { useContext, useEffect } from "react";

import { ImgyStoreContext, SSRDataProps } from "./useImgyStoreProvider";

function useImgyStoreImplementation({ssrData}: {ssrData: SSRDataProps}): ImagesStoreDestructured {

   const { imgyService } = useContext(ImgyStoreContext);
   const [state, send] = useActor(imgyService)

   const {
      images,
      history,
      imageViewed,
      isLoadingImages,
      possibleChanges,
      changesOfHistoryClicked,
   } = state.context;

   useEffect(function() {
      if(state?.matches("init") && ssrData){
         send({type: 'INIT_DATA_READY', 
            ssrData: {
               images: parsedInitImages(ssrData.images),
               possibleChanges: ssrData.possibleChanges
            }
         });
      }
   }, [state])

   const dispatcher: ImagesDispatcher = {
      'setImageForView': function() {
         if(state?.matches('newUrl')){
               //send({type: 'GENERATED_URL'})
               //CONTINUAR EL FLUJO DE AGREGAR UNA NUEVA URL Y PASAR A SUCCESS
               //el assign de lo que venga como prop en esta funcion
         }
      },
      'applyChangesToImage': function(){

      },
      'addNewImage': function(){

      }
   }

 return {
  store: {
      images,
      history,
      imageViewed,
      isLoadingImages,
      possibleChanges,
      changesOfHistoryClicked,
   },
   dispatcher
  } 
}

const parsedInitImages = (images: Images): Images => {
   if(images[0].id === undefined){
      return images.map((img,i) => {
         return {
            id: i+1,
            name: img.name,
            url: img.url,
            selected: i === 0
         }
      })
   }
   return images;
}

export default useImgyStoreImplementation;

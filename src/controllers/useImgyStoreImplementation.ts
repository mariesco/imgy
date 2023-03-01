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
      'setImageForView': function({result}) {
         send({type: 'SELECT_IMG', selection: {
            images: result.images,
            imageViewed: result.imageViewed
         }})
      },
      'applyChangesToImage': function({result}){
         send({type: 'APPLY_CHANGES_TO_IMG', finalImage: {
            imageViewed: result.imageViewed
         }})
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

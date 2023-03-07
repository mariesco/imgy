import { ChangesApplieds } from "@/entities/History";
import { Images } from "@/entities/Images";
import { ImagesDispatcher, ImagesStoreDestructured } from "@/entities/ImagesStore";
import { applyChangesToImageUseCase } from "@/useCases/applyChangesToImage";
import { useActor } from "@xstate/react";
import { useCallback, useContext, useEffect } from "react";

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

   //TODO: Make this implementation correctly.
   //Wrongly import of useCase inside storeImplementation
   //We must use this useCase from useImgyViewModel
   //But we create the 2 next constats here, only for time issues.
  const { applyChangesToImage: applyChangesToImageFn } = applyChangesToImageUseCase({
    history: history,
    imageViewed: imageViewed,
    changesOfHistoryClicked: changesOfHistoryClicked,
  })


  const applyChangesToImageCb = useCallback((changes: ChangesApplieds)=> {
    return applyChangesToImageFn(changes);
  }, [state])

   useEffect(function() {
      if(state?.matches("init") && ssrData){
         send({type: 'INIT_DATA_READY', 
            ssrData: {
               images: parsedInitImages([...ssrData.images, ...localImages()] as Images),
               possibleChanges: ssrData.possibleChanges
            }
         });
      }

      if(state?.matches('success') && state?.event.type === 'APPLY_HISTORY_CHANGES_TO_IMG' && state?.context.changesOfHistoryClicked){
         const imageViewedChanged = applyChangesToImageCb(state.context.changesOfHistoryClicked);
          send({
             type: 'APPLY_CHANGES_TO_IMG', finalImage: {
                imageViewed: imageViewedChanged
             }
          })
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
      'applyHistoryChangesToImage': function({result}){
         send({type: 'APPLY_HISTORY_CHANGES_TO_IMG', historyChanges: {
            changesOfHistoryClicked: result.changesOfHistoryClicked
         }})
      },
      'addNewImages': function(){
         send({type: 'ADD_IMAGES'});
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

            

const localImages = () => {
   let localImgs = [];
   let imagesSaveds = localStorage.getItem("imgy-images")?.split("___");

   if(imagesSaveds && imagesSaveds.length > 0){
      localImgs = imagesSaveds.map((img: string) => {
         return {
            name: img,
            url: `https://imgy2.imgix.net/${img}`,
         }
      })
      return localImgs;
   } else {
      return [];
   }
}

export default useImgyStoreImplementation;

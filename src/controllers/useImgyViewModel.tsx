import { useCallback } from 'react';
import { ChangesApplieds } from '@/entities/History';
import type { ImagesStore, ImagesStoreDestructured } from '@/entities/ImagesStore';

import { AddNewImageUseCase } from '@/useCases/addImage';
import { SetImageForViewUseCase } from '@/useCases/setImageForView';
import { applyChangesToImageUseCase } from '@/useCases/applyChangesToImage';

const useImgyViewModel = ({store, dispatcher}: ImagesStoreDestructured): ImagesStore => {

  //Use cases
  const { addNewImage: addNewImageFn } = AddNewImageUseCase({
    images: store.images
  });

  const { setImageForView: setImageForViewFn } = SetImageForViewUseCase({
    images: store.images
  })

  const { applyChangesToImage: applyChangesToImageFn } = applyChangesToImageUseCase({
    history: store.history,
    imageViewed: store.imageViewed,
    changesOfHistoryClicked: store.changesOfHistoryClicked,
  })

  //Optimizing cases
  const addNewImageCb = useCallback((newImages: typeof store.images) => {
    const {
      images
    } = addNewImageFn(newImages);
    return images;
  }, [store.images, addNewImageFn])

  const setImageForViewCb = useCallback((idSelected: number)=> {
    return setImageForViewFn(idSelected);
  }, [store.images, setImageForViewFn])

  const applyChangesToImageCb = useCallback((changes: ChangesApplieds)=> {
    return applyChangesToImageFn(changes);
  }, [store, applyChangesToImageFn])



  //Integration of cases with dispatchers
  const setImageForView = () => {
    return {
      set(idSelected: number) {
        const result = setImageForViewCb(idSelected);
        dispatcher['setImageForView']({ result })
      }
    }
  }

  const applyChangesToImage = () => {
    return {
      apply(changes: ChangesApplieds) {
        const imageViewed = applyChangesToImageCb(changes);
        dispatcher['applyChangesToImage']({ result: {
          imageViewed
        } })
      }
    }
  }

  const applyHistoryChangesToImage = () => {
    return {
      apply(changes: ChangesApplieds) {
        dispatcher['applyHistoryChangesToImage']({ result: {
          //@ts-ignore
          changesOfHistoryClicked: changes,
        } })

      }
    }
  }

  const addNewImages = () => {
    //@ts-ignore
    dispatcher['addNewImages'](null)
  }


  return {
    images: store.images,
    imageViewed: store.imageViewed,
    isLoadingImages: typeof store.images === 'undefined' || store.isLoadingImages,
    history: store.history,
    changesOfHistoryClicked: store.changesOfHistoryClicked,
    possibleChanges: store.possibleChanges,
    addNewImages,
    setImageForView,
    applyChangesToImage,
    applyHistoryChangesToImage
  }
}

export { useImgyViewModel };

import { useCallback } from 'react';
import { ChangesApplieds } from '@/entities/History';
import type { ImagesStore } from '@/entities/ImagesStore';
import { AddNewImageUseCase } from '@/useCases/addImage';
import { SetImageForViewUseCase } from '@/useCases/setImageForView';
import { applyChangesToImageUseCase } from '@/useCases/applyChangesToImage';

const useImgyViewModel = (store: ImagesStore) => {

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

  const addNewImage = useCallback((newImages: typeof store.images)=> {
    addNewImageFn(newImages);
  }, [store.images])

  const setImageForView = useCallback((idSelected: number)=> {
    setImageForViewFn(idSelected);
  }, [store.images])

  const applyChangesToImage = useCallback((changes: ChangesApplieds)=> {
    applyChangesToImageFn(changes);
  }, [store.images])


  return {
    images: typeof store.images === 'undefined' ? [] : store.images,
    imageViewed: store.imageViewed,
    isLoadingImages: typeof store.images === 'undefined' || store.isLoadingImages,
    history: typeof store.history === 'undefined' ? [] : store.history,
    changesOfHistoryClicked: store.changesOfHistoryClicked,
    addNewImage,
    setImageForView,
    applyChangesToImage
  }
}

export { useImgyViewModel };

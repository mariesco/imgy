import type { ChangesApplieds } from './History';
import { ImageViewed } from './Images';

const applyHistoryChangesToImageViewed = ({
  historySelected,
  imageViewed
}: {
    historySelected: ImageViewed,
    imageViewed: ImageViewed
  }): ImageViewed => {

  let finalUrl = imageViewed.image.url.slice(0, imageViewed.image.url.indexOf('?'));
  let newChangesForApply: ChangesApplieds = [];

  for(let i = 0; i < historySelected.changes.length; i++){
    let ch = historySelected.changes[i]
      newChangesForApply.push(ch)
      if(i === 0){
        finalUrl = finalUrl + `?${ch.name}=${ch.value}`
      } else {
        finalUrl = finalUrl + `&${ch.name}=${ch.value}`
      }
  }



  let imageViewedWithHistoryChanges = {
    image: {
      ...imageViewed.image,
      url: finalUrl
    },
    changes: newChangesForApply
  };
  return imageViewedWithHistoryChanges;
}

export {
  applyHistoryChangesToImageViewed
}

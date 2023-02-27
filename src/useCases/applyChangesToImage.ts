import { ChangesApplieds } from "@/entities/History";
import { ImageViewed } from "@/entities/Images";
import { ImagesStore } from "@/entities/ImagesStore";
import { addChangeToHistory, applyHistoryChangesToImageViewed } from "@/entities/HistoryModel";
import { 
  UpdateOneChange,
  addChangeToImage,
  removeChangeToImage,
} from "@/entities/ImagesModel";

type ApplyChangesToImageStore = Pick<ImagesStore, "imageViewed" | 'applyChangesToImage' | 'changesOfHistoryClicked' | 'history' >;

const applyChangesToImageUseCase = (store: ApplyChangesToImageStore, changes: ChangesApplieds) => {
  
  const applyChangesToImage = (): ImageViewed => {
    if(store.changesOfHistoryClicked !== null){

      let changesForUpdate = store.changesOfHistoryClicked;

      store.changesOfHistoryClicked = null;

      const imageViewed = applyHistoryChangesToImageViewed({
        historySelected: {
          image: {
            name: '', url: '', selected: false, id: 9999
          },
          changes: changesForUpdate
        },
        imageViewed: store.imageViewed,
      })

      store.history = addChangeToHistory({
        history: store.history,
        newChange: imageViewed
      })

      return imageViewed;
    } else {
      let change = changes[0];
      const isOneChangeNeverApplied = store.imageViewed.changes.every(ch => ch.name !== change.name)

      if(isOneChangeNeverApplied){
        const imageViewed = addChangeToImage({
          imageViewed: store.imageViewed,
          change
        })


        return imageViewed;
      } else {
        let isAChangeForRemove =
          (typeof change.value === 'string' && change.value === '') || 
          (typeof change.value === 'number' && change.value === 0);

        if(isAChangeForRemove){
          const imageViewed = removeChangeToImage({
            imageViewed: store.imageViewed,
            change
          })

          store.history = addChangeToHistory({
            history: store.history,
            newChange: imageViewed
          })

          return imageViewed; 
        } else {
          const imageViewed = UpdateOneChange({
            imageViewed: store.imageViewed,
            change
          })

          store.history = addChangeToHistory({
            history: store.history,
            newChange: imageViewed
          })

          return imageViewed;
        }
      }
    }
  }

    
  return {
    applyChangesToImage
  }
};

export { applyChangesToImageUseCase };
